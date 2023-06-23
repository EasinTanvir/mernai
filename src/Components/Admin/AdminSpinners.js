import Spinner from "react-bootstrap/Spinner";
import React from "react";

const AdminSpinners = () => {
  return (
    <div>
      <Spinner
        style={{ width: "60px", height: "60px" }}
        animation="border"
        variant="primary"
      />
    </div>
  );
};

export default AdminSpinners;
