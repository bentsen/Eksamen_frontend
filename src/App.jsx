import { Outlet, Link } from 'react-router-dom'
import './App.css'
import facade from "./Login/LoginFacade";

function App() {

  return (
   <>
       <div className="w-full bg-selection-color">
           <div className='bg-[url("./src/images/banner.png")] overflow-hidden h-screen w-full bg-cover bg-center text-center'>
               <div className="w-full flex justify-center">
                   <nav className="bg-navbar-color w-5/6 h-28 shadow-lg">
                       <div className="container mx-auto">
                           <div className="sm:flex justify-around">
                               <a className="text-gray-400 text-3xl font-bold p-3" href="">SPORT MANAGER</a>
                               <ul className="text-gray-400 sm:self-center text-x1 border-t sm:border-none">
                                   <li className="sm:inline-block">
                                       <Link className={"p-3 hover:text-white"} to={"/"}>Home</Link>
                                   </li>
                                   <li className="sm:inline-block">
                                       <Link className="p-3 hover:text-white" to="/matches" state={"https://studiebandit.com/sport/api/match/"}>Matches</Link>
                                   </li>
                                   <li className="sm:inline-block">
                                       <Link className="p-3 hover:text-white" to="/players">Players</Link>
                                   </li>
                                   <li className="sm:inline-block">
                                       <Link className="p-3 hover:text-white" to="/locations">Location</Link>
                                   </li>
                                   <li className="sm:inline-block">
                                       {!facade.loggedIn() ?(
                                           <Link className="p-3 hover:text-white" to="/login">Login</Link>
                                       ) : (<Link className="p-3 hover:text-white" to="/logout">{localStorage.getItem("username")}</Link>)}

                                   </li>
                               </ul>
                           </div>
                           <hr className="mt-4 bg-gray-400"/>
                       </div>
                   </nav>
               </div>
               <h2 className="text-3xl text-white mt-10">Welcome {localStorage.getItem("userType")}</h2>
           </div>
       </div>
       <div className="h-full bg-selection-color">
           <Outlet/>
       </div>
   </>
  )
}

export default App
