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



export const AllSongs = () => {
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/song`)
            .then((response) => response.json())
            .then((data) => {
                setSongs(data);
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            <h1>All songs</h1>

            {loading && <CircularProgress />}
            {!loading && songs.length === 0 && <p>No songs found</p>}
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
                                        {index + 1}
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
        </Container>
    );
};
