'use client'

import { useState, useMemo } from 'react'
import { UsersPageHeader } from '@/features/dashboard/components/users/UsersPageHeader'
import { FilterTabs } from '@/features/dashboard/components/users/FilterTabs'
import { UsersTable } from '@/features/dashboard/components/users/UsersTable'
import { Pagination } from '@/features/dashboard/components/users/Pagination'
import { EmptyState } from '@/shared/components/ui/EmptyState'

// define Member type locally same as UsersTable to keep typing
type Member = {
    id: string
    name: string
    email: string
    phone: string
    role: 'user' | 'admin'
    tier: 'Đồng' | 'Bạc' | 'Vàng'
    total: number
    avatarUrl?: string
}

// mock users
const mockUsers: Member[] = [
    {
        id: '1',
        name: 'Nguyen Van A',
        email: 'a.nguyen@example.com',
        phone: '+84 912 345 678',
        role: 'user',
        tier: 'Đồng',
        total: 1200000,
        avatarUrl: '/avatars/user1.jpg',
    },
    {
        id: '2',
        name: 'Tran Thi B',
        email: 'b.tran@example.com',
        phone: '+84 933 456 789',
        role: 'admin',
        tier: 'Bạc',
        total: 3200000,
        avatarUrl: '/avatars/user2.jpg',
    },
    {
        id: '3',
        name: 'Le Van C',
        email: 'c.le@example.com',
        phone: '+84 944 567 890',
        role: 'user',
        tier: 'Vàng',
        total: 10200000,
        avatarUrl: '/avatars/user3.jpg',
    },
    {
        id: '4',
        name: 'Pham Thi D',
        email: 'd.pham@example.com',
        phone: '+84 955 678 901',
        role: 'user',
        tier: 'Đồng',
        total: 500000,
        avatarUrl: '/avatars/user4.jpg',
    },
    {
        id: '5',
        name: 'Hoang Van E',
        email: 'e.hoang@example.com',
        phone: '+84 966 789 012',
        role: 'user',
        tier: 'Bạc',
        total: 2400000,
        avatarUrl: '/avatars/user5.jpg',
    },
    {
        id: '6',
        name: 'Tran Van F',
        email: 'f.tran@example.com',
        phone: '+84 977 890 123',
        role: 'user',
        tier: 'Vàng',
        total: 7800000,
        avatarUrl: '/avatars/user6.jpg',
    },
    {
        id: '7',
        name: 'Do Thi G',
        email: 'g.do@example.com',
        phone: '+84 988 901 234',
        role: 'user',
        tier: 'Đồng',
        total: 900000,
        avatarUrl: '/avatars/user7.jpg',
    },
    {
        id: '8',
        name: 'Vu Van H',
        email: 'h.vu@example.com',
        phone: '+84 999 012 345',
        role: 'user',
        tier: 'Bạc',
        total: 3800000,
        avatarUrl: '/avatars/user8.jpg',
    },
]

export default function UsersPage() {
    const [selectedTab, setSelectedTab] = useState('Tất cả')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const perPage = 5

    const filtered = useMemo(() => {
        let data = mockUsers
        if (selectedTab === 'Thành viên') {
            data = data.filter((u) => u.tier !== 'Đồng')
        } else if (selectedTab === 'Thường xuyên') {
            data = data.filter((u) => u.total > 3000000)
        }
        if (search) {
            data = data.filter((u) =>
                u.name.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase())
            )
        }
        return data
    }, [selectedTab, search])

    const paged = useMemo(() => {
        const start = (page - 1) * perPage
        return filtered.slice(start, start + perPage)
    }, [filtered, page])

    return (
        <div className="flex flex-col h-full bg-black text-zinc-100">
            <UsersPageHeader onAdd={() => console.log('add')} />
            <FilterTabs selected={selectedTab} onChange={(t) => { setSelectedTab(t); setPage(1) }} />

            <div className="flex-1 overflow-hidden">
                {filtered.length === 0 ? (
                    <EmptyState
                        title="Không tìm thấy kết quả"
                        description="Không có khách hàng phù hợp với tiêu chí của bạn."
                    />
                ) : (
                    <>
                        <UsersTable users={paged} />
                        <Pagination
                            page={page}
                            totalPages={Math.ceil(filtered.length / perPage)}
                            onChange={(p) => setPage(p)}
                        />
                    </>
                )}
            </div>
        </div>
    )
}
