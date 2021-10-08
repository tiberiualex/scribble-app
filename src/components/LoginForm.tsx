import { useForm } from "react-hook-form";
import styled from "styled-components";

const Input = styled.input`
  background-color: #f7f8fa;
  border-radius: 10px;
  border: 0;
  padding: 15px;

  &::placeholder {
    color: #c9cccf;
  }
`;

const InputContainer = styled.div`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  padding: 15px;
  background-color: #53b175;
  border-radius: 10px;
  border: 0;
  outline: 0;
  color: #fff;
  font-weight: 700;
  text-align: center;
  display: inline-block;
  width: 100%;
`;

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => console.log("data");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <Input placeholder="Username" type="text" {...register("username")} />
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="Password"
          type="password"
          {...register("password")}
        />
      </InputContainer>
      <InputContainer>
        <Button type="submit">Login</Button>
      </InputContainer>
    </form>
  );
};

export default LoginForm;
