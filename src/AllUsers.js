import React, { useState, useEffect } from "react";
import { userInfo } from "./UserFunctions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { addUser } from "./UserFunctions";
import {
  CircleSpinnerOverlay,
  FerrisWheelSpinner,
} from "react-spinner-overlay";

import ava7 from "./images/ava10.jpeg";

function AllUsers() {
  const [allUsersx, setAllUsersx] = useState();
  const [userName, setUserName] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [userCustomerId, setUserCustomerId] = useState([]);
  const [userVatNumber, setUserVatNumber] = useState([]);
  const [loading, setLoading] = useState(false);
  const [text1, setText1] = useState(true);

  const [isLoading, setIsLoading] = React.useState(true);

  let navigate = useNavigate();

  ///////////// Get all users
  useEffect(() => {
    setText1(false);
    const fetchData = async () => {
      const dataUsers = await userInfo();
      console.log(dataUsers);
      setAllUsersx(dataUsers);
      setIsLoading(false);
    };
    fetchData().catch(console.error);
  }, []);

  /////////// Add customer click handler
  const clickyAddUser = async () => {
    setIsLoading(true);
    const datausers = await addUser(userName, userEmail, userVatNumber);
    setIsLoading(false);
    if (!isLoading) window.location.reload(false);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div class="container mt-3">
        <div class="row">
          <div class="col border-orange">
            <div class="textcolorblue">
              <p class="hr2 fw-bold">
                <div class="textcustomblue"></div>
              </p>
            </div>
            <form>
              <div class="row">
                <div class="col-md-6">
                  <div class="row">
                    <div class="col">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search Customers..."
                      />
                    </div>
                    <div class="col">
                      <button class="btn btn-sm btn-success ">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div class="d-flex flex-row justify-content-center bd-highlight m-2 border-orange">
          <div class="d-flex flex-column w-50 bd-highlight m-2 border-green">
            {allUsersx.map((e) => (
              <Link id="no-underline" to={`./customer/${e.customer_id}`}>
                <div class="container mt-3 border-green">
                  <div class="row border-orange">
                    <div class="col-md-6 w-100 border-purple">
                      <div class="card my-2 list-group-item shadow-lg">
                        <div class="card-body body-grey">
                          <div class="row align-items-center border-green">
                            <div class="col-sm-4">
                              <img
                                src={ava7}
                                class="contact-image"
                                alt="avatar"
                              />
                            </div>

                            <div class="col-sm-7">
                              <ul class="list-group">
                                <li class="list-group-item">
                                  <span class="fw-bold">{e.customer_id}</span>
                                </li>
                                <li class="list-group-item ">
                                  Name:{" "}
                                  <span class="fw-bold no-underline">
                                    {e.name}
                                  </span>
                                </li>
                                <li class="list-group-item">
                                  Email: <span class="fw-bold">{e.email}</span>
                                </li>
                                <li class="list-group-item">
                                  VAT:{" "}
                                  <span class="fw-bold">{e.vat_number}</span>
                                </li>
                              </ul>
                            </div>
                            <div class="col-sm-1 d-flex flex-column justify-content-center align-item-center"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div d-flex flex-row>
            <div d-flex flex-col>
              {loading && (
                <FerrisWheelSpinner
                  loading={loading}
                  color="#6f42c1"
                  size="120"
                />
              )}
            </div>
          </div>

          <div class="d-flex flex-column w-50 bd-highlight pt-4 m-2 border-green">
            <form onSubmit={clickyAddUser}>
              <input
                type="text"
                name="userName"
                placeholder="Name"
                value={userName}
                class="form-control"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={userEmail}
                class="form-control"
                required
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <input
                type="text"
                name="vatNumber"
                placeholder="VAT Number"
                value={userVatNumber}
                class="form-control"
                required
                onChange={(e) => setUserVatNumber(e.target.value)}
              />
              <button class="btn btn-sm btn-success mt-2" type="submit">
                Add New Customer
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllUsers;
