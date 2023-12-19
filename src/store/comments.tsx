import { API } from "./api";

const commentAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getComment: builder.mutation<void, void>({
      query: () => ({
        url: "/comments",
        method: "GET",
      }),
    }),
  }),
});



// export const { use  } = commentAPI