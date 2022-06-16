import {motion} from "framer-motion"
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import facade from "./LoginFacade";

const login = () => {
    const [style, setStyle] = useState("cont");
    const navigate = useNavigate();
    const init = {username: "", password: ""};
    const [loginCredentials, setLoginCredentials] = useState(init);

    const performLogin = (evt) => {
        evt.preventDefault();
        facade.login(loginCredentials.username,loginCredentials.password)
            .then(res => navigate("/"))
            .catch(res => setStyle("cont2"))
    }

    const onChange = (evt) => {
        setLoginCredentials({ ...loginCredentials,[evt.target.id]: evt.target.value })
    }

    return (
        <>
            <div className="overflow-hidden bg-neutral-800 text-center max-h-screen">
                <div className="mt-16 flex justify-center h-screen">
                    <div className="bg-white text-left dark:bg-zinc-800 border-zinc-700 border-2 rounded h-3/5 w-1/3">
                        <div className="text-center mt-10">
                            <h1 className="text-white text-2xl">welcome back!</h1>
                            <p className="text-gray-500">we're so excited to see you again!</p>
                        </div>
                        <form className='rounded px-8 pt-6 pb-8' onChange={onChange}>
                            <div className="">
                                <label className='block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2' htmlFor="username">
                                    Username
                                </label>
                            </div>
                            <input id="username" className={`${style} appearance-none border-black border rounded w-full bg-zinc-900 py-2 px-3 text-white leading-tight`} type="text"/>
                            <div className="mt-10">
                                <label className='block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2' htmlFor="password">
                                    Password
                                </label>
                                <input className={`${style} appearance-none border-black border bg-zinc-900 rounded w-full py-2 px-3 text-white mb-3 leading-tight`} type="text" id='password'/>
                            </div>
                            <div className="mt-2  items-center">
                                <motion.button className='bg-indigo-400 hover:bg-indigo-500 text-white font-bold rounded h-10 w-full' type='button' onClick={performLogin}>
                                    Sign In
                                </motion.button>
                                <div className="mt-1">
                                    <a className='font-bold text-xs text-indigo-300 hover:text-blue-800' href="/register">
                                        Forgot your password?
                                    </a>
                                    <br />
                                    <Link className='font-bold text-xs text-indigo-300 hover:text-blue-800' to="/register">Register an account</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default login