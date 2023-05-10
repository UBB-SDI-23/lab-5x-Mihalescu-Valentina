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
import {Song} from "../../models/Song";
import Pagination from "../Pagination";

const PAGE_SIZE = 50;

export const AllSongs = () => {
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState<Song[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entitiesPerPage] = useState(50);
    const [totalEntities,setTotalEntities] = useState(0)

    // useEffect(() => {
    //     setLoading(true);
    //     fetch(`${BACKEND_API_URL}/song?page=${currentPage}&page_size=${entitiesPerPage}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setSongs(data);
    //             setTotalEntities(data.count);
    //             setLoading(false);
    //         });
    // }, [currentPage]);
    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/song?page=${currentPage}&page_size=${entitiesPerPage}`)
            .then((response) => response.json())
            .then((data) => {
                setSongs(data.results);
                setTotalEntities(data.count);
                setLoading(false);
            });
    }, [currentPage]);

    const endIndex = currentPage * PAGE_SIZE;
    const startIndex = endIndex - PAGE_SIZE;
    return (
        <Container>
            <h1>All songs</h1>

            {loading && <CircularProgress />}
            {!loading && songs.length === 0 && <p>No songs found girl!!</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/song/add`}>
                    <Tooltip title="Add a new song" arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}
            {!loading && songs.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Release Date</TableCell>
                                <TableCell align="right">Album name</TableCell>
                                <TableCell align="right">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {songs.map((song, index) => (
                                <TableRow key={song.id}>
                                    <TableCell component="th" scope="row">
                                        {startIndex+index + 1}
                                    </TableCell>
                                    <TableCell align="right" component="th" scope="row">
                                        <Link to={`/song/${song.id}/details`} title="View artist details">
                                            {song.song_name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{song.release_date}</TableCell>
                                    <TableCell align="right">{song.album_name}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/song/${song.id}/details`}>
                                            <Tooltip title="View song details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/song/${song.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/song/${song.id}/delete`}>
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
