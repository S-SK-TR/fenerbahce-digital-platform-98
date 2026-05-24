export interface ContentAnalyticsData {
  views: number;
  likes: number;
  shares: number;
}

export interface ContentTypeAnalytics {
  type: 'news' | 'matches' | 'highlights' | 'fanStories';
  data: ContentAnalyticsData;
}

export interface AnalyticsChartData {
  name: string;
  views: number;
  likes: number;
  shares: number;
}