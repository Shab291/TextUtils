import Sun from "../assets/Sun.svg";
import Moon from "../assets/Moon.svg";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import usePropContext from "../contexts/props-context";

const Navbar = () => {
  const { mode, toggleMode, title } = usePropContext();
  return (
    <Wrapper mode={mode}>
      <nav className="navbar">
        <div className="nav-container">
          <a className="navbar-brand">{title}</a>

          <div className="nav-link-container">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
            <NavLink className="nav-link" to="/contactus">
              Contact Us
            </NavLink>
          </div>

          <div className="dark_mode">
            <input
              className="dark_mode_input"
              type="checkbox"
              role="switch"
              id="darkmode-toggle"
              onClick={toggleMode}
            />
            <label className="dark_mode_label" htmlFor="darkmode-toggle">
              <img className="sun" src={Sun} alt="Sun" />
              <img className="moon" src={Moon} alt="Moon" />
            </label>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  nav {
    padding: 0.5rem 1.5rem;
    width: 100%;
    background-color: ${({ mode }) =>
      mode === "dark" ? "#2f3e46" : "#f8f9fa"};
    color: ${({ mode }) => (mode === "dark" ? "white" : "black")};
    transition: all 0.3s ease;
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar-brand {
    font-size: 2rem;
    list-style: none;
    text-decoration: none;
    color: ${({ mode }) => (mode === "dark" ? "white" : "black")};
  }

  .nav-link-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 3rem;
  }

  .nav-link {
    text-decoration: none;
    font-size: 1.2rem;
    color: ${({ mode }) => (mode === "dark" ? "white" : "black")};
    transition: color 0.3s ease;

    &:hover {
      color: ${({ mode }) => (mode === "dark" ? "#ddd" : "#555")};
    }

    &.active {
      font-weight: bold;
      text-decoration: underline;
    }
  }

  .themebtn-container {
    display: inline-flex;
    align-items: center;
    gap: 0 2rem;
  }

  /* Dark Themes CSS */

  .dark_mode {
    display: flex;
    flex-direction: column;
  }
  .dark_mode_input {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  .dark_mode_label {
    width: 65px;
    height: 30px;
    position: relative;
    display: block;
    background: rgb(173, 171, 171);
    border-radius: 200px;
    box-shadow: inset 0px 5px 15px rgba(46, 43, 43, 0.05),
      inset 0px -15px 15px rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: 0.3s;
  }
  .dark_mode_label:after {
    content: "";
    width: 25px;
    height: 25px;
    position: absolute;
    top: 3px;
    left: 3px;
    background: linear-gradient(180deg, #ffcc89, #d8860b);
    border-radius: 180px;
    box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }

  .dark_mode_input:checked + .dark_mode_label {
    background: #242424;
  }
  .dark_mode_input:checked + .dark_mode_label:after {
    left: 62px;
    transform: translateX(-100%);
    background: linear-gradient(180deg, rgb(166, 170, 173), rgb(230, 227, 227));
  }
  .dark_mode_label:active:after {
    width: 30px;
  }

  .dark_mode_label img {
    position: absolute;
    width: 20px;
    top: 5px;
    z-index: 100;
  }
  .sun {
    left: 5px;
    fill: #fff;
    transition: 0.3s;
  }
  .moon {
    left: 40px;
    fill: #7e7e7e;
    transition: 0.3s;
  }
  .dark_mode_input:checked + .sun {
    fill: #7e7e7e;
  }
  .dark_mode_input:checked + .moon {
    fill: #fff;
  }
`;

export default Navbar;
