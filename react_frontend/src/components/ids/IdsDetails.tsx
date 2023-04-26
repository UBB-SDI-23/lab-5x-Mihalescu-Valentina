import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {Ids} from "../../models/Ids";

export const IdsDetails = () => {
    const { idsId } = useParams();
    const [ids, setIds] = useState<Ids>();

    useEffect(() => {
        axios.get(`${BACKEND_API_URL}/idss/${idsId}`)
            .then((response) => response.data)
            .then((data) => {setIds(data);})
    },[idsId]);

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/idss`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <h1>Details</h1>
                    {/*<p>Edition year: {ids?.edition?.edition_year}</p>*/}
                    <p>Edition: {typeof ids?.edition === 'object' ? ids?.edition.edition_year : 1}</p>
                    {/*<p>Country name: {ids?.country?.country_name}</p>*/}
                    <p>Country: {typeof ids?.country === 'object' ? ids?.country.country_name : ''}</p>
                    <p>Place: {ids?.place}</p>
                    <p>Points: {ids?.points}</p>

                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/idss/${idsId}/edit`}>
                        <EditIcon />
                    </IconButton>

                    <IconButton component={Link} sx={{ mr: 3 }} to={`/idss/${idsId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};
