import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

export const productSlice = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ["products"],
    endpoints: (builder) => ({
        getProduct: builder.query<any, void>({
            query: () => "/products/",
            providesTags: ["products"],
        }),
        addProduct: builder.mutation({
            query: (todo) => ({
                url: "/products/add-product",
                method: "POST",
                body: todo,
            }),
            invalidatesTags: ["products"],
        }),
        updateProduct: builder.mutation({
            query: ({ id }) => ({
                url: `products/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["products"],
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({ url: `products/${id}`, method: "DELETE" }),
            invalidatesTags: ["products"],
        }),
    }),
});

export const {
    useGetProductQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productSlice;