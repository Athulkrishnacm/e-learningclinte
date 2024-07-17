import React from 'react'

import NavBar from '../../components/User/NavBar/NavBar'
import CommunitySidebar from "../../components/User/Community/CommunitySidebar/CommunitySidebar";
import CommunityNavigation from "../../components/User/Community/CommunityNavigation/CommunityNavigation";
import Messenger from '../../components/User/Community/Messenger/Messenger';

function MessengerPage() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="flex h-screen">
        <div className="sticky top-0 self-start">
          <CommunitySidebar />
        </div>
        <Messenger/>
      </div>
      <CommunityNavigation />
    </React.Fragment>
  )
}

export default MessengerPage