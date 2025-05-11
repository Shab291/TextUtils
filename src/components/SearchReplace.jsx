import styled from "styled-components";
import { useState } from "react";
import usePropContext from "../contexts/props-context";

const SearchReplace = ({ text, setText }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [matchCount, setMatchCount] = useState(0);
  const [isRegex, setIsRegex] = useState(false);
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [replaceTerm, setReplaceTerm] = useState("");
  const [replacedCount, setReplacedCount] = useState(0);

  const { mode } = usePropContext();

  const handleSearch = () => {
    if (!searchTerm) {
      setMatchCount(0);
      return;
    }

    try {
      const regex = isRegex
        ? new RegExp(searchTerm, isCaseSensitive ? "g" : "gi")
        : new RegExp(escapeRegExp(searchTerm), isCaseSensitive ? "g" : "gi");
      const matches = text.match(regex) || [];
      setMatchCount(matches.length);
    } catch (err) {
      setMatchCount(0);
      console.error("Invalid regular expression:", err);
    }
  };

  const handleReplace = () => {
    if (!searchTerm) {
      setReplacedCount(0);
      return;
    }

    try {
      const regex = isRegex
        ? new RegExp(searchTerm, isCaseSensitive ? "g" : "gi")
        : new RegExp(escapeRegExp(searchTerm), isCaseSensitive ? "g" : "gi");

      const newText = text.replace(regex, replaceTerm);
      const matches = text.match(regex) || [];

      setText(newText);
      setReplacedCount(matches.length);
      setMatchCount(0); // Reset match count after replacement
    } catch (err) {
      console.error("Replace failed:", err);
    }
  };
  const handleReplaceAll = () => {
    handleReplace();
  };

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  return (
    <Wrapper mode={mode}>
      <div className="search-replace-container">
        <div className="search-replace-controls">
          <div className="input-group-container">
            <div className="input-group">
              <label htmlFor="searchTerm">Search for:</label>
              <input
                id="searchTerm"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter text to find"
              />
            </div>

            <div className="input-group">
              <label htmlFor="replaceTerm">Replace with:</label>
              <input
                id="replaceTerm"
                type="text"
                value={replaceTerm}
                onChange={(e) => setReplaceTerm(e.target.value)}
                placeholder="Enter replacement text"
              />
            </div>
          </div>

          <div className="options-group">
            <label>
              <input
                type="checkbox"
                checked={isRegex}
                onChange={() => setIsRegex(!isRegex)}
              />
              Use regular expression
            </label>
            <label>
              <input
                type="checkbox"
                checked={isCaseSensitive}
                onChange={() => setIsCaseSensitive(!isCaseSensitive)}
              />
              Case sensitive
            </label>
          </div>

          <div className="button-group">
            <button className="btn" onClick={handleSearch}>
              Find All
            </button>
            <button className="btn" onClick={handleReplace}>
              Replace
            </button>
            <button className="btn" onClick={handleReplaceAll}>
              Replace All
            </button>
          </div>
        </div>

        <div className="search-results">
          {matchCount > 0 && (
            <div className="match-count">
              Found {matchCount} match{matchCount !== 1 ? "es" : ""}
            </div>
          )}
          {replacedCount > 0 && (
            <div className="replaced-count">
              Replaced {replacedCount} instance{replacedCount !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        {isRegex && (
          <div className="regex-hint">
            <p>Regular expression tips:</p>
            <ul>
              <li>
                <code>.</code> - Any single character
              </li>
              <li>
                <code>\w</code> - Word character
              </li>
              <li>
                <code>\d</code> - Digit
              </li>
              <li>
                <code>^</code> - Start of line
              </li>
              <li>
                <code>$</code> - End of line
              </li>
              <li>
                <code>[abc]</code> - Any of a, b, or c
              </li>
            </ul>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .search-replace-container {
    margin-top: 0.8rem;
  }
  .search-replace-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .input-group-container {
    display: flex;
    gap: 0 4rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .input-group input {
    padding: 0.8rem;
    border-radius: 4px;
    font-size: 1rem;
    border: 1px solid #333;
    background-color: ${({ mode }) =>
      mode === "dark" ? "#495057" : "#f8f9fa"};
    color: ${({ mode }) => (mode === "dark" ? "#f8f9fa" : "#212529")};
  }
  .input-group input:focus {
    background: rgb(117, 117, 117);
  }

  .options-group {
    display: flex;
    gap: 1rem;
    margin: 0.5rem 0;
  }

  .button-group {
    display: flex;
    gap: 0 1rem;
  }
  .btn {
    padding: 0.5rem 0;
    font-size: 0.8rem;
    width: 5rem;
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

  .options-group label {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1rem;
    cursor: pointer;
  }

  .search-results {
    margin-top: 0.8rem;
    min-height: 2rem;
  }

  .match-count,
  .replaced-count {
    padding: 0.5rem;
    margin: 0.5rem 0;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .match-count {
    background: rgba(100, 108, 255, 0.1);
    color: #646cff;
  }

  .replaced-count {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
  }

  .regex-hint {
    padding: 0.8rem;
    background: rgba(255, 193, 7, 0.1);
    border-radius: 4px;
    font-size: 0.85rem;
  }

  .regex-hint p {
    margin-top: 0;
    margin-bottom: 0.4rem;
    font-weight: bold;
  }

  .regex-hint ul {
    display: grid;
    grid-template-columns: repeat(3, 2fr);
    gap: 0.5rem;
    margin: 0;
    padding-left: 1.2rem;
  }

  .regex-hint code {
    background: rgba(0, 0, 0, 0.3);
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: monospace;
  }
`;

export default SearchReplace;
