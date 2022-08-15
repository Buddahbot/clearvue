import axios from "axios";

//////////// Add customer
export const addUser = async (
  // userCustomerId,
  userName,
  userEmail,
  userVatNumber
) => {
  try {
    const res = await axios.post(`http://localhost:3300/api/users/create`, {
      // customer_id: userCustomerId,
      name: userName,
      email: userEmail,
      vat_number: userVatNumber,
    });
  } catch (err) {
    console.log(err);
  }
};

/////////// Get all users

export const userInfo = async () => {
  try {
    const res = await axios.get(`http://localhost:3300/api/users`);
    console.log(res);
    return res.data;
  } catch (err) {
    return console.log(err);
  }
};

/////////// Get 1 user from contacts table

export const userDetails = async (customerid) => {
  console.log(customerid);
  try {
    const res = await axios.get(
      `http://localhost:3300/api/users/${customerid}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

///////////////Get all sites of 1 user
export const siteDetails = async (id) => {
  console.log(id);
  try {
    const res = await axios.get(`http://localhost:3300/api/users/site/${id}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

///////////////Get all meters of 1 site
export const meterDetails = async (siteId, id) => {
  console.log(siteId);
  try {
    const res = await axios.get(
      `http://localhost:3300/api/users/site/meter/${id}/${siteId}`
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

///////////////Get all Circuits of 1 meter
export const circuitDetails = async (meterId) => {
  console.log(meterId);
  try {
    const res = await axios.get(`http://localhost:3300/circuit/${meterId}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

///////////////Get all circuit children of circuit
export const circuitChildren = async (circuitId) => {
  console.log(circuitId);
  try {
    const res = await axios.get(
      `http://localhost:3300/circuitparent/${circuitId}`
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

///////////////Get 1 site of 1 user
export const singleSiteDetails = async (id, siteId) => {
  console.log(siteId);
  console.log(id);
  try {
    const res = await axios.get(`http://localhost:3300/site/${id}/${siteId}`);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

///////////////Get 1 meter of 1 site
export const singleMeterDetails = async (id, siteId, meterId) => {
  try {
    const res = await axios.get(
      `http://localhost:3300/meter/${id}/${siteId}/${meterId}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

///////////////Get 1 circuit of 1 meter
export const singleCircuitDetails = async (meterId, circuitId) => {
  try {
    const res = await axios.get(
      `http://localhost:3300/circuit/one/${meterId}/${circuitId}`
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
