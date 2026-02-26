'use client'

import { usePathname } from 'next/navigation'

/**
 * NavbarBreadcrumbs Component
 * Displays navigation breadcrumbs based on current URL
 */
export function NavbarBreadcrumbs() {
    const pathname = usePathname()

    // Parse pathname into breadcrumb segments
    const segments = pathname
        .split('/')
        .filter(Boolean)
        .map((segment, index, arr) => ({
            label: formatSegment(segment),
            href: '/' + arr.slice(0, index + 1).join('/'),
            isCurrent: index === arr.length - 1,
        }))

    if (segments.length === 0) return null

    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1">
            {segments.map((segment, index) => (
                <div key={segment.href} className="flex items-center gap-1">
                    {/* Separator */}
                    {index > 0 && (
                        <svg
                            className="w-4 h-4 text-text-muted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    )}

                    {/* Breadcrumb Item */}
                    {segment.isCurrent ? (
                        <span className="text-sm font-medium text-text-primary">
                            {segment.label}
                        </span>
                    ) : (
                        <a
                            href={segment.href}
                            className={`
                                text-sm text-text-secondary
                                hover:text-text-primary hover:underline
                                transition-colors duration-200
                            `}
                        >
                            {segment.label}
                        </a>
                    )}
                </div>
            ))}
        </nav>
    )
}

function formatSegment(segment: string): string {
    return segment
        .replace(/^[a-z]/, (char) => char.toUpperCase())
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())
}
