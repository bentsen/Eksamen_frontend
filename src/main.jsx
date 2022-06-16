import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App'
import './index.css'
import Login from "./Login/Login";
import Players from "./Players/Players";
import Matches from "./Matches/Matches";
import CreateMatch from "./Matches/CreateMatch";
import CreatePlayers from "./Players/CreatePlayers";
import Register from "./Login/Register";
import Logout from "./Login/logout";
import Location from "./Locations/Location";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
          <Route path ="/" element={<App/>}>
              <Route path="/players" element={<Players/>}/>
              <Route path="/matches" element={<Matches/>}/>
              <Route path="/createMatch" element={<CreateMatch/>}/>
              <Route path="/createPlayer" element={<CreatePlayers/>}/>
              <Route path="/locations" element={<Location/>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/logout" element={<Logout/>}/>
      </Routes>
  </BrowserRouter>
)
