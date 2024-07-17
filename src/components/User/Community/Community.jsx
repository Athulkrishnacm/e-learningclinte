import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import GroupCard from "./GroupCard/GroupCard";
import Button from "../Button/Button";
import CreateGroupModal from "./CreateGroupModal/CreateGroupModal";
import {
  getAllGroups,
  getUserDetails,
  joinGroup,
} from "../../../Services/userApi";
import { useNavigate } from "react-router-dom";

function Community({ isTab }) {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [yourGroups, setYourGroups] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [joinedCommunity, setJoinedCommunity] = useState([]);
  const { authorized } = useSelector((state) => state.user);

  const handleJoin = (groupId) => {
    if(authorized){
      setIsJoined(!isJoined);
      joinGroup(groupId)
      .then(({ data }) => {
        toast.success(data.message);
        navigate('/messages', { state: { group:data.group } });
      })
      .catch((error) => {
        toast.error(error.message);
      });
    }else{
      navigate('/signin')
    }
  };
  const loadCommunityGroups = () => {};

  useEffect(() => {
    getUserDetails().then(({ data }) => {
      setYourGroups(data.user.groups);
    });
    getAllGroups().then(({ data }) => {
      setGroups(data.groups);
    });
  }, [isJoined, showModal]);

  return (
    <div
      className={`w-full ${
        isTab ? "px-2 py-0" : "border-x px-5 py-3 sm:px-8"
      } border-base-300 `}>
      {/* community user have joinde */}
      {user.id && joinedCommunity.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-xl font-bold sm:text-2xl">Your Community</h1>
            {user.email ? (
              <Button
                onClick={() => {
                  setShowModal(true);
                }}>
                <div
                  className="flex justify-center items-center"
                  data-te-toggle="modal"
                  data-te-target="#editCourse"
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  <BiPlus size={22} />{" "}
                  <span className="ml-4 hidden md:flex">Create New</span>
                </div>
              </Button>
            ) : null}
          </div>
          <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {joinedCommunity.map((community) => (
              <GroupCard
                key={community._id}
                community={community}
                joined={true}
              />
            ))}
          </div>
        </>
      ) : (
        ""
      )}

      {/* list of all community */}
      <div className="pb-16">
        <div className="flex justify-between items-center mt-10 mb-5">
          <h1 className="text-xl font-bold sm:text-2xl">Explore Community</h1>

          {authorized && (
            <Button
              onClick={() => {
                setShowModal(true);
              }}>
              <div
                className="flex justify-center items-center"
                data-te-toggle="modal"
                data-te-target="#editCourse"
                data-te-ripple-init
                data-te-ripple-color="light">
                <BiPlus size={22} />{" "}
                <span className="ml-4 hidden md:flex">Create New</span>
              </div>
            </Button>
          ) }
        </div>

        {groups.length > 0 ? (
          <div className="my-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <>
              {groups.map((group) => (
                <GroupCard
                  key={group._id}
                  joinedStatus={yourGroups.includes(group._id)}
                  group={group}
                  handleJoin={handleJoin}
                />
              ))}
            </>
          </div>
        ) : (
          <div className="mt-16 sm:mt-0 flex-col flex justify-center items-center ">
            <img
              className="max-w-[400px] lg:max-w-[600px] "
              src="assets/images/community-empty.gif"
              alt=""
            />
            <h1>No Community found</h1>
          </div>
        )}
      </div>
      {showModal ? (
        <CreateGroupModal
          modalStatus={setShowModal}
          loadCommunityGroups={loadCommunityGroups}
          community={groups}
        />
      ) : null}
    </div>
  );
}

export default Community;
