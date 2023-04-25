import {Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {useCallback, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {BACKEND_API_URL} from "../../constants";
import { Artist } from "../../models/Artist";
import {Song} from "../../models/Song";
import {debounce} from "lodash";


export const SongEdit = () => {
    const navigate = useNavigate();
    const {songId} = useParams();
    const [loading, setLoading] = useState(false);

    const [song, setSong] = useState<Song>({
        id: 1,
        song_name: "",
        release_date:"",
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

    useEffect(() => {
        const fetchSong = async () => {
            const response = await fetch(`${BACKEND_API_URL}/song/${songId}/`);
            const song = await response.json();
            setSong(song);
        };
        fetchSong();
    }, [songId]);
    const updateSong = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/song/${songId}/`, song);
            navigate("/song/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/song/`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={updateSong}>
                        <TextField
                            id="song_name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            value={song.song_name}
                            onChange={(event) => setSong({...song, song_name: event.target.value})}
                        />
                        <TextField
                            id="release_date"
                            label="Release Date"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={song.release_date}
                            onChange={(event) => setSong({ ...song, release_date: event.target.value })}
                        />

                        <TextField
                            id="album_name"
                            label="Album name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={song.album_name}
                            onChange={(event) => setSong({ ...song, album_name: event.target.value })}
                        />
                        {/*<Autocomplete*/}
                        {/*    id="artist_id"*/}
                        {/*    options={artists}*/}
                        {/*    renderInput={(params) => <TextField {...params} label="Artist" variant="outlined"/>}*/}
                        {/*    getOptionLabel={(option) => `${option.artist_name}`}*/}
                        {/*    filterOptions={(x) => x}*/}
                        {/*    onInputChange={handleInputChange}*/}
                        {/*    onChange={(event, value) => {*/}
                        {/*        if (value) {*/}
                        {/*            console.log(value);*/}
                        {/*            setSong({...song, artist_id: value.id});*/}
                        {/*        }*/}
                        {/*    }}*/}
                        {/*/>*/}




                        <Button type="submit">Update Song</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};