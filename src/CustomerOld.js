import { Link, useParams, useNavigate, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { userDetails } from "./UserFunctions";
import { siteDetails } from "./UserFunctions";
import ava7 from "./images/ava10.jpeg";
import Navbar from "./Navbar";
import axios from "axios";

const Customer = () => {
  const { customerid } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userDetail, setUserDetail] = useState([]);
  const [siteDetail, setSiteDetail] = useState([]);
  const [userName, setUserName] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [userCustomerId, setUserCustomerId] = useState([]);
  const [userSiteName, setUserSiteName] = useState([]);
  const [userVatNumber, setUserVatNumber] = useState([]);
  const [userCoordinates, setUserCoordinates] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [userPostcode, setUserPostcode] = useState([]);

  let navigate = useNavigate();

  //////////// Get 1 user from contacts
  useEffect(() => {
    const fetchData = async () => {
      const dataUsers = await userDetails(customerid);
      setUserDetail(dataUsers);
      setIsLoading(false);
    };
    fetchData().catch(console.error);
  }, []);
  console.log(userVatNumber);
  //////////// Get all sites from site
  useEffect(() => {
    const fetchData = async () => {
      const dataSite = await siteDetails(customerid);
      setSiteDetail(dataSite);
      setIsLoading(false);
    };
    fetchData().catch(console.error);
  }, []);

  ////////// Update user click handler
  const clickyUpdateUser = () => {
    updateUser();
  };

  /////////// Delete user click handler
  const clickyDelete = () => {
    deleteUser();
  };
  /////////// Add site click handler
  const clickyAddSite = () => {
    addSite();
  };

  //////////// Add site
  const addSite = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:3300/api/users/createSite`,
        {
          customer_id: customerid,
          // site_id: userSiteId,
          name: userSiteName,
          coordinates: userCoordinates,
          address: userAddress,
          post_code: userPostcode,
        }
      );
      if (res) setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  ////////// Update 1 user
  const updateUser = async () => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:3300/api/users/update/${customerid}`,
        {
          customer_id: customerid, // comes from useparams
          name: userName,
          email: userEmail,
          vat_number: userVatNumber,
        }
      );
      setIsLoading(false);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  /////////////// Delete 1 user
  const deleteUser = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(
        `http://localhost:3300/api/users/delete/${customerid}`
      );
      setIsLoading(false);
      if (res) navigate("../");
      if (res) window.location.reload(false);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  console.log(userEmail);

  return (
    <>
      <Navbar />
      {userDetail.map((e) => {
        return (
          <div>
            <div class="d-flex flex-row justify-content-space-around  mt-5 border-orange ">
              <div class="d-flex flex-column w-15 bd-highlight m-2 pt-4 border-green">
                <button
                  class="btn btn-sm btn-danger mt-3 mb-3"
                  onClick={clickyDelete}
                >
                  Delete Customer
                </button>
                <h5>
                  {" "}
                  <ul>
                    <li>
                      <div>
                        Customer Id:
                        <span class="fw-bold no-underline">
                          {" "}
                          {e.customer_id}
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        Name:
                        <span class="fw-bold no-underline"> {e.name} </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        Email:
                        <span class="fw-bold no-underline"> {e.email} </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        VAT Number:
                        <span class="fw-bold no-underline">
                          {" "}
                          {e.vat_number}
                        </span>
                      </div>
                    </li>
                  </ul>
                </h5>
              </div>
            </div>

            <div class="d-flex flex-row justify-content-around bd-highlight m-2 border-orange ">
              <div class="d-flex flex-column w-50 bd-highlight m-2 border-green">
                <div class="d-flex flex-row justify-content-left bd-highlight m-2 border-orange ">
                  <div class="d-flex flex-column bd-highlight mb-3 border-purple">
                    <div>
                      <img src={ava7} alt="avatar" class="contact-image-xl" />
                    </div>
                  </div>
                </div>

                <div class="d-flex flex-row justify-content-end bd-highlight m-2 border-orange ">
                  <div class="d-flex flex-column bd-highlight m-2 border-purple"></div>
                </div>
              </div>

              <div class="d-flex flex-column w-100 bd-highlight m-2 border-green">
                <form onSubmit={clickyUpdateUser}>
                  <div class="d-flex flex-row bd-highlight m-2  border-orange ">
                    <div class="d-flex flex-column w-50 bd-highlight m-2 border-purple">
                      <div>
                        <div class="card my-2 list-group-item  ">
                          <div class="card-body">
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
                              name="customerId"
                              placeholder="Customer Id"
                              value={customerid} // comes from usearams
                              class="form-control"
                              required
                              onChange={(e) =>
                                setUserCustomerId(e.target.value)
                              }
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
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="d-flex flex-column bd-highlight pt-4 m-2 border-purple">
                      <button class="btn btn-sm btn-success" type="submit">
                        Update Customer
                      </button>
                    </div>
                  </div>
                </form>

                <form onSubmit={clickyAddSite}>
                  <div class="d-flex flex-row bd-highlight m-2  border-orange ">
                    <div class="d-flex flex-column w-50 bd-highlight m-2 border-purple">
                      <div>
                        <div>
                          <div class="card my-2 list-group-item  ">
                            <div class="card-body">
                              <input
                                type="text"
                                name="siteName"
                                placeholder="Site Name "
                                value={userSiteName}
                                class="form-control"
                                required
                                onChange={(e) =>
                                  setUserSiteName(e.target.value)
                                }
                              />
                              <input
                                type="text"
                                name="coordinates"
                                placeholder="Coordinates"
                                value={userCoordinates}
                                class="form-control"
                                required
                                onChange={(e) =>
                                  setUserCoordinates(e.target.value)
                                }
                              />
                              <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={userAddress}
                                class="form-control"
                                required
                                onChange={(e) => setUserAddress(e.target.value)}
                              />
                              <input
                                type="text"
                                name="postcode"
                                placeholder="Postcode"
                                value={userPostcode}
                                class="form-control"
                                required
                                onChange={(e) =>
                                  setUserPostcode(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="d-flex flex-column bd-highlight pt-4 m-2 border-purple">
                      <button class="btn btn-sm btn-success" type="submit">
                        Add Site
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      })}

      <div class="d-flex flex-row justify-content-center  bd-highlight m-2 border-orange ">
        <div class="d-flex flex-column w-50 bd-highlight pl-5 border-green">
          <h3></h3>
        </div>
        <div class="d-flex flex-column bd-highlight pl-3 border-green"></div>
      </div>
      <h3>Your Sites</h3>
      <div class="container">
        <table class="table table-striped">
          <thead>
            <tr>
              <th> Name</th>
              <th> Customer Id</th>
              <th> Site Id</th>
              <th> Coordinates</th>
              <th> Address</th>
              <th> post_code</th>
            </tr>
          </thead>
          {siteDetail.map((e) => (
            <tbody>
              <tr>
                <Link to={`../site/${e.customer_id}/${e.site_id}`}>
                  <td> {e.name} </td>
                </Link>
                <td> {e.customer_id} </td>
                <td> {e.site_id} </td>
                <td> {e.coordinates} </td>
                <td> {e.address} </td>
                <td> {e.post_code} </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default Customer;
