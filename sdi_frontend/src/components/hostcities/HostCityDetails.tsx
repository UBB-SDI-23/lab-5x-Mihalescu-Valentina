import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {HostCity} from "../../models/HostCity";

export const HostCityDetails = () => {
    const { hostCityId } = useParams();
    const [hostcity, setHostCity] = useState<HostCity>();

    useEffect(() => {
        const fetchHostCity = async () => {
            // TODO: use axios instead of fetch
            // TODO: handle errors
            // TODO: handle loading state
            const response = await fetch(`${BACKEND_API_URL}/hostcity/${hostCityId}`);
            const hostcity = await response.json();
            setHostCity(hostcity);
        };
        fetchHostCity();
    }, [hostCityId]);

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/hostcity`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <h1>HostCity Details</h1>
                    <p>HostCity Name: {hostcity?.host_city_name}</p>
                    <p>Host City Population: {hostcity?.host_city_population}</p>
                    <p>HostCity Mayor: {hostcity?.host_city_mayor}</p>
                    {/*<p>HostCity Capital Status: {hostcity?.is_capital}</p>*/}
                    <p>HostCity QualityFactor: {hostcity?.quality_factor}</p>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/hostcity/${hostCityId}/edit`}>
                        <EditIcon />
                    </IconButton>

                    <IconButton component={Link} sx={{ mr: 3 }} to={`/hostcity/${hostCityId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};