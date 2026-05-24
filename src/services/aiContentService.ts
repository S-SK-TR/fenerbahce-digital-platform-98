import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { FeedbackType } from '@/features/ai-content/types';

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

type AIContentErrorType = 'NETWORK' | 'SERVER' | 'TIMEOUT' | 'UNKNOWN';

class AIContentService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_AI_CONTENT_API_BASE_URL || 'https://api.ai-content-service.com/v1',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_AI_CONTENT_API_KEY}`,
      },
    });
  }

  async generateNews(count: number = 5): Promise<ApiResponse<NewsItem[]>> {
    try {
      const response: AxiosResponse<ApiResponse<NewsItem[]>> = await this.api.post('/generate-news', {
        count,
      });
      return response.data;
    } catch (error) {
      console.error('Error generating news:', error);
      throw error;
    }
  }

  async generateMatches(count: number = 5): Promise<ApiResponse<Match[]>> {
    try {
      const response: AxiosResponse<ApiResponse<Match[]>> = await this.api.post('/generate-matches', {
        count,
      });
      return response.data;
    } catch (error) {
      console.error('Error generating matches:', error);
      throw error;
    }
  }

  async generateHighlights(count: number = 5): Promise<ApiResponse<Highlight[]>> {
    try {
      const response: AxiosResponse<ApiResponse<Highlight[]>> = await this.api.post('/generate-highlights', {
        count,
      });
      return response.data;
    } catch (error) {
      console.error('Error generating highlights:', error);
      throw error;
    }
  }

  async submitFeedback(
    contentId: string,
    contentType: 'news' | 'match' | 'highlight',
    feedbackType: FeedbackType
  ): Promise<ApiResponse<{ success: boolean }>> {
    try {
      const response: AxiosResponse<ApiResponse<{ success: boolean }>> = await this.api.post('/submit-feedback', {
        contentId,
        contentType,
        feedbackType,
        timestamp: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  }

  getErrorType(error: unknown): AIContentErrorType {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') return 'TIMEOUT';
      if (error.response) return 'SERVER';
      if (error.request) return 'NETWORK';
    }
    return 'UNKNOWN';
  }

  getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') return 'İstek zaman aşımına uğradı';
      if (error.response) return error.response.data?.message || 'Sunucu hatası';
      if (error.request) return 'Sunucuya ulaşılamıyor';
    }
    return 'Bilinmeyen hata oluştu';
  }

  // React Query ile cacheleme ve yenileme işlevselliği ekliyoruz
  useNewsQuery(options?: UseQueryOptions<ApiResponse<NewsItem[]>, Error>) {
    return useQuery({
      queryKey: ['aiNews'],
      queryFn: () => this.generateNews(),
      staleTime: 1000 * 60 * 60, // 1 saat cache
      ...options
    });
  }

  useMatchesQuery(options?: UseQueryOptions<ApiResponse<Match[]>, Error>) {
    return useQuery({
      queryKey: ['aiMatches'],
      queryFn: () => this.generateMatches(),
      staleTime: 1000 * 60 * 60, // 1 saat cache
      ...options
    });
  }

  useHighlightsQuery(options?: UseQueryOptions<ApiResponse<Highlight[]>, Error>) {
    return useQuery({
      queryKey: ['aiHighlights'],
      queryFn: () => this.generateHighlights(),
      staleTime: 1000 * 60 * 60, // 1 saat cache
      ...options
    });
  }

  async checkForNewContent(): Promise<{
    id: string;
    title: string;
    description: string;
    type: 'news' | 'match' | 'highlight';
    link: string;
  }[] | null> {
    try {
      const response: AxiosResponse<ApiResponse<{
        id: string;
        title: string;
        description: string;
        type: 'news' | 'match' | 'highlight';
        link: string;
      }[]>> = await this.api.get('/check-new-content');
      return response.data.data;
    } catch (error) {
      console.error('Error checking for new content:', error);
      return null;
    }
  }
}

export const aiContentService = new AIContentService();