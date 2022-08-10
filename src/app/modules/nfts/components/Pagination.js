import React from 'react';
import classnames from 'classnames';
import { usePagination } from '../../../hooks/usePagination';
const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize
    } = props;


    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul
            className='pagination'
        >
            {/* Left navigation arrow */}
            <li
                className={classnames('page-item previous', {
                    disabled: currentPage === 1
                })}
                onClick={onPrevious}
            >
                <a href='#' className='page-link'>
                    <i className='previous'></i>
                </a>
            </li>
            {paginationRange.map(pageNumber => {

                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === '...') {
                    return <li className="page-item">
                        <a href='#' className='page-link'>
                            ...
                        </a>
                    </li>;
                }

                // Render our Page Pills
                return (
                    <li
                        className={classnames('page-item', {
                            active: pageNumber === currentPage
                        })}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        <a href='#' className='page-link'>
                            {pageNumber}
                        </a>
                    </li>
                );
            })}
            {/*  Right Navigation arrow */}
            <li
                className={classnames('page-item next', {
                    disabled: currentPage === lastPage
                })}
                onClick={onNext}
            >
                <a href='#' className='page-link'>
                    <i className='next'></i>
                </a>
            </li>
        </ul>
    );
};

export default Pagination;
