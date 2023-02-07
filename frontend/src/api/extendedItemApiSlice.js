import { apiSlice } from "./apiSlice";

export const extendedItemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "/api/items",
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
    getItem: builder.query({
      query: (itemId) => `/api/items/${itemId}`,
      providesTags: (result, error, args) => [{ type: "Item", id: args }],
    }),
    addNewItem: builder.mutation({
      query: (newItem) => ({
        url: "/api/items",
        method: "POST",
        // Include the entire post object as the body of the request
        body: newItem,
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Item", id: "LIST" },
        { type: "Seller", id: result.sellerId },
      ],
    }),
    updateItem: builder.mutation({
      query: ({ itemId, updatedItem }) => ({
        url: `/api/items/${itemId}`,
        method: "PATCH",
        body: updatedItem,
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Item", id: args.itemId },
        { type: "Seller", id: result.sellerId },
      ],
    }),
  }),
});

export const {
  useGetItemQuery,
  useGetItemsQuery,
  useAddNewItemMutation,
  useUpdateItemMutation,
} = extendedItemApiSlice;
