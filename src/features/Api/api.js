export const LeagueList = (league) =>
  `https://api.football-data.org/v4/competitions`;

export const MatchList = (id) =>
  `https://api.football-data.org/v4/competitions/${id}/matches`;

export const UpcomingMatchList = (id) =>
  `https://api.football-data.org/v4/competitions/${id}/matches?status=SCHEDULED`;

export const OngoingMatchList = (id) =>
  `https://api.football-data.org/v4/competitions/${id}/matches?status=FINISHED`;

export const LiveMatchList = (id) =>
  `https://api.football-data.org/v4/competitions/${id}/matches?status=LIVE`;

export const SingleEvent = (id) =>
  `https://api.football-data.org/v4/matches/${id}`;
