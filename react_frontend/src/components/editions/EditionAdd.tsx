import {
    Autocomplete,
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
import {Edition} from "../../models/Edition";
import {Venue} from "../../models/Venue";


export const EditionAdd = () => {
    const navigate = useNavigate();

    const [edition, setEdition] = useState<Edition>({
        edition_year: 1,
        final_date: new Date(),
        motto: " ",
        id: 1,
    });



    const [venues, setVenues] = useState<Venue[]>([]);

    const fetchSuggestions = async (query: string) => {
        try {
            const response = await axios.get<Venue[]>(
                `${BACKEND_API_URL}/venue/autocomplete?query=${query}`
            );
            const data = await response.data;
            setVenues(data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

    useEffect(() => {
        return () => {
            debouncedFetchSuggestions.cancel();
        };
    }, [debouncedFetchSuggestions]);

    const handleInputChange = (event: any, value: any, reason: any) => {
        console.log("input", value, reason);

        if (reason === "input") {
            debouncedFetchSuggestions(value);
        }
    };


    const addEdition = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            const formattedDate = edition.final_date.toISOString().split('T')[0]; // format the date as "YYYY-MM-DD"
            const data = {...edition, final_date: formattedDate};
            await axios.post(`${BACKEND_API_URL}/edition/`, data);
            navigate("/edition");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/edition`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addEdition}>
                        <TextField
                            id="edition_year"
                            label="Year"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setEdition({ ...edition, edition_year: parseInt(event.target.value) })}
                        />
                        <TextField
                            id="final_date"
                            label="The date of the final"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setEdition({ ...edition, final_date: new Date(event.target.value)})}
                        />

                        <TextField
                            id="motto"
                            label="Motto"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setEdition({ ...edition, motto: event.target.value })}
                        />

                        <Autocomplete
                            id="venue_id"
                            options={venues}
                            getOptionLabel={(option) => `${option.venue_name}`}
                            renderInput={(params) => <TextField {...params} label="Venue" variant="outlined" />}
                            filterOptions={(x) => x}
                            onInputChange={handleInputChange}
                            onChange={(event, value) => {
                                if (value) {
                                    console.log(value);
                                    setEdition({ ...edition, venue_id: value.id });
                                }
                            }}
                        />




                        <Button type="submit">Add Edition</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};

