import css from "./NoteForm.module.css";
import { useFormik, } from "formik";
import * as Yup from 'yup';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../types/note";
import { createNote} from "../services/noteService";

interface NoteFormProp {
    onCancel: () => void;
}

interface NoteValues {
  title: string;
  content: string;
  tag: Note["tag"];
}

const validationSchema = Yup.object({
    title: Yup.string().required('Titled is required').min(3).max(50),
    content: Yup.string().max(500),
    tag: Yup.string()
        .required('Tag is required')
        .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag'),
});

const NoteForm = ({ onCancel }: NoteFormProp) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            onCancel();
        },
    });

const formik = useFormik({
  initialValues: {
    title: "",
    content: "",
    tag: "Todo" as Note["tag"],
  },
  validationSchema,
  onSubmit: (values: NoteValues) => {
    mutation.mutate(values);
  },
});

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          {...formik.getFieldProps("title")}
          className={css.input}
        />
        {formik.touched.title && formik.errors.title && (
          <span className={css.error}>{formik.errors.title}</span>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows={8}
          {...formik.getFieldProps("content")}
          className={css.textarea}
        />
        {formik.touched.content && formik.errors.content && (
          <span className={css.error}>{formik.errors.content}</span>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          {...formik.getFieldProps("tag")}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {formik.touched.tag && formik.errors.tag && (
          <span className={css.error}>{formik.errors.tag}</span>
        )}
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={!formik.isValid || mutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;