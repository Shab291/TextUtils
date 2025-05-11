import styled from "styled-components";
import { countCharacters, countWords, countLines } from "../utils/TextUtils";
import usePropContext from "../contexts/props-context";

const TextAnalyzer = ({ text }) => {
  const characters = countCharacters(text);
  const words = countWords(text);
  const lines = countLines(text);
  const readingTime = Math.ceil(words / 200);
  const characterFrequency = getAllCharacterFrequencies(text);

  const { mode } = usePropContext();

  // Helper function to get all character frequencies
  function getAllCharacterFrequencies(text) {
    const frequency = {};

    // Count character frequency
    for (const char of text) {
      frequency[char] = (frequency[char] || 0) + 1;
    }

    // Convert to array and sort by frequency (descending)
    return Object.entries(frequency).sort((a, b) => b[1] - a[1]);
  }

  // Helper function to format special characters for display
  function formatCharacterDisplay(char) {
    switch (char) {
      case " ":
        return "Space";
      case "\n":
        return "Newline";
      case "\t":
        return "Tab";
      default:
        return char;
    }
  }

  return (
    <Wrapper mode={mode}>
      <div className="grid-items-container">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{characters}</div>
            <div className="stat-label">Characters</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{words}</div>
            <div className="stat-label">Words</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{lines}</div>
            <div className="stat-label">Lines</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{readingTime}</div>
            <div className="stat-label">Minutes to read</div>
          </div>
        </div>

        <div className="advanced-stats">
          <h4>All Character Frequencies</h4>
          {characterFrequency.length > 0 ? (
            <div className="frequency-list">
              {characterFrequency.map(([char, count]) => (
                <div key={char} className="frequency-item">
                  <span className="char">{formatCharacterDisplay(char)}</span>
                  <span className="count">{count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No characters to analyze</p>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .grid-items-container {
    height: 20rem;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin: 0.5rem 0 1rem 0;
    background-color: ${({ mode }) =>
      mode === "dark" ? "#2f3e46" : "#f8f9fa"};
    color: ${({ mode }) => (mode === "dark" ? "#f8f9fa" : "#212529")};
  }

  .stat-item {
    padding: 0.2rem;
    border-radius: 4px;
    text-align: center;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ mode }) => (mode === "dark" ? "#fffaff" : "#646cff")};
  }

  .stat-label {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  .advanced-stats {
    margin-top: 0.2rem;
  }
  .advanced-stats h4 {
    padding-bottom: 0.5rem;
  }

  .frequency-list {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 0.5rem;
  }

  .frequency-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    padding: 0.2rem;
    background-color: ${({ mode }) =>
      mode === "dark" ? "#5c6b73" : "#bad7f2"};
    border-radius: 4px;
  }

  .frequency-item .char {
    font-size: 1rem;
    font-weight: 500;
  }

  .frequency-item .count {
    color: ${({ mode }) => (mode === "dark" ? "#fffaff" : "#646cff")};
    font-weight: bold;
  }
`;

export default TextAnalyzer;
