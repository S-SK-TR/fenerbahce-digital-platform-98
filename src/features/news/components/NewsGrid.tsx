import { NewsCard } from './NewsCard'

interface NewsItem {
  id: string
  title: string
  content: string
  imageUrl: string
  category: string
  date: string
  teamLogos?: string[]
}

interface NewsGridProps {
  newsItems: NewsItem[]
}

export function NewsGrid({ newsItems }: NewsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsItems.map((news) => (
        <NewsCard
          key={news.id}
          title={news.title}
          content={news.content}
          imageUrl={news.imageUrl}
          category={news.category}
          date={news.date}
          teamLogos={news.teamLogos}
        />
      ))}
    </div>
  )
}