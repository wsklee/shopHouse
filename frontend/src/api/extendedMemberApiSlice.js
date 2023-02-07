import { apiSlice } from "./apiSlice";

export const extendedMemberApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMember: builder.query({
      query: (memberId) => `/api/members/${memberId}`,
      providesTags: (result, error, arg) => [{ type: "Member", id: arg }],
    }),
    getLoggedInMember: builder.query({
      query: () => `/api/members/me`,
      providesTags: (result, error, arg) => [{ type: "Member", id: result.id }],
    }),

    updateMember: builder.mutation({
      query: ({ updatedMember }) => ({
        url: `/api/members/me`,
        method: "PATCH",
        body: updatedMember,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Member", id: result.id },
      ],
    }),
  }),
});

export const {
  useGetMemberQuery,
  useUpdateMemberMutation,
  useGetLoggedInMemberQuery,
} = extendedMemberApiSlice;
