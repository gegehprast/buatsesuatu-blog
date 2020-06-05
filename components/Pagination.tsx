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
                innerClass="pagination-container"
                itemClass="pagination-page sm:min-w-10 sm:h-10 text-xs md:text-sm hover:bg-sh-200"
                itemClassPrev="pagination-page sm:min-w-10 sm:h-10 text-xs md:text-sm hover:bg-sh-200"
                itemClassNext="pagination-page sm:min-w-10 sm:h-10 text-xs md:text-sm hover:bg-sh-200"
                activeClass="pagination-active"
                linkClass="text-center p-1"
                activeLinkClass="cursor-default"
                disabledClass="cursor-default"
                prevPageText="<"
                nextPageText=">"
                firstPageText="<<"
                lastPageText=">>"
            />
        </>
    )
}

export default MyPagination
