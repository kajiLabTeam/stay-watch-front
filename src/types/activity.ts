export type ActivityProbability = {
  activityName: string;
  probabilities: number[]; // length 24, index = hour (0-23), value = 0.0〜1.0
};
