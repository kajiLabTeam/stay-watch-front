export type ActivityProbability = {
  activity_name: string;
  probabilities: number[]; // length 24, index = hour (0-23), value = 0.0〜1.0
};

export type ActivityProbabilitiesResponse = {
  data: ActivityProbability[];
};
