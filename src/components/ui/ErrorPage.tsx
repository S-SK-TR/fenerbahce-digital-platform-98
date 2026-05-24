import React from 'react'
import { Button } from './Button'
import { GlassCard } from './GlassCard'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ErrorPageProps {
  error?: Error
}

export function ErrorPage({ error }: ErrorPageProps) {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="max-w-md w-full text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-red-500/10 p-3 rounded-full">
            <AlertTriangle className="text-red-500" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-red-500">Bir Hata Oluştu</h1>
          <p className="text-sm text-gray-500">
            {error?.message || 'Beklenmeyen bir hata meydana geldi. Lütfen sayfayı yenileyin.'}
          </p>
          <Button
            variant="primary"
            onClick={handleReload}
            icon={RefreshCw}
          >
            Sayfayı Yenile
          </Button>
        </div>
      </GlassCard>
    </div>
  )
}