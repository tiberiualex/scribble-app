import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Input, InputContainer } from "./generic/Inputs";
import { Button } from "./generic/Buttons";

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
