import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { userDetails } from "./UserFunctions";
import { siteDetails } from "./UserFunctions";
import { meterDetails } from "./UserFunctions";
import { singleSiteDetails } from "./UserFunctions";
import { userUpdate } from "./UserFunctions";
import { singleMeterDetails } from "./UserFunctions";
import { singleCircuitDetails } from "./UserFunctions";
import { circuitChildren } from "./UserFunctions";
import Navbar from "./Navbar";
import ava7 from "./images/ava10.jpeg";

import axios from "axios";

const Circuit = () => {
  const { meterId, circuitId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userDetail, setUserDetail] = useState([]);
  const [userDetailUpdate, setUserDetailUpdate] = useState([]);
  const [name, setName] = useState([]);
  const [userName, setUserName] = useState([]);
  const [userSerialNumber, setUserSerialNumber] = useState([]);
  const [userInstallationDate, setUserInstallationDate] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [userCircuitId, setUserCircuitId] = useState([]);
  const [userCircuitName, setUserCircuitName] = useState([]);
  const [userIsMain, setUserIsMain] = useState(Boolean);
  const [userInstallationDateCircuit, setUserInstallationDateCircuit] =
    useState([]);

  const [thisBoolean, setThisBoolean] = useState();
  const [getAllCircuitChildren, setGetAllCircuitChildren] = useState([]);
  const [oneCircuit, setOneCircuit] = useState([]);

  let navigate = useNavigate();
  //////////// Get 1 circuit of 1 meter
  useEffect(() => {
    const fetchData = async () => {
      const circuitData = await singleCircuitDetails(meterId, circuitId);
      console.log(circuitData);
      setOneCircuit(circuitData);
      setIsLoading(false);
    };
    fetchData().catch(console.error);
  }, []);
  console.log(circuitId);
  ////////// Get all meters from site
  useEffect(() => {
    const fetchData = async () => {
      const dataCircuit = await circuitChildren(circuitId);
      // console.log(dataCircuit);
      setGetAllCircuitChildren(dataCircuit);
      console.log(getAllCircuitChildren);
      setIsLoading(false);
    };
    fetchData().catch(console.error);
  }, []);

  //////// Update meter click handler
  const clickyUpdateCircuit = (e) => {
    const createNewCircuitParameters = {
      name: name,
    };
    updateCircuit(createNewCircuitParameters);
  };

  ///////// Delete circuit click handler
  const clickyDelete = () => {
    deleteCircuit();
  };
  /////// Add circuit click handler
  const clickyAddCircuit = () => {
    addCircuit();
  };

  const addCircuit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:3300/circuit/createcircuit/ofcircuit`,
        {
          name: userCircuitName,
          meter_id: meterId, // comes from params
          installation_date: userInstallationDateCircuit,
          is_main: userIsMain,
          circuit_id_parent: circuitId,
        }
      );
      if (res) setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  ////////// Update 1 meter
  const updateCircuit = async (createNewMeterParameters) => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:3300/circuit/update/${meterId}/${circuitId}`,
        {
          name: name,
        }
      );
      if (res) setIsLoading(false);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  /////////////// Delete 1 Site
  const deleteCircuit = async () => {
    setIsLoading(true);
    console.log(circuitId);
    try {
      const res = await axios.delete(
        `http://localhost:3300/api/circuit/delete/${circuitId}`
      );
      setIsLoading(false);
      if (res) navigate(`../`);
      if (res) window.location.reload(false);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  console.log(thisBoolean);
  return (
    <>
      <Navbar />
      {oneCircuit.map((e) => {
        return (
          <div>
            <div class="d-flex flex-row justify-content-space-around  mt-5 border-orange ">
              <div class="d-flex flex-column w-20 bd-highlight m-2 pt-4 border-green">
                <ul>
                  <h2> Your Circuit</h2>
                </ul>
                <button
                  class="btn btn-sm btn-danger mt-3 mb-3"
                  onClick={clickyDelete}
                >
                  Delete Circuit
                </button>
                <h5>
                  {" "}
                  <ul>
                    <li>
                      <div>
                        Meter Id:
                        <span class="fw-bold no-underline"> {e.meter_id}</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        Circuit Id:
                        <span class="fw-bold no-underline">
                          {" "}
                          {e.circuit_id}{" "}
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
                        Installation Date:
                        <span class="fw-bold no-underline">
                          {" "}
                          {e.installation_date}
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        Is Main Circuit:
                        <span class="fw-bold no-underline"></span>
                      </div>
                    </li>
                  </ul>
                </h5>
              </div>
            </div>
            <form onSubmit={clickyUpdateCircuit}>
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
                        Update Circuit
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
          <h2> Add a curcuit to this circuit</h2>

          <h3>
            <div>
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
          </h3>
        </div>
        <div class="d-flex flex-column bd-highlight pl-3 border-green"></div>
      </div>
      <h3>Your Circuits</h3>
      <div></div>
    </>
  );
};

export default Circuit;
