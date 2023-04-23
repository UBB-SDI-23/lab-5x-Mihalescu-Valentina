import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Country} from "../../models/Country";
import axios from "axios";

export const CountryDetails = () => {
    const { countryId } = useParams();
    const [country, setCountry] = useState<Country>();

    useEffect(() => {
        axios.get(`${BACKEND_API_URL}/country/${countryId}`)
            .then((response) => response.data)
            .then((data) => {setCountry(data);})
    },[countryId]);

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/country`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <h1>Country Details</h1>
                    <p>Country Name: {country?.country_name}</p>
                    <p>Year of entrance: {country?.year_of_entrance}</p>
                    <p>Capital: {country?.country_capital}</p>
                    <p>Quality Factor: {country?.quality_factor}</p>
                    <p>The editions in which the country participated:</p>
                    <ul>
                        {country?.editions?.map((edition) => (
                            <li key={edition.id}>{edition.edition_year}</li>
                        ))}
                    </ul>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/country/${countryId}/edit`}>
                        <EditIcon />
                    </IconButton>

                    <IconButton component={Link} sx={{ mr: 3 }} to={`/country/${countryId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};
