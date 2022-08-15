import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { circuitDetails } from "./UserFunctions";
import { userUpdate } from "./UserFunctions";
import { singleMeterDetails } from "./UserFunctions";
import ava7 from "./images/ava10.jpeg";

import Navbar from "./Navbar";
import axios from "axios";

const Meter = () => {
  const { id, siteId, meterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [circuitDetail, setCircuitDetail] = useState([]);
  const [oneMeter, setOneMeter] = useState([]);
  const [userName, setUserName] = useState([]);
  const [userSerialNumber, setUserSerialNumber] = useState([]);
  const [userInstallationDate, setUserInstallationDate] = useState([]);
  const [userCircuitName, setUserCircuitName] = useState([]);
  const [userIsMain, setUserIsMain] = useState(Boolean);
  const [userInstallationDateCircuit, setUserInstallationDateCircuit] =
    useState([]);

  let navigate = useNavigate();
  //////////// Get 1 meter of 1 site
  useEffect(() => {
    const fetchData = async () => {
      const dataMeter = await singleMeterDetails(id, siteId, meterId);
      // console.log(dataUsers);
      setOneMeter(dataMeter);
      setIsLoading(false);
    };
    fetchData().catch(console.error);
  }, []);

  //////// Get all circuits from meter
  useEffect(() => {
    const fetchData = async () => {
      const dataCircuit = await circuitDetails(meterId);

      console.log(dataCircuit);
      setCircuitDetail(dataCircuit);

      setIsLoading(false);
    };
    fetchData().catch(console.error);
  }, []);

  ////////// Update meter click handler
  const clickyUpdateMeter = (e) => {
    e.preventDefault();

    updateMeter();
  };

  /////////// Delete site click handler
  const clickyDelete = () => {
    deleteMeter(meterId);
  };
  /////////// Add meter click handler
  const clickyAddCircuit = () => {
    addCircuit();
  };
  console.log(id);

  //////////// Add circuit
  const addCircuit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `http://localhost:3300/circuit/createcircuit`,
        {
          name: userCircuitName,
          meter_id: meterId, // comes from params
          installation_date: userInstallationDateCircuit,
          is_main: userIsMain,
        }
      );
      if (res) setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  ////////// Update 1 meter
  const updateMeter = async () => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:3300/meter/update/${siteId}/${meterId}`,
        {
          name: userName,
          serial_number: userSerialNumber,
          installation_date: userInstallationDate,
        }
      );
      if (res) setIsLoading(false);
      if (res) window.location.reload(false);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  /////////////// Delete 1 meter
  const deleteMeter = async () => {
    setIsLoading(true);
    console.log(meterId);
    try {
      const res = await axios.delete(
        `http://localhost:3300/meter/delete/${meterId}`
      );
      if (res) setIsLoading(false);
      if (res) navigate(`../customer/${id}`);
      if (res) window.location.reload(false);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      {oneMeter.map((e) => {
        return (
          <div>
            <div class="d-flex flex-row justify-content-space-around  mt-5 border-orange ">
              <div class="d-flex flex-column w-20 bd-highlight m-2 pt-4 border-green">
                <ul>
                  <h2> Your Meter</h2>
                </ul>
                <button
                  class="btn btn-sm btn-danger mt-3 mb-3"
                  onClick={clickyDelete}
                >
                  Delete Meter
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
                        Serial Number:
                        <span class="fw-bold no-underline">
                          {" "}
                          {e.serial_number}
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        Meter id:
                        <span class="fw-bold no-underline"> {e.meter_id}</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        Installation Date:
                        <span class="fw-bold no-underline">
                          {" "}
                          {e.installation_date}
                        </span>
                      </div>
                    </li>
                  </ul>
                </h5>
              </div>
            </div>
            <form onSubmit={clickyUpdateMeter}>
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
                              placeholder="Serial Number"
                              value={userSerialNumber}
                              class="form-control"
                              required
                              onChange={(e) =>
                                setUserSerialNumber(e.target.value)
                              }
                            />
                            <input
                              type="text"
                              class="form-control   inputbg-home"
                              value={userInstallationDate}
                              onFocus={(e) =>
                                (e.target.type = "datetime-local")
                              }
                              onChange={(e) =>
                                setUserInstallationDate(e.target.value)
                              }
                              placeholder="Meter Installation Date"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-column bd-highlight pt-4 m-2 border-purple">
                      <button class="btn btn-sm btn-success" type="submit">
                        Update Meter
                      </button>
                    </div>
                  </div>
                  <div class="d-flex flex-row justify-content-center bd-highlight m-2 border-orange">
                    <div class="d-flex flex-column  bd-highlight m-2 border-green"></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        );
      })}
      <div class="d-flex flex-row justify-content-center bd-highlight m-2 border-orange ">
        <div class="d-flex flex-column w-50 bd-highlight pl-3 border-green">
          <h2> Add a curcuit to this meter</h2>
          <h3>
            {/* {oneMeter.map((e) => {
              return ( */}
            <div>
              <p></p>
              <div>
                <form onSubmit={clickyAddCircuit}>
                  <input
                    type="text"
                    name="CircuitName"
                    placeholder="Circuit Name "
                    value={userCircuitName}
                    class="form-control"
                    required
                    onChange={(e) => setUserCircuitName(e.target.value)}
                  />
                  {/* <input
                        type="text"
                        name="SerialNumber"
                        placeholder="Serial Number"
                        value={userIsMain}
                        class="form-control"
                        required
                        onChange={(e) => setUserIsMain(e.target.value)}
                      /> */}
                  <select
                    onChange={(e) => setUserIsMain(e.target.value)}
                    value={userIsMain}
                    name="selectList"
                    id="selectList"
                  >
                    <option value="true">Is Main Circuit</option> {" "}
                    <option value="false">Is Not Main Circuit</option>
                  </select>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control   inputbg-home"
                      value={userInstallationDateCircuit}
                      onFocus={(e) => (e.target.type = "datetime-local")}
                      onChange={(e) =>
                        setUserInstallationDateCircuit(e.target.value)
                      }
                      placeholder="Installation Date"
                      required
                    />
                  </div>
                  <button
                    class="btn btn-sm btn-success"
                    // onClick={dateHandler}
                    type="submit"
                  >
                    Add Circuit
                  </button>
                </form>
              </div>
            </div>
            {/* );
            })} */}
          </h3>
        </div>
        <div class="d-flex flex-column bd-highlight pl-3 border-green"></div>
      </div>
      <h3>Your Circuits</h3>
      <div class="container">
        <table class="table table-condensed">
          <thead>
            <tr>
              <th> Circuit Id</th>
              <th> Meter Id</th>
              <th> Circuit Name</th>
              <th> Is Main Circuit</th>
              <th> Installation Date</th>
            </tr>
          </thead>
          {circuitDetail.map((e) => (
            <tbody>
              <tr>
                <Link to={`../circuit/one/${e.meter_id}/${e.circuit_id}`}>
                  <td> {e.circuit_id} </td>
                </Link>
                <td> {e.meter_id} </td>
                <td> {e.name} </td>
                <td> {e.is_main} </td>
                <td> {e.installation_date} </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};

export default Meter;
