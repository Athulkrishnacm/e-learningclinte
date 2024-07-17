import React from "react";
import NavBar from "../../components/User/NavBar/NavBar";
import CommunitySidebar from "../../components/User/Community/CommunitySidebar/CommunitySidebar";
import Community from "../../components/User/Community/Community";
import CommunityNavigation from "../../components/User/Community/CommunityNavigation/CommunityNavigation";

function CommunityPage() {
  return (
    <>
    <NavBar />
    <div className="flex h-screen ">
      <div className="sticky top-0 self-start">
        <CommunitySidebar />
      </div>
      <Community />
    </div>
    <CommunityNavigation />
  </>
  );
}

export default CommunityPage;
