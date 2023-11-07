 import {getAllQuotes} from './getAllQuotes'

//  const prevQuoteObj = {
// 	prev: 1,
// 	setPrev: function (num: number) { this.prev = num }
//  }

 export const getRandomQuote = async (id: string): Promise<Quote> => {
	const prevQuoteId = parseInt(id)

	const results: Quote[] = await getAllQuotes()

	const ids: number[] = results.map(q => q.id)

	let randomId = prevQuoteId

	while(randomId === prevQuoteId){
		const randomInd = Math.floor(Math.random() * results.length)
		randomId = ids[randomInd]
	}

	const newQuote = results.find(q => q.id === randomId) as Quote

	return newQuote
 }