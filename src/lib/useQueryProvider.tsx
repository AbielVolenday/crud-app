'use client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export function Providers ({ children }: { children: React.ReactNode }): React.ReactElement {
  const [queryClient] = useState(() => new QueryClient())
  return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>

  )
}
