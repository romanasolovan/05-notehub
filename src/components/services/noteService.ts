import axios from "axios";
import type { Note, CreateNote} from "../types/note";


interface FetchNotesResponse {
    notes: Note[];
    totalNotes: number;
    totalPages: number;
}

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

const api = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
});

export const fetchNotes = async ({ page = 1, perPage = 12, search = '' }: FetchNotesParams): Promise<FetchNotesResponse> => {
    const response = await api.get('/notes', {
        params: {
            page,
            perPage,
            search,
        },
    });
    return response.data;
}

export const createNote = async (newNote: CreateNote): Promise<Note> => {
    const response = await api.post('/notes', newNote);
    return response.data;
}

export const deleteNote = async (noteId: string): Promise<Note> => {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
}

