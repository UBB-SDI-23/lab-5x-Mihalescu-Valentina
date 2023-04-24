import {Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {BACKEND_API_URL} from "../../constants";
import {HostCity} from "../../models/HostCity";
import {Venue} from "../../models/Venue";
import {Country} from "../../models/Country";

export const CountryEdit = () => {
    const navigate = useNavigate();
    const {countryId} = useParams();
    const [loading, setLoading] = useState(false);

    const [country, setCountry] = useState<Country>({
        country_name: "",
        year_of_entrance: 1,
        country_capital: " ",
        quality_factor: 1,
    });

    useEffect(() => {
        const fetchCountry = async () => {
            const response = await fetch(`${BACKEND_API_URL}/country/${countryId}/`);
            const country = await response.json();
            setCountry(country);
        };
        fetchCountry();
    }, [countryId]);
    const updateCountry = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/country/${countryId}/`, country);
            navigate("/country/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/country/`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={updateCountry}>
                        <TextField
                            id="country_name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            value={country.country_name}
                            onChange={(event) => setCountry({...country, country_name: event.target.value})}
                        />
                        <TextField
                            id="year_of_entrance"
                            label="Year of entrance"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            value={country.year_of_entrance}
                            onChange={(event) => setCountry({
                                ...country,
                                year_of_entrance: parseInt(event.target.value)
                            })}
                        />

                        <TextField
                            id="country_capital"
                            label="Capital"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            value={country.country_capital}
                            onChange={(event) => setCountry({...country, country_capital: event.target.value})}
                        />


                        <TextField
                            id="quality_factor"
                            label="Quality Factor"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            value={country.quality_factor}
                            onChange={(event) => setCountry({...country, quality_factor: parseInt(event.target.value)})}
                        />


                        <Button type="submit">Update Country</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};