import { url } from 'inspector'
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
        <div key={index}>
          {item.href ? (
            <Link href={item.href}>{item.name}</Link>
          ) : (
            <span>{item.name}</span>
          )}
          {index < items.length - 1 && (
            <span className="mx-1">{separator}</span>
          )}
        </div>
      ))}
    </div>
  )
}

export default Breadcrumb
