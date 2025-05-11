import { useState } from "react";
import styled from "styled-components";
import usePropContext from "../contexts/props-context";
import CaseConverter from "./CaseConverter";
import TextAnalyzer from "./TextAnalyzer";
import TextFormatter from "./TextFormatter";
import EncoderDecoder from "./EncoderDecoder";
import SearchReplace from "./SearchReplace";
import { Toast } from "../utils/TextUtils";
import { copyToClipboard } from "../utils/TextUtils";
import { pasteFromClipboard } from "../utils/TextUtils";

const TextForm = () => {
  const [text, setText] = useState("Enter the text here");
  const [activeTool, setActiveTool] = useState("caseConverter");
  const [notification, setNotification] = useState(null);
  const { mode } = usePropContext();

  const tools = [
    { id: "caseConverter", name: "Case Converter" },
    { id: "textAnalyzer", name: "Text Analyzer" },
    { id: "textFormatter", name: "Text Formatter" },
    { id: "encoderDecoder", name: "Encoder/Decoder" },
    { id: "searchReplace", name: "Search & Replace" },
  ];

  const renderTool = () => {
    switch (activeTool) {
      case "caseConverter":
        return <CaseConverter text={text} setText={setText} />;
      case "textAnalyzer":
        return <TextAnalyzer text={text} setText={setText} />;
      case "textFormatter":
        return <TextFormatter text={text} setText={setText} />;
      case "encoderDecoder":
        return <EncoderDecoder text={text} setText={setText} />;
      case "searchReplace":
        return <SearchReplace text={text} setText={setText} />;
      default:
        return <CaseConverter text={text} setText={setText} />;
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2000);
  };

  const handlePaste = async () => {
    const pastedText = await pasteFromClipboard();
    if (pastedText) {
      setText(pastedText);
      showNotification("Text pasted!");
    } else {
      showNotification("No text in clipboard");
    }
  };

  return (
    <Wrapper mode={mode}>
      <div className="main-container">
        <div className="input-container">
          <h3 className="tab-heading">
            {tools.find((tool) => tool.id === activeTool)?.name ||
              "Case Converter"}
          </h3>
          <div className="tab-container">
            {tools.map((tool) => (
              <button
                key={tool.id}
                className={`tab-link ${activeTool === tool.id ? "active" : ""}`}
                onClick={() => setActiveTool(tool.id)}
              >
                {tool.name}
              </button>
            ))}
          </div>

          <div className="input">
            <textarea
              className="form-control"
              onChange={(e) => setText(e.target.value)}
              value={text}
              id="MyBox2"
              rows="8"
            ></textarea>
          </div>
          <div className="common-btn-container">
            <button
              className="com-btn"
              onClick={() => copyToClipboard(text, showNotification)}
            >
              Copy
            </button>
            <button className="com-btn" onClick={handlePaste}>
              Paste
            </button>
            <button className="com-btn" onClick={() => setText("")}>
              Clear
            </button>
            {notification && (
              <Toast
                message={notification}
                onClose={() => setNotification(null)}
              />
            )}
          </div>
          <div className="tool-btn-container">{renderTool()}</div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main-container {
    display: grid;
    height: calc(100vh - 5rem);
  }
  .input-container {
    margin: 3rem auto;
    width: 60%;
    height: 86vh;
    border-radius: 10px;
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.25);
    padding: 0rem 1rem;
    background-color: ${({ mode }) =>
      mode === "dark" ? "#2f3e46" : "#f8f9fa"};
    color: ${({ mode }) => (mode === "dark" ? "#f8f9fa" : "#212529")};
  }

  .tab-heading {
    text-align: center;
    padding: 0.4rem;
    font-size: 1.5rem;
  }

  .tab-container {
    display: flex;
    padding: 0.4rem 1rem;
    align-items: center;
    justify-content: center;
    gap: 0 2rem;
    margin-bottom: 0rem 0 0.4rem 0;
    border-radius: 6px;
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.15);
    background-color: ${({ mode }) =>
      mode === "dark" ? "#cad2c5" : "#cad2c5"};
    color: ${({ mode }) => (mode === "dark" ? "#f8f9fa" : "#212529")};
  }

  .tab-link {
    padding: 1rem;
    font-size: 1rem;
    border-radius: 5px;
    flex-shrink: 0;
    border: none;
    background-color: #e0e1dd;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    transition: all 0.2s ease-in;
    background-color: ${({ mode }) =>
      mode === "dark" ? "#3e5c76" : "#84a98c"};
    color: ${({ mode }) => (mode === "dark" ? "#f8f9fa" : "#212529")};
  }

  .tab-link.active {
    background-color: #646cff;
  }

  .input {
    display: flex;
    flex-direction: column;
    margin-top: 0.6rem;
  }

  textarea {
    flex-shrink: 3;
    border-radius: 8px;
    box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.15);
    height: 20rem;
    resize: none;
    font-size: 20px;
    outline: none;
    border: none;
    padding: 1rem;
    background-color: ${({ mode }) =>
      mode === "dark" ? "#495057" : "#f8f9fa"};
    color: ${({ mode }) => (mode === "dark" ? "#f8f9fa" : "#212529")};
  }
  .common-btn-container {
    display: flex;
    margin-top: 0.5rem;
    gap: 0 1rem;
  }

  .com-btn {
    padding: 0.5rem 0;
    font-size: 0.8rem;
    width: 6rem;
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
  .com-btn:hover {
    background-color: #bf0603;
    color: white;
    transition: all 0.2s ease-in;
  }
`;

export default TextForm;
