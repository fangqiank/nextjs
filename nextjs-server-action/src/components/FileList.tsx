'use client'

import {useState} from 'react'

export const NameField = (
		{getFiles}: {getFiles: (dir: string) => Promise<string[]>}
	) => {
		const [files, setFiles] = useState<string[]>([])

		const onGetFiles = (path: string) => getFiles(path).then(setFiles)

		return (
			<div className="flex flex-col text-left gap-2">
				<button 
					className="btn"
					onClick={() => onGetFiles('.')}
				>
					Current directory
				</button>

				<button 
					className="btn"
					onClick={() => onGetFiles('./public')}
				>
					Public directory
				</button>

				{files.map(file => (
					<div key={file}>{file}</div>
				))}
			</div>
		)
}

