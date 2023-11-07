'use client'

import { useDispatch, useSelector } from "react-redux"
import {RootState, AppDispatch} from '@/store'
import {increment, decrement, incrementByAmount} from '../store/counterSlice'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Badge from 'react-bootstrap/Badge'

export const Counter = () => {
	const dispatch = useDispatch<AppDispatch>()
	
	const count = useSelector((state: RootState) => 
		state.counter.value
	)

	return (
		<div>
			<Badge bg="secondary">{count}</Badge>
			<ButtonGroup aria-label="Basic example">
				<Button
					variant="outline-primary"
					size="sm"
					onClick={() => dispatch(increment())}
				>
					Increment
				</Button>
		
				<Button
					variant="outline-secondary"
					size="sm"
					onClick={() => dispatch(decrement())}
				>
					Decrement
				</Button>

				<Button
					variant="outline-danger"
					size="sm"
					onClick={() => dispatch(incrementByAmount(2))}
				>
					Increment by 2
				</Button>
			</ButtonGroup>
		</div>
	)
}