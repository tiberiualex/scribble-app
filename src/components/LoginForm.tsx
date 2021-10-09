import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Input, InputContainer } from "./generic/Inputs";
import { Button } from "./generic/Buttons";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { UserWithPassword } from "../domain/types";
import { loginUser } from "../state/slices/userSlice";

type FormData = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FormData) => dispatch(loginUser(data));

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
