import React from 'react'
import SideBar from '../../components/Tutor/SideBar/SideBar'
import Dashboard from '../../components/Tutor/Dashboard/Dashboard'

function DashboardPage() {
  return (
    <div className='flex'>
      <SideBar/>
      <Dashboard/>
    </div>
  )
}

export default DashboardPage
