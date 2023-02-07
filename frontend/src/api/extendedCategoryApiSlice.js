import { apiSlice } from "./apiSlice";

export const extendedCategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategorys: builder.query({
      query: () => "/api/category",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Category",
                id: id,
              })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),
    addNewCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/api/category",
        method: "POST",
        // Include the entire post object as the body of the request
        body: newCategory,
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Category", id: "LIST" },
      ],
    }),
    getItemsOfCategory: builder.query({
      query: (categoryId) => `/api/category/${categoryId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Item",
                id: id,
              })),
              { type: "Item", id: "LIST" },
            ]
          : [{ type: "Item", id: "LIST" }],
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `/api/category/${categoryId}`,
        method: "PUT",
        body: updatedCategory,
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Category", id: result.id },
      ],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/api/category/${categoryId}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Category", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetCategorysQuery,
  useGetItemsOfCategoryQuery,
  useAddNewCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = extendedCategoryApiSlice;
