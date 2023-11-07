'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Courses } from "./components/Courses"
import { Loading } from "./components/Loading" 
import { CourseSearch } from "./components/CourseSearch"

export default function Home() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch(`/api/courses`)
      const data = await res.json()
      setCourses(data)
      setLoading(false)
    }

    fetchCourses()
  }, [])

  if(loading)
    return <Loading />

  return (
    <>
      <h1>Welcome To Traversy Meida</h1>
      <CourseSearch getResults={res => setCourses(res)} />
      <Courses courses={courses} />
    </>
  )
}
