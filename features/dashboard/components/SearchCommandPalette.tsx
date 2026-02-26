'use client'

import { useState } from 'react'

/**
 * SearchCommandPalette Component
 * Modern command palette style search bar with keyboard shortcut
 */
export function SearchCommandPalette() {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className="w-64">
            <div
                className={`
                    relative group
                    rounded-lg px-4 py-2.5
                    bg-surface border border-border-light
                    transition-all duration-200
                    ${isFocused 
                        ? 'border-primary bg-surface-elevated shadow-lg' 
                        : 'hover:border-border hover:bg-surface-elevated/50'
                    }
                `}
                onClick={() => document.querySelector('input[type="search"]')?.focus()}
            >
                {/* Search Icon */}
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>

                {/* Input */}
                <input
                    type="search"
                    placeholder="Search or press Ctrl+K"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`
                        w-full bg-transparent text-sm
                        text-text-primary placeholder-text-muted
                        focus:outline-none pl-8 pr-12
                        transition-colors duration-200
                    `}
                    aria-label="Search across dashboard"
                />

                {/* Keyboard shortcut badge */}
                {!isFocused && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <kbd className="hidden sm:inline-block text-xs px-2 py-1 rounded bg-border-light text-text-muted font-mono border border-border">
                            ⌘K
                        </kbd>
                    </div>
                )}
            </div>
        </div>
    )
}
