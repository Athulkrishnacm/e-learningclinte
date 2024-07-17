import React from 'react'
import NavBar from '../../components/User/NavBar/NavBar'
import Footer from '../../components/User/Footer/Footer'
import CourseList from '../../components/User/Course/CourseList'

function UserCoursePage() {
  return (
    <>
      <NavBar/>
      <CourseList/>
      <Footer/>
    </>
  )
}

export default UserCoursePage
