import React from 'react'
import SideBar from '../../components/Admin/SideBar/SideBar'
import TutorsList from '../../components/Admin/Tutors/TutorsList'

function TutorListPage() {
  return (
    <div className='flex'>
    <SideBar/>
    <TutorsList/>
    </div>
  )
}

export default TutorListPage
