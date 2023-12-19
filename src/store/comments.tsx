import { API } from './api'

const commentAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.mutation<void, void>({
      query: () => ({
        url: '/posts',
        method: 'GET'
      })
    })
  })
})

export const { useGetPostMutation } = commentAPI
