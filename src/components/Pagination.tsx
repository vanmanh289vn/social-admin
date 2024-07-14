import React, { useState } from 'react'

type PaginationProps = {
    onPageChanged: Function;
    totalItems: number;
    pageSize: number;
    pageLimit: number;
};

export const Pagination = (props: PaginationProps) => {

    const { totalItems, pageLimit, pageSize } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems / pageSize);

    var startPageIndex = Math.max(currentPage - pageLimit, 1);
    var endPageIndex = Math.min(currentPage + pageLimit, totalPages);

    const range = (from: number, to: number, step = 1) => {
        let i = from;
        const range = [];

        while (i <= to) {
            range.push(i);
            i += step;
        }
        return range;
    };

    const pages = range(startPageIndex, endPageIndex);

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

                <li className={`page-item ${currentPage === totalPages ? 'disable' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handleClick(totalPages)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>

    );
};