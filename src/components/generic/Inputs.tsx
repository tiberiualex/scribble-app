import styled from "styled-components";

export const Input = styled.input`
  background-color: #f7f8fa;
  border-radius: 10px;
  border: 0;
  padding: 15px;

  &::placeholder {
    color: #c9cccf;
  }
`;

export const InputContainer = styled.div`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;
