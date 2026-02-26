'use client'

import { useState } from 'react'

interface NotificationItem {
    id: string
    title: string
    message: string
    timestamp: Date
    read: boolean
}

/**
 * NavbarNotification Component
 * Displays notification icon with badge and dropdown
 */
export function NavbarNotification() {
    const [isOpen, setIsOpen] = useState(false)
    const [notifications] = useState<NotificationItem[]>([
        {
            id: '1',
            title: 'New Booking',
            message: 'Court A has a new booking request',
            timestamp: new Date(Date.now() - 5 * 60000),
            read: false,
        },
        {
            id: '2',
            title: 'System Update',
            message: 'Dashboard updated successfully',
            timestamp: new Date(Date.now() - 30 * 60000),
            read: true,
        },
    ])

    const unreadCount = notifications.filter(n => !n.read).length

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    relative p-2.5 rounded-lg
                    transition-all duration-200
                    ${isOpen 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-text-secondary hover:bg-border-light hover:text-text-primary'
                    }
                `}
                aria-label="Notifications"
                aria-pressed={isOpen}
            >
                {/* Bell Icon */}
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                </svg>

                {/* Notification Badge */}
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full animate-pulse" aria-label={`${unreadCount} unread notifications`} />
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-lg bg-surface border border-border-light shadow-xl z-50 overflow-hidden">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-border-light">
                        <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
                    </div>

                    {/* Notification List */}
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`
                                        px-4 py-3 border-b border-border-light last:border-b-0
                                        cursor-pointer transition-colors duration-150
                                        ${notif.read 
                                            ? 'hover:bg-border-light/50' 
                                            : 'bg-primary/5 hover:bg-primary/10'
                                        }
                                    `}
                                >
                                    <div className="flex items-start gap-3">
                                        {!notif.read && (
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-text-primary truncate">
                                                {notif.title}
                                            </p>
                                            <p className="text-xs text-text-muted mt-1 line-clamp-2">
                                                {notif.message}
                                            </p>
                                            <p className="text-xs text-text-muted mt-1">
                                                {formatTime(notif.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-8 text-center text-text-muted text-sm">
                                No notifications
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-2 border-t border-border-light bg-surface/50">
                        <button className="w-full text-xs font-medium text-primary hover:text-primary-hover transition-colors">
                            View all notifications
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

function formatTime(date: Date): string {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
}
