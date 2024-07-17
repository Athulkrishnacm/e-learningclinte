import React from 'react'
import { useFormik } from "formik";
import { changePassInitialValues,ChangePassValidation } from '../../../constants/constant'; 
import { toast } from 'react-hot-toast';
import { updateUserDetails } from '../../../Services/userApi';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

function Settings() {
const navigate = useNavigate()
  const formik = useFormik({
    initialValues:changePassInitialValues,
    validationSchema:ChangePassValidation,
    onSubmit: async (values) => {
      toast.loading("Updating ...");
      await updateUserDetails(values).then(({ data }) => {
        toast.dismiss();
        toast.success(data.message);
        navigate('/profile')
      }).catch(({response})=>{
        toast.dismiss();
        toast.error(response.data.message);
      })
    },
  });

  return (
    <div>
      <div className="text-gray-500 font-bold">
        <div className="container text-gray-500 mx-auto max-w-6xl ">
          <form onSubmit={formik.handleSubmit} >
            <div className="w-full shadow-lg bg-white rounded-lg mx-auto flex overflow-hidden rounded-b-none">
              <div className="w-1/3 bg-white border-r p-8 hidden md:inline-block">
                <h2 className="font-medium text-md text-gray-700 mb-4 tracking-wide">Note</h2>
                <p className="text-xs text-gray-500">We take the security of your account very seriously, and we would like to remind you of the importance of using a strong and unique password. Please make sure that your new password meets the following requirements:</p>
                <ul className='my-4'>
                  <li className='text-xs'> Contains at least 6 characters</li>
                  <li className='text-xs'>Includes both uppercase and lowercase letters</li>
                  <li className='text-xs'>Contains at least one number or special character</li>
                </ul>
                <p className='text-xs text-gray-500'> To change your password, please log in to your account and follow the instructions on the "Change Password" page. If you have any questions or concerns, please do not hesitate to contact our support team.</p>
              </div>
              <div className="md:w-2/3 w-full">
                <div className="py-8 px-16">
                  <label htmlFor="name" className="text-sm text-gray-600">Current Password</label>
                  <input onChange={formik.handleChange}
                    value={formik.values.oldPassword}
                    onBlur={formik.handleBlur} className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" type="text"  name="oldPassword" />
                    {formik.touched.oldPassword && formik.errors.oldPassword ? (
                    <p className="text-red-500 mt-1">
                      {formik.errors.oldPassword}
                    </p>
                  ) : null}
                </div>
                <div className="py-8 px-16">
                  <label htmlFor="email" className="text-sm text-gray-600">New Password</label>
                  <input  onChange={formik.handleChange}
                    value={formik.values.newPassword}
                    onBlur={formik.handleBlur} className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" type="text" name="newPassword"  placeholder='New Password'/>
                   
                     {formik.touched.newPassword && formik.errors.newPassword ? (
                    <p className="text-red-500 mt-1">
                      {formik.errors.newPassword}
                    </p>
                  ) : null}
                </div>
                <div className="py-8 px-16">
                  <label htmlFor="email" className="text-sm text-gray-600">Confirm Password</label>
                  <input  onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur} className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" type="text" name="confirmPassword" placeholder='Retype new password'  />
                   
                     {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <p className="text-red-500 mt-1">
                      {formik.errors.confirmPassword}
                    </p>
                  ) : null}
                </div>
                
              </div>
            </div>
            <div className="p-16 py-8 bg-white clearfix rounded-b-lg border-t flex justify-end border-gray-200">
            <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Settings