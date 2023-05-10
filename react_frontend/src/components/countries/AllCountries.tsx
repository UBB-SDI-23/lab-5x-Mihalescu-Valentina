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
    Tooltip, Button,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import {Country} from "../../models/Country";
import Pagination from "../Pagination";


const PAGE_SIZE = 50;
export const AllCountries = () => {
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState<Country[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entitiesPerPage] = useState(50);
    const [totalEntities,setTotalEntities] = useState(0)


    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/country?page=${currentPage}&page_size=${entitiesPerPage}`)
            .then((response) => response.json())
            .then((data) => {
                setCountries(data.results);
                setTotalEntities(data.count);
                setLoading(false);
            });
    }, [currentPage]);

    const endIndex = currentPage * PAGE_SIZE;
    const startIndex = endIndex - PAGE_SIZE;


    return (
        <Container>
            <h1>All countries</h1>

            {loading && <CircularProgress />}
            {!loading && countries.length === 0 && <p>No countries found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/country/add`}>
                    <Tooltip title="Add a new country" arrow>
                        <AddIcon color="primary" />
                    </Tooltip>
                </IconButton>
            )}

            {!loading && (
                <Button component={Link} sx={{mr: 3}} to={`/country/by-edition-nr/`}>Statistic2
                </Button>


            )}

            {!loading && countries.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Year of entrance</TableCell>
                                <TableCell align="right">Capital</TableCell>
                                <TableCell align="center">Quality factor</TableCell>
                                <TableCell align="center">Edition NR</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {countries.map((country, index) => (
                                <TableRow key={country.id}>
                                    <TableCell component="th" scope="row">
                                        {startIndex + index + 1}
                                    </TableCell>
                                    <TableCell align = "right" component="th" scope="row">
                                        <Link to={`/country/${country.id}/details`} title="View course details">
                                            {country.country_name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{country.year_of_entrance}</TableCell>
                                    <TableCell align="right">{country.country_capital}</TableCell>
                                    <TableCell align="right">{country.quality_factor}</TableCell>
                                    <TableCell align="right">{country.edition_nr}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{ mr: 3 }}
                                            to={`/country/${country.id}/details`}>
                                            <Tooltip title="View country details" arrow>
                                                <ReadMoreIcon color="primary" />
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/country/${country.id}/edit`}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/country/${country.id}/delete`}>
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
