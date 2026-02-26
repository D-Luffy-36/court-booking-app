'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'

export function NavbarAvatar() {
    const { user, role, signOut } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

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

    const isAdmin = role?.toLowerCase() === 'admin'

    // Thay thế màu Red/Error bằng Indigo cho Admin
    const roleConfig = isAdmin
        ? { badge: 'bg-indigo-50 text-indigo-600 border-indigo-100', dot: 'bg-indigo-500' }
        : { badge: 'bg-slate-50 text-slate-600 border-slate-100', dot: 'bg-emerald-500' };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-3 px-2 py-1.5 rounded-xl transition-all duration-300
                    ${isOpen ? 'bg-surface-elevated shadow-sm ring-1 ring-border-light' : 'hover:bg-border-light/50'}
                `}
                aria-label="User menu"
                aria-expanded={isOpen}
            >
                {/* Avatar with Status Indicator */}
                <div className="relative group">
                    <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white
                        shadow-md transition-all duration-300
                        ${isAdmin
                            ? 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 rotate-3 group-hover:rotate-0'
                            : 'bg-gradient-to-br from-slate-400 to-slate-600'
                        }
                    `}>
                        {initials}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-surface border-2 border-surface flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full ${roleConfig.dot} ${isAdmin ? 'animate-pulse' : ''}`} />
                    </div>
                </div>

                {/* User Info */}
                <div className="hidden sm:block text-left max-w-[140px]">
                    <p className="text-sm font-semibold text-primary truncate leading-none">
                        {user.email?.split('@')[0]}
                    </p>
                    <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${roleConfig.badge}`}>
                        {role || '---'} {/* Hiển thị role hoặc '---' nếu không có */}
                    </span>
                </div>

                {/* Modern Chevron */}
                <svg
                    className={`w-4 h-4 text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            {/* Dropdown Menu - Glassmorphism Style */}
            {isOpen && (
                <div className="
                    absolute right-0 mt-3 w-64 rounded-2xl 
                    bg-surface/80 backdrop-blur-xl border border-border-light 
                    shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-50 overflow-hidden 
                    animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200
                ">
                    <div className="px-5 py-4 bg-gradient-to-b from-border-light/20 to-transparent">
                        <p className="text-[11px] font-medium text-text-secondary uppercase tracking-tight">Tài khoản</p>
                        <p className="text-sm font-bold text-text-primary truncate mt-0.5">{user.email}</p>
                    </div>

                    <div className="p-2 border-t border-border-light/50">
                        <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            Hồ sơ cá nhân
                        </button>

                        <button
                            onClick={() => signOut()}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-error hover:bg-error/5 rounded-lg transition-colors mt-1"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3-3H15m-3-3-3 3 3 3" />
                            </svg>
                            Đăng xuất
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}