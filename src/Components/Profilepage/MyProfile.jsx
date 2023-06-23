import React, { useState } from "react";
import "./profile.css";
import { useSelector } from "react-redux";
import axios from "axios";
import Spinners from "../Spinners";

const MyProfile = () => {
  const [input, setInput] = useState({ oldPassword: "", newPassword: "" });
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [success, setSuccess] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    setIsError("");
    setSuccess("");
    e.preventDefault();
    const sendData = {
      oldPassword: input.oldPassword,
      newPassword: input.newPassword,
    };

    setIsLoading(true);
    try {
      const { data } = await axios.patch(
        process.env.REACT_APP_SERVER_URL + `/user/updatepass`,
        sendData,
        {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }
      );
      setSuccess(data.message);
      setIsLoading(false);
      setInput({ oldPassword: "", newPassword: "" });
    } catch (err) {
      setIsError(err.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="authss">
      <h2>Update Password</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="d-flex flex-column gap-1">
          <label htmlFor="">Old Password</label>
          <input
            value={input.oldPassword}
            required
            onChange={onChangeHandler}
            name="oldPassword"
            type="password"
            placeholder="Old password"
          />
        </div>{" "}
        <div className="d-flex flex-column gap-1">
          <label htmlFor="">New Password</label>
          <input
            value={input.newPassword}
            required
            onChange={onChangeHandler}
            name="newPassword"
            type="password"
            placeholder="New password"
          />
        </div>
        <button type="submit">{isLoading ? <Spinners /> : "Update"} </button>
        {isError && (
          <div
            className=" w-50 margin-auto  mt-3 alert alert-danger"
            role="alert"
          >
            {isError}
          </div>
        )}{" "}
        {success && (
          <div
            className=" w-50 margin-auto  mt-3 alert alert-success"
            role="alert"
          >
            {success}
          </div>
        )}
      </form>
    </div>
  );
};

export default MyProfile;
