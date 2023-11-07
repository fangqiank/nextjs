'use client'

import EditorJS  from '@editorjs/editorjs'
import {zodResolver} from '@hookform/resolvers/zod'
import {usePathname, useRouter} from 'next/navigation'
import {useForm} from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import {object, z} from 'zod'
import {toast} from '@/hooks/use-toast'
import {uploadFiles} from '@/lib/uploadthing'
import {PostCreationRequest, PostValidator} from '@/lib/validatiors/post'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import '@/styles/editor.css'
import { useCallback, useEffect, useRef, useState } from 'react'

type FormData = z.infer<typeof PostValidator>

type EditorProps = {
	subredditId: string
}

export const Editor = ({subredditId}: EditorProps) => {
	const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
		resolver: zodResolver(PostValidator),
		defaultValues: {
			subredditId,
			title: '',
			content: null
		}
	})

	const ref = useRef<EditorJS>()
	const _titleRef = useRef<HTMLTextAreaElement>(null)
	const router = useRouter()
	const [isMounted, setIsMounted] = useState<boolean>(false)
	const pathname = usePathname()

	const {mutate: createPost} = useMutation({
		mutationFn:async (payload: PostCreationRequest) => {
			const {title, content, subredditId} = payload
			const {data} = await axios.post('/api/subreddit/post/create', payload)
			return data
		},

		onError: () => {
			return toast({
				title: 'Something went wrong.',
        description: 'Your post was not published. Please try again.',
        variant: 'destructive',
			})
		},

		onSuccess: () => {
			const newPathname = pathname.split('/').slice(0, -1).join('/')
			router.push(newPathname)

			router.refresh()

			return toast({
				description: 'Your post has been published.',
			})
		}
	})

	const initEditor = useCallback(async () => {
		const EditorJs = (await import('@editorjs/editorjs')).default
		const Header = (await import('@editorjs/header')).default
    const Embed = (await import('@editorjs/embed')).default
    const Table = (await import('@editorjs/table')).default
    const List = (await import('@editorjs/list')).default
    const Code = (await import('@editorjs/code')).default
    const LinkTool = (await import('@editorjs/link')).default
    const InlineCode = (await import('@editorjs/inline-code')).default
    const ImageTool = (await import('@editorjs/image')).default

		if(!ref.current){
				const editor = new EditorJS({
					holder: 'editor',
					onReady() {
						ref.current = editor
					}, 
					placeholder: 'Type here to ...',
					inlineToolbar: true,
					data: {
						blocks: []
					},
					tools: {
						header: Header,
						linkTool: {
							class: LinkTool,
							config: {
								endpoint: '/api/link'
							}
					},
					image: {
						class: ImageTool,
						config: {
							uploader: {
								async uploadByFile(file: File) {
									// upload to uploadthing
									const [res] = await uploadFiles([file], 'imageUploader')

									return {
										success: 1,
										file: {
											url: res.fileUrl,
										},
									}
								},
							},
						},
					},
					list: List,
					code: Code,
					inlineCode: InlineCode,
					table: Table,
					embed: Embed,
				}
			})
		}
	}, [])

	useEffect(() => {
		if(Object.keys(errors).length){
			for(const [k, v] of Object.entries(errors)){
				v
				toast({
					title: 'Something went wrong.',
          description: (v as { message: string }).message,
          variant: 'destructive',
				})
			}
		}
	}, [errors])

	useEffect(() => {
		if(typeof window !== 'undefined')
			setIsMounted(true)
	}, [])

	useEffect(() => {
		const init =async () => {
			await initEditor()

			setTimeout(() => {
				_titleRef?.current?.focus()
			}, 0)
		}

		if(isMounted){
			init()

			return () => {
				ref.current?.destroy()
				ref.current = undefined
			}
		}
	}, [isMounted, initEditor])

	const onSubmit = async (data: FormData) => {
		const blocks = await ref.current?.save()

		const payload: PostCreationRequest = {
			title: data.title,
			content: blocks, 
			subredditId
		}

		createPost(payload)
	}

	if(!isMounted)
		return null

	const {ref: titleRef, ...rest} = register('title')
	
	const contents = (
		<div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
			<form
				id='submitted-post-form'
				className='w-fit'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="prose prose-stone dark:prose-invert">
					<TextareaAutosize
						ref={e => {
							titleRef(e)
							// @ts-ignore
							_titleRef.current = e
						}}
						{...rest}
						placeholder='Title'
						className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
					/>

					<div
						id='editor'
						className='min-h-[500px]'
					/>

					<p className="text-sm text-gray-500">
						User{' '}
						<kbd className='rounded-md border bg-muted px-1 text-xs uppercase'>
							Tab
						</kbd>{' '}
						to open the command menu
					</p>
				</div>
			</form>
		</div>
	)

	return contents
}