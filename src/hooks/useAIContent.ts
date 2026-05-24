import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useNotification } from './useNotification';
import { aiContentService } from '@/services/aiContentService';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  author: string;
  imageUrl?: string;
}

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  venue: string;
  status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
  score?: {
    home: number;
    away: number;
  };
}

interface Highlight {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  views: number;
}

type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

export function useAIContent() {
  const { showNotification } = useNotification();

  // News için query hook
  const useNewsQuery = (options?: UseQueryOptions<ApiResponse<NewsItem[]>, Error>) => {
    return useQuery({
      queryKey: ['aiNews'],
      queryFn: () => aiContentService.generateNews(),
      staleTime: 1000 * 60 * 60, // 1 saat cache
      onError: (error) => {
        const errorType = aiContentService.getErrorType(error);
        const message = aiContentService.getErrorMessage(error);

        showNotification({
          title: 'Haberler Yüklenemedi',
          body: message,
          tag: 'ai-content-error'
        });
      },
      ...options
    });
  };

  // Matches için query hook
  const useMatchesQuery = (options?: UseQueryOptions<ApiResponse<Match[]>, Error>) => {
    return useQuery({
      queryKey: ['aiMatches'],
      queryFn: () => aiContentService.generateMatches(),
      staleTime: 1000 * 60 * 60, // 1 saat cache
      onError: (error) => {
        const errorType = aiContentService.getErrorType(error);
        const message = aiContentService.getErrorMessage(error);

        showNotification({
          title: 'Maçlar Yüklenemedi',
          body: message,
          tag: 'ai-content-error'
        });
      },
      ...options
    });
  };

  // Highlights için query hook
  const useHighlightsQuery = (options?: UseQueryOptions<ApiResponse<Highlight[]>, Error>) => {
    return useQuery({
      queryKey: ['aiHighlights'],
      queryFn: () => aiContentService.generateHighlights(),
      staleTime: 1000 * 60 * 60, // 1 saat cache
      onError: (error) => {
        const errorType = aiContentService.getErrorType(error);
        const message = aiContentService.getErrorMessage(error);

        showNotification({
          title: 'Öne Çıkanlar Yüklenemedi',
          body: message,
          tag: 'ai-content-error'
        });
      },
      ...options
    });
  };

  return {
    useNewsQuery,
    useMatchesQuery,
    useHighlightsQuery
  };
}