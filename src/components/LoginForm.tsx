import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = () => console.log("data");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("username")} />
      <input type="password" {...register("password")} />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
