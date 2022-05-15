//const [paginationItems, setPaginationItems] = React.useState("");
import React from "react";
import ReactPaginate from "react-paginate";
import { MemberEntity } from "list";
import { Link, generatePath } from "react-router-dom";

interface Pagination {
  offset: number;
  perPage: number;
  currentPage: number;
  pageCount: number;
  paginationContent: any;
}

interface ListPaginationProps {
  memberList: MemberEntity[];
}
export const ListPagination: React.FC = (props: ListPaginationProps) => {
  const { memberList } = props;
  const [pagination, setPagination] = React.useState<Pagination>({
    offset: 0,
    perPage: 10,
    currentPage: 0,
    pageCount: 0,
    paginationContent: [],
  });

  const setElementsForCurrentPage = () => {
    const pageItems = memberList
      .slice(pagination.offset, pagination.offset + pagination.perPage)
      .map((member, i) => {
        return (
          <tr key={member.id}>
            <td>
              <img src={member.avatar_url} style={{ width: "5rem" }} />
            </td>
            <td>
              <span>{member.id}</span>
            </td>
            <td>
              <Link to={generatePath("/detail/:id", { id: member.login })}>
                {member.login}
              </Link>
            </td>
          </tr>
        );
      });
    setPagination({ ...pagination, paginationContent: pageItems });
  };

  React.useEffect(() => {
    memberList ? setElementsForCurrentPage() : "";
  }, [memberList, pagination]);

  const handlePageClick = (pages) => {
    const selectedPage = pages.selected;
    const offset = selectedPage * pagination.perPage;
    setPagination({ ...pagination, currentPage: selectedPage, offset: offset });
  };

  const paginationElement = (
    <ReactPaginate
      previousLabel={"← Anterior"}
      nextLabel={"Siguiente →"}
      breakLabel={<span className="gap">...</span>}
      pageCount={pagination.pageCount}
      onPageChange={handlePageClick}
      forcePage={pagination.currentPage}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-link"}
      previousClassName={"page-link"}
      previousLinkClassName={"page-item"}
      nextClassName={"page-link"}
      nextLinkClassName={"page-item"}
      disabledClassName={"disabled"}
      activeClassName={"page-item active"}
      activeLinkClassName={"page-link"}
    />
  );
  return (
    <>
      <div className="card-body">
        <table className="table table-bordered  table-hover table-sm">
          <thead>
            <tr>
              <th className="th-sm">Avatar</th>
              <th className="th-sm">Id</th>
              <th className="th-sm">Tema</th>
            </tr>
          </thead>
          <tbody>{pagination.paginationContent}</tbody>
        </table>
        <div>{paginationElement}</div>
      </div>
    </>
  );
};
