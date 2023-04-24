import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";

export const HostCityDelete = () => {
    const { hostCityId } = useParams();
    const navigate = useNavigate();

    const handleDelete = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        await axios.delete(`${BACKEND_API_URL}/hostcity/${hostCityId}`);
        navigate("/hostcity/");
    };

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        // go to courses list
        navigate("/hostcity/");
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/hostcity/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    Are you sure you want to delete this city? This cannot be undone!
                </CardContent>
                <CardActions>
                    <Button onClick={handleDelete}>Delete it</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
};