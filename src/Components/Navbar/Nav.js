import React, { useEffect, useState } from "react";
import "./Nav.css";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [show, handleShow] = useState(false);

  //for navigation
  let navigate = useNavigate();

  //to display the nav effect when the scroll y is more than 100
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  //function for signOut
  const handleSignOut = () => {
    try {
      sessionStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />

      <Button
        variant="danger"
        className="nav_signOut"
        onClick={() => handleSignOut()}
      >
        SignOut
      </Button>
    </div>
  );
}

export default Nav;
