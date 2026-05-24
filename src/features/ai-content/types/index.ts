export type FeedbackType = 'like' | 'dislike' | 'report'

export interface FeedbackData {
  contentId: string
  contentType: 'news' | 'match' | 'highlight' | 'fanStory'
  feedbackType: FeedbackType
  timestamp: string
  reason?: string
}

export interface ContentFilterOptions {
  contentTypes: string[]
  feedbackTypes: FeedbackType[]
  dateRange?: {
    start: string
    end: string
  }
  minRating?: number
}

export interface PerformanceMetrics {
  loadTimes: Record<string, number>;
  errorRates: Record<string, number>;
  userEngagement: Record<string, number>;
}

export interface FeedbackMetrics {
  submissionCount: number;
  successRate: number;
  errorCount: number;
  lastSubmissionTime: number | null;
}

export interface FilterMetrics {
  filterChanges: number;
  lastFilterTime: number;
}

export interface PreferenceMetrics {
  preferenceChanges: number;
  lastChangeTime: number;
}