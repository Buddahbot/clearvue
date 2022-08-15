import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import axios from "axios";

///////// Get 1 User
const AddUser = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userDetail, setUserDetail] = useState([]);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerId, setCustomerId] = useState();
  const [contactName, setContactName] = useState([]);

  const clicky = (e) => {
    e.preventDefault();

    const createNewUser = {
      customer_id: customerId,
      email: customerEmail,
      contact_name: contactName,
    };
    addUser(createNewUser);
  };

  const addUser = async (customerdata) => {
    try {
      const res = await axios.post(`http://localhost:3300/api/users/create/`, {
        customer_id: customerId,
        email: customerEmail,
        contact_name: contactName,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h3>
        <h1>Add User</h1>

        <div>
          {}
          <form onSubmit={clicky}>
            <input
              type="text"
              name="customer_name"
              placeholder="Email"
              value={customerEmail}
              required
              onChange={(e) => setCustomerEmail(e.target.value)}
            />

            <input
              type="text"
              name="customer_name"
              placeholder=""
              value={customerId}
              required
              onChange={(e) => setCustomerId(e.target.value)}
            />
            <input
              type="text"
              name="customer_name"
              placeholder="Firstname"
              value={contactName}
              required
              onChange={(e) => setContactName(e.target.value)}
            />

            <button type="submit">Add User</button>
          </form>
        </div>
      </h3>
    </>
  );
};

export default AddUser;
