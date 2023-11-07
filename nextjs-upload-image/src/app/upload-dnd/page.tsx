"use client"
 
// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css"
import { UploadDropzone } from "@uploadthing/react"
import { OurFileRouter } from "../api/uploadthing/core"
import {useState} from 'react'
import Link from "next/link"

export default function UploadDndPage() {
  const [images, setImages] = useState<{
    fileUrl: string,
    fileKey: string
	}[]>([])

	const title = images.length ? (
		<>
			<p>Upload Complete</p>
			<p className="mt-2">{images.length} files</p>
		</>
	) : null

	const imageList  = (
		<>
			{title}
			<ul>
				{images.map((img, idx) => (
					<li 
						className="mt-2"
						key = {idx}
					>
						<Link 
							href={img.fileUrl}
							target="_blank"
						>
							{img.fileUrl}
						</Link>
					</li>
				))}
			</ul>
		</>
	)

	return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadDropzone<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if(res)
						// Do something with the response
						setImages(res)
						const json = JSON.stringify(res)
						console.log(json)
					// Do something with the response
          // alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />

			{imageList}
    </main>
  );
}