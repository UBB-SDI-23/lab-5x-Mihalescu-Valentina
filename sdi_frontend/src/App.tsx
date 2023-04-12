// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
//
// function App() {
//   const [count, setCount] = useState(0)
//
//   return (
//     <div className="App">
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   )
// }
//
// export default App


import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHome } from "./components/AppHome";
import { AppMenu } from "./components/AppMenu";
import { HostCityAdd } from "./components/hostcities/HostCityAdd";
import {AllHostCities} from "./components/hostcities/AllHostCities";
import {HostCityDetails} from "./components/hostcities/HostCityDetails";
import {HostCityDelete} from "./components/hostcities/HostCityDelete";
import {HostCityEdit} from "./components/hostcities/HostCityEdit";
import {HostCityFilter} from './components/hostcities/HostCityFilter';

function App() {
    return (
        <React.Fragment>
            <Router>
                <AppMenu />

                <Routes>
                    <Route path="/" element={<AppHome />} />
                    <Route path="/hostcity" element={<AllHostCities />} />
                    <Route path="/hostcity/:hostCityId/details" element={<HostCityDetails />} />
                    <Route path="/hostcity/:hostCityId/edit" element={<HostCityEdit />} />
                    <Route path="/hostcity/:hostCityId/delete" element={<HostCityDelete />} />
                    <Route path="/hostcity/add" element={<HostCityAdd />} />
                    <Route path="/hostcity/filter" element={<HostCityFilter />} />
                </Routes>
            </Router>
        </React.Fragment>
    );
}

export default App;