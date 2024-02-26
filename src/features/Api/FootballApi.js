import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const footballApiHeaders = {
  "X-Auth-Token": "7d521de6fca840418e1b20adaa7c4ebc",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, HEAD, PUT",
  "Access-Control-Allow-Headers": "Content-Type",
};

// const baseUrl = "";
const baseUrl = "https://api.football-data.org/v4/";

const createRequest = (url) => ({ url, headers: footballApiHeaders });

export const footballApi = createApi({
  reducerPath: "footballApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCompetitions: builder.query({
      query: () => createRequest(`/competitions`),
    }),
    getMatches: builder.query({
      query: (id) => createRequest(`/competitions/${id}/matches`),
    }),
    getMatchDetails: builder.query({
      query: (id) => createRequest(`/matches/${id}`),
    }),
  }),
});

export const {
  useGetCompetitionsQuery,
  useGetMatchesQuery,
  useGetMatchDetailsQuery,
} = footballApi;
