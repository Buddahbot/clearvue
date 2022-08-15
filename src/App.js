import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AllUsersx from "./AllUsers";
import Customer from "./Customer";
import AddUser from "./AddUser";
import Site from "./Site";
import Meter from "./Meter";
import Circuit from "./Circuit";

const App = () => (
  <div className="wraper">
    <Routes>
      <Route exact path="/customer/:customerid" element={<Customer />} />
    </Routes>
    <Routes>
      <Route exact path="/adduser" element={<AddUser />} />
    </Routes>
    <Routes>
      <Route exact path="/site/:id/:siteId" element={<Site />} />
    </Routes>
    <Routes>
      <Route
        exact
        path="/circuit/one/:meterId/:circuitId"
        element={<Circuit />}
      />
    </Routes>
    <Routes>
      <Route exact path="/meter/:id/:siteId/:meterId" element={<Meter />} />
    </Routes>
    <Routes>
      <Route exact path="/" element={<AllUsersx />} />
    </Routes>

    <Routes>
      <Route exact path="/allusersx" element={<AllUsersx />} />
    </Routes>
  </div>
);
export default App;
