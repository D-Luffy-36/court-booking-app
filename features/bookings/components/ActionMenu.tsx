"use client"
import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { MoreHorizontal, Eye, Edit2, Trash2 } from 'lucide-react'

export default function ActionMenu({ id }: { id: string }) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button aria-label={`Actions for ${id}`} className="p-1 rounded hover:bg-zinc-800/60">
                    <MoreHorizontal size={16} />
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
                align="end"
                sideOffset={8}
                className="min-w-[160px] rounded-md bg-zinc-900/60 backdrop-blur-md border border-zinc-700 p-1 shadow-lg"
            >
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-800/50 rounded">
                    <Eye size={14} /> Quick View
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-800/50 rounded">
                    <Edit2 size={14} /> Edit
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-800/50 rounded">
                    <Trash2 size={14} /> Cancel
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}
