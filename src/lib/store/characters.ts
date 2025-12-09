import { create } from "zustand";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  episode: string[];
}

export interface CharactersInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharactersFilter {
  name?: string;
  status?: "Alive" | "Dead" | "unknown";
  gender?: "Female" | "Male" | "Genderless" | "unknown";
}

export const useCharactersStore = create<{
  characters: Character[];
  info: CharactersInfo;
  filters: CharactersFilter;
  setCharacters: (characters: Character[]) => void;
  addNewCharacters: (characters: Character[]) => void;
  setInfo: (info: CharactersInfo) => void;
  setFilter: (filters: CharactersFilter) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}>((set) => ({
  characters: [],
  loading: false,
  filters: {
    gender: undefined,
    name: "",
    status: undefined,
  },
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  setCharacters: (characters: Character[]) => set({ characters }),
  addNewCharacters: (characters: Character[]) =>
    set((state) => ({ characters: [...state.characters, ...characters] })),
  setInfo: (info) => set({ info }),
  setFilter: (filters: CharactersFilter) => set({ filters }),
  setLoading: (loading: boolean) => set({ loading }),
}));
