import { useEffect } from "react";

// Case Converter
export const toUpperCase = (text) => text.toUpperCase();
export const toLowerCase = (text) => text.toLowerCase();
export const toTitleCase = (text) =>
  text.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

export const toSentenceCase = (text) =>
  text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

// Text Analyzer
export const countCharacters = (text) => text.length;
export const countWords = (text) =>
  text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
export const countLines = (text) => (text === "" ? 0 : text.split("\n").length);

//Text Formatter
export const removeExtraSpaces = (text) => text.replace(/\s+/g, " ").trim();
export const removeLineBreaks = (text) => text.replace(/\n/g, " ");
export const addIndentation = (text) => text.replace(/^/gm, "    ");

// Encoder/Decoder
export const urlEncode = (text) => encodeURIComponent(text);
export const urlDecode = (text) => decodeURIComponent(text);
export const base64Encode = (text) => btoa(text);
export const base64Decode = (text) => atob(text);

//Copy to Clipboard Notification
export const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="toast"
      style={{
        padding: ".2rem",
        backgroundColor: "#f6f4d2",
        borderRadius: "5px",
        color: "black",
      }}
    >
      {message}
    </div>
  );
};

//Copy to Clip Board
export const copyToClipboard = async (text, showNotification) => {
  try {
    await navigator.clipboard.writeText(text);
    if (showNotification) showNotification("Copied to clipboard!");
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    if (showNotification) showNotification("Failed to copy!");
    return false;
  }
};

// Past From ClipBoard Function
export const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText();
    return text;
  } catch (err) {
    console.error("Failed to read clipboard:", err);
    return "";
  }
};
