import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function ErrorPage({ type = "general" }) {
  const messages = {
    general: "An unexpected error occurred",
    404: "Page not found",
  };

  return (
    <Wrapper>
      <div className="error-page">
        <h1>{messages[type] || messages.general}</h1>
        <div className="error-back">
          <NavLink className="nav-link" to="/">
            Return to home
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  .error-page {
    width: 100%;
    color: red;
  }

  h1 {
    margin-top: 5rem;
    text-align: center;
    font-size: 3rem;
  }

  .error-back {
    text-align: center;
    margin-top: 10rem;
  }

  .nav-link {
    text-decoration: none;
    list-style: none;
    color: black;
    border: 1px solid black;
    border-radius: 5px;
    padding: 1rem;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  }
  .nav-link:hover {
    background-color: #bf0603;
    color: white;
    transform: translateY(-3px);
    transition: all 0.2s ease-in;
  }

  /* Tablet (768px) */
  @media (max-width: 768px) {
    .error-back {
      margin: 0 300px;
    }
  }

  /* Small Mobile (430px) */
  @media (max-width: 430px) {
    .error-page {
      padding: 0 15px;
      text-align: center;
    }

    .error-back {
      margin: 0 auto;
      display: block;
      width: fit-content;
      padding: 10px 20px;
    }
  }
`;
