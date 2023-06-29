import Link from 'next/link'
import { ReactNode } from 'react'

interface IBreadcrumbProps {
  items: {
    name: string
    href?: string
  }[]
  separator?: ReactNode
}

function Breadcrumb({ items, separator = '>' }: IBreadcrumbProps) {
  return (
    <div className="flex items-center text-sm text-gray-400">
      {items.map((item, index) => (
        <div key={index} data-testid="breadcrumb-item">
          {item.href ? (
            <Link href={item.href}>{item.name}</Link>
          ) : (
            <span>{item.name}</span>
          )}
          {index < items.length - 1 && (
            <span className="mx-1" data-testid="breadcrumb-separator">
              {separator}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default Breadcrumb
