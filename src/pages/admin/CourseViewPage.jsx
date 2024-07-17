import React from 'react'
import SideBar from '../../components/Admin/SideBar/SideBar'
import CourseView from '../../components/Admin/Courses/CourseView'

function CourseViewPage() {
  return (
    <div className='flex'>
    <SideBar/>
    <CourseView/>
    </div>
  )
}

export default CourseViewPage
