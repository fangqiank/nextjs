'use client'

import { RootState, AppDispatch } from "@/store"
import { fetchUsers, increment } from "@/store/userSlice"
import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


export const UserList = () => {
	const {entities, loading, value} = useSelector((state: RootState) => state.user)
	const userRef = useRef(false)
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		if(userRef.current === false) {
			dispatch(fetchUsers())
		}
		
		return () => {
			userRef.current = true
		}
	}, [])

	return (
		<>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				entities?.map((user: any) => 
				<ListGroup key={user.id} horizontal>
					<ListGroup.Item>{user.name}</ListGroup.Item>
				</ListGroup> )
			)}

		<Card style={{ width: '18rem' }}>
			<Card.Img variant="top" src="holder.js/100px180" />
			<Card.Body>
				<Card.Title>Test</Card.Title>
				<Card.Text>
					{value}
				</Card.Text>
				<Button 
					variant="primary" 
					onClick={() => dispatch(increment(5))}
				>
					Click on me
				</Button>
			</Card.Body>
		</Card>
			
		</>
	)
}