export interface Note {
    id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNote {
    title: string;
    content: string;
    tag: string;
}

export type NoteTags = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';