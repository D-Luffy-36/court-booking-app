// features/dashboard/components/DashboardNavbar.tsx

'use client'

import { useState, useEffect } from 'react'
import { NavbarBreadcrumbs } from './NavbarBreadcrumbs'
import { SearchCommandPalette } from './SearchCommandPalette'
import { NavbarNotification } from './NavbarNotification'
import { NavbarAvatar } from './NavbarAvatar'

/**
 * DashboardNavbar Component
 * Modern Enterprise SaaS navbar with glass morphism effect
 * 
 * Features:
 * - Glass morphism background with blur effect
 * - Dynamic breadcrumbs navigation
 * - Command palette search bar
 * - Notification dropdown with badge
 * - User profile dropdown with role indicator
 * - Smooth transitions and hover states
 */
export function DashboardNavbar() {
    const [hasScrolled, setHasScrolled] = useState(false)

    // Detect scroll to enhance glass effect
    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`
                h-16 sticky top-0 z-50
                border-b border-border-light
                transition-all duration-300
                ${hasScrolled
                    ? 'bg-surface/80 backdrop-blur-md shadow-lg'
                    : 'bg-surface/40 backdrop-blur-sm'
                }
            `}
            role="banner"
        >
            <div className="h-full flex items-center justify-between px-6 gap-8">
                {/* Left Section: Breadcrumbs + Search */}
                <div className="flex items-center gap-8 flex-1 min-w-0">
                    {/* Breadcrumbs */}
                    <div className="hidden lg:block shrink-0">
                        <NavbarBreadcrumbs />
                    </div>

                    {/* Search Bar */}
                    <div className="shrink-0">
                        <SearchCommandPalette />
                    </div>
                </div>

                {/* Right Section: Actions & User */}
                <div className="flex items-center gap-2 shrink-0">
                    {/* Settings Button */}
                    <button
                        className={`
                            p-2.5 rounded-lg
                            text-text-secondary hover:text-text-primary
                            hover:bg-border-light
                            transition-all duration-200
                            group
                        `}
                        aria-label="Settings"
                        title="Settings"
                    >
                        <svg
                            className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </button>

                    {/* Notifications */}
                    <NavbarNotification />

                    {/* Divider */}
                    <div className="w-px h-6 bg-border-light mx-2" />

                    {/* User Avatar & Profile */}
                    <NavbarAvatar />
                </div>
            </div>
        </header>
    )
}
