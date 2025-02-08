import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            {" "}
            destination <span>tracking</span> app
          </h1>
          <p>
            Discover new destinations and keep track of your travel experiences
            with this innovative app. Whether you're planning your next
            adventure or reminiscing about past trips, the app provides all the
            tools you need to make the most of your journeys. Join the community
            of explorers and start your travel journey today!
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="destination hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
