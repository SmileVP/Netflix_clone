import React from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import { auth, provider } from "../../helpers/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  //for navigation
  let navigate = useNavigate();

  //function for signIn
  const handleSignIn = () => {
    //firebase function to display the signIn as popup
    signInWithPopup(auth, provider)
      .then((result) => {
        //if email verified is true go to home page
        if (result.user.emailVerified) {
          navigate("/home");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login_body">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt="Netflix Logo"
        />
        <Button
          className="login_button"
          variant="danger"
          onClick={() => handleSignIn()}
        >
          Sign in
        </Button>
      </div>
      <div className="login-description text-center">
        <div className="login-header">
          <p>
            <b>Unlimited movies, TV shows and more</b>
          </p>
          <h3>Watch anywhere. Cancel anytime.</h3>
          <h4>
            Ready to watch? Enter your email to create or restart your
            membership.
          </h4>
          <Button variant="danger" size="lg" onClick={() => handleSignIn()}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
