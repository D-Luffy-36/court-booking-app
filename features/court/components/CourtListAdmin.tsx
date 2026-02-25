'use client'

import Link from 'next/link'
import { Court } from '../types/court.types'
import { MoreHorizontal, Edit, Trash2, Power, PlusCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useCourts } from '../hooks/useCourts'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface CourtListAdminProps {
    courts: Court[]
}

// Component này đã được refactor thành Bảng Quản lý dành cho Admin.
export function CourtListAdmin({ courts = [] }: CourtListAdminProps) {
    const router = useRouter()
    const { updateCourt } = useCourts()
    const [updatingId, setUpdatingId] = useState<string | null>(null)

    if (courts.length === 0) {
        return (
            <div className="empty-state card py-12 flex flex-col items-center justify-center border-2 border-dashed border-border">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                    <span className="text-5xl">🏟️</span>
                </div>
                <h2 className="text-xl font-semibold text-text-primary">Chưa có sân nào được tạo</h2>
                <p className="text-text-muted mt-2">Bắt đầu quản lý bằng cách thêm sân mới.</p>
                <Link href="/dashboard/courts/new" className="btn-primary mt-4 inline-flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Thêm sân mới
                </Link>
            </div>
        )
    }

    const handleToggleStatus = async (court: Court) => {
        setUpdatingId(court.id)
        try {
            const result = await updateCourt(court.id, { is_available: !court.is_available })

            if (result.success) {
                toast.success(`Trạng thái sân "${court.name}" đã được cập nhật.`)
                router.refresh() // Fetch lại data từ server để cập nhật UI
            } else {
                toast.error(result.error || `Cập nhật trạng thái sân "${court.name}" thất bại.`)
            }
        } catch (e) {
            toast.error("Đã có lỗi xảy ra khi cập nhật trạng thái.")
        } finally {
            setUpdatingId(null)
        }
    }

    const handleDelete = (court: Court) => {
        toast.error(`Xóa sân "${court.name}"?`, {
            description: "Hành động này không thể hoàn tác.",
            action: {
                label: "Xóa ngay",
                onClick: async () => {
                    // const result = await deleteCourt(court.id);
                    // if (result.success) {
                    //     toast.success(`Đã xóa sân ${court.name}`);
                    // } else {
                    //     toast.error(result.error);
                    // }
                },
            },
            cancel: {
                label: "Hủy",
                onClick: () => console.log("Cancelled"),
            },
        });
    };
    return (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-muted/50">
                    <tr>
                        <th className="p-4 text-center font-semibold text-text-secondary">Tên sân</th>
                        <th className="p-4 text-center font-semibold text-text-secondary">Trạng thái</th>
                        <th className="p-4 text-center font-semibold text-text-secondary hidden md:table-cell">Kích Thước</th>
                        <th className="p-4 text-center font-semibold text-text-secondary hidden md:table-cell">Giá (VND/giờ)</th>
                        <th className="p-4 text-center font-semibold text-text-secondary hidden lg:table-cell">Lượt đặt hôm nay</th>
                        <th className="p-4 text-center font-semibold text-text-secondary">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {courts.map((court) => {
                        const isUpdating = updatingId === court.id
                        return (
                            <tr key={court.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                                <td className="p-4 font-medium text-text-primary text-center">{court.name}</td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${court.is_available ? 'bg-success' : 'bg-error'}`}></span>
                                        <span className={`font-medium ${court.is_available ? 'text-success' : 'text-error'}`}>
                                            {court.is_available ? 'Đang mở' : 'Đang đóng'}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4 text-center hidden md:table-cell">
                                    <span className="bg-background text-text-secondary text-xs font-bold px-2 py-1 rounded border border-border">
                                        {court.pitch_size}
                                    </span>
                                </td>
                                <td className="p-4 text-text-secondary text-center hidden md:table-cell">{court.price_per_hour.toLocaleString('vi-VN')}</td>
                                <td className="p-4 text-center text-text-secondary font-mono hidden lg:table-cell">5</td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleToggleStatus(court)}
                                            title={court.is_available ? 'Tạm đóng sân' : 'Mở lại sân'}
                                            className="p-2 text-text-secondary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-wait"
                                            disabled={isUpdating}
                                        >
                                            {isUpdating ? (
                                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            ) : (
                                                <Power className="h-4 w-4" />
                                            )}
                                        </button>
                                        <Link href={`/dashboard/courts/${court.id}`} title="Chỉnh sửa" className="p-2 text-text-secondary hover:text-primary transition-colors">
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                        <button onClick={() => handleDelete(court)} title="Xóa sân" className="p-2 text-text-secondary hover:text-error transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}