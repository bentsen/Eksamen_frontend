import React, { useState} from "react"
import facade from "../Login/LoginFacade";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [registerCredentials, setRegisterCredentials] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const performRegister = (evt) => {
        evt.preventDefault();
        facade.register(registerCredentials.username, registerCredentials.password)
            .then(res => navigate("/"))
    }

    const onChange = (evt) => {
        setRegisterCredentials({ ...registerCredentials,[evt.target.id]: evt.target.value })
    }


    return (
        <>
            <div className="overflow-hidden bg-neutral-800 text-center max-h-screen">
                <h1 className='mt-10 text-white text-4xl'>Register</h1>
                <div className="mt-16 flex justify-center h-screen">
                    <div className="bg-white dark:bg-zinc-800 border-zinc-700 border-2 rounded h-96 w-96">
                        <form className='rounded px-8 pt-6 pb-8' onChange={onChange}>
                            <div className="mt-5">
                                <label className='block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2' htmlFor="username">
                                    Username
                                </label>
                            </div>
                            <input className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight' type="text" id='username' placeholder='Username' />
                            <div className="mt-10">
                                <label className='block text-gray-700 dark:text-gray-100 text-sm font-bold mb-2' htmlFor="password">
                                    Password
                                </label>
                                <input className='appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight' type="text" id='password' placeholder='Password' />
                            </div>
                            <div className="mt-10 flex items-center justify-between">
                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='button' onClick={performRegister}>
                                    Sign up
                                </button>
                                <a className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800' href="/">
                                    Already have an account?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )


}
export default Register