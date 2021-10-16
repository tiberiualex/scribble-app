import { useAppDispatch, useAppSelector } from "state/hooks";
import CreateNoteForm from "./CreateNoteForm";

const NotesContainer = () => {
  const notes = useAppSelector((state) => state.notes.entities);
  console.log(notes);
  return (
    <div>
      <h1>Notes</h1>
      <CreateNoteForm />
    </div>
  );
};

export default NotesContainer;
