import {Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import {HostCity} from "../../models/HostCity";
import {Venue} from "../../models/Venue";
export const VenueEdit = () => {
    const navigate = useNavigate();
    const { venueId } = useParams();
    const [loading, setLoading] = useState(false);

    const [venue, setVenue] = useState<Venue>({
        venue_name: "",
        venue_adress: "",
        host_city_idd: 1,
        capacity: 1,
        rating: 1,
    });

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/venue/`)
            .then((response) => response.json())
            .then((data) => {
                setVenue(data);
                setLoading(false);
            });
    }, []);

    const updateVenue = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/venue/${venueId}/`,venue );
            navigate("/venue/");
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
                    <form onSubmit={updateVenue}>
                        <TextField
                            id="venue_name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setVenue({ ...venue, venue_name: event.target.value })}
                        />
                        <TextField
                            id="venue_adress"
                            label="Adress"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setVenue({ ...venue, venue_adress: event.target.value })}
                        />


                        {/*<Autocomplete*/}
                        {/*    id="host_city_id"*/}
                        {/*    options={hostcities}*/}
                        {/*    getOptionLabel={(option) => `${option.host_city_name}`}*/}
                        {/*    renderInput={(params) => <TextField {...params} label="HostCity" variant="outlined" />}*/}
                        {/*    filterOptions={(x) => x}*/}
                        {/*    onInputChange={handleInputChange}*/}
                        {/*    onChange={(event, value) => {*/}
                        {/*        if (value) {*/}
                        {/*            console.log(value);*/}
                        {/*            setVenue({ ...venue, host_city_id: value.id });*/}
                        {/*        }*/}
                        {/*    }}*/}
                        {/*/>*/}

                        <TextField
                            id="host_city_name"
                            label="Host City"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setVenue({ ...venue,host_city_idd: parseInt(event.target.value) })}
                        />



                        <TextField
                            id="capacity"
                            label="Capacity"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setVenue({ ...venue, capacity: parseInt(event.target.value) })}
                        />

                        <TextField
                            id="rating"
                            label="Rating"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setVenue({ ...venue, capacity: parseFloat(event.target.value) })}
                        />


                        <Button type="submit">Update HostCity</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};