import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {Song} from "../../models/Song";

export const SongDetails = () => {
    const { songId } = useParams();
    const [song, setSong] = useState<Song>();

    useEffect(() => {
        axios.get(`${BACKEND_API_URL}/song/${songId}`)
            .then((response) => response.data)
            .then((data) => {setSong(data);})
    },[songId]);

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/song`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <h1>Song Details</h1>
                    <p>Song name: {song?.song_name}</p>
                    <p>Release date: {song?.release_date}</p>
                    <p>Album name: {song?.album_name}</p>
                    <p>The name of the artist: {song?.artist_id?.artist_name}</p>

                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/song/${songId}/edit`}>
                        <EditIcon />
                    </IconButton>

                    <IconButton component={Link} sx={{ mr: 3 }} to={`/song/${songId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};
