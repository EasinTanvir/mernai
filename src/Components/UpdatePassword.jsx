import axios from "axios";
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinners from "./Spinners";
import { Button } from "react-bootstrap";

const UpdatePassword = () => {
  const { token } = useParams();
  const [input, setInput] = useState({ password: "", confirm: "" });
  const [isError, setIsError] = useState("");
  const [isLoadin, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const sendData = {
      password: input.password,
    };

    if (input.password != input.confirm) {
      setIsError("Your passwords must match.");
    } else {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/updatepassword/" + token,
          sendData
        );
        setSuccess(data.result);
        setIsLoading(false);
      } catch (err) {
        setIsError(err.response.data.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="auth">
      <div className="auth-box">
        {success ? (
          <div class="alert alert-success" role="alert">
            <div className="mb-3">{success}</div>
            <Link style={{ textDecoration: "none" }} to="/login">
              <Button>Back To LogIn</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmitHandler} className="reset">
            <h2>Update Password</h2>

            <div className="form-group-g">
              <label>Password</label>
              <input
                onChange={onChangeHandler}
                required
                name="password"
                placeholder="Enter Password"
                data-toggle="tooltip"
                data-placement="left"
                type="password"
                className="form-control"
              />
            </div>

            <div className="form-group-g">
              <label>Confirm Password</label>
              <input
                onChange={onChangeHandler}
                required
                name="confirm"
                placeholder="Please Confirm your password"
                data-toggle="tooltip"
                data-placement="left"
                type="password"
                className="form-control"
              />
            </div>
            <button type="submit" className="pass-btn">
              {isLoadin ? <Spinners /> : "UPDATE PASSWORD"}
            </button>
          </form>
        )}

        {isError && !success && (
          <div class="alert alert-danger" role="alert">
            {isError}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatePassword;
