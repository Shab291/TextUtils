import React from "react";
import styled from "styled-components";
import usePropContext from "../contexts/props-context";

const About = () => {
  const { mode } = usePropContext();

  return (
    <Wrapper mode={mode}>
      <div className="main-container">
        <div className="about-container">
          <h2 className="about-title">TextUtils: A Handy Text Utility App</h2>

          <div className="content">
            <p>
              TextUtils is a versatile application designed to help users
              manipulate, analyze, and optimize text for various purposes.
              Whether you're a writer, programmer, student, or professional,
              TextUtils offers a suite of tools to make working with text easier
              and more efficient.
            </p>
          </div>
        </div>

        <div className="details-container">
          <div className="features">
            <h3>Key Features</h3>
            <ul>
              <li>
                <strong>Text Transformation Tools:</strong> Case conversion
              </li>
              <li>
                <strong>Text Analysis:</strong> Word and character counters,
                Reading time estimation
              </li>
              <li>
                <strong>Formatting Utilities:</strong> Whitespace remover (extra
                spaces, tabs, line breaks)
              </li>
              <li>
                <strong>All Devices:</strong> – Mobile & desktop friendly
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main-container {
    max-width: 768px;
    max-height: 400px;
    margin: 4rem auto;
    color: ${({ mode }) => (mode === "dark" ? "#f8f9fa" : "#212529")};
  }

  .about-title {
    font-size: 2rem;
    text-align: center;
  }

  .content p {
    margin-top: 2rem;
    text-align: center;
  }

  .card-container {
    margin-top: 2rem;
  }

  .features {
    height: 325px;
    padding: 1.5rem;
    border-radius: 12px;
    margin: 1.5rem 0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    background-color: ${({ mode }) =>
      mode === "dark" ? "#495057" : "#f8f9fa"};
  }

  .features ul {
    padding: 1rem 1rem;
    list-style-type: none;
  }

  .features li {
    margin: 0.8rem 0;
    position: relative;
    padding-left: 1.8rem;
  }

  .features li:before {
    content: "✔";
    color: #fd1d1d;
    font-size: 1.2rem;
    position: absolute;
    left: 0;
    top: -0.3rem;
  }

  .btn {
    padding: 1rem;
    width: 10rem;
    height: 4rem;
    font-size: 1rem;
    border-radius: 10px;
    flex-shrink: 0;
    border: none;
    background-color: #e0e1dd;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    transition: all 0.2s ease-in;
  }
  .btn:hover {
    background-color: #bf0603;
    color: white;
    transform: translateY(-3px);
    transition: all 0.2s ease-in;
  }
`;

export default About;
