"use client"
import React from 'react'
import { TABS } from '../../bookings/constants/status'

interface TableTabsProps {
    activeTab: string
    onChange: (tab: string) => void
}

export default function TableTabs({ activeTab, onChange }: TableTabsProps) {
    return (
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4">
            <nav className="flex">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => onChange(tab.key)}
                        className={`relative px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.key ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.key && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                        )}
                    </button>
                ))}
            </nav>
        </div>
    )
}