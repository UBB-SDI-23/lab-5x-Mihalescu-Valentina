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
import {Edition} from "../../models/Edition";
import Pagination from "../Pagination";

const PAGE_SIZE = 50;
export const Statistics2 = () => {
    const [loading, setLoading] = useState(false);
    const [editions, setEditions] = useState<Edition[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entitiesPerPage] = useState(50);
    const [totalEntities,setTotalEntities] = useState(0)

    // useEffect(() => {
    //     setLoading(true);
    //     fetch(`${BACKEND_API_URL}/edition/by-avg-qf?page=${currentPage}&page_size=${entitiesPerPage}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setEditions(data.results);
    //             setTotalEntities(data.count);
    //             setLoading(false);
    //         });
    // }, [currentPage]);

    useEffect(() => {
        setLoading(true);
        const apiUrl = `${BACKEND_API_URL}/edition?page=${currentPage}&page_size=${entitiesPerPage}&ordering=-avg_qf`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Sort the editions based on the "country_nr" field
                const sortedEditions = data.results.sort((a: Edition, b: Edition) => a.avg_qf - b.avg_qf);

                setEditions(sortedEditions);
                setTotalEntities(data.count);
                setLoading(false);
            });
    }, [currentPage, entitiesPerPage]);


    const endIndex = currentPage * PAGE_SIZE;
    const startIndex = endIndex - PAGE_SIZE;
    return (
        <Container>
            <h1>All editions ordered desc by the average of the quality factor</h1>

            {loading && <CircularProgress />}
            {!loading && editions.length === 0 && <p>No editions found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/edition/add`}>
                    <Tooltip title="Add a new edition" arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}


            {!loading && editions.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Year</TableCell>
                                <TableCell align="right">Final date</TableCell>
                                <TableCell align="right">Motto</TableCell>
                                {/*<TableCell align="right">Average quality factor</TableCell>*/}
                                <TableCell align="right">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {editions.map((edition, index) => (
                                <TableRow key={edition.id}>
                                    <TableCell component="th" scope="row">
                                        {startIndex + index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/edition/${edition.id}/details`} title="View course details">
                                            {edition.edition_year}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{edition.final_date.toString()}</TableCell>
                                    <TableCell align="right">{edition.motto}</TableCell>
                                    {/*<TableCell align="right">{edition.avg_qf}</TableCell>*/}
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/edition/${edition.id}/details`}>
                                            <Tooltip title="View edition details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/edition/${edition.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/edition/${edition.id}/delete`}>
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
