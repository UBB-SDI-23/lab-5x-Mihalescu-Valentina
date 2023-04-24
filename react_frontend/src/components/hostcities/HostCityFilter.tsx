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
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {BACKEND_API_URL} from "../../../src/constants";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import {HostCity} from "../../models/HostCity";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SortTwoToneIcon from "@mui/icons-material/SortTwoTone";


export const HostCityFilter = () => {
    const [loading, setLoading] = useState(false);
    const [hostcities, setHostCities] = useState<HostCity[]>([]);

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
        fetch(`${BACKEND_API_URL}/filter-hostcity-by-qf/?var=600`)
            .then((response) => response.json())
            .then((data) => {
                setHostCities(data);
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            <h1>Filtered cities by quality factor</h1>

            {loading && <CircularProgress/>}
            {!loading && hostcities.length === 0 && <p>No host cities that pass the filter were found</p>}
            <IconButton component={Link} sx={{ mr: 3 }} to={`/hostcity/`}>
                <ArrowBackIcon />
            </IconButton>{" "}
            {!loading && (
                <IconButton component={Link} sx={{mr: 3}} to={`/hostcity/add`}>
                    <Tooltip title="Add a new hostcity" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && hostcities.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="right">Host city name
                                    <IconButton onClick={() => {
                                        sortHostCities("host_city_name");
                                    }}>
                                        <Tooltip title="Sort by the city name" arrow>
                                            <SortTwoToneIcon color="inherit"/>
                                        </Tooltip>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">Host city population
                                    <IconButton onClick={() => {
                                        sortHostCities("host_city_population");
                                    }}>
                                        <Tooltip title="Sort by the population" arrow>
                                            <SortTwoToneIcon color="inherit"/>
                                        </Tooltip>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">Host city Mayor
                                    <IconButton onClick={() => {
                                        sortHostCities("host_city_mayor");
                                    }}>
                                        <Tooltip title="Sort by the city mayor" arrow>
                                            <SortTwoToneIcon color="inherit"/>
                                        </Tooltip>
                                    </IconButton>
                                </TableCell>
                                {/*<TableCell align="right">is capital</TableCell>*/}
                                <TableCell align="right">quality factor
                                    <IconButton onClick={() => {
                                        sortHostCities("quality_factor");
                                    }}>
                                        <Tooltip title="Sort by the quality factor" arrow>
                                            <SortTwoToneIcon color="inherit"/>
                                        </Tooltip>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hostcities.map((hostcity, index) => (
                                <TableRow key={hostcity.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/hostcity/${hostcity.id}/details`} title="View host city details">
                                            {hostcity.host_city_name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{hostcity.host_city_population}</TableCell>
                                    <TableCell align="right">{hostcity.host_city_mayor}</TableCell>
                                    {/*<TableCell align="right">{hostcity.is_capital}</TableCell>*/}
                                    <TableCell align="right">{hostcity.quality_factor}</TableCell>
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

