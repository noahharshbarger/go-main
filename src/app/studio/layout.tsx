import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio',
  description: 'Content management studio',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
