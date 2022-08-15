import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { meterDetails } from "./UserFunctions";
import { singleSiteDetails } from "./UserFunctions";

import ava7 from "./images/ava10.jpeg";

import Navbar from "./Navbar";
import axios from "axios";

const Site = () => {
  const { id, siteId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [siteDetail, setSiteDetail] = useState([]);
  const [meterDetail, setMeterDetail] = useState([]);
  const [userMeterName, setUserMeterName] = useState([]);
  const [userName, setUserName] = useState([]);

  const [userCoordinates, setUserCoordinates] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [userPostcode, setUserPostcode] = useState([]);
  const [userSerialNumber, setUserSerialNumber] = useState([]);
  const [userInstallationDate, setUserInstallationDate] = useState([]);
  const [startDate, setStartDate] = useState("");

  let navigate = useNavigate();

  //////////// Get 1 site of 1 user
  useEffect(() => {
    const fetchData = async () => {
      const dataSite = await singleSiteDetails(id, siteId);
      console.log(dataSite);
      setSiteDetail(dataSite);
      console.log(siteDetail);
      setIsLoading(false);
    };
    fetchData().catch(console.error);
  }, []);

  ////////// Get all meters from site
  useEffect(() => {
    const fetchData = async () => {
      const dataMeter = await meterDetails(id, siteId);
      console.log(dataMeter);
      setMeterDetail(dataMeter);
      // console.log(meterDetail);
      setIsLoading(false);
    };
    fetchData().catch(console.error);
  }, []);

  ////////// Update site click handler
  const clickyUpdateSite = () => {
    const createNewUser = {
      //   email: customerEmail,
    };
    updateSite(createNewUser);
  };

  /////////// Delete site click handler
  const clickyDelete = () => {
    deleteSite();
  };
  /////////// Add meter click handler
  const clickyAddMeter = () => {
    addMeter();
  };
  console.log(id);

  //////////// Add meter
  const addMeter = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:3300/api/users/createMeter`,
        {
          customer_id: id,
          name: userMeterName,
          serial_number: userSerialNumber,
          installation_date: userInstallationDate,
          site_id: siteId,
        }
      );
      if (res) setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  ////////// Update 1 Site
  const updateSite = async (customerdata) => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:3300/api/site/update/${siteId}`,
        {
          name: userName,
          coordinates: userCoordinates,
          address: userAddress,
          post_code: userPostcode,
        }
      );
      if (res) setIsLoading(false);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  // const dateHandler = () => {
  //   const str = startDate;
  //   const index = 10;

  //   const first = str.slice(0, index);
  //   const second = str.slice(index);
  //   setUserInstallationDateToSQL(first);

  //   var myStr = userInstallationDateToSQL;
  //   var newStr = myStr.replace(/-/g, "/");
  //   console.log(newStr);
  //   setUserInstallationDate(newStr);
  // };

  /////////////// Delete 1 Site
  const deleteSite = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(
        `http://localhost:3300/api/site/delete/${siteId}`
      );
      setIsLoading(false);
      if (res) navigate("../");
      if (res) window.location.reload(false);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      {siteDetail.map((e) => {
        return (
          <div>
            <div class="d-flex flex-row justify-content-space-around  mt-5 border-orange ">
              <div class="d-flex flex-column w-20 bd-highlight m-2 pt-4 border-green">
                <ul>
                  <h2> Your Site</h2>
                </ul>
                <button
                  class="btn btn-sm btn-danger mt-3 mb-3"
                  onClick={clickyDelete}
                >
                  Delete Site
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
                        Site Id:
                        <span class="fw-bold no-underline"> {e.site_id} </span>
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
                        Coordinates:
                        <span class="fw-bold no-underline">
                          {" "}
                          {e.coordinates}
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        Address:
                        <span class="fw-bold no-underline"> {e.address}</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        Post Code:
                        <span class="fw-bold no-underline"> {e.post_code}</span>
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
                <form onSubmit={clickyUpdateSite}>
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
                              name="Coordinates"
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
                              name="Address"
                              placeholder="Address"
                              value={userAddress} // comes from usearams
                              class="form-control"
                              required
                              onChange={(e) => setUserAddress(e.target.value)}
                            />
                            <input
                              type="text"
                              name="PostCode"
                              placeholder="Post Code"
                              value={userPostcode}
                              class="form-control"
                              required
                              onChange={(e) => setUserPostcode(e.target.value)}
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

                <form onSubmit={clickyAddMeter}>
                  <div class="d-flex flex-row bd-highlight m-2  border-orange ">
                    <div class="d-flex flex-column w-50 bd-highlight m-2 border-purple">
                      <div>
                        <div>
                          <div class="card my-2 list-group-item  ">
                            <div class="card-body"></div>
                            <input
                              type="text"
                              name="MeterName"
                              placeholder="Meter Name "
                              value={userMeterName}
                              class="form-control"
                              required
                              onChange={(e) => setUserMeterName(e.target.value)}
                            />
                            <input
                              type="text"
                              name="SerialNumber"
                              placeholder="Serial Number"
                              value={userSerialNumber}
                              class="form-control"
                              required
                              onChange={(e) =>
                                setUserSerialNumber(e.target.value)
                              }
                            />
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control   inputbg-home"
                                value={startDate}
                                onFocus={(e) =>
                                  (e.target.type = "datetime-local")
                                }
                                onChange={(e) => setStartDate(e.target.value)}
                                placeholder="Installation Date"
                                required
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
      <h3>Your Meters</h3>
      <div class="container">
        <table class="table table-striped">
          <thead>
            <tr>
              <th> Meter Id</th>
              <th>Customer Id </th>
              <th> Site Name</th>
              <th> Serial Number</th>
              <th> Site Id</th>
              <th> Installation Date</th>
            </tr>
          </thead>
          {meterDetail.map((e) => (
            <tbody>
              <tr>
                <Link
                  to={`../meter/${e.customer_id}/${e.site_id}/${e.meter_id}`}
                >
                  <td> {e.meter_id} </td>
                </Link>
                <td> {e.customer_id} </td>
                <td> {e.name} </td>
                <td> {e.serial_number} </td>
                <td> {e.site_id}</td>
                <td> {e.installation_date} </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default Site;
