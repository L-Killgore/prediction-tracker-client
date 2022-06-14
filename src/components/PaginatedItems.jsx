import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';

import PredictionPane from './PredictionPane';

const PaginatedItems = ({ predictions, predsPerPage, zeroPredictionsStatement }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * predsPerPage) % predictions.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + predsPerPage;
    setCurrentItems(predictions.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(predictions.length / predsPerPage))
  }, [itemOffset, predsPerPage, predictions]);

  return (
    <>
      <PredictionPane predictions={currentItems} zeroPredictionsStatement={zeroPredictionsStatement} />
      <ReactPaginate
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        nextLabel="Next"
        breakLabel="..."
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
      />
    </>
  )
}

export default PaginatedItems