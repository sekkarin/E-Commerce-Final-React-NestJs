import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider';

import { useForm } from "react-hook-form"

const UpdateProfile = () => {
  const { updateUserProfile} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const from = location?.state?.from?.pathname || "/";
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
  } = useForm()
    const onSubmit = (data) => {
      const name = data.name
      const photoURL = data.photoURL
      updateUserProfile({name , photoURL}).then(() => {
        alert("Updated !")
        navigate(from , {replace:true})
      }).catch((error) => {
        console.log(error);
      });
    }
  return (
    <div className=' max-w-md bg-white shadow-w-full mx-auto flex-items-center justify-center my-40'>
            <form className="card-body flex flex-col justify-center text-center"onSubmit={handleSubmit(onSubmit)}>
                <h3 className="font-bold text-lg ">Update Your Profile</h3>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="name" className="input input-bordered" 
                       {...register("name")}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Upload Profile Photo</span>
                    </label>
                    <input type="text" placeholder="photoURL" className="input input-bordered" 
                         {...register("photoURL")}
                    />
                </div>
                <div className="form-control mt-6">
                    <input type='submit' value='Update' className="btn bg-red text-white" />
                </div>
                
             
            </form>
            
        </div>
  )
}

export default UpdateProfile