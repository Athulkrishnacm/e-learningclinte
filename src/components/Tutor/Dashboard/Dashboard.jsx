import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import { dashboardCourses } from '../../../Services/tutorApi'
import CourseCard from '../../Admin/Courses/CourseCard'

function Dashboard() {

  const [courses,setCourses] = useState([])

  useEffect(()=>{
    dashboardCourses().then(({data})=>{
      setCourses(data.courses)
    })
  },[])


  return (
    <div className="relative w-full bg-[#141B2D] text-white">
      <NavBar/>

      <h1 className="text-xl m-10 uppercase  text-white font-bold tracking-widest">
          Your Courses
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 m-8 ">
          {courses.map((course, index) => {
            return (
              <CourseCard
                key={index}
                image={course.imageURL}
                title={course.name}
                date={course.createdAt}
                id={course._id}
                isApproved={course.isApproved}
                status={course.status}
                tutorSide={true}
              />
            );
          })}
        </div>
    </div>
  )
}

export default Dashboard
