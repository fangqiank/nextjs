'use client'

import {CustomCodeRenderer} from './renderers/CustomCodeRenderer'
import { CustomImageRenderer } from './renderers/CustomImageRenderer'
import dynamic from 'next/dynamic'

const Output = dynamic(
	async () => (await import ('editorjs-react-renderer')).default,
	{
		ssr: false
	}
)

type EditorOutputProps = {
	content: any 
}

const renders = {
	image: CustomImageRenderer,
	code: CustomCodeRenderer
}

const style = {
	paragraph: {
		fontSize: '0.875rem',
		lineHeight: '1.25rem'
	}
}

export const EditorOutput = ({content}: EditorOutputProps) => {
	return (
		<Output 
			style={style}
			className='text-sm'
			renderers={renders}
			data={content}
		/>
	)
}