import React from 'react'
import Pagination from 'react-js-pagination'

interface Props {
    onChange: (pageNumber: number) => void
    activePage: number
    totalItemsCount: number
    pageRangeDisplayed?: number
    itemsCountPerPage: number
}

const MyPagination: React.FC<Props> = ({ onChange, activePage, totalItemsCount, itemsCountPerPage, pageRangeDisplayed = 5 }) => {
    return (
        <>
            <Pagination
                onChange={onChange}
                activePage={activePage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={pageRangeDisplayed}
                itemsCountPerPage={itemsCountPerPage}
                innerClass="flex flex-wrap items-center justify-center w-full mx-auto font-semibold"
                itemClass="border border-gray-400 rounded pagination-cursor-pointer flex items-center justify-center w-8 h-8 m-1 text-sm text-gray-900 dark-text-gray-900 text-xs md:text-sm"
                linkClass="leading-none"
                activeClass="bg-indigo-700 border border-gray-400 rounded pagination-cursor-default"
                activeLinkClass="text-white cursor-default"
                disabledClass="pagination-cursor-default pagination-disabled-item"
                hideDisabled={true}
                prevPageText="<"
                nextPageText=">"
                firstPageText="<<"
                lastPageText=">>"
            />
        </>
    )
}

export default MyPagination
