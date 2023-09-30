import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../components";
import { useAccountContext } from "../../context";
import "./Login.style.scss";

function Login(){
  const [message, setMessage] = useState(null);
  const { loggedIn, login } = useAccountContext();
  const navigate = useNavigate();

  const attemptLogin = async () => {
    try {
      const message = await login("admin@email.com", "password");
      setMessage(message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loggedIn() === true) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return(
    <Page>
      <div className="login-page">
        <h1>Login</h1>
        <button onClick={() => attemptLogin()}>
          Login (as user set in code)
        </button>
        {message && <p>{message}</p>}
      </div>  

      <div>
        <form onSubmit={attemptLogin}>
          <div>
            <label>Email:</label>
            <input type="email"><br>
          </div>
          <div>
            <label><Password:></label>
            <input type="password"><br><br>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>

      
    </Page>  
  );
}

export default Login;
