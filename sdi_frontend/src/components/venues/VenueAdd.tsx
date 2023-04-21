import {Button, Card, CardActions, CardContent, IconButton, TextField,Autocomplete} from "@mui/material";
import { Container } from "@mui/system";
import {useCallback, useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { HostCity } from "../../models/HostCity";
import { BACKEND_API_URL } from "../../constants";
import axios from "axios";
import {Venue} from "../../models/Venue";
import { debounce } from "lodash";

export const VenueAdd = () => {
    const navigate = useNavigate();

    const [venue, setVenue] = useState<Venue>({
        venue_name: "",
        venue_adress: "",
        host_city_idd: 1,
        capacity: 1,
        rating: 1,
    });

    const [hostcities, setHostCities] = useState<HostCity[]>([]);
    const fetchSuggestions = async (query: string) => {
        try {
            const response = await axios.get<HostCity[]>(
                `${BACKEND_API_URL}/hostcity/autocomplete?query=${query}`
            );
            const data = await response.data;
            setHostCities(data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

    useEffect(() => {
        return () => {
            debouncedFetchSuggestions.cancel();
        };
    }, [debouncedFetchSuggestions]);

    const addVenue = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/venues/`, venue);
            navigate("/venues/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (event: any, value: any, reason: any) => {
        console.log("input", value, reason);

        if (reason === "input") {
            debouncedFetchSuggestions(value);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/venues/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addVenue}>
                        <TextField
                            id="venue_name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setVenue({ ...venue, venue_name: event.target.value })}
                        />
                        <TextField
                            id="venue_adress"
                            label="Adress"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setVenue({ ...venue, venue_adress: event.target.value })}
                        />


                        <Autocomplete
                            id="host_city_id"
                            options={hostcities}
                            getOptionLabel={(option) => `${option.host_city_name}`}
                            renderInput={(params) => <TextField {...params} label="HostCity" variant="outlined" />}
                            filterOptions={(x) => x}
                            onInputChange={handleInputChange}
                            onChange={(event, value) => {
                                if (value) {
                                    console.log(value);
                                    setVenue({ ...venue, host_city_idd: value.id });
                                }
                            }}
                        />

                        <TextField
                            id="capacity"
                            label="Capacity"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setVenue({ ...venue, capacity: parseInt(event.target.value) })}
                        />

                        <TextField
                            id="rating"
                            label="Rating"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setVenue({ ...venue, capacity: parseFloat(event.target.value) })}
                        />


                        <Button type="submit">Add Venue</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};