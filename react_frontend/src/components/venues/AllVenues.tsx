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
    Tooltip
} from "@mui/material";
import React from "react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from '@mui/icons-material/Search';
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";
import SortTwoToneIcon from '@mui/icons-material/SortTwoTone';
import {Venue} from "../../models/Venue";
import Pagination from "../Pagination";


const PAGE_SIZE = 50;
export const AllVenues = () => {
    const [loading, setLoading] = useState(false);
    const [venues, setVenues] = useState<Venue[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entitiesPerPage] = useState(50);
    const [totalEntities,setTotalEntities] = useState(0)


    useEffect(() => {
        setLoading(true);
        axios.get(`${BACKEND_API_URL}/venue?page=${currentPage}&page_size=${entitiesPerPage}`)
            .then((response) => response.data)
            .then((data) => {
                setVenues(data.results);
                setTotalEntities(data.count);
                setLoading(false);
            });
    }, [currentPage]);
    // useEffect(() => {
    //     console.log("intra aici")
    //     setLoading(true);
    //     fetch(`${BACKEND_API_URL}/venue?page=${currentPage}&page_size=${entitiesPerPage}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log('succes');
    //             setVenues(data.results);
    //             setTotalEntities(data.count);
    //             setLoading(false);
    //             console.log(data.result);
    //         });
    // }, [currentPage]);
    console.log("hei");
    const endIndex = currentPage * PAGE_SIZE;
    const startIndex = endIndex - PAGE_SIZE;
    return (
        <Container>
            <h1>All venues</h1>

            {loading && <CircularProgress />}
            {!loading && venues.length === 0 && <p>No venues found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/venue/add`}>
                    <Tooltip title="Add a new venue" arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}
            {!loading && venues.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="right">Adress</TableCell>
                                <TableCell align="right">Capacity</TableCell>
                                <TableCell align="right">Rating</TableCell>
                                <TableCell align="right">Nb of editions</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {venues.map((venue, index) => (
                                <TableRow key={venue.id}>
                                    <TableCell component="th" scope="row">
                                        {startIndex+index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/venue/${venue.id}/details`} title="View venue details">
                                            {venue?.venue_name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{venue?.venue_adress}</TableCell>

                                    <TableCell align="right">{venue?.capacity}</TableCell>
                                    <TableCell align="right">{venue?.rating}</TableCell>
                                    {/*<TableCell align="right">{venue.nr_editions}</TableCell>*/}
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/venue/${venue.id}/details`}>
                                            <Tooltip title="View venues details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/venue/${venue.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/venue/${venue.id}/delete`}>
                                            <DeleteForeverIcon sx={{ color: "red" }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Pagination
                entitiesPerPage={entitiesPerPage}
                totalPages={totalEntities}
                currentPage={currentPage}
                paginate={(pageNumber: number) => setCurrentPage(pageNumber)}
            />
        </Container>
    );
};