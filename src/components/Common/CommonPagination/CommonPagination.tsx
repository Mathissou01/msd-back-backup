import classNames from "classnames";
import React from "react";
import "./common-pagination.scss";

export interface ICommonPaginationProps {
  currentPage: number;
  rowCount: number;
  onChangePage: (page: number, totalRows: number) => void;
  onChangeRowsPerPage?: (
    currentRowsPerPage: number,
    currentPage: number,
  ) => void;
  noRowsPerPage?: boolean;
  rowsPerPage?: number;
  rowsPerPageOptions?: Array<number>;
  rowsPerPageText?: string;
}

export default function CommonPagination({
  currentPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage,
  noRowsPerPage,
  rowsPerPage = 10,
  rowsPerPageOptions = [10, 20, 50, 100],
  rowsPerPageText = "Entrées par page",
}: ICommonPaginationProps) {
  // Calcul du nombre total de pages nécessaires pour paginer les données
  const pageCount = Math.ceil(rowCount / rowsPerPage);

  // Construction des classes de style dynamiques pour le composant
  const paginationClassNames = classNames("c-CommonPagination", {
    "c-CommonPagination_hasRowsPerPage": !noRowsPerPage,
  });
  const previousClassNames = classNames("c-CommonPagination__Backward", {
    "c-CommonPagination__Backward_disabled": currentPage === 1,
  });
  const nextClassNames = classNames("c-CommonPagination__Forward", {
    "c-CommonPagination__Forward_disabled": currentPage === pageCount,
  });

  // Nombre maximal de pages visibles
  const MAX_VISIBLE_PAGES = 20;

  let pages: (number | string)[] = [];

  if (pageCount <= MAX_VISIBLE_PAGES) {
    pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  } else {
    const threshold = Math.floor(MAX_VISIBLE_PAGES / 2);

    if (currentPage <= threshold) {
      // Si la page actuelle est en dessous du seuil, afficher les premières pages et "ellipsis"
      pages = [
        ...Array.from({ length: MAX_VISIBLE_PAGES - 2 }, (_, i) => i + 1),
        "ellipsis",
        pageCount,
      ] as (number | string)[];
    } else if (currentPage > pageCount - threshold) {
      // Si la page actuelle est proche de la fin, afficher "ellipsis" et les dernières pages
      pages = [1, "ellipsis" as const].concat(
        Array.from(
          { length: MAX_VISIBLE_PAGES - 2 },
          (_, i) => pageCount - MAX_VISIBLE_PAGES + 3 + i,
        ),
      );
    } else {
      // Sinon, afficher "ellipsis" au début et à la fin, ainsi que les pages environnantes
      pages = [1, "ellipsis" as const];
      const start = currentPage - Math.floor(threshold / 2);
      const end = currentPage + Math.floor(threshold / 2);
      pages = pages
        .concat(Array.from({ length: end - start + 1 }, (_, i) => start + i))
        .concat(["ellipsis" as const, pageCount] as const);
    }
  }

  return (
    <>
      {pageCount >= 1 && (
        <div className={paginationClassNames}>
          {!noRowsPerPage ||
            (onChangeRowsPerPage && (
              <div className="c-CommonPagination__RowsPerPage">
                <select
                  className="c-CommonPagination__Select"
                  name="rowsPerPage"
                  id="rowsPerPage"
                  defaultValue={rowsPerPage}
                  onChange={(t) =>
                    onChangeRowsPerPage(parseInt(t.target.value), currentPage)
                  }
                >
                  {/* Options pour le nombre d'éléments par page */}
                  {rowsPerPageOptions?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {/* Libellé indiquant le nombre d'éléments par page */}
                <span className="c-CommonPagination__Label">
                  {rowsPerPageText}
                </span>
              </div>
            ))}
          <nav className="c-CommonPagination__Navigation">
            {/* Boutons pour passer à la page précédente */}
            <div className={previousClassNames}>
              <button
                type="button"
                className="c-CommonPagination__Button c-CommonPagination__Button_arrowTo c-CommonPagination__Button_reverse"
                disabled={currentPage <= 1}
                onClick={() => onChangePage(1, rowCount)}
              />
              <button
                type="button"
                className="c-CommonPagination__Button c-CommonPagination__Button_arrow c-CommonPagination__Button_reverse"
                disabled={currentPage <= 1}
                onClick={() => onChangePage(currentPage - 1, rowCount)}
              />
            </div>
            <div className="c-CommonPagination__Pages">
              {pages.map((page, index) => {
                // Rendu de "ellipsis" ou du bouton de page
                if (page === "ellipsis") {
                  return (
                    <span
                      key={`ellipsis_${index}`}
                      className="c-CommonPagination__Page"
                    >
                      ...
                    </span>
                  );
                }
                return (
                  <button
                    key={index}
                    className={classNames("c-CommonPagination__Page", {
                      "c-CommonPagination__Page_active": page === currentPage,
                    })}
                    onClick={() => onChangePage(page as number, rowCount)}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            {/* Boutons pour passer à la page suivante */}
            <div className={nextClassNames}>
              <button
                type="button"
                className="c-CommonPagination__Button c-CommonPagination__Button_arrow"
                disabled={currentPage >= pageCount}
                onClick={() => onChangePage(currentPage + 1, rowCount)}
              />
              <button
                type="button"
                className="c-CommonPagination__Button c-CommonPagination__Button_arrowTo"
                disabled={currentPage >= pageCount}
                onClick={() => onChangePage(pageCount, rowCount)}
              />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
