import {Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {BACKEND_API_URL} from "../../constants";
import { Artist } from "../../models/Artist";


export const ArtistEdit = () => {
    const navigate = useNavigate();
    const {artistId} = useParams();
    const [loading, setLoading] = useState(false);

    const [artist, setArtist] = useState<Artist>({
        artist_name: "",
        artist_age: 1,
        description: "",
        id:1,
    });

    useEffect(() => {
        const fetchEdition = async () => {
            const response = await fetch(`${BACKEND_API_URL}/artist/${artistId}/`);
            const artist = await response.json();
            setArtist(artist);
        };
        fetchEdition();
    }, [artistId]);
    const updateArtist = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/artist/${artistId}/`, artist);
            navigate("/artist/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/artist/`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={updateArtist}>
                        <TextField
                            id="artist_name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            value={artist.artist_name}
                            onChange={(event) => setArtist({...artist, artist_name: event.target.value})}
                        />
                        <TextField
                            id="artist_age"
                            label="Age"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={artist.artist_age}
                            onChange={(event) => setArtist({ ...artist, artist_age: parseInt(event.target.value) })}
                        />

                        <TextField
                            id="description"
                            label="description"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={artist.description}
                            onChange={(event) => setArtist({ ...artist, description: event.target.value })}
                        />


                        <Button type="submit">Update Artist</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};