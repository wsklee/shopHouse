import { apiSlice } from "./apiSlice";

export const extendedAuthApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    reissue: builder.mutation({
      query: () => ({
        url: "/auth/reissue",
        method: "POST",
        body: {},
      }),
    }),
    signUp: builder.mutation({
      query: (newMember) => ({
        url: "/auth/signup",
        method: "POST",
        body: newMember,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "DELETE",
        body: {},
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useLogoutMutation,
  useReissueMutation,
} = extendedAuthApiSlice;
