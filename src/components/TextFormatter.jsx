import styled from "styled-components";
import {
  removeExtraSpaces,
  removeLineBreaks,
  addIndentation,
} from "../utils/TextUtils";
import usePropContext from "../contexts/props-context";

const TextFormatter = ({ text, setText }) => {
  const { mode } = usePropContext();

  const formatText = (formatter) => {
    setText(formatter(text));
  };

  // Additional formatting functions
  function alignLeft(text) {
    return text
      .split("\n")
      .map((line) => line.trimStart())
      .join("\n");
  }

  function alignRight(text, lineLength) {
    return text
      .split("\n")
      .map((line) => {
        const trimmed = line.trim();
        return trimmed.padStart(lineLength);
      })
      .join("\n");
  }

  function alignCenter(text, lineLength) {
    return text
      .split("\n")
      .map((line) => {
        const trimmed = line.trim();
        const padding = Math.max(
          0,
          Math.floor((lineLength - trimmed.length) / 2)
        );
        return trimmed.padStart(trimmed.length + padding);
      })
      .join("\n");
  }

  function justifyText(text, lineLength) {
    return text
      .split("\n")
      .map((line) => {
        const words = line.trim().split(/\s+/);
        if (words.length <= 1) return line;

        const totalSpaces = lineLength - words.join("").length;
        const spaceBetween = Math.floor(totalSpaces / (words.length - 1));
        const extraSpaces = totalSpaces % (words.length - 1);

        let justified = words[0];
        for (let i = 1; i < words.length; i++) {
          const spaces = spaceBetween + (i <= extraSpaces ? 1 : 0);
          justified += " ".repeat(spaces) + words[i];
        }

        return justified;
      })
      .join("\n");
  }
  return (
    <Wrapper mode={mode}>
      <div className="format-options">
        <div className="button-group">
          <button className="btn" onClick={() => formatText(removeExtraSpaces)}>
            Remove Extra Spaces
          </button>
          <button className="btn" onClick={() => formatText(removeLineBreaks)}>
            Remove Line Breaks
          </button>
          <button className="btn" onClick={() => formatText(addIndentation)}>
            Add Indentation
          </button>
          <button
            className="btn"
            onClick={() => formatText((text) => text.trim())}
          >
            Trim Whitespace
          </button>
          <button
            className="btn"
            onClick={() => formatText((text) => text.replace(/^\s+/gm, ""))}
          >
            Remove Indentation
          </button>
          <button
            className="btn"
            onClick={() => formatText((text) => text.replace(/\s+$/gm, ""))}
          >
            Trim End of Lines
          </button>
        </div>

        <div className="format-options">
          <h4>Text Alignment</h4>
          <div className="button-group">
            <button className="btn" onClick={() => setText(alignLeft(text))}>
              Align Left
            </button>
            <button
              className="btn"
              onClick={() => setText(alignRight(text, 80))}
            >
              Align Right
            </button>
            <button
              className="btn"
              onClick={() => setText(alignCenter(text, 80))}
            >
              Center
            </button>
            <button
              className="btn"
              onClick={() => setText(justifyText(text, 80))}
            >
              Justify
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .format-options {
    margin-top: 1rem;
  }

  .button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .btn {
    padding: 0.5rem 0;
    font-size: 0.8rem;
    width: 7rem;
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
  .format-options h4 {
    padding-bottom: 1rem;
  }
`;

export default TextFormatter;
