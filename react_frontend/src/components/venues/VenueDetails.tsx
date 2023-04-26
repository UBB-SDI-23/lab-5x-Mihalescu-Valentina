import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {Venue} from "../../models/Venue";

export const VenueDetails = () => {
    const { venueId } = useParams();
    const [venue, setVenue] = useState<Venue>();

    useEffect(() => {
        axios.get(`${BACKEND_API_URL}/venue/${venueId}`)
            .then((response) => response.data)
            .then((data) => {setVenue(data);})
    },[venueId]);

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/venue/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <h1>Venue Details</h1>
                    <p>Venue Name: {venue?.venue_name}</p>
                    <p>Venue adress: {venue?.venue_adress}</p>
                    {/*<p>Host City name: {venue?.host_city_id?.host_city_name}</p>*/}
                    <p>VHost City name: {typeof venue?.host_city_id === 'object' ? venue?.host_city_id.host_city_name : ''}</p>
                    <p>Capacity: {venue?.capacity}</p>
                    <p>Rating: {venue?.rating}</p>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/venue/${venueId}/edit`}>
                        <EditIcon />
                    </IconButton>

                    <IconButton component={Link} sx={{ mr: 3 }} to={`/venue/${venueId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};