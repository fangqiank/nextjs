import { NextResponse } from "next/server"
import {getRandomQuote} from "../../../lib/getRandomQuotes"

export const GET = async (req: Request) => {
    const quote = await getRandomQuote()

    return NextResponse.json(quote)
}