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
import {Song} from "../../models/Song";
import {Venue} from "../../models/Venue";
import {Artist} from "../../models/Artist";


export const SongAdd = () => {
    const navigate = useNavigate();

    const [song, setSong] = useState<Song>({
        id: 1,
        song_name: "",
        release_date:"",
        album_name: "",
    });

    const [localError, setLocalError] = useState({
        album_name: "",
    });

    const [artists, setArtists] = useState<Artist[]>([]);

    const fetchSuggestions = async (query: string) => {
        try {
            const response = await axios.get<Artist[]>(
                `${BACKEND_API_URL}/artist/autocomplete?query=${query}`
            );
            const data = await response.data;
            setArtists(data);
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

    const addSong = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/song/`, song);
            navigate("/song");
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/song`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addSong}>
                        <TextField
                            id="song_name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setSong({ ...song, song_name: event.target.value })}
                        />
                        <TextField
                            id="release_date"
                            label="The date of the relase"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setSong({ ...song, release_date: event.target.value })}
                        />

                        <TextField
                            id="album_name"
                            label="Album name"
                            variant="outlined"
                            fullWidth
                            error={localError.album_name ? true : false}
                            helperText={localError.album_name}
                            sx={{ mb: 2 }}
                            onChange={(event) => {
                                if (
                                    !event.target.value.includes("Album")
                                ) {
                                    setLocalError({
                                        ...localError,
                                        album_name: "The album name must contain the word Album",
                                    });
                                }
                                else {
                                    setLocalError({
                                        ...localError,
                                        album_name: "",
                                    });}
                                setSong({ ...song, album_name: event.target.value })}}
                        />

                        <Autocomplete
                            id="artist_id"
                            options={artists}
                            renderInput={(params) => <TextField {...params} label="Artist" variant="outlined"/>}
                            getOptionLabel={(option) => `${option.artist_name}`}
                            filterOptions={(x) => x}
                            onInputChange={handleInputChange}
                            onChange={(event, value) => {
                                if (value) {
                                    console.log(value);
                                    setSong({...song, artist_id: value.id});
                                }
                            }}
                        />




                        <Button type="submit">Add Song</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};

