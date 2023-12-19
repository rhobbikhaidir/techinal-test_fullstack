import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
  createApi
} from "@reduxjs/toolkit/query/react";

const baseUrl = "https://jsonplaceholder.typicode.com";

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
    getAllComment: builder.mutation<string, void>({
      query: () => ({
        url: "/comments",
        method: "GET",
      }),
    }),
  }),
});


export const { useGetAllCommentMutation } = API


