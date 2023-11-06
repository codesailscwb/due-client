import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetKpisResponse,
  GetXLSResponse,
  GetProductsResponse,
  GetTransactionsResponse,
  XLS,
  GetSurveyResponse,
  GetRankingResponse,
} from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Kpis", "Products", "Transactions", "XLSlines", "Surveys", "Rankings"],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"],
    }),
    getXLSlines: build.query<Array<GetXLSResponse>, void>({
      query: () => "xlslines/xlslines",
      providesTags: ["XLSlines"],
    }),
    addXLS: build.mutation<Array<XLS>, Array<XLS>>({
      query(body) {
        return {
          url: `xlslines/xlslines`,
          method: 'POST',
          body,
        }
      },
    }),
    getSurveys: build.query<Array<GetSurveyResponse>, void>({
      query: () => "survey/surveys",
      providesTags: ["Surveys"],
    }),
    addSurvey: build.mutation({
      query(body) {
        return {
          url: `survey/surveys`,
          method: 'POST',
          body,
        }
      },
    }),
    getRankings: build.query<Array<GetRankingResponse>, void>({
      query: () => "ranking/rankings",
      providesTags: ["Rankings"],
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => "product/products/",
      providesTags: ["Products"],
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      query: () => "transaction/transactions/",
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery, useGetXLSlinesQuery, useAddXLSMutation, useAddSurveyMutation, useGetSurveysQuery, useGetRankingsQuery } =
  api;