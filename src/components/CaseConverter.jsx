import styled from "styled-components";
import {
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
} from "../utils/TextUtils";
import usePropContext from "../contexts/props-context";

const CaseConverter = ({ text, setText }) => {
  const { mode } = usePropContext();

  const handleConversion = (converter) => {
    setText(converter(text));
  };

  return (
    <Wrapper mode={mode}>
      <div className="btn-container">
        <button className="btn" onClick={() => handleConversion(toUpperCase)}>
          UPPERCASE
        </button>
        <button className="btn" onClick={() => handleConversion(toLowerCase)}>
          lowercase
        </button>
        <button className="btn" onClick={() => handleConversion(toTitleCase)}>
          Title Case
        </button>
        <button
          className="btn"
          onClick={() => handleConversion(toSentenceCase)}
        >
          Sentence case
        </button>
      </div>
      <div className="summery-container">
        <h3 className="summery-title">Your Text Summery</h3>
        <p>Total Characters: {text.length}</p>
        <p>Total Words: {text !== "" ? text.split(" ").length : 0} </p>
        <p>{0.008 * text.split(" ").length} Mintues Read</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .btn-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
  }

  .btn {
    padding: 0.5rem 0;
    font-size: 0.8rem;
    width: 8rem;
    border-radius: 5px;
    flex-shrink: 0;
    border: none;
    background-color: #e0e1dd;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    transition: all 0.2s ease-in;
    background-color: ${({ mode }) =>
      mode === "dark" ? "#3e5c76" : "#f8f9fa"};
    color: ${({ mode }) => (mode === "dark" ? "#f8f9fa" : "#212529")};
  }
  .btn:hover {
    background-color: #bf0603;
    color: white;
    transition: all 0.2s ease-in;
  }

  .summery-container {
    margin-top: 4rem;
  }
`;

export default CaseConverter;
