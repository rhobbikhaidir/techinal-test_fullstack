import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {
  fetchBaseQuery,
  createApi
} from "@reduxjs/toolkit/query/react";
import type { AmountListProps, GameListProps } from "modules/types";

const baseUrl = "https://stage.whgstage.com/";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
});

const fetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    console.log("error fetching:", result.error);

    switch (result.error.status) {
      case "FETCH_ERROR": {
        const message = "Oops.. Network request failed";
        const error = { ...result, error: { ...result.error, message } };
        return error;
      }
      default: {
        const message = "Oops.. Something went wrong";
        const error = { ...result, error: { ...result.error, message } };

        return error;
      }
    }
  }

  return result;
};

export const API = createApi({
  reducerPath: "API",
  baseQuery: fetchBase,
  endpoints: (builder) => ({
    getAllGames: builder.mutation<GameListProps[], void>({
      query: () => ({
        url: "/front-end-test/games.php",
        method: "GET",
      }),
    }),
    getAllAmount:  builder.mutation<AmountListProps[], void>({
      query: () => ({
        url: "/front-end-test/jackpots.php",
        method: "GET",
      }),
    }),
  }),
});


export const { useGetAllGamesMutation, useGetAllAmountMutation } = API


