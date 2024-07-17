import React from 'react'
import SideBar from '../../components/Tutor/SideBar/SideBar'
import Account from '../../components/Tutor/Profile/Account'


function ProfilePage() {
  return (
    <div className='flex'>
      <SideBar/>
     <Account/>
    </div>
  )
}

export default ProfilePage
