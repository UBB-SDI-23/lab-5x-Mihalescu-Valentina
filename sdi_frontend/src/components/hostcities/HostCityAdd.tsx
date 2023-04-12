import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { HostCity } from "../../models/HostCity";
import { BACKEND_API_URL } from "../../constants";
import axios from "axios";

export const HostCityAdd = () => {
    const navigate = useNavigate();

    const [hostcity, setHostCity] = useState<HostCity>({
        host_city_name: "",
        host_city_population: 0,
        host_city_mayor: "",
        is_capital: false,
        quality_factor: 0,
        id: 0,
    });

    const addHostCity = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {

            await axios.post(`${BACKEND_API_URL}/hostcity/`, hostcity);
            navigate("/hostcity/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <h1>Add HostCity</h1>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/hostcity/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addHostCity}>
                        <TextField
                            id="host_city_name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setHostCity({ ...hostcity, host_city_name: event.target.value })}
                        />
                        <TextField
                            id="host_city_population"
                            label="Population"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setHostCity({ ...hostcity, host_city_population: parseInt(event.target.value) })}
                        />
                        <TextField
                            id="host_city_mayor"
                            label="Mayor"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setHostCity({ ...hostcity, host_city_mayor: event.target.value })}

                        />
                        <TextField
                            id="is_capital"
                            label="Capital Status"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setHostCity({ ...hostcity, is_capital: Boolean(event.target.value) })}
                        />
                        <TextField
                            id="quality_factor"
                            label="Quality Factor"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setHostCity({ ...hostcity, quality_factor: parseInt(event.target.value)})}
                        />


                        <Button type="submit">Add HostCity</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};
