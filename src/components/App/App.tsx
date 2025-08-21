import css from "./App.module.css";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "../../services/noteService";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

const perPage = 12;

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery] = useDebounce(query, 500);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, debouncedQuery],
    queryFn: () => fetchNotes({ page, perPage, search: debouncedQuery }),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (query: string) => {
    setQuery(query);
    setPage(1);
  };
    
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} value={query} />
        {isSuccess && data?.totalPages > 1 && (
          <Pagination
            page={page}
                      totalPages={data.totalPages}
                      onPageChange={setPage}
          />
        )}
        <button onClick={() => setIsOpen(true)} className={css.button}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!!data && data?.notes?.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : query.trim() !== "" ? (
        <p className={css.noNotes}>No notes found.</p>
      ) : null}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onCancel={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;
