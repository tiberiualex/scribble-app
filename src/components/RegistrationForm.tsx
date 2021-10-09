import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Input, InputContainer } from "./generic/Inputs";
import { Button } from "./generic/Buttons";
import { registerUser } from "../state/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { UserWithPassword } from "../domain/types";

type FormData = Omit<UserWithPassword, "id">;

const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: FormData) => dispatch(registerUser(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <Input
          placeholder="Username"
          type="text"
          {...register("username", { required: true })}
        />
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="Email"
          type="text"
          {...register("email", { required: true })}
        />
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
      </InputContainer>
      <InputContainer>
        <Button type="submit">Register</Button>
      </InputContainer>
    </form>
  );
};

export default RegistrationForm;
