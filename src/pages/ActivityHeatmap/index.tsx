import { ActivityHeatmapContent } from './components/ActivityHeatmapContent';
import { getWeekday } from './utils';
import ErrorMessage from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { useGetAPI } from '@/hooks/useGetAPI';
import { ActivityProbabilitiesResponse } from '@/types/activity';
import { ENDPOINTS } from '@/utils/endpoint';

function ActivityHeatmap() {
  const {
    data: response,
    error,
    isLoading,
  } = useGetAPI<ActivityProbabilitiesResponse>(
    `${ENDPOINTS.activityProbabilities}?weekday=${getWeekday()}`,
  );

  if (isLoading) return <Loading message='活動予報を取得中...' />;
  if (error || !response) return <ErrorMessage message='活動予報の取得に失敗しました' />;

  return (
    <>
      <title>活動予報ヒートマップ</title>
      <ActivityHeatmapContent activities={response.data} />
    </>
  );
}

export default ActivityHeatmap;
