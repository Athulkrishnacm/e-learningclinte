import * as Yup from "yup";
import { MdOutlineDashboard, MdPayment, MdOndemandVideo } from "react-icons/md";
import { FaUserGraduate, FaUsers } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { RiCoupon2Line, } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineExplore, MdOutlineMessage } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { v4 as uuidv4 } from 'uuid'
export const initialValues = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

export const validationSchema = Yup.object({
  name: Yup.string().matches(/^[a-zA-Z ]*$/, 'Name must be a letter').min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number is not valid")
    .required("Please enter your phone"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const loginInitialValues = {
  email: "",
  password: "",
};

export const loginValidationSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const tutorInitialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  about: "",
  otp: "",
};

export const tutorValidationSchema = Yup.object({
  name: Yup.string().matches(/^[a-zA-Z ]*$/, 'Name must be a letter').min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number is not valid")
    .required("Please enter your phone"),
  password: Yup.string().min(6).required("Please enter your password"),
  about: Yup.string().min(10).max(500).required("Please fill your details"),
});

export const userProfileValidation = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z][a-zA-Z ]*$/, "Name must be a letter")
    .min(2, "Name must have at least 2 characters")
    .max(15, "Name can have a maximum of 15 characters")
    .required("Please enter your name"),
  lastName: Yup.string()
    .matches(/^[a-zA-Z][a-zA-Z ]*$/, "Lastname must be a letter")
    .min(1, "Last name must have at least 1 character")
    .max(15, "Last name can have a maximum of 15 characters")
    .required("Please enter your last name"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
});


export const changePassInitialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
}

export const ChangePassValidation = Yup.object({
  oldPassword: Yup.string().min(6).required("Please enter your old password"),
  newPassword: Yup.string().min(6).required("Please enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const courseInitialValues = {
  name: "",
  about: "",
  duration: "",
  language: "",
  price: "",
  category: "",
  description: "",
};

export const courseValidationSchema = Yup.object({
  name: Yup.string().min(4).max(40).required("Please enter Course name"),
  about: Yup.string().min(5).max(500).required("enter short description"),
  duration: Yup.string().required("Please enter course duration"),
  language: Yup.string().required("Please enter course language"),
  price: Yup.number().required("Please enter course price").positive("Price must be a greater than zero"),
  description: Yup.string().required("Write description about the course"),
});

export const menus = [
  { name: "Dashboard", link: "/admin/dashboard", icon: MdOutlineDashboard },
  { name: "Users", link: "/admin/users", icon: FaUsers },
  { name: "Tutors", link: "/admin/tutors", icon: FaUserGraduate },
  { name: "Courses", link: "/admin/courses", icon: MdOndemandVideo },
  { name: "Coupons", link: "/admin/coupons", icon: RiCoupon2Line },
  { name: "Transctions", link: "/admin/transctions", icon: MdPayment },
  { name: "Logout", link: "/admin/", icon: BiLogOut },
];

export const handleImage = (e) => {
  const file = e.target.files[0];
  if (imageValidation(file)) {
    return file
  }
};

export const imageValidation = (file) => {
  const supportedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  const maxSizeInBytes = 5 * 1024 * 1024;
  if (!supportedFormats.includes(file.type)) {
    toast.error("Please Choose a image file");
    return false;
  }
  if (file.size > maxSizeInBytes) {
    toast.error("The image size exceeds the maximum allowed limit of 5MB.");
    return false;
  }
  return true;
};

export const videoValidation = (e) => {
  const file = e.target.files[0];
  const supportedFormats = ["video/mp4", "video/mpeg", "video/ogg", "video/webm", "video/mkv"];
  const maxSizeInBytes = 10 * 1024 * 1024; // Maximum size of 10MB

  if (!supportedFormats.includes(file.type)) {
    toast.error("Please choose a video file.");
    return false;
  }

  if (file.size > maxSizeInBytes) {
    toast.error("The video size exceeds the maximum allowed limit of 10MB.");
    return false;
  }

  return file;
};


const generateUniqueFileName = () => {
  const timestamp = Date.now();
  const randomString = uuidv4().substring(0, 8); // Generate a random string using uuidv4 library
  return `voice-file-${timestamp}-${randomString}`;
};
export const imageUpload = async (path, image) => {
  try {
    if (!image.name) {
      image.name = generateUniqueFileName()
    }
    const storageRef = ref(storage, path + image.name);
    const snapshot = await uploadBytes(storageRef, image)
    return getDownloadURL(snapshot.ref);
  } catch (error) {
    console.log(error);
  }
};

export const tutorProfileInitialValues = {
  name: "",
  email: "",
  about: "",
};

export const tutorProfileValidation = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "Name must be a letter").min(2).max(15).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  about: Yup.string().min(10).max(500).required("Please enter your details"),
});

export const tutorMenus = [
  { name: "Dashboard", link: "/tutor/dashboard", icon: MdOutlineDashboard },
  { name: "Courses", link: "/tutor/course", icon: MdOndemandVideo },
  // { name: "Messages", link: "/tutor/message", icon: AiOutlineMessage },
  { name: "Account", link: "/tutor/profile", icon: CgProfile },
  { name: "Logout", link: "/", icon: BiLogOut },
];

export const userNavBar = [
  { name: "Home", href: "/", current: false },
  { name: "Course", href: "/course", current: false },
  { name: "Community", href: "/community", current: false },
  // { name: "News", href: "/news", current: false },
];

export const CommunitySidebarLink = [
  {
    label: "Home",
    icon: BiHomeAlt,
    to: "/community",
  },
  {
    label: "Explore groups",
    icon: MdOutlineExplore,
    to: "/groups",
  },
  {
    label: "Messages",
    icon: MdOutlineMessage,
    to: "/messages",
  },

];
