import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {Edition} from "../../models/Edition";

export const EditionDetails = () => {
    const { editionId } = useParams();
    const [edition, setEdition] = useState<Edition>();

    useEffect(() => {
        axios.get(`${BACKEND_API_URL}/edition/${editionId}`)
            .then((response) => response.data)
            .then((data) => {setEdition(data);})
    },[editionId]);

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/edition`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <h1>Edition Details</h1>
                    <p>Edition year: {edition?.edition_year}</p>
                    <p>The date of the final: {edition?.final_date.toDateString()}</p>
                    <p>Motto: {edition?.motto}</p>
                    <p>Venue: {edition?.venue_id?.venue_name}</p>
                    <p>The countries that participated in the edition:</p>
                    <ul>
                        {edition?.countries?.map((country) => (
                            <li key={country.id}>{country.country_name}</li>
                        ))}
                    </ul>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/edition/${editionId}/edit`}>
                        <EditIcon />
                    </IconButton>

                    <IconButton component={Link} sx={{ mr: 3 }} to={`/edition/${editionId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};
