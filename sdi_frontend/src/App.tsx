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
import {AllVenues} from "./components/venues/AllVenues";
import {VenueDetails} from "./components/venues/VenueDetails";
import {VenueDelete} from "./components/venues/VenueDelete";
import {VenueAdd} from "./components/venues/VenueAdd";
import {VenueEdit} from "./components/venues/VenueEdit";
import {CountryDetails} from "./components/countries/CountryDetails";
import {CountryDelete} from "./components/countries/CountryDelete";
import {CountryAdd} from "./components/countries/CountryAdd";
import {AllCountries} from "./components/countries/AllCountries";
import {CountryEdit} from "./components/countries/CountryEdit";
import {AllEditions} from "./components/editions/AllEditions";
import {EditionEdit} from "./components/editions/EditionEdit";
import {EditionDetails} from "./components/editions/EditionDetails";
import {EditionDelete} from "./components/editions/EditionDelete";
import {EditionAdd} from "./components/editions/EditionAdd";

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

                    <Route path="/venue" element={<AllVenues />} />
                    <Route path="/venue/:venueId/details" element={<VenueDetails />} />
                    <Route path="/venue/:venueId/edit" element={<VenueEdit />} />
                    <Route path="/venue/:venueId/delete" element={<VenueDelete />} />
                    <Route path="/venue/add" element={<VenueAdd />} />

                    <Route path="/country" element={<AllCountries />} />
                    <Route path="/country/:countryId/details" element={<CountryDetails />} />
                    <Route path="/country/:countryId/edit" element={<CountryEdit />} />
                    <Route path="/country/:countryId/delete" element={<CountryDelete />} />
                    <Route path="/country/add" element={<CountryAdd />} />

                    <Route path="/edition" element={<AllEditions />} />
                    <Route path="/edition/:editionId/details" element={<EditionDetails />} />
                    <Route path="/edition/:editionId/edit" element={<EditionEdit />} />
                    <Route path="/edition/:editionId/delete" element={<EditionDelete />} />
                    <Route path="/edition/add" element={<EditionAdd />} />




                </Routes>
            </Router>
        </React.Fragment>
    );
}

export default App;