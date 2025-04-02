'use client'

import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (selectedItem: { selected: number }) => {
        onPageChange(selectedItem.selected + 1);
    };

    return (
        <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            forcePage={currentPage - 1}
            onPageChange={handlePageChange}
            containerClassName="flex items-center gap-2"
            pageClassName="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary/10"
            activeClassName="bg-primary text-white hover:bg-primary/90"
            previousClassName="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
            nextClassName="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
            disabledClassName="opacity-50 cursor-not-allowed"
            previousLabel={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            }
            nextLabel={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            }
            breakLabel={
                <span className="px-2">...</span>
            }
        />
    );
};

export default Pagination;
