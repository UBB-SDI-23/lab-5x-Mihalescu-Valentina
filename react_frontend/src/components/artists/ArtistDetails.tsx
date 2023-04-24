import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {Artist} from "../../models/Artist";

export const ArtistDetails = () => {
    const { artistId } = useParams();
    const [artist, setArtist] = useState<Artist>();

    useEffect(() => {
        axios.get(`${BACKEND_API_URL}/artist/${artistId}`)
            .then((response) => response.data)
            .then((data) => {setArtist(data);})
    },[artistId]);

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/artist`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <h1>Artist Details</h1>
                    <p>Artist name: {artist?.artist_name}</p>
                    <p>Artist age: {artist?.artist_age}</p>
                    <p>Description: {artist?.description}</p>
                    <p>Country: {artist?.country?.country_name}</p>

                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/artist/${artistId}/edit`}>
                        <EditIcon />
                    </IconButton>

                    <IconButton component={Link} sx={{ mr: 3 }} to={`/artist/${artistId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};
