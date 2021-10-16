import { useAppDispatch, useAppSelector } from "state/hooks";
import CreateNoteForm from "./CreateNoteForm";
import { selectAllNotes } from "state/slices/notesSlice";
import { Note } from "../domain/types";

const NotesContainer = () => {
  const notes = useAppSelector((state) => selectAllNotes(state));

  return (
    <div>
      <h1>Notes</h1>
      <CreateNoteForm />
      {notes.map((n: Note) => (
        <p>{n.title}</p>
      ))}
    </div>
  );
};

export default NotesContainer;
