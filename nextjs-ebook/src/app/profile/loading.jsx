import Image from 'next/image'

const LoadingPage =	() => {
	<Image
		src={`assets/icons/loader.svg`}
		width={50}
		height={50}
		alt='loader'
		className='object-contain'
	/>
} 

export default LoadingPage