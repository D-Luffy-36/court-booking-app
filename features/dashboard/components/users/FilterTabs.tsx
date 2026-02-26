'use client'

import { useState } from 'react'

const tabs = ['Tất cả', 'Thành viên', 'Thường xuyên']

export function FilterTabs({ selected, onChange }: { selected: string; onChange: (tab: string) => void }) {
    return (
        <div className="px-6">
            <nav aria-label="Filter tabs" className="flex space-x-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onChange(tab)}
                        className={`
                            relative px-3 py-2 text-sm font-medium
                            ${selected === tab
                                ? 'text-emerald-500'
                                : 'text-zinc-400 hover:text-zinc-200'
                            }
                            focus:outline-none
                        `}
                    >
                        {tab}
                        {selected === tab && (
                            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-emerald-500" />
                        )}
                    </button>
                ))}
            </nav>
        </div>
    )
}