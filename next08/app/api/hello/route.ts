import { NextRequest, NextResponse } from 'next/server'
import {limiter} from '../config/limiter'

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin')

  const remaining = await limiter.removeTokens(1)
  console.log('remaining: ', remaining)

  if(remaining < 0)
    return new NextResponse(null, {
      status: 429,
      statusText: 'Too many requests',
      headers: {
        'access-control-allow-origin': origin || '*',
        'content-type': 'text/plain' 
      }
    })

  return new Response('Hello, Next.js!')
}
