import styled from "styled-components";

const Alert = ({ alert, onDismiss }) => {
  const capitalizeFirstLetter = (word) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  if (!alert) return null;

  return (
    <Wrapper $type={alert.type}>
      <div className="alert-content" role="alert">
        <strong>{capitalizeFirstLetter(alert.type)}</strong>: {alert.msg}
        {onDismiss && (
          <button
            type="button"
            className="alert-close"
            onClick={onDismiss}
            aria-label="Close alert"
          >
            &times;
          </button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .alert-content {
    position: relative;
    padding: 1rem 2rem 1rem 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
    background-color: ${({ $type }) => {
      switch ($type) {
        case "success":
          return "#d4edda";
        case "danger":
          return "#f8d7da";
        case "warning":
          return "#fff3cd";
        case "info":
          return "#d1ecf1";
        default:
          return "#f4e285";
      }
    }};
    color: ${({ $type }) => {
      switch ($type) {
        case "success":
          return "#155724";
        case "danger":
          return "#721c24";
        case "warning":
          return "#856404";
        case "info":
          return "#0c5460";
        default:
          return "#000";
      }
    }};
    border: 1px solid
      ${({ $type }) => {
        switch ($type) {
          case "success":
            return "#c3e6cb";
          case "danger":
            return "#f5c6cb";
          case "warning":
            return "#ffeeba";
          case "info":
            return "#bee5eb";
          default:
            return "#f4e285";
        }
      }};
  }

  .alert-close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: transparent;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: inherit;
    padding: 0 0.5rem;
  }
`;

export default Alert;
