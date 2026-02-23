'use client'

import Link from 'next/link'
import { Court } from '../types/court.types'
import { MoreHorizontal, Edit, Trash2, Power, PlusCircle } from 'lucide-react'
import { toast } from 'sonner'

interface CourtListProps {
    courts: Court[]
}

// Component này đã được refactor thành Bảng Quản lý dành cho Admin.
export function CourtList({ courts = [] }: CourtListProps) {
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
        // TODO: Gọi server action để thay đổi trạng thái sân
        toast.success(`Trạng thái sân "${court.name}" đã được cập nhật.`)
    }

    const handleDelete = async (court: Court) => {
        // TODO: Gọi server action để xóa sân
        if (window.confirm(`Bạn có chắc chắn muốn xóa sân "${court.name}"? Hành động này không thể hoàn tác.`)) {
            toast.success(`Đã xóa sân "${court.name}".`)
        }
    }

    return (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-muted/50">
                    <tr>
                        <th className="p-4 text-left font-semibold text-text-secondary">Tên sân</th>
                        <th className="p-4 text-left font-semibold text-text-secondary">Trạng thái</th>
                        <th className="p-4 text-left font-semibold text-text-secondary">Loại sân</th>
                        <th className="p-4 text-left font-semibold text-text-secondary">Giá (VND/giờ)</th>
                        <th className="p-4 text-center font-semibold text-text-secondary">Lượt đặt hôm nay</th>
                        <th className="p-4 text-right font-semibold text-text-secondary">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {courts.map((court) => (
                        <tr key={court.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                            <td className="p-4 font-medium text-text-primary">{court.name}</td>
                            <td className="p-4">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${court.is_available ? 'bg-success' : 'bg-error'}`}></span>
                                    <span className={`font-medium ${court.is_available ? 'text-success' : 'text-error'}`}>
                                        {court.is_available ? 'Đang mở' : 'Đang đóng'}
                                    </span>
                                </div>
                            </td>
                            <td className="p-4">
                                <span className="bg-background text-text-secondary text-xs font-bold px-2 py-1 rounded border border-border">
                                    {court.pitch_size}
                                </span>
                            </td>
                            <td className="p-4 text-text-secondary">{court.price_per_hour.toLocaleString('vi-VN')}</td>
                            <td className="p-4 text-center text-text-secondary font-mono">5</td>
                            <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button onClick={() => handleToggleStatus(court)} title={court.is_available ? 'Tạm đóng sân' : 'Mở lại sân'} className="p-2 text-text-secondary hover:text-primary transition-colors">
                                        <Power className="h-4 w-4" />
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
                    ))}
                </tbody>
            </table>
        </div>
    )
}