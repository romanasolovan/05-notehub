import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
    totalPages: number;
    page: number;
    currentPage: (page: number) => void;
}

const Pagination = ({ totalPages, page, currentPage }: PaginationProps) => {
    return (
        <>
            <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => currentPage(selected + 1)}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
            />
        </>
    );
};

export default Pagination;