import { useState } from "react";
import styled from "styled-components";
import {
  urlEncode,
  urlDecode,
  base64Encode,
  base64Decode,
} from "../utils/TextUtils";
import usePropContext from "../contexts/props-context";

const EncoderDecoder = ({ text, setText }) => {
  const [encodingType, setEncodingType] = useState("url");
  const [error, setError] = useState("");

  const { mode } = usePropContext();

  const handleEncode = () => {
    try {
      setError("");
      if (encodingType === "url") {
        setText(urlEncode(text));
      } else {
        setText(base64Encode(text));
      }
    } catch (err) {
      setError("Encoding failed: " + err.message);
    }
  };

  const handleDecode = () => {
    try {
      setError("");
      if (encodingType === "url") {
        setText(urlDecode(text));
      } else {
        setText(base64Decode(text));
      }
    } catch (err) {
      setError("Decoding failed: " + err.message);
    }
  };

  return (
    <Wrapper mode={mode}>
      <div className="encoding-container">
        <div className="encoding-options">
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="encodingType"
                value="url"
                checked={encodingType === "url"}
                onChange={() => setEncodingType("url")}
              />
              URL Encoding
            </label>
            <label>
              <input
                type="radio"
                name="encodingType"
                value="base64"
                checked={encodingType === "base64"}
                onChange={() => setEncodingType("base64")}
              />
              Base64 Encoding
            </label>
          </div>
        </div>

        <div className="button-group">
          <button className="btn" onClick={handleEncode}>
            {encodingType === "url" ? "URL Encode" : "Base64 Encode"}
          </button>
          <button className="btn" onClick={handleDecode}>
            {encodingType === "url" ? "URL Decode" : "Base64 Decode"}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {encodingType === "url" && (
          <div className="info-box">
            <p>
              URL encoding converts characters to a format that can be
              transmitted over the Internet.
            </p>
          </div>
        )}

        {encodingType === "base64" && (
          <div className="info-box">
            <p>
              Base64 encoding represents binary data in an ASCII string format.
            </p>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .encoding-container {
    height: 20rem;
  }
  .encoding-options {
    margin-bottom: 1rem;
  }

  .radio-group {
    display: flex;
    gap: 1rem;
    margin: 1rem 0 1rem 0;
  }

  .radio-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .error-message {
    color: #ff6b6b;
    margin-top: 1rem;
    padding: 0.5rem;
    background: rgba(255, 107, 107, 0.1);
    border-radius: 4px;
  }

  .info-box {
    margin-top: 1rem;
    padding: 0.8rem;
    background: rgba(100, 108, 255, 0.1);
    border-radius: 4px;
    font-size: 0.9rem;
    color: #aaa;
  }

  .info-box p {
    margin: 0;
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
`;

export default EncoderDecoder;
