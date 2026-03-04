"use client"
import React from 'react'

export default function SkeletonRow() {
    return (
        <div className="flex items-center gap-4 py-3 px-4 animate-pulse">
            <div className="w-8 h-8 rounded bg-zinc-800/60" />
            <div className="flex-1 min-w-0">
                <div className="h-3 bg-zinc-800/60 rounded w-1/3 mb-2" />
                <div className="h-2 bg-zinc-800/50 rounded w-1/4" />
            </div>
            <div className="w-24 h-3 bg-zinc-800/50 rounded" />
            <div className="w-20 h-3 bg-zinc-800/50 rounded hidden md:block" />
            <div className="w-10 h-3 bg-zinc-800/50 rounded" />
        </div>
    )
}
