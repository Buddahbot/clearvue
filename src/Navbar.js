import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  let navigate = useNavigate();

  return (
    <>
      <div class="nav ">
        {" "}
        <div class="nav-item mt-3 h3 textcustomwhite me-auto no-underline">
          <Link to={`../`}>Entities Manager 1.0</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
