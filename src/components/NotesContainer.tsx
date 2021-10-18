import { useAppDispatch, useAppSelector } from "state/hooks";
import CreateNoteForm from "./CreateNoteForm";
import { selectAllNotes } from "state/slices/notesSlice";
import { Note } from "../domain/types";
import NoteComponent from "./Note";

const NotesContainer = () => {
  const notes = useAppSelector((state) => selectAllNotes(state));

  return (
    <div>
      <h1>Notes</h1>
      <CreateNoteForm />
      {notes.map((n: Note) => (
        <NoteComponent title={n.title} />
      ))}
    </div>
  );
};

export default NotesContainer;
