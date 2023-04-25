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
import {Ids} from "../../models/Ids";
import {Artist} from "../../models/Artist";
import {Edition} from "../../models/Edition";
import {Country} from "../../models/Country";


export const IdsAdd = () => {
    const navigate = useNavigate();

    const [ids, setIds] = useState<Ids>({
        place: 1,
        points: 1,
        id: 1,
    });

    const [countries, setCountries] = useState<Country[]>([]);

    const fetchSuggestionsCountry = async (query: string) => {
        try {
            const response = await axios.get<Country[]>(
                `${BACKEND_API_URL}/country/autocomplete?query=${query}`
            );
            const data = await response.data;
            setCountries(data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };



    const debouncedFetchSuggestionsCountry = useCallback(debounce(fetchSuggestionsCountry, 500), []);

    useEffect(() => {
        return () => {
            debouncedFetchSuggestionsCountry.cancel();
        };
    }, [debouncedFetchSuggestionsCountry]);

    const handleInputChangeCountry = (event: any, value: any, reason: any) => {
        console.log("input", value, reason);

        if (reason === "input") {
            debouncedFetchSuggestionsCountry(value);
        }
    };


    const [editions, setEditions] = useState<Edition[]>([]);

    const fetchSuggestionsEdition = async (query: string) => {
        try {
            const response = await axios.get<Edition[]>(
                `${BACKEND_API_URL}/edition/autocomplete?query=${query}`
            );
            const data = await response.data;
            setEditions(data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };



    const debouncedFetchSuggestionsEdition = useCallback(debounce(fetchSuggestionsEdition, 500), []);

    useEffect(() => {
        return () => {
            debouncedFetchSuggestionsEdition.cancel();
        };
    }, [debouncedFetchSuggestionsEdition]);

    const handleInputChangeEdition = (event: any, value: any, reason: any) => {
        console.log("input", value, reason);

        if (reason === "input") {
            debouncedFetchSuggestionsEdition(value);
        }
    };
    const addIds = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/ids/`, ids);
            navigate("/idss/");
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/idss/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addIds}>
                        <Autocomplete
                            id="edition"
                            options={editions}
                            renderInput={(params) => <TextField {...params} label="Edition" variant="outlined"/>}
                            getOptionLabel={(option) => `${option.edition_year}`}
                            filterOptions={(x) => x}
                            onInputChange={handleInputChangeEdition}
                            onChange={(event, value) => {
                                if (value) {
                                    console.log(value);
                                    setIds({...ids, edition: value.id});
                                }
                            }}
                        />

                        <Autocomplete
                            id="country"
                            options={countries}
                            renderInput={(params) => <TextField {...params} label="Country" variant="outlined"/>}
                            getOptionLabel={(option) => `${option.country_name}`}
                            filterOptions={(x) => x}
                            onInputChange={handleInputChangeCountry}
                            onChange={(event, value) => {
                                if (value) {
                                    console.log(value);
                                    setIds({...ids, country: value.id});
                                }
                            }}
                        />

                        <TextField
                            id="place"
                            label="Place"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setIds({ ...ids, place: parseInt(event.target.value) })}
                        />

                        <TextField
                            id="points"
                            label="Points"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setIds({ ...ids, points: parseInt(event.target.value) })}
                        />







                        <Button type="submit">Add Entity</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};

