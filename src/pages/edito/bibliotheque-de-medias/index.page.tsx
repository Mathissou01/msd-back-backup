import React, { useState } from "react";
import { useGetFilesPaginationByFolderIdQuery } from "../../../graphql/codegen/generated-types";
import CommmonPagination from "../../../components/Common/CommonPagination/CommonPagination";
import CommonLoader from "../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../components/PageTitle/PageTitle";

export default function BibliothequeDeMedia() {
  /* Static Data */
  const formLabels = {
    title: "Ajouter des médias",
    description: "",
  };
  const pageSizes = [10, 20, 50, 100];

  /* Local Data */
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPagesize, setCurrentPagesize] = useState<number>(10);

  /* Methods */
  function previousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage < (data?.uploadFiles?.meta.pagination?.pageCount ?? 1)) {
      setCurrentPage(currentPage + 1);
    }
  }

  function lastPage() {
    if (currentPage < (data?.uploadFiles?.meta.pagination?.pageCount ?? 1)) {
      setCurrentPage(data?.uploadFiles?.meta.pagination?.pageCount ?? 1);
    }
  }

  /* External Data */
  const folderId = "2"; // TODO folderId
  const { loading, error, data } = useGetFilesPaginationByFolderIdQuery({
    variables: {
      filters: {
        folder: {
          id: {
            eq: folderId,
          },
        },
      },
      pagination: {
        page: currentPage,
        pageSize: currentPagesize,
      },
      sort: "createdAt:desc",
    },
  });

  return (
    <>
      <PageTitle
        title={formLabels.title}
        description={formLabels.description}
      />{" "}
      <CommonLoader isLoading={loading} isCover={true} errors={[error]}>
        <CommmonPagination
          pageSize={pageSizes}
          pageCount={data?.uploadFiles?.meta.pagination?.pageCount}
          page={currentPage}
          onPreviousPage={previousPage}
          onNextPage={nextPage}
          onFirstPage={() => setCurrentPage(1)}
          onLastPage={lastPage}
          onSpecificPage={(i) => setCurrentPage(i)}
          setCurrentPagesize={setCurrentPagesize}
        />
      </CommonLoader>
    </>
  );
}
