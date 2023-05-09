import * as React from "react";
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
import {ArtistDetails} from "./components/artists/ArtistDetails";
import {AllArtists} from "./components/artists/AllArtists";
import {ArtistEdit} from "./components/artists/ArtistEdit";
import {ArtistDelete} from "./components/artists/ArtistDelete";
import {ArtistAdd} from "./components/artists/ArtistAdd";
import {AllSongs} from "./components/songs/AllSongs";
import {SongDetails} from "./components/songs/SongDetails";
import {SongDelete} from "./components/songs/SongDelete";
import {SongAdd} from "./components/songs/SongAdd";
import {SongEdit} from "./components/songs/SongEdit";
import {AllIds} from "./components/ids/AllIds";
import {IdsDetails} from "./components/ids/IdsDetails";
import {IdsEdit} from "./components/ids/IdsEdit";
import {IdsDelete} from "./components/ids/IdsDelete";
import {IdsAdd} from "./components/ids/IdsAdd";
import {AllEditionsStatistics} from "./components/editions/AllEditionsStatistics";
import {CssBaseline} from "@mui/material";

function App() {
    return (
        <React.Fragment>
            <CssBaseline/>
            <Router>
                <AppMenu />

                <Routes>
                    <Route path="/" element={<AppHome />} />
                    <Route path="/hostcity" element={<AllHostCities />} />
                    <Route path="/hostcity/:hostCityId/details" element={<HostCityDetails />} />
                    <Route path="/hostcity/:hostCityId/edit" element={<HostCityEdit />} />
                    <Route path="/hostcity/:hostCityId/delete" element={<HostCityDelete />} />
                    <Route path="/hostcity/add" element={<HostCityAdd />} />
                    <Route path="/filter" element={<HostCityFilter />} />

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
                    {/*<Route path="/edition/add" element={<AllEditionsStatistics />} />*/}
                    <Route path="/edition/:editionId/details" element={<EditionDetails />} />
                    <Route path="/edition/:editionId/edit" element={<EditionEdit />} />
                    <Route path="/edition/:editionId/delete" element={<EditionDelete />} />
                    <Route path="/edition/add" element={<EditionAdd />} />


                    <Route path="/artist" element={<AllArtists />} />
                    <Route path="/artist/:artistId/details" element={<ArtistDetails />} />
                    <Route path="/artist/:artistId/edit" element={<ArtistEdit />} />
                    <Route path="/artist/:artistId/delete" element={<ArtistDelete />} />
                    <Route path="/artist/add" element={<ArtistAdd />} />

                    <Route path="/song" element={<AllSongs />} />
                    <Route path="/song/:songId/details" element={<SongDetails />} />
                    <Route path="/song/:songId/edit" element={<SongEdit />} />
                    <Route path="/song/:songId/delete" element={<SongDelete />} />
                    <Route path="/song/add" element={<SongAdd />} />

                    {/*<Route path="/idss" element={<AllIds />} />*/}
                    {/*<Route path="/idss/:idsId/details" element={<IdsDetails />} />*/}
                    {/*<Route path="/idss/:idsId/edit" element={<IdsEdit />} />*/}
                    {/*<Route path="/idss/:idsId/delete" element={<IdsDelete />} />*/}
                    {/*<Route path="/ids/add" element={<IdsAdd />} />*/}




                </Routes>
            </Router>
        </React.Fragment>
    );
}

export default App;