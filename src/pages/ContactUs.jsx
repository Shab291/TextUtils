import styled from "styled-components";
import usePropContext from "../contexts/props-context";

const ContactUs = () => {
  const { mode } = usePropContext();
  return (
    <Wrapper mode={mode}>
      <div className="container">
        <h1>Contact Us</h1>
        <form action="https://formspree.io/f/xkgrbnlq" method="POST">
          <label>
            Your email:
            <input type="email" name="email" />
          </label>
          <label>
            Your message:
            <textarea name="message"></textarea>
          </label>
          {/* your other form fields go here  */}
          <button type="submit">Send</button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    width: 40%;
    margin: 4rem auto;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin: 2rem;
  }

  h1 {
    font-size: 2rem;
    text-align: center;
  }

  label {
    font-size: 1rem;
    font-weight: 500;
  }
  input {
    width: 100%;
    margin-top: 0.5rem;
    padding: 0 1rem;
    height: 2.5rem;
    border-radius: 5px;
    outline: none;
    border: none;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    font-size: 1.2rem;
    background-color: ${({ mode }) =>
      mode === "dark" ? "#495057" : "#f8f9fa"};
    color: ${({ mode }) => (mode === "dark" ? "#f8f9fa" : "#212529")};
  }
  textarea {
    width: 100%;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    height: 15rem;
    border-radius: 5px;
    resize: none;
    outline: none;
    border: none;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    font-size: 1.2rem;
    background-color: ${({ mode }) =>
      mode === "dark" ? "#495057" : "#f8f9fa"};
    color: ${({ mode }) => (mode === "dark" ? "#f8f9fa" : "#212529")};
  }

  button {
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
    background-color: ${({ mode }) =>
      mode === "dark" ? "#3e5c76" : "#f8f9fa"};
    color: ${({ mode }) => (mode === "dark" ? "#f8f9fa" : "#212529")};
  }

  button:hover {
    background-color: #bf0603;
    color: white;
    transform: translateY(-3px);
    transition: all 0.2s ease-in;
  }
`;

export default ContactUs;
