
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
import {Country} from "../../models/Country";

export const CountryAdd = () => {
    const navigate = useNavigate();

    const [country, setCountry] = useState<Country>({
        country_name: "",
        year_of_entrance: 1,
        country_capital: " ",
        quality_factor: 1,
    });


    const addCountry = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/country/`, country);
            navigate("/country");
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/country`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addCountry}>
                        <TextField
                            id="country_name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setCountry({ ...country, country_name: event.target.value })}
                        />
                        <TextField
                            id="year_of_entrance"
                            label="Year of entrance"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setCountry({ ...country, year_of_entrance: parseInt(event.target.value) })}
                        />

                        <TextField
                            id="country_capital"
                            label="Capital"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setCountry({ ...country, country_capital: event.target.value })}
                        />


                        <TextField
                            id="quality_factor"
                            label="Quality Factor"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setCountry({ ...country, quality_factor: parseInt(event.target.value) })}
                        />




                        <Button type="submit">Add Country</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};

