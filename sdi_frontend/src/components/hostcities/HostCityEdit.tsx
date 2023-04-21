import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import {HostCity} from "../../models/HostCity";
export const HostCityEdit = () => {
    const navigate = useNavigate();
    const { hostCityId } = useParams();

    const [hostcity, setHostCity] = useState<HostCity>({
        host_city_name: "",
        host_city_population: 0,
        host_city_mayor: "",
        is_capital: false,
        quality_factor: 0,
        id: 0,
    });

    useEffect(() => {
        const fetchHostCity = async () => {
            const response = await fetch(`${BACKEND_API_URL}/hostcity/${hostCityId}/`);
            const hostcity = await response.json();
            setHostCity(hostcity);
        };
        fetchHostCity();
    }, [hostCityId]);

    const updateHostCity = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/hostcity/${hostCityId}/`,hostcity );
            navigate("/hostcity/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/venue/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={updateHostCity}>
                        <TextField
                            id="host_city_name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={hostcity.host_city_name}
                            onChange={(event) => setHostCity({ ...hostcity, host_city_name: event.target.value })}
                        />
                        <TextField
                            id="host_city_population"
                            label="Population"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={hostcity.host_city_population}
                            onChange={(event) => setHostCity({ ...hostcity, host_city_population: parseInt(event.target.value) })}
                        />
                        <TextField
                            id="host_city_mayor"
                            label="Mayor"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={hostcity.host_city_mayor}
                            onChange={(event) => setHostCity({ ...hostcity, host_city_mayor: event.target.value })}

                        />
                        <TextField
                            id="is_capital"
                            label="Capital Status"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={hostcity.is_capital}
                            onChange={(event) => setHostCity({ ...hostcity, is_capital: Boolean(event.target.value) })}
                        />
                        <TextField
                            id="quality_factor"
                            label="Quality Factor"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={hostcity.quality_factor}
                            onChange={(event) => setHostCity({ ...hostcity, quality_factor: parseInt(event.target.value)})}
                        />

                        <Button type="submit">Update HostCity</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};