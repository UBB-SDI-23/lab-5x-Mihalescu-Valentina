import {
    Autocomplete,
    Button,
    Card,
    CardActions,
    CardContent,
    IconButton,
    TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { debounce } from "lodash";
import {Artist} from "../../models/Artist";
import {Venue} from "../../models/Venue";
import {Country} from "../../models/Country";


export const ArtistAdd = () => {
    const navigate = useNavigate();

    const [artist, setArtist] = useState<Artist>({
        artist_name: "",
        artist_age: 1,
        description: "",
        id:1,
    });

    const [countries, setCountries] = useState<Country[]>([]);

    const fetchSuggestions = async (query: string) => {
        try {
            const response = await axios.get<Country[]>(
                `${BACKEND_API_URL}/country/autocomplete?query=${query}`
            );
            const data = await response.data;
            setCountries(data);
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

    const handleInputChange = (event: any, value: any, reason: any) => {
        console.log("input", value, reason);

        if (reason === "input") {
            debouncedFetchSuggestions(value);
        }
    };

    const addArtist = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/artist/`, artist);
            navigate("/artist");
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/artist`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addArtist}>
                        <TextField
                            id="artist_name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setArtist({ ...artist, artist_name: event.target.value })}
                        />
                        <TextField
                            id="artist_age"
                            label="The age of the artist"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setArtist({ ...artist, artist_age: parseInt(event.target.value) })}
                        />

                        <TextField
                            id="description"
                            label="description"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setArtist({ ...artist, description: event.target.value })}
                        />

                        <Autocomplete
                            id="country"
                            options={countries}
                            getOptionLabel={(option) => `${option.country_name}`}
                            renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
                            filterOptions={(x) => x}
                            onInputChange={handleInputChange}
                            onChange={(event, value) => {
                                if (value) {
                                    console.log(value);
                                    setArtist({ ...artist, country: value.id });
                                }
                            }}
                        />




                        <Button type="submit">Add Artist</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};

