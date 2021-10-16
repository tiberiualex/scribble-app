import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { Note } from "domain/types";
import { Input, InputContainer } from "./generic/Inputs";
import { Button } from "./generic/Buttons";
import { createUserNote } from "../state/slices/notesSlice";

type FormData = {
  title: string;
};

const CreateNoteForm = () => {
  const dispatch = useAppDispatch();
  const { userId, token } = useAppSelector((state) => ({
    userId: state.user.id as string,
    token: state.user.token as string,
  }));

  const { register, handleSubmit } = useForm();
  const onSubmit = ({ title }: FormData) => {
    console.log("dispatching");
    dispatch(createUserNote({ title, token, userId }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <Input placeholder="Type note" type="text" {...register("title")} />
      </InputContainer>
      <InputContainer>
        <Button type="submit">Create</Button>
      </InputContainer>
    </form>
  );
};

export default CreateNoteForm;
