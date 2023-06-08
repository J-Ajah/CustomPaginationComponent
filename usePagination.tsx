import { Dispatch, SetStateAction, useState } from "react";

const usePagination = (
  pageCount: any,
  handlePageChange: (selectedItem: { selected: number }) => void
) => {
  const [current, setCurrent] = useState(1);
  const previous = current - 1;
  const next = current + 1;
  const last = pageCount;
  const first = 1;

  const onPageChange = (newPage: any) => {
    setCurrent(newPage);
    handlePageChange({ selected: newPage - 1 });
  };

  const checkAndRenderNextItems = (
    pagination: number[],
    properties: {
      type: "previous" | "next";
      pageNumber: number;
      setPages: Dispatch<SetStateAction<number[]>>;
    }
  ) => {
    if (
      properties.pageNumber > pagination[pagination?.length - 1] &&
      properties.type === "next"
    ) {
      properties.setPages(showNextFiveElements(properties.pageNumber - 1));
      onPageChange(properties.pageNumber);
    }
  };

  const checkAndRenderPreviousItems = (
    pagination: number[],
    properties: {
      type: "previous" | "next";
      pageNumber: number;
      setPages: Dispatch<SetStateAction<number[]>>;
    }
  ) => {
    if (
      properties.pageNumber < pagination[0] &&
      properties.type === "previous"
    ) {
      properties.setPages(showPreviousFiveElements(pagination[0]));
      onPageChange(properties.pageNumber);
    }
  };
  // Renders the next pagination available
  const getNextOrPrevious = (
    pagination: number[],
    properties: {
      type: "previous" | "next";
      pageNumber: number;
      setPages: Dispatch<SetStateAction<number[]>>;
    }
  ) => {
    if (properties.pageNumber > pageCount || properties.pageNumber === 0)
      return;
    // Checks and Renders the next pagination.
    checkAndRenderNextItems(pagination, properties);

    // Checks and Renders the Previous pagination.
    checkAndRenderPreviousItems(pagination, properties);

    if (
      properties.pageNumber >= pagination[0] &&
      properties.pageNumber <= pagination[pagination?.length - 1]
    ) {
      onPageChange(properties.pageNumber);
    }
  };

  const showNextFiveElements = (startElement: number) => {
    let elements: number[] = []; // Initialize an empty array to store the elements
    let currentElement = startElement + 1;
    for (let i = 0; i < 4; i++) {
      if (currentElement <= pageCount) {
        elements.push(currentElement);
        currentElement++;
      } else {
        break;
      }
    }

    return elements;
  };

  const showPreviousFiveElements = (startElement: number) => {
    let elements: number[] = []; // Initialize an empty array to store the elements
    let currentElement = startElement - 1;

    for (let i = 0; i < 4; i++) {
      if (currentElement >= 0) {
        elements.unshift(currentElement);
        currentElement--;
      } else {
        break;
      }
    }
    return elements;
  };

  return {
    previous,
    current,
    next,
    first,
    last,
    onPageChange,
    getNextOrPrevious,
    showNextFiveElements,
  };
};

export default usePagination;
