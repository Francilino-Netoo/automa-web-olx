import styled from "styled-components";

export const PageArea = styled.div`
  max-width: 500px;
  margin: auto;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      font-size: 14px;
      color: #666;

      input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        margin-top: 5px;
        outline: none;
        transition: border 0.3s ease;

        &:focus {
          border-color: #007bff;
        }
      }
      select {
        width: 40%;
        height: auto;
      }
    }

    button {
      padding: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background: #0056b3;
      }

      &:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
    }
  }

  p {
    text-align: center;
    color: red;
  }

  @media (max-width: 600px) {
    form label select {
      width: 100%;
    }
  }
`;
