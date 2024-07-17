import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";

const GroupCard = ({ group,joinedStatus, handleJoin }) => {
  return (
    <div className="card cursor-pointer card-compact bg-base-100 shadow-lg">
      <Link to={joinedStatus ? "/messages" : ""} state={group}>
        <figure>
          <img
            src={group?.image}
            alt=""
            className="w-full aspect-[2/1] object-cover"
          />
        </figure>
      </Link>
      <div className="p-3">
        <div className="flex justify-between gap-2 items-center">
          <div className="flex items-start gap-3">
            <div className="  text-2xl">
              <img
                className="h-12 w-12 mask mask-circle object-cover rounded-full"
                src={group?.image}
                alt=""
              />
            </div>
            <div>
              <div
                className="cursor-pointer truncate text-base font-bold leading-6 hover:text-primary"
                data-tip={group?.name}>
                {group?.name}
              </div>
              <div className="text-xs text-gray-500">
                {group?.members.length} members
              </div>
            </div>
          </div>
            <div>
              {joinedStatus ? (
                ""
              ) : (
                <div className="mr-3 cursor-pointer">
                  <button
                    className="font-bold bg-gray-800 px-5 py-1 rounded-md text-white"
                    onClick={() =>handleJoin(group._id)}>
                    Join
                  </button>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
