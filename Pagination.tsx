import { useState } from "react";
import usePagination from "./usePagination";
import debug from "debug"

const Pagination = ({
  pageCount: value,
  handlePageChange,
}: {
  pageCount: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
}) => {
  const pageCount = value;

  const {
    previous,
    current,
    next,
    onPageChange,
    getNextOrPrevious,
    showNextFiveElements,
  } = usePagination(pageCount, handlePageChange);
  const [pages, setPages] = useState(showNextFiveElements(0));

  return (
    <ul className="pagination  mr-[10px]">
      <li className={`previous  !p-0   ${current === 1 ? "disabled" : ""}`}>
        <a
          className="!flex !items-center !justify-center"
          onClick={() => {
            getNextOrPrevious(pages, {
              pageNumber: previous,
              type: "previous",
              setPages,
            });
          }}
        >
          <img
            className=""
            src="/assets/PreviousIcon.svg"
            alt="next icon label"
          />
        </a>
      </li>

      {pages?.map((pageNumber, index) => {
        const indexValue = index;
        return (
          <li
            key={indexValue}
            className={`${
              current === pageNumber ? "active" : " "
            } page-item !p-0`}
          >
            <a
              style={{ cursor: "pointer" }}
              onClick={() => {
                debug(pageNumber);
                onPageChange(pageNumber);
                handlePageChange({ selected: pageNumber - 1 });
              }}
              className="!px-0"
            >
              {pageNumber}
            </a>
          </li>
        );
      })}
      {/* Pagination Ends */}
      <li className={`next  !p-0   ${current === pageCount ? "disabled" : ""}`}>
        <a
          onClick={() => {
            getNextOrPrevious(pages, {
              pageNumber: next,
              type: "next",
              setPages,
            });
          }}
          className="!flex !items-center !justify-center"
        >
          <img className="" src="/assets/NextIcon.svg" alt="next icon label" />
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
