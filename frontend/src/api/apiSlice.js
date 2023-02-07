import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../store/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403 || result?.error?.status === 401) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/reissue", api, extraOptions);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data.accessToken }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
      window.location.replace("/auth/login");
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api", // default. optional
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Member", "Seller", "Order", "Cart", "Item", "SellerOrder"],
  endpoints: (builder) => ({
    getSeller: builder.query({
      query: (sellerId) => `/api/sellers/${sellerId}`,
      providesTags: (result, error, arg) => [{ type: "Seller", id: arg }],
    }),
    getLoggedInSeller: builder.query({
      query: () => `/api/sellers/me`,
      providesTags: (result, error, arg) => [
        { type: "Seller", id: result.sellerId },
      ],
    }),
    getLoggedInSellerOrders: builder.query({
      query: () => `/api/sellers/me/orders`,
      providesTags: (result, error, arg) => [{ type: "SellerOrder" }],
    }),
    addNewSeller: builder.mutation({
      query: (newSeller) => ({
        url: "/api/sellers",
        method: "POST",
        // Include the entire post object as the body of the request
        body: newSeller,
      }),
      invalidatesTags: (result, error, args) => [{ type: "Member" }],
    }),
    addNewReview: builder.mutation({
      query: ({ itemId, newReview }) => ({
        url: `/api/items/${itemId}/reviews`,
        method: "POST",
        body: newReview,
      }),
    }),
  }),
});

// Export the auto-generated hook for the `getItems` query endpoint
export const {
  useGetSellerQuery,
  useAddNewSellerMutation,
  useAddNewReviewMutation,
  useGetLoggedInSellerQuery,
  useGetLoggedInSellerOrdersQuery,
} = apiSlice;
