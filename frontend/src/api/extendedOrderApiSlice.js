import { apiSlice } from "./apiSlice";

export const extendedOrderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMemberOrders: builder.query({
      query: () => `/api/members/orders`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ orderId }) => ({
                type: "Order",
                id: orderId,
              })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),
    getOrder: builder.query({
      query: (orderId) => `/api/orders/${orderId}`,
      providesTags: (result, error, arg) => [{ type: "Order", id: arg }],
    }),
    addNewOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/api/orders",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/api/orders/${orderId}/cancel`,
        method: "POST",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Order", id: arg }],
    }),
  }),
});

export const {
  useGetMemberOrdersQuery,
  useGetOrderQuery,
  useAddNewOrderMutation,
  useCancelOrderMutation,
} = extendedOrderApiSlice;
