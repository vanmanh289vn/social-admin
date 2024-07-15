import React, { useState } from 'react'

type PaginationProps = {
    onPageChanged: Function;
    totalItems: number;
    pageSize: number;
    pageLimit: number;
    pageIndex: number;
};

export const Pagination = (props: PaginationProps) => {

    const { totalItems, pageLimit, pageSize, pageIndex } = props;
    const [currentPage, setCurrentPage] = useState(pageIndex);
    const totalPages = Math.ceil(totalItems / pageSize);

    //------------

    // var startPageIndex = Math.max(currentPage - pageLimit, 1);
    // var endPageIndex = Math.min(currentPage + pageLimit, totalPages);

    // const range = (from: number, to: number, step = 1) => {
    //     let i = from;
    //     const range = [];

    //     while (i <= to) {
    //         range.push(i);
    //         i += step;
    //     }
    //     return range;
    // };

    // const pages = range(startPageIndex, endPageIndex);

    //--------------
    const getVisiblePages = (currentPage: number, totalPages: number) => {
        const half = Math.floor(pageLimit / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);

        if (end - start + 1 < pageLimit) {
            if (start === 1) {
                end = Math.min(start + pageLimit - 1, totalPages);
            } else {
                start = Math.max(1, end - pageLimit + 1);
            }
        }

        return Array.from({length: (end - start + 1)}, (_, i) => start + i);
    };

    const pages = getVisiblePages(currentPage, totalPages);


    //--------------

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        props.onPageChanged(pageNumber);
    };

    return (
        <nav aria-label="...">
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''} `}>
                    <button
                        className="page-link"
                        onClick={() => handleClick(currentPage - 1)}
                    >
                        Previous
                    </button>
                </li>

                {pages.map((page, index) => {
                    return (
                        <li
                            key={index}
                            className={`page-item ${currentPage === page ? 'active' : ''}`}
                        >
                            <button
                                className='page-link'
                                onClick={() => handleClick(page)}
                            >
                                {page}
                            </button>
                        </li>
                    );
                })}

                <li className={`page-item  ${currentPage === totalPages ? ' disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handleClick(currentPage + 1)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>

    );
};