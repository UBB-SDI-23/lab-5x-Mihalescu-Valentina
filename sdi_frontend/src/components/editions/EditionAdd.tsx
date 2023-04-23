import { format } from "date-fns"
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
import {Edition} from "../../models/Edition";


export const EditionAdd = () => {
    const navigate = useNavigate();

    const [edition, setEdition] = useState<Edition>({
        edition_year: 1,
        final_date: new Date(),
        motto: " ",
        id: 1,
    });


    const addEdition = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/edition/`, edition);
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
                            onChange={(event) => setEdition({ ...edition, final_date: new Date(event.target.value) })}
                        />

                        <TextField
                            id="motto"
                            label="Motto"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setEdition({ ...edition, motto: event.target.value })}
                        />

                        {/*TO DO: add autocomplete for the venue name*/}




                        <Button type="submit">Add Country</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};

