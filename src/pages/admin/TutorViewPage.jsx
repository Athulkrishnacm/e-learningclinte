import React from 'react'
import SideBar from '../../components/Admin/SideBar/SideBar'
import TutorView from '../../components/Admin/Tutors/TutorView'

function TutorViewPage() {
  return (
    <div className='flex'>
    <SideBar/>
    <TutorView/>
    </div>
  )
}

export default TutorViewPage
