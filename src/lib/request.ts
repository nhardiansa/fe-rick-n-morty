import axios from "axios";

export type RMCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type RMInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type FetchCharactersResult = {
  info: RMInfo;
  results: RMCharacter[];
};

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  timeout: 8000,
});

/**
 * Fetch characters from Rick and Morty API.
 *
 * - Flexible: accept any of the API filters (page, name, status, species, type, gender).
 * - Defaults to page = 1 when not provided.
 *
 * Example:
 *   fetchCharacters({ page: 2, name: 'rick' })
 *
 * @param filters Partial filter object. Default: { page: 1 }
 * @returns Promise resolving to `{ info, results }`
 */
export async function fetchCharacters(
  filters: Partial<{
    page: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
  }> = { page: 1 }
): Promise<FetchCharactersResult> {
  try {
    const params: Record<string, string | number> = {};

    // ensure default page = 1 if not provided
    const merged = { page: 1, ...(filters || {}) };

    for (const [key, value] of Object.entries(merged)) {
      if (value !== undefined && value !== null && value !== "") {
        params[key] = value as string | number;
      }
    }

    const response = await api.get("/character", { params });
    return response.data as FetchCharactersResult;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // normalize error for caller
    return {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    };
  }
}

/*=============== DETAIL CHARACTER =============== */
