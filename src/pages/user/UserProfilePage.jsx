import React,{useEffect, useState} from 'react'
import NavBar from '../../components/User/NavBar/NavBar'
import Footer from '../../components/User/Footer/Footer'
import UserProfile from '../../components/User/Profile/UserProfile'
import Settings from '../../components/User/Profile/ChangePass';
import { getUserDetails } from '../../Services/userApi';

function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user,setUser] = useState(null)
    //tab items
    const loadTab = () => {
      switch (activeTab) {
        case "profile":
          return <UserProfile />;
        case 'settings':
          return <Settings />;
        default:
          return null;
      }
    };
  useEffect(()=>{
    getUserDetails().then(({ data }) => {
      setUser(data.user)
    })
  },[])
  return (
    <>
      <NavBar/>
      <div className="bg-gray-100 lg:px-24 mt-5">
        <div className=' p-5  mx-auto'>
          <ul className=" text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow flex ">
            <li className="w-full cursor-pointer">
              <a onClick={() => { setActiveTab('profile') }} className={activeTab == 'profile' ? "inline-block w-full p-4 text-gray-900 bg-[#CED1E1] rounded-md" : "bg-white inline-block w-full p-4 text-gray-900 rounded-l-lg "} aria-current="page">Profile</a>
            </li>
            {!user?.loginWithGoogle &&
            <li className="w-full hover:cursor-pointer rounded-lg">
              <p onClick={() => { setActiveTab('settings') }} className={activeTab == 'settings' ? " inline-block w-full p-4 text-gray-900 bg-[#CED1E1]  rounded-md" : "mx-5 bg-white inline-block w-full p-4 text-gray-900 rounded-r-lg "} >Settings</p>
            </li>}
          </ul>
        </div>
        <div className=" mx-auto my-5 p-5">
          {loadTab()}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default UserProfilePage
