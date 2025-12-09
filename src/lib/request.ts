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
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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

export interface CharacterDetails {
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
}

export interface Episode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
}

export const getCharacterDetail = async (
  id: string
): Promise<{
  status: boolean;
  result: CharacterDetails;
}> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/character/${id}`
    );
    const data = await response.json();
    return {
      status: true,
      result: data,
    };
  } catch (error) {
    console.error("Error fetching character details:", error);
    return {
      status: false,
      result: {
        id: 0,
        name: "",
        status: "",
        species: "",
        type: "",
        gender: "",
        episode: [],
        origin: { name: "", url: "" },
        location: { name: "", url: "" },
        image: "",
      },
    };
  }
};

export const getEpisodes = async (
  urls: string[],
  page = 1
): Promise<{
  status: boolean;
  result: Episode[] | null;
}> => {
  if (urls.length === 0) {
    return {
      status: false,
      result: null,
    };
  }

  const totalEpisodes = urls.length;
  const startIndex = (page - 1) * 20;
  const endIndex = Math.min(startIndex + 20, totalEpisodes);

  console.log(
    "Fetching episodes from index",
    startIndex,
    "to",
    endIndex - 1,
    "from total",
    totalEpisodes
  );

  try {
    // Fetch episodes but limit to first 20
    const episodePromises = urls
      .slice(startIndex, endIndex)
      .map((url: string) => fetch(url).then((res) => res.json()));
    const episodesData = await Promise.all(episodePromises);
    const sortedEpisodes = episodesData.sort((a, b) => a.id - b.id);
    return {
      status: true,
      result: sortedEpisodes,
    };
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return {
      status: false,
      result: null,
    };
  }
};
