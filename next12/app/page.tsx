import { Posts } from "./components/Posts"
import { MyProflePic } from './components/MyProflePic'

export const revalidate = 86400

export default function Home() {
  return (
    <div className="mx-auto">
    <MyProflePic />  
    <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
      Hello and Welcome 👋&nbsp;
      <span className="whitespace-nowrap">
        I&apos;m <span className="font-bold">Zhang San</span>.
      </span>
    </p>
    {/* @ts-expect-error server component */}
    <Posts />
  </div>
  )
}
