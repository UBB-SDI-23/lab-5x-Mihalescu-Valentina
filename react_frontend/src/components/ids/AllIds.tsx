import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    IconButton,
    Tooltip,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import {Ids} from "../../models/Ids";



export const AllIds = () => {
    const [loading, setLoading] = useState(false);
    const [ids, setIds] = useState<Ids[]>([]);

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/idss`)
            .then((response) => response.json())
            .then((data) => {
                setIds(data);
                setLoading(false);
            });
    }, []);


    return (
        <Container>
            <h1>Editions and Countries- more details</h1>

            {loading && <CircularProgress />}
            {!loading && ids.length === 0 && <p>No information found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/ids/add`}>
                    <Tooltip title="Add a new entry" arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}
            {!loading && ids.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Edition year</TableCell>
                                <TableCell align="right">Country</TableCell>
                                <TableCell align="right">Place</TableCell>
                                <TableCell align="right">Points</TableCell>
                                <TableCell align="right">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ids.map((ids, index) => (
                                <TableRow key={ids.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="right" component="th" scope="row">
                                        <Link to={`/idss/${ids.id}/details`} title="View details">
                                            {ids.edition?.edition_year}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{ids.country?.country_name}</TableCell>
                                    <TableCell align="right">{ids.place}</TableCell>
                                    <TableCell align="right">{ids.points}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/idss/${ids.id}/details`}>
                                            <Tooltip title="View details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/idss/${ids.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/idss/${ids.id}/delete`}>
                                            <DeleteForeverIcon sx={{ color: "red" }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};
