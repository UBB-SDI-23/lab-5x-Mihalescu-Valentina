import React from 'react';
import {Box, List, ListItemButton} from "@mui/material";

interface Props{
    entitiesPerPage: number;
    totalPages: number;
    paginate: (nrpage:number)=>void;
}
const Pagination = ({entitiesPerPage,totalPages,paginate}:Props) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPages / entitiesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Box sx={{gap:0}}>
            <List className='pagination' sx={{display: "flex"}}>
                {pageNumbers.map(number => (
                    <ListItemButton key={number} onClick={() => paginate(number)} sx={{m:0}}>
                        {number}
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
};

export default Pagination;