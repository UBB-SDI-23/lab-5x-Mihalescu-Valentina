import {
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


export const ArtistAdd = () => {
    const navigate = useNavigate();

    const [artist, setArtist] = useState<Artist>({
        artist_name: "",
        artist_age: 1,
        description: "",
        id:1,
    });


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

                        {/*TO DO: add autocomplete for the country name*/}




                        <Button type="submit">Add Country</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};

