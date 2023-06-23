import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from "uuid";
import "./login.css";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Error_Clear,
  Extra_Id,
  Google_Sign_In,
  Sign_In,
} from "../../store/actions";
import Spinners from "../Spinners";
import { provider, auth } from "../../Firebase";
import { signInWithPopup } from "firebase/auth";

const LogIn = () => {
  const form = useRef();
  const [googleData, setGoogleData] = useState();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [token, setToken] = useState(null);
  const [done, setDone] = useState(false);
  const [success, setSuccess] = useState("");
  const [signupSuccess, setSignUpSuccess] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isLogIn, setIsLogIn] = useState(false);
  const [resetPass, setRestPass] = useState(false);
  const [input, setInput] = useState({ email: "", password: "", confirm: "" });

  const dispatch = useDispatch();

  const { isLoading: myLoading, error } = useSelector((state) => state.error);
  const { user } = useSelector((state) => state.extra);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  //googlge authonication
  const googleHandler = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const sendData = {
          email: res.user.email,
          userId: res.user.uid,
          extraId: user,
        };

        dispatch(Google_Sign_In(sendData));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logInHandler = () => {
    setIsLogIn(false);
    setIsError("");
    setInput({ email: "", password: "", confirm: "" });
    dispatch(Error_Clear());
  };
  const createAcountHandler = () => {
    setIsLogIn(true);
    setIsError("");
    setInput({ email: "", password: "", confirm: "" });
    dispatch(Error_Clear());
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: input.email,
      password: input.password,
      extraId: user,
    };
    if (isLogIn && !resetPass) {
      //signup
      if (input.password != input.confirm) {
        setIsError("Your passwords must match.");
      } else {
        setIsLoading(true);
        try {
          await axios.post(
            process.env.REACT_APP_SERVER_URL + "/signup",
            loginData
          );
          setIsError("");
          setInput({ email: "", password: "", confirm: "" });
          setIsLoading(false);
          setIsLogIn(false);
          setSignUpSuccess("Create Account Successful. Please login");
        } catch (err) {
          setSignUpSuccess("");
          setIsError(err.response.data.message);
          setIsLoading(false);
        }
      }
    } else {
      //signin
      setSignUpSuccess("");
      dispatch(Sign_In(loginData));
    }
  };

  useEffect(() => {
    const easin = localStorage.getItem("userId")
      ? JSON.parse(localStorage.getItem("userId"))
      : null;
    if (!easin) {
      localStorage.setItem("userId", JSON.stringify(uuidv4()));
    }

    setTimeout(() => {
      const data = localStorage.getItem("userId")
        ? JSON.parse(localStorage.getItem("userId"))
        : null;

      dispatch(Extra_Id(data));
    }, 1000);
  }, []);

  const onEmailHandler = async (e) => {
    e.preventDefault();
    const sendData = {
      email: email,
    };
    setDone(true);
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/reset",
        sendData
      );
      setToken(data);

      setTimeout(() => {
        emailjs
          .sendForm(
            process.env.REACT_APP_SERVICE_URL,
            process.env.REACT_APP_TEMPLATE_URL,

            form.current,
            process.env.REACT_APP_PUBLIC_URL
          )
          .then(
            (result) => {
              setDone(false);

              setSuccess("An Email has been sent to your email address");
            },
            (error) => {
              setDone(false);
              console.log(error.text);
            }
          );
      }, 1500);
    } catch (err) {
      setDone(false);
      setEmailError(err.response.data.message);
    }
  };

  return (
    <div className="auth">
      <div className="auth-box">
        {resetPass ? (
          <form onSubmit={onEmailHandler} ref={form} className="reset">
            <h2>Reset Password</h2>
            <div className="form-group-g">
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder="Enter your Email"
                name="user_email"
                type="email"
                className="form-control"
              />{" "}
              <input
                value={
                  process.env.REACT_APP_PASSWORD_RESET_URL +
                  "/updatepassword/" +
                  token
                }
                type="hidden"
                className="form-control"
                name="message"
              />
            </div>

            <button type="submit" className="pass-btn">
              {done ? <Spinners /> : "SEND PASSWORD RESET LINK"}
            </button>
            {success && (
              <div class="alert alert-success" role="alert">
                {success}
              </div>
            )}
            <button onClick={() => setRestPass(false)} className="back-btn">
              BACK TO LOGIN
            </button>
          </form>
        ) : (
          <>
            <div className="auth-btn">
              <button onClick={logInHandler} className="actives">
                LOGIN
              </button>
              <button onClick={createAcountHandler}>CREATE ACCOUNT</button>
            </div>
            <div className="google-btn">
              <button onClick={googleHandler}>
                <span>
                  <GoogleIcon className="g-logo" />{" "}
                </span>{" "}
                <span>LOGIN WITH GOOGLE</span>
              </button>
            </div>
            <div className="ors d-flex justify-content-center gap-2">
              <div className="hr"></div>
              <span>or</span>
              <div className="hr">
                <hr />
              </div>
            </div>
            <form onSubmit={onSubmitHandler} className="auth-info">
              <div className="form-group-g">
                <label>Email</label>
                <input
                  required
                  name="email"
                  value={input.email}
                  onChange={onChangeHandler}
                  placeholder="Enter your Email"
                  data-toggle="tooltip"
                  data-placement="left"
                  type="email"
                  className="form-control"
                />
              </div>

              <div className="form-group-g">
                <label>Password</label>
                <input
                  required
                  name="password"
                  value={input.password}
                  onChange={onChangeHandler}
                  placeholder="Enter Password"
                  data-toggle="tooltip"
                  data-placement="left"
                  type="password"
                  className="form-control"
                />
              </div>

              {isLogIn && (
                <div className="form-group-g">
                  <label>Confirm Password</label>
                  <input
                    required
                    value={input.confirm}
                    name="confirm"
                    onChange={onChangeHandler}
                    placeholder="Please Confirm your password"
                    data-toggle="tooltip"
                    data-placement="left"
                    type="password"
                    className="form-control"
                  />
                </div>
              )}

              <button className="log-t" type="submit">
                {isLogIn ? (
                  isLoading ? (
                    <Spinners />
                  ) : (
                    "SignUp"
                  )
                ) : myLoading ? (
                  <Spinners />
                ) : (
                  "LOG IN"
                )}
              </button>
              {/* error */}

              {error && (
                <div class="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {isError && isLogIn && !signupSuccess && (
                <div class="alert alert-danger" role="alert">
                  {isError}
                </div>
              )}
              {signupSuccess && !isLogIn && !isError && (
                <div class="alert alert-success" role="alert">
                  {signupSuccess}
                </div>
              )}

              {/* error */}
              {!isLogIn && (
                <button onClick={() => setRestPass(true)} className="log-pass">
                  FORGOT YOUR PASSWORD?
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LogIn;
