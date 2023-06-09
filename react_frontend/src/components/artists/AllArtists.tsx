
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
import {Artist} from "../../models/Artist";
import Pagination from "../Pagination";


const PAGE_SIZE = 10;
export const AllArtists = () => {
    const [loading, setLoading] = useState(false);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entitiesPerPage] = useState(50);
    const [totalEntities,setTotalEntities] = useState(0)

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/artist?page=${currentPage}&page_size=${entitiesPerPage}`)
            .then((response) => response.json())
            .then((data) => {
                setArtists(data.results);
                setTotalEntities(data.count);
                setLoading(false);
            });
    }, [currentPage]);


    const endIndex = currentPage * PAGE_SIZE;
    const startIndex = endIndex - PAGE_SIZE;
    return (
        <Container sx={{display:"flex", flexDirection:"column",alignItems:"center"}}>
            <h1>All artists</h1>

            {loading && <CircularProgress />}
            {!loading && artists.length === 0 && <p>No artists found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/artist/add`}>
                    <Tooltip title="Add a new artist" arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}
            {!loading && artists.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Age</TableCell>
                                <TableCell align="right">Description</TableCell>
                                <TableCell align="right">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {artists.map((artist, index) => (
                                <TableRow key={artist.id}>
                                    <TableCell component="th" scope="row">
                                        {startIndex + index + 1}
                                    </TableCell>
                                    <TableCell align="right" component="th" scope="row">
                                        <Link to={`/artist/${artist.id}/details`} title="View artist details">
                                            {artist.artist_name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{artist.artist_age}</TableCell>
                                    <TableCell align="right">{artist.description}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/artist/${artist.id}/details`}>
                                            <Tooltip title="View artist details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/artist/${artist.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/artist/${artist.id}/delete`}>
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
                currentPage = {currentPage}
                paginate={(pageNumber: number) => setCurrentPage(pageNumber)}
            />

        </Container>
    );
};
