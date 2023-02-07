import { apiSlice } from "./apiSlice";

export const extendedCartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: ({ cartId }) => `/api/members/cart/${cartId}`,
      providesTags: (result, error, args) => [
        { type: "Cart", id: args.cartId },
      ],
    }),
    getCarts: builder.query({
      query: () => `/api/members/cart`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ cartId }) => ({
                type: "Cart",
                id: cartId,
              })),
              { type: "Cart", id: "LIST" },
            ]
          : [{ type: "Cart", id: "LIST" }],
    }),
    addNewCart: builder.mutation({
      query: ({ newCart }) => ({
        url: `/api/members/cart`,
        method: "POST",
        body: newCart,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    updateCart: builder.mutation({
      query: ({ cartId, updatedCart }) => ({
        url: `/api/members/cart/${cartId}`,
        method: "PUT",
        body: updatedCart,
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Cart", id: args.cartId },
      ],
    }),
    deleteCart: builder.mutation({
      query: ({ cartId }) => ({
        url: `/api/members/cart/${cartId}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    deleteAllCart: builder.mutation({
      query: () => ({
        url: `/api/members/cart`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCartQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useDeleteAllCartMutation,
  useGetCartsQuery,
  useAddNewCartMutation,
} = extendedCartApiSlice;
