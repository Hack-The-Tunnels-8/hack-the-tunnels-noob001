import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../components";
import { useAccountContext } from "../../context";
import "./Login.style.scss";

function Login() {
  const [message, setMessage] = useState(null);
  const { loggedIn, login } = useAccountContext();
  const navigate = useNavigate();

  // Create refs for the email and password inputs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const attemptLogin = async () => {
    try {
      // Get the values from the input fields
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      console.log(email, password);

      if (email && password) {
        const message = await login(email, password);
        setMessage(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loggedIn() === true) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <Page>
      <div className="login-page">
        <h1>Login</h1>
        <label htmlFor="en">Email:</label>
        <br />
        <input
          ref={emailRef}
          id="en"
          className="input-mail"
          type="email"
          name=""
        />
        <label htmlFor="enp">Password:</label>
        <br />
        <input
          ref={passwordRef}
          className="input-pass"
          type="password"
          name=""
          id="enp"
        />
        <button className="input-button" onClick={() => attemptLogin()}>
          Login
        </button>
        {message && <p>{message}</p>}
      </div>
    </Page>
  );
}

export default Login;
