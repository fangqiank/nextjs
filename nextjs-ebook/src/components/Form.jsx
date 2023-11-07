import Link from "next/link"

export const Form  = ({type, post, setPost, submitting, handleSubmit}) => {
	const contents = (
		<section className="w-full max-w-full flex-start  flex-col">
			<h1 className="head_text text-left">
				{type} Prompt
			</h1>
			<p className="desc text-left max-w-md">
				{type} and share amazing prompts with the world, and let youu imagination run wild with any AI-powered platform
			</p>

			<form
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
				onSubmit={handleSubmit}
			>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Enter prompt
					</span>

					<textarea
						className="form_textarea"
						value={post.prompt}
						onChange={e => setPost({
							...post,
							prompt: e.target.value
						})}
						placeholder="Write tour post"
						required
					/>
				</label>

				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Field of prompt{' '}
						<span className="font-normal">
							(#product, #development, #idea, etc.)
						</span>
					</span>

					<input 
						type="text" 
						className="form_input"
						value={post.tag}
						onChange={e => setPost({
							...post,
							tag: e.target.value
						})} 
						placeholder="Tag"
						required
					/>
				</label>

				<div className="flex-end mx-3 mb-5 gap-4">
					<Link 
						className="text-gray-500"
						href='/'
					>
						Cancel
					</Link>

					<button
						type="submit"
						className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
						disabled={submitting}
					>
						{submitting ? `${type}ing...` : type}
					</button>
				</div>
			</form>
		</section>
	)

	return contents
}