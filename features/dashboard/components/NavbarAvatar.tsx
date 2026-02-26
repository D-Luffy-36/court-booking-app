'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'

/**
 * NavbarAvatar Component
 * User profile avatar with dropdown menu
 */
export function NavbarAvatar() {
    const { user, role, signOut } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    if (!user) return null

    const initials = user.email
        ?.split('@')[0]
        .split('.')
        .map((n) => n[0])
        .join('')
        .toUpperCase() || 'U'

    const roleBadgeColor = {
        admin: 'bg-error/20 text-error',
        user: 'bg-primary/20 text-primary',
    }[role?.toLowerCase() || 'user'] || 'bg-primary/20 text-primary'

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg
                    transition-all duration-200
                    ${isOpen 
                        ? 'bg-primary/10' 
                        : 'hover:bg-border-light'
                    }
                `}
                aria-label="User menu"
                aria-expanded={isOpen}
            >
                {/* Avatar */}
                <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-sm font-semibold text-white">
                        {initials}
                    </div>
                    {role && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-surface border-2 border-primary flex items-center justify-center">
                            <div className={`w-1.5 h-1.5 rounded-full ${role === 'admin' ? 'bg-error' : 'bg-primary'}`} />
                        </div>
                    )}
                </div>

                {/* User Info */}
                <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-text-primary truncate">
                        {user.email?.split('@')[0]}
                    </p>
                    <p className={`text-xs font-medium ${roleBadgeColor}`}>
                        {role?.charAt(0).toUpperCase() + role?.slice(1) || 'User'}
                    </p>
                </div>

                {/* Chevron */}
                <svg
                    className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg bg-surface border border-border-light shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    {/* User Info Card */}
                    <div className="px-4 py-4 border-b border-border-light bg-surface-elevated/30">
                        <p className="text-sm font-semibold text-text-primary">{user.email}</p>
                        <p className={`text-xs mt-1 font-medium ${roleBadgeColor}`}>
                            {role?.charAt(0).toUpperCase() + role?.slice(1) || 'User'}
                        </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        <MenuItemLink 
                            href="/dashboard/settings" 
                            icon="⚙️"
                            label="Settings"
                            onClick={() => setIsOpen(false)}
                        />
                        <MenuItemLink 
                            href="/dashboard/profile" 
                            icon="👤"
                            label="Profile"
                            onClick={() => setIsOpen(false)}
                        />
                        {role === 'admin' && (
                            <MenuItemLink 
                                href="/admin/dashboard" 
                                icon="🔐"
                                label="Admin Panel"
                                onClick={() => setIsOpen(false)}
                            />
                        )}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border-light" />

                    {/* Logout Button */}
                    <div className="p-2">
                        <button
                            onClick={async () => {
                                setIsOpen(false)
                                await signOut()
                            }}
                            className={`
                                w-full px-3 py-2 rounded-md text-sm font-medium
                                text-error bg-error/10
                                hover:bg-error/20
                                transition-colors duration-200
                                flex items-center gap-2
                            `}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

interface MenuItemLinkProps {
    href: string
    icon?: string
    label: string
    onClick?: () => void
}

function MenuItemLink({ href, icon, label, onClick }: MenuItemLinkProps) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`
                block px-4 py-2 text-sm text-text-primary
                hover:bg-border-light
                transition-colors duration-150
                flex items-center gap-3
            `}
        >
            {icon && <span>{icon}</span>}
            <span>{label}</span>
        </a>
    )
}
