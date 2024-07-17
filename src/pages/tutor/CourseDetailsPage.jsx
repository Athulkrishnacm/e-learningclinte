import React from 'react'
import SideBar from '../../components/Tutor/SideBar/SideBar'
import CourseView from '../../components/Admin/Courses/CourseView'

function CourseDetailsPage() {
  return (
    <div className='flex'>
    <SideBar/>
    <CourseView tutor={true}/>
   </div>
  )
}

export default CourseDetailsPage
