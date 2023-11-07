import {getRandomQuote} from '../lib/getRandomQuotes'
import { Quote } from './components/Quote'

export default async function Home() {
  const randomQuote = await getRandomQuote()

  return (
    <Quote {...randomQuote}/>
  )
}
