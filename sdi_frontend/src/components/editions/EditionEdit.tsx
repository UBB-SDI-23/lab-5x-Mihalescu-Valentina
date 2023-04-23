import {Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {BACKEND_API_URL} from "../../constants";
import {Venue} from "../../models/Venue";
import {Edition} from "../../models/Edition";

export const EditionEdit = () => {
    const navigate = useNavigate();
    const {editionId} = useParams();
    const [loading, setLoading] = useState(false);

    const [edition, setEdition] = useState<Edition>({
        edition_year: 1,
        final_date: new Date(),
        motto: " ",
        id: 1,
    });

    useEffect(() => {
        const fetchEdition = async () => {
            const response = await fetch(`${BACKEND_API_URL}/edition/${editionId}/`);
            const edition = await response.json();
            setEdition(edition);
        };
        fetchEdition();
    }, [editionId]);
    const updateEdition = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/edition/${editionId}/`, edition);
            navigate("/edition/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/edition/`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={updateEdition}>
                        <TextField
                            id="edition_year"
                            label="Year"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            value={edition.edition_year}
                            onChange={(event) => setEdition({...edition, edition_year: parseInt(event.target.value)})}
                        />
                        <TextField
                            id="final_date"
                            label="The date of the final"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={edition.final_date}
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


                        <Button type="submit">Update Edition</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};