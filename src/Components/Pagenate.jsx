import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, isAdmin = false }) => {
  return (
    <div
      style={{ height: "85vh", marginLeft: "30rem", width: "200px" }}
      className="d-flex position-fixed align-items-end"
    >
      {pages > 1 && (
        <Pagination size="md">
          {[...Array(pages).keys()].map((item) => (
            <LinkContainer
              key={item + 1}
              to={`/adminpannel/chat/page/${item + 1}`}
            >
              <Pagination.Item active={item + 1 === page}>
                {item + 1}
              </Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      )}
    </div>
  );
};

export default Paginate;
