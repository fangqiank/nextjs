'use client'

import {useState} from 'react'
import {useSignUp} from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
	const {isLoaded, signUp, setActive} = useSignUp()
	const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
	const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
	const router = useRouter()

	const handleSubmit = async (evt) => {
		evt.preventDefault()

		if(!isLoaded)
			return
		
		try{
			await signUp.create({
				first_name: firstName,
				last_name: lastName,
				email_address: email,
				password
			})

			await signUp.prepareEmailAddressVerification({
				strategy: 'email_code'
			})
			setPendingVerification(true)
		}catch(err){
			console.error(err)
		}
	}  

	const onPressVerify = async (e) => {
		e.preventDefault()

		if(!isLoaded)
			return
		
		try{
			const completed = await signUp.attemptEmailAddressVerification({
				code
			})

			if(completed.status !== 'complete')
				console.log(JSON.stringify(completed, null, 2));

			if(completed.status === 'complete'){
				await setActive({
					session: completed.createdSessionId
				})
				router.push('/')
			}
		}catch(err){
			console.error(JSON.stringify(err, null, 2))
		}
	}

	const contents = (
		<div 
			className="border p-5 rounded"
			style={{width: '500px'}}
		>
			<h1 className="text-2xl mb-4">Register</h1>
			{!pendingVerification && (
				<form 
					className="space-y-4"
					onSubmit={handleSubmit}
				>
					<div>
						<label 
							htmlFor="first_name" 
							className="block mb-2 text-sm font-medium text-gray-900"
						>
							First Name
						</label>
						<input 
							type="text"
							name='first_name'
							id='first_name'
							onChange={e => setFirstName(e.target.value)} 
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" 
							required
						/>
					</div>

					<div>
						<label 
							htmlFor="last_name" 
							className="block mb-2 text-sm font-medium text-gray-900"
						>
							Last Name
						</label>
						<input 
							type="text"
							name='last_name'
							id='last_name'
							onChange={e => setLastName(e.target.value)} 
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" 
							required
						/>
					</div>

					<div>
						<label 
							htmlFor="email" 
							className="block mb-2 text-sm font-medium text-gray-900"
						>
							Email
						</label>
						<input 
							type="email"
							name='email'
							id='email'
							onChange={e => setEmail(e.target.value)} 
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" 
							placeholder='name@company.com'
							required
						/>
					</div>

					<div>
						<label 
							htmlFor="passwordd" 
							className="block mb-2 text-sm font-medium text-gray-900"
						>
							Password
						</label>
						<input 
							type="password"
							name='password'
							id='password'
							onChange={e => setPassword(e.target.value)} 
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" 
							required
						/>
					</div>

					<button
						type='submit' 
						className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
					>
						Create an account
					</button>
				</form>
			)}

			{pendingVerification && (
				<div>
					<form className="space-y-4 md:space-y-6">
						<input 
							type="text" 
							className="bg-gray-50 border border-gray-300 text-gray=900 sm:text-sm rounded-lg block w-full p-2.5"
							placeholder='Enter verification code ...'
							onChange={e => setCode(e.target.value)} 
						/>
						<button 
							type='button'
							className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
							onClick={onPressVerify}
						>
							Verify Email
						</button>
					</form>
				</div>
			)}
		</div>
	)

	return contents
}

export default RegisterPage
