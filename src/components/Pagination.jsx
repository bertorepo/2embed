import { Box } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import "./styles/Pagination.css";

function Pagination({ handlePageClick, pageCount, selectedPage }) {
  return (
    <>
      <Box p={4}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          forcePage={selectedPage}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          // classes
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
          pageClassName="hubert"
          disabledLinkClassName="pageDisabled"
        />
      </Box>
    </>
  );
}

export default Pagination;
