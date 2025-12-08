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

export const useCharactersStore = create<{
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
}>((set) => ({
  characters: [],
  setCharacters: (characters: Character[]) => set({ characters }),
}));
