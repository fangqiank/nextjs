'use client'

import Image from "next/image"
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {usePathname, useRouter} from 'next/navigation'
import {ChangeEvent, useState} from 'react'
import {zodResolver} from '@hookform/resolvers/zod'
import {
	Form,
	FormControl,
	FormField,
	FormLabel,
	FormItem,
	FormMessage
} from '../ui/Form'
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"
import { Textarea } from "../ui/Textarea"
import {useUploadThing} from '@/lib/uploadthing'
import { isBase64Img } from "@/lib/utiles"
import { userValidator } from "@/lib/validators/userValidator"
import { updateUser } from "@/lib/actions/user.actions"

type AccountProfileProps = {
	user: {
		id: string,
		objectId: string,
		username: string,
		name: string,
		bio: string,
		image: string
	},
	btnTitle: string
}

export const AccountProfile = ({user, btnTitle}: AccountProfileProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const {startUpload} = useUploadThing('media')
	const [files, setFiles] = useState<File[]>([])

	const form = useForm<z.infer<typeof userValidator>>({
		resolver: zodResolver(userValidator),
		defaultValues: {
			profile_photo: user?.image ? user.image : '',
			name: user?.name ? user.name : '',
			username: user?.username ? user.username : '',
			bio: user?.bio ? user.bio : '', 
		}
	})

	const onSubmit = async (values: z.infer<typeof userValidator>) => {
		const blob = values.profile_photo

		const hasImagesChanged = isBase64Img(blob)

		if(hasImagesChanged) {
			const imgRes = await startUpload(files)

			if(imgRes && imgRes[0].fileUrl)
				values.profile_photo = imgRes[0].fileUrl
		}

		pathname === '/profile/edit' ? router.back() : router.push('/')

		await updateUser({
			name: values.name,
			path: pathname,
			username: values.username,
			userId: user.id,
			bio: values.bio,
			image: values.profile_photo
		})
	}

	const handleImage = (
		e: ChangeEvent<HTMLInputElement>, 
		fieldChange: (value: string) => void
		) => {
			e.preventDefault()

			const fileReader = new FileReader()

			if(e.target.files && e.target.files.length > 0){
				const file = e.target.files[0]

				setFiles(Array.from(e.target.files))

				if(!file.type.includes('image'))
					return 

				fileReader.onload =async (evt) => {
					const imgDataUrl = evt.target?.result?.toString() || ''
					fieldChange(imgDataUrl)
				}

				fileReader.readAsDataURL(file)
			}
		}

	const contents = (
		<Form {...form}>
			<form
				className="flex flex-col justify-start gap-10"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="profile_photo"
					render={({field}) => (
						<FormItem className="'flex items-center gap-4">
							<FormLabel className="account-form_image-label">
								{field.value ? (
									<Image
										src={field.value}
										alt='profile_icon'
										width={96}
										height={96}
										priority 
										className="rounded-full object-contain"
									/>
								) : (
									<Image
										src='/assets/profile.svg'
										alt="profile_icon"
										width={24}
										height={24}
										className="object-contain" 
									/>
								)}
							</FormLabel>
							<FormControl className="flex-1 text-base-semibold text-gray-200">
								<Input
									type="file"
									accept="image/*"
									placeholder="Add profile photo"
									className="account-form_image-input"
									onChange={e => handleImage(e, field.onChange)} 
								/>
							</FormControl>
						</FormItem>
					)} 
				/>

				<FormField
					control={form.control}
					name='name'
					render={({field}) => (
						<FormItem className="'flex w-full flex-col gap-3">
							<FormLabel className="text-base-semibold text-light-2">
								Name
							</FormLabel>
							<FormControl>
								<Input
									type="text"
									className="account-form_input no-focus"
									{...field} 
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)} 
				/>

				<FormField
					control={form.control}
					name='username'
					render={({field}) => (
						<FormItem className="'flex w-full flex-col gap-3">
							<FormLabel className="text-base-semibold text-light-2">
								Username
							</FormLabel>
							<FormControl>
								<Input
									type="text"
									className="account-form_input no-focus"
									{...field} 
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)} 
				/>					

				<FormField
					control={form.control}
					name='bio'
					render={({field}) => (
						<FormItem className="'flex w-full flex-col gap-3">
							<FormLabel className="text-base-semibold text-light-2">
								Bio
							</FormLabel>
							<FormControl>
								<Textarea
									rows={10}
									className="account-form_input no-focus"
									{...field} 
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)} 
				/>

				<Button
					type='submit'
					className="bg-primary-500"
				>
					{btnTitle}
				</Button>		
			</form>
		</Form>
	)	

	return contents
}



