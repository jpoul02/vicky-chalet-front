'use client'

import { useParams, useRouter } from 'next/navigation'
import { PeriodoDetailView } from '@/components/periodo-detail-view'

export default function PeriodoDetailPage() {
  const { periodoId } = useParams<{ periodoId: string }>()
  const router = useRouter()
  return <PeriodoDetailView periodoId={periodoId} onBack={() => router.back()} />
}
