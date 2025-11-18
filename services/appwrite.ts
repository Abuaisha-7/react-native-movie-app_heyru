import { Movie, SavedMovie, TrendingMovie } from "@/interfaces/interfaces";
import { Client, ID, Query, TablesDB } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const SAVED_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_COLLECTION_ID!;

// console.log("DB ID:", DATABASE_ID);
// console.log("COLLECTION ID:", COLLECTION_ID);

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new TablesDB(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  // console.log(movie)
  try {
    const result = await database.listRows({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID,
      queries: [Query.equal("title", query)],
    });

    if (result.rows.length > 0) {
      const existingMovie = result.rows[0];
      await database.updateRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTION_ID,
        rowId: existingMovie.$id,
        data: {
          count: existingMovie.count + 1,
        },
      });
    } else {
      await database.createRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTION_ID,
        rowId: ID.unique(), // optional, Appwrite will generate one if omitted
        data: {
          searchTerms: query,
          movie_id: movie.id,
          title: movie.title,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const saveMovie = async ({ movie_id, title, poster_url, user_id, vote_average, release_date}: { movie_id: number, title: string, poster_url: string, user_id: string, vote_average:number, release_date:string }): Promise<{ status: "saved" | "exists" }> => {
  
  try {
     // check duplicate
     const existing = await database.listRows({
      databaseId: DATABASE_ID,
      tableId: SAVED_COLLECTION_ID,
      queries: [Query.equal("user_id", user_id), Query.equal("movie_id", movie_id)]
    });

    if (existing.rows.length > 0) {
      return { status: "exists" };
    }

     await database.createRow({
      databaseId: DATABASE_ID,
      tableId: SAVED_COLLECTION_ID,
      rowId: ID.unique(),
      data: { movie_id, title, poster_url, user_id, vote_average, release_date },
    });

    return { status: "saved" };

  } catch (error) {
    console.error("Error saving movie:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  
  try {
    const result = await database.listRows({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID,
      queries: [Query.limit(5), Query.orderDesc("count")],
    });

    return result.rows as unknown as TrendingMovie[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const getSavedMovies = async (user_id: string): Promise<SavedMovie[] | undefined> => {
  try {
    const result = await database.listRows({
      databaseId: DATABASE_ID,
      tableId: SAVED_COLLECTION_ID,
      queries: [Query.equal("user_id", user_id)],
    });

    return result.rows as unknown as SavedMovie[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export async function deleteSavedMovie($id : string) {
  try {
    await database.deleteRow(
      {
        databaseId: DATABASE_ID,
        tableId: SAVED_COLLECTION_ID,
        rowId: $id 
      }
    );
    return { status: "success" };
  } catch (error) {
    console.error("DELETE MOVIE ERROR:", error);
    return { status: "error", error };
  }
}