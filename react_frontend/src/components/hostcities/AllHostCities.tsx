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
    Tooltip, TextField, Button,
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
import {HostCity} from "../../models/HostCity";
import Pagination from "../Pagination";

const PAGE_SIZE = 10;
export const AllHostCities = () => {
    const [loading, setLoading] = useState(false);
    const [hostcities, setHostCities] = useState<HostCity[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entitiesPerPage] = useState(50);
    const [totalEntities,setTotalEntities] = useState(0)
    const sortHostCities = (sortingAttr: string) => {
        const sorted = [...hostcities].sort((a: HostCity, b: HostCity) => {

            if (sortingAttr == "host_city_name") {
                if (a.host_city_name < b.host_city_name)
                    return -1;
                return 1;
            }

            if (sortingAttr == "host_city_population") {
                if (a.host_city_population < b.host_city_population)
                    return -1;
                return 1;
            }

            if (sortingAttr == "host_city_mayor") {
                if (a.host_city_mayor < b.host_city_mayor)
                    return -1;
                return 1;
            }

            if (sortingAttr == "quality_factor") {
                if (a.quality_factor < b.quality_factor)
                    return -1;
                return 1;
            }


            return 0;
        })
        setHostCities(sorted);
    }

    useEffect(() => {
        setLoading(true);
        axios.get(`${BACKEND_API_URL}/hostcity/?page=${currentPage}&page_size=${entitiesPerPage}`)
            .then((response) => response.data)
            .then((data) => {
                setHostCities(data.results);
                setTotalEntities(data.count);
                setLoading(false);
            });
    }, [currentPage]);

    const endIndex = currentPage * PAGE_SIZE;
    const startIndex = endIndex - PAGE_SIZE;
    return <Container>
        <h1>All host cities</h1>

        {loading && <CircularProgress/>}
        {!loading && hostcities.length === 0 && <p>No hostcities found</p>}
        {!loading && hostcities.length > 0 && <Container sx={{position: "absolute", left: 930, top: 100}}>
        </Container>}
        {!loading && <IconButton component={Link} sx={{mr: 3}} to={`/hostcity/add`}>
            <Tooltip title="Add a new hostcity" arrow>
                <AddIcon color="inherit"/>
            </Tooltip>
        </IconButton>}
        {!loading && (
            <Button component={Link} sx={{mr: 3}} to={`/filter-hostcity-by-qf/?var=5000`}>Filter
            </Button>

        )}
        {!loading && hostcities.length > 0 && <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">#</TableCell>
                        <TableCell align="left">
                            Name
                            <IconButton onClick={() => {
                                sortHostCities("host_city_name");
                            }}>
                                <Tooltip title="Sort by the city name" arrow>
                                    <SortTwoToneIcon color="inherit"/>
                                </Tooltip>
                            </IconButton>
                        </TableCell>
                        <TableCell align="left">
                            Population
                            <IconButton onClick={() => {
                                sortHostCities("host_city_population");
                            }}>
                                <Tooltip title="Sort by population" arrow>
                                    <SortTwoToneIcon color="inherit"/>
                                </Tooltip>
                            </IconButton>
                        </TableCell>
                        <TableCell align="left">
                            Mayor
                            <IconButton onClick={() => {
                                sortHostCities("host_city_mayor");
                            }}>
                                <Tooltip title="Sort by mayor" arrow>
                                    <SortTwoToneIcon color="inherit"/>
                                </Tooltip>
                            </IconButton>
                        </TableCell>
                        <TableCell align="left">
                            Quality factor
                            <IconButton onClick={() => {
                                sortHostCities("quality_factor");
                            }}>
                                <Tooltip title="Sort by quality_factor" arrow>
                                    <SortTwoToneIcon color="inherit"/>
                                </Tooltip>
                            </IconButton>
                        </TableCell>
                        <TableCell align="left">
                            Nb of Venues
                        </TableCell>
                        <TableCell align="center">Operations</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {hostcities.map((hostcity, index) => <TableRow key={hostcity.id}>
                        <TableCell component="th" scope="row">
                            {startIndex+index + 1}
                        </TableCell>
                        <TableCell align="right">{hostcity.host_city_name}</TableCell>
                        <TableCell align="right">{hostcity.host_city_population}</TableCell>
                        <TableCell align="right">{hostcity.host_city_mayor}</TableCell>
                        <TableCell align="right">{hostcity.quality_factor}</TableCell>
                        <TableCell align="right">{hostcity.nb_venues}</TableCell>
                        <TableCell align="right">
                            <IconButton
                                component={Link}
                                sx={{mr: 3}}
                                to={`/hostcity/${hostcity.id}/details`}>
                                <Tooltip title="View hostcity details" arrow>
                                    <ReadMoreIcon color="primary"/>
                                </Tooltip>
                            </IconButton>

                            <IconButton component={Link} sx={{mr: 3}} to={`/hostcity/${hostcity.id}/edit`}>
                                <EditIcon/>
                            </IconButton>

                            <IconButton component={Link} sx={{mr: 3}}
                                        to={`/hostcity/${hostcity.id}/delete`}>
                                <DeleteForeverIcon sx={{color: "red"}}/>
                            </IconButton>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>}
        <Pagination
            entitiesPerPage={entitiesPerPage}
            totalPages={totalEntities}
            currentPage={currentPage}
            paginate={(pageNumber: number) => setCurrentPage(pageNumber)}
        />
    </Container>;
}
