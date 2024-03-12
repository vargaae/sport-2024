import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const RapidApiKey = process.env.REACT_APP_RAPID_API_KEY;

const sportApiHeaders = {
  "X-RapidAPI-Key": RapidApiKey,
  "X-RapidAPI-Host": "livescore6.p.rapidapi.com",
};

const baseUrl = "https://livescore6.p.rapidapi.com/";

const createRequest = (url) => ({
  url,
  method: "GET",
  headers: sportApiHeaders,
});

export const sportApi = createApi({
  reducerPath: "sportApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCompetitions: builder.query({
      query: (sport) => createRequest(`/leagues/v2/list?Category=${sport}`),
    }),
    getCompetitionsAll: builder.query({
      query: () => createRequest(`/leagues/v2/list`),
    }),
    getMatches: builder.query({
      
      query: (sport, league) => createRequest(`/matches/v2/list-by-league?Category=${sport}&Ccd=${league}&Timezone=-7`),
      // query: (id) => createRequest(`/competitions/${id}/matches`),
    }),
    getMatchDetails: builder.query({
      query: (id, sport) => createRequest(`matches/v2/get-info?Eid=${id}&Category=${sport}`),
      // https://livescore6.p.rapidapi.com/matches/v2/get-info?Eid=702093&Category=soccer
    }),
  }),
});

export const { useGetCompetitionsQuery, useGetCompetitionsAllQuery, useGetMatchesQuery, useGetMatchDetailsQuery } = sportApi;
