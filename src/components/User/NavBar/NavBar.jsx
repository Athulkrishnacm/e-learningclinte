import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import defaultDp from "/assets/tutor/default-dp.png";
import { useDispatch, useSelector } from "react-redux";
import { userAuthorized, userUnauthorized } from "../../../Redux/app/userSlice";
import { toast } from "react-hot-toast";
import { userAuth } from "../../../Services/userApi";
import { userNavBar } from "../../../constants/constant";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const location = useLocation()
  const currentPath = location.pathname;

  useEffect(() => {
    userAuth()
      .then(({ data }) => {
        if (data.status) {
          dispatch(userAuthorized({ id: data.userId }));
          setImage(data.user.image);
        } else {
          toast.error(data.message);
        }
      })
      .catch(({ response }) => {
        localStorage.removeItem("token");
      });
  }, []);
  const handleSignOut = () => {
    dispatch(userUnauthorized());
    localStorage.removeItem("token");
    toast.error("Sign out");
  };

  const userSubMenu = [
    {
      to: "/profile",
      label: "My Profile",
    },
    {
      to: "/my-courses",
      label: "My Enrollments",
    },
    {
      to: "/purchase-history",
      label: "Purchase History",
    },
    {
      to: "/",
      onClick: handleSignOut,
      label: "Sign out",
    },
  ];

  const updatedNavigation = userNavBar.map((item) => {
    if (item.href === currentPath) {
      return { ...item, current: true };
    } else {
      return item;
    }
  });
  const { authorized } = useSelector((state) => state.user);
  return (
    <>
      <Disclosure as="nav" className="sticky top-0 z-50 bg-white border-2">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
              <div className="relative flex h-20 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 ring-black ring-1 text-black hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  {/* <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div> */}
                  <div className="hidden sm:ml-20 sm:block">
                    <div className="flex space-x-6">
                      {updatedNavigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current ? "border-b-2 border-gray-800 " : "text-black ",
                            " px-1 pt-2 text-lg font-medium font-[Poppins] "
                          )}
                          aria-current={item.current ? "page" : undefined}>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  {authorized ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full  ring-black ring-1  text-sm focus:outline-none focus:ring-1 focus:ring-white  ring-offset-1 focus:ring-offset-1 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-10 w-10 rounded-full "
                            src={image || defaultDp}
                            alt="ua"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-4 ring-black ring-opacity-5 focus:outline-none">
                          {userSubMenu.map((item, index) => (
                            <Menu.Item key={index}>
                              {({ active }) => (
                                <Link
                                  to={item.to}
                                  onClick={item.onClick}
                                  className={classNames(
                                    active ? "bg-gray-300" : "",
                                    "block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer"
                                  )}>
                                  {item.label}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <Link to="/signin">
                      <button className="bg-[#7196d7] text-sm text-white px-4 py-2 rounded-full hover:bg-[#87acec]">
                        Sign In
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {updatedNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "border-b-2 border-gray-800 "
                        : "text-black",
                      "block px-3 py-2 text-base font-medium hover:bg-gray-300"
                    )}
                    aria-current={item.current ? "page" : undefined}>
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
