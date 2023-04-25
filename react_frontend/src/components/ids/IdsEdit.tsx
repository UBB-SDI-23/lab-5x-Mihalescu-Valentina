import {Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {BACKEND_API_URL} from "../../constants";
import {Ids} from "../../models/Ids";


export const IdsEdit = () => {
    const navigate = useNavigate();
    const {idsId} = useParams();
    const [loading, setLoading] = useState(false);

    const [ids, setIds] = useState<Ids>({
        id:1,
        place:1,
        points:1,
    });

    useEffect(() => {
        const fetchIds = async () => {
            const response = await fetch(`${BACKEND_API_URL}/idss/${idsId}/`);
            const ids = await response.json();
            setIds(ids);
        };
        fetchIds();
    }, [idsId]);
    const updateIds = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/idss/${idsId}/`, ids);
            navigate("/idss/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/idss/`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={updateIds}>
                        <TextField
                            id="place"
                            label="Place"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            value={ids.place}
                            onChange={(event) => setIds({...ids, place: parseInt(event.target.value)})}
                        />
                        <TextField
                            id="points"
                            label="Points"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={ids.points}
                            onChange={(event) => setIds({ ...ids, points: parseInt(event.target.value) })}
                        />



                        <Button type="submit">Update</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};