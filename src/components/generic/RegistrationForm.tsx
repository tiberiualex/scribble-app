import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Input, InputContainer } from "./Inputs";
import { Button } from "./Buttons";

const RegistrationForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => console.log("register");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <Input placeholder="Username" type="text" {...register("username")} />
      </InputContainer>
      <InputContainer>
        <Input placeholder="Email" type="password" {...register("email")} />
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="Password"
          type="password"
          {...register("password")}
        />
      </InputContainer>
      <InputContainer>
        <Button type="submit">Register</Button>
      </InputContainer>
    </form>
  );
};
