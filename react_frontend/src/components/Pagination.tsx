
import React from 'react';
import {Box, List, ListItemButton} from "@mui/material";

interface Props{
    entitiesPerPage: number;
    totalPages: number;
    currentPage: number;
    paginate: (nrpage:number)=>void;
}

const Pagination = ({entitiesPerPage,totalPages,currentPage,paginate}:Props) => {
    const pageNumbers = [];
    //totalPages=20000;
    for (let i = 1; i <= Math.ceil(totalPages / entitiesPerPage); i++) {
        pageNumbers.push(i);
    }

    const getPageRange = () => {
        const MAX_PAGES = 10; // maximum number of page links to show
        const range = [];
        let start = 1;
        let end = totalPages;

        // Calculate the start and end of the range based on the current page
        if (totalPages > MAX_PAGES) {
            if (currentPage <= 3) {
                end = MAX_PAGES;
            } else if (currentPage >= totalPages - 2) {
                start = totalPages - MAX_PAGES + 1;
            } else {
                start = currentPage - 2;
                end = currentPage + 2;
            }
        }

        // Add page links for the range
        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        // Add "..." links for the gaps between ranges
        if (start > 1) {
            range.unshift("...");
        }
        if (end < totalPages) {
            range.push("...");
        }

        return range;
    }

    // const getPageRange = () => {
    //     const MAX_PAGES = 10; // maximum number of page links to show
    //     const range = [];
    //     let start = 1;
    //     let end = totalPages;
    //
    //     // Calculate the start and end of the range based on the current page
    //     if (totalPages > MAX_PAGES) {
    //         if (currentPage <= 3) {
    //             end = MAX_PAGES;
    //         } else if (currentPage >= totalPages - 2) {
    //             start = totalPages - MAX_PAGES + 1;
    //         } else {
    //             start = currentPage - 2;
    //             end = currentPage + 2;
    //         }
    //     }
    //
    //     // Add page links for the range
    //     for (let i = start; i <= end; i++) {
    //         range.push(i);
    //     }
    //
    //     // Add "..." links for the gaps between ranges
    //     if (start > 1) {
    //         if (start > 6) {
    //             range.unshift("...");
    //         }
    //         range.unshift(1);
    //     }
    //     if (end < totalPages) {
    //         if (end < totalPages - 5) {
    //             range.push("...");
    //         }
    //         range.push(totalPages);
    //     }
    //
    //     return range;
    // }


    return (
        <Box sx={{gap:0}}>
            <List className='pagination' sx={{display: "flex"}}>
                {getPageRange().map((number, index) => (
                    <ListItemButton key={index} onClick={() => {
                        if (typeof number === "number") {
                            paginate(number);
                        }
                    }} sx={{m:0}}>
                        {number}
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
};

export default Pagination;



