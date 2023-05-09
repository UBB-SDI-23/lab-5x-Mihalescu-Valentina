
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

    for (let i = 1; i <= Math.ceil(totalPages / entitiesPerPage); i++) {
        pageNumbers.push(i);
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
    //         range.unshift("...");
    //     }
    //     if (end < totalPages) {
    //         range.push("...");
    //     }
    //
    //     return range;
    // }

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
            if (start > 6) {
                range.unshift("...");
            }
            range.unshift(1);
        }
        if (end < totalPages) {
            if (end < totalPages - 5) {
                range.push("...");
            }
            range.push(totalPages);
        }

        return range;
    }


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



// import React, { useState, useEffect } from 'react';
// import {Button, IconButton, Tooltip} from "@mui/material";
// import {Container} from "@mui/system";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
//
// // @ts-ignore
// const Pagination = ({ entitiesPerPage, totalPages, currentPage, paginate}) => {
//
//     //Set number of pages
//     // @ts-ignore
//     const pagesList = []
//     const pages = Math.ceil(totalPages / entitiesPerPage)
//     for (let i = 1; i <= pages; i++) {
//         pagesList.push(i)
//     }
//
//     // Current active button number
//     const [currentButton] = useState(currentPage)
//
//     // Array of buttons what we see on the page
//     const [arrOfVisibleButtons, setArrOfCurrButtons] = useState([])
//
//     useEffect(() => {
//         let tempNumberOfPages = [...arrOfVisibleButtons]
//         let dotsInitial = '...'
//         let dotsLeft = '... '
//         let dotsRight = ' ...'
//
//         if (pagesList.length < 6) {
//             // @ts-ignore
//             tempNumberOfPages = pagesList
//         }
//
//         else if (currentButton >= 1 && currentButton <= 3) {
//             // @ts-ignore
//             tempNumberOfPages = [1, 2, 3, 4, dotsInitial, pagesList.length]
//         }
//
//         else if (currentButton === 4) {
//             // @ts-ignore
//             const sliced = pagesList.slice(0, 5)
//             // @ts-ignore
//             tempNumberOfPages = [...sliced, dotsInitial, pagesList.length]
//         }
//
//         else if (currentButton > 4 && currentButton < pagesList.length - 2) {               // from 5 to 8 -> (10 - 2)
//             // @ts-ignore
//             const sliced1 = pagesList.slice(currentButton - 2, currentButton)                 // sliced1 (5-2, 5) -> [4,5]
//             // @ts-ignore
//             const sliced2 = pagesList.slice(currentButton, currentButton + 1)                 // sliced1 (5, 5+1) -> [6]
//             // @ts-ignore
//             tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, pagesList.length]) // [1, '...', 4, 5, 6, '...', 10]
//         }
//
//         else if (currentButton > pagesList.length - 3) {                 // > 7
//             // @ts-ignore
//             const sliced = pagesList.slice(pagesList.length - 4)       // slice(10-4)
//             // @ts-ignore
//             tempNumberOfPages = ([1, dotsLeft, ...sliced])
//         }
//
//         setArrOfCurrButtons(tempNumberOfPages)
//     }, [currentButton])
//
//
//     return (
//         <Container className="pagination-container">
//             <IconButton
//                 href="#"
//                 disabled={currentButton === 1}
//                 onClick={() => paginate(currentButton - 1)}
//             >
//                 <Tooltip title="Back" arrow>
//                     <ArrowBackIosNewIcon color="primary" />
//                 </Tooltip>
//             </IconButton>
//             {arrOfVisibleButtons.map(((item, index) => {
//                 return <Button
//                     href="#"
//                     key={index}
//                     disabled={currentButton === item || item === "... " || item === " ..." || item === "..."}
//                     onClick={ () => {
//                         paginate(item);
//                     }}>
//                     {item}
//                 </Button>
//             }))}
//             <Button
//                 href="#"
//                 disabled={currentButton === pages}
//                 onClick={() => paginate(currentButton + 1)}
//             >
//                 <Tooltip title="Next" arrow>
//                     <ArrowForwardIosIcon color="primary" />
//                 </Tooltip>
//             </Button>
//         </Container>
//     );
// }
//
//
// export default Pagination
