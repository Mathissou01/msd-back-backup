import Image from "next/image";
import classNames from "classnames";
import React from "react";
import "./common-pagination.scss";

interface ICommonPaginationProps {
  pageCount: number | undefined;
  page: number;
  pageSize?: Array<number>;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  onSpecificPage: (i: number) => void;
  setCurrentPagesize: React.Dispatch<React.SetStateAction<number>>;
}

export default function CommonPagination({
  pageCount,
  page,
  pageSize,
  onPreviousPage,
  onNextPage,
  onFirstPage,
  onLastPage,
  onSpecificPage,
  setCurrentPagesize,
}: ICommonPaginationProps) {
  const buttonPreviousClassNames = classNames(
    "c-CommonPagination__ButtonsPreview",
    {
      "c-CommonPagination__ButtonsPreview_disabled": page === 1,
    },
  );

  const buttonNextClassNames = classNames("c-CommonPagination__ButtonsNext", {
    "c-CommonPagination__ButtonsNext_disabled": page === pageCount,
  });

  function handleCurrentPage(value: number) {
    setCurrentPagesize(value);
  }

  function handlePagesLinks(pageCount: number | undefined) {
    const linksTemplate = [];
    const lastLinkIndex = pageCount || 0;

    for (let i = 1; i <= lastLinkIndex; i++) {
      linksTemplate.push(
        <button
          key={i}
          className={classNames("c-CommonPagination__Page", {
            "c-CommonPagination__Page_active": i === page,
          })}
          onClick={() => onSpecificPage(i)}
        >
          {i}
        </button>,
      );
    }

    return linksTemplate;
  }

  return (
    <div className="c-CommonPagination">
      {pageSize ? (
        <div className="c-CommonPagination__MediaPerPage">
          <select
            className="c-CommonPagination__Select"
            name="mediaPerPage"
            id="mediaPerPage"
            onChange={(t) => {
              handleCurrentPage(parseInt(t.target.value));
            }}
          >
            {pageSize?.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="c-CommonPagination__Label">médias par page</span>
        </div>
      ) : null}
      <nav className="c-CommonPagination__Navigation">
        <div className={buttonPreviousClassNames}>
          <button
            type="button"
            className="c-CommonPagination__Icon"
            onClick={onPreviousPage}
          >
            <Image
              src="/images/pictos/arrow-button.svg"
              alt="arrow button"
              height={24}
              width={24}
              className="c-CommonPagination__IconDisabled"
            />
          </button>
          <button
            type="button"
            className="c-CommonPagination__Icon"
            onClick={onFirstPage}
          >
            <Image
              src="/images/pictos/button.svg"
              alt="Button First Page"
              height={24}
              width={24}
              className="c-CommonPagination__IconDisabled"
            />
          </button>
        </div>
        <div className="c-CommonPagination__NumberPage">
          {handlePagesLinks(pageCount)}
        </div>
        <div className={buttonNextClassNames}>
          <button
            type="button"
            className="c-CommonPagination__Icon"
            onClick={onNextPage}
          >
            <Image
              src="/images/pictos/arrow-button.svg"
              alt="arrow button"
              height={24}
              width={24}
            />
          </button>
          <button
            type="button"
            className="c-CommonPagination__Icon"
            onClick={onLastPage}
          >
            <Image
              src="/images/pictos/button.svg"
              alt="Bouton Last page"
              height={24}
              width={24}
            />
          </button>
        </div>
      </nav>
    </div>
  );
}
