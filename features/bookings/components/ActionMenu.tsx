"use client"
import React, { useCallback } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { MoreHorizontal, Eye, Edit2, Trash2, CheckCircle, UserCheck, CalendarDays, Printer, FileText, RefreshCw } from 'lucide-react'
import { Booking, ACTIONS } from '../types';

// move action constants out for cleanliness

type ActionType = (typeof ACTIONS)[keyof typeof ACTIONS];

// ActionMenu.tsx

type ActionMenuProps = {
    booking: Booking;
    onAction: (action: string, booking: Booking) => void;
};


export default function ActionMenu({ booking, onAction }: ActionMenuProps) {
    const status = booking?.status; // optional chaining for safety

    const triggerRef = React.useRef<HTMLButtonElement>(null);

    const handle = useCallback((action: ActionType) => {
        if (booking) onAction(action, booking);
    }, [booking, onAction]);

    return (
        <DropdownMenu.Root>
            {/* trigger icon button wrapped with asChild to avoid nested button issues */}
            <DropdownMenu.Trigger asChild ref={triggerRef}>
                <button
                    className="inline-flex items-center justify-center p-1 rounded-md hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                    aria-label="More actions"
                >
                    <MoreHorizontal size={18} />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    align="end"
                    sideOffset={4}
                    className="w-48 bg-zinc-900 border border-zinc-800 rounded-md shadow-lg py-1 text-zinc-200
                        data-[state=open]:animate-fade-in data-[state=open]:slide-in-from-top
                        transition-all duration-150 ease-out"
                >
                    {/* --- NHÓM LUÔN XUẤT HIỆN --- */}
                    <DropdownMenu.Item onClick={() => handle(ACTIONS.VIEW)} className="px-2 py-1 gap-2 flex items-center cursor-pointer hover:bg-zinc-800 rounded focus-visible:outline-none" aria-label="Xem chi tiết">
                        <Eye size={14} /> <span>Xem chi tiết</span>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="h-px bg-zinc-800 my-1" />

                    {/* --- NHÓM BIẾN ĐỔI THEO MATRIX [3] --- */}

                    {status === 'pending' && (
                        <>
                            <DropdownMenu.Item onClick={() => handle(ACTIONS.CONFIRM)} className="px-2 py-1 gap-2 flex items-center text-emerald-400 cursor-pointer hover:bg-zinc-800 rounded focus-visible:outline-none" aria-label="Xác nhận đặt sân">
                                <CheckCircle size={14} /> <span>Xác nhận đặt sân</span>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onClick={() => handle(ACTIONS.EDIT)} className="px-2 py-1 gap-2 flex items-center cursor-pointer hover:bg-zinc-800 rounded focus-visible:outline-none" aria-label="Chỉnh sửa thông tin">
                                <Edit2 size={14} /> <span>Chỉnh sửa thông tin</span>
                            </DropdownMenu.Item>
                        </>
                    )}

                    {status === 'confirmed' && (
                        <>
                            <DropdownMenu.Item onClick={() => handle(ACTIONS.CHECK_IN)} className="px-2 py-1 gap-2 flex items-center text-blue-400 cursor-pointer hover:bg-zinc-800 rounded focus-visible:outline-none" aria-label="Check-in (Nhận sân)">
                                <UserCheck size={14} /> <span>Check-in (Nhận sân)</span>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onClick={() => handle(ACTIONS.RESCHEDULE)} className="px-2 py-1 gap-2 flex items-center cursor-pointer hover:bg-zinc-800 rounded focus-visible:outline-none" aria-label="Đổi lịch đặt">
                                <CalendarDays size={14} /> <span>Đổi lịch đặt</span>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onClick={() => handle(ACTIONS.PRINT)} className="px-2 py-1 gap-2 flex items-center cursor-pointer hover:bg-zinc-800 rounded focus-visible:outline-none" aria-label="In phiếu đặt sân">
                                <Printer size={14} /> <span>In phiếu đặt sân</span>
                            </DropdownMenu.Item>
                        </>
                    )}

                    {status === 'completed' && (
                        <DropdownMenu.Item onClick={() => handle(ACTIONS.PRINT_INVOICE)} className="px-2 py-1 gap-2 flex items-center cursor-pointer hover:bg-zinc-800 rounded focus-visible:outline-none" aria-label="In hóa đơn thanh toán">
                            <FileText size={14} /> <span>In hóa đơn thanh toán</span>
                        </DropdownMenu.Item>
                    )}

                    {status === 'cancelled' && (
                        <DropdownMenu.Item onClick={() => handle(ACTIONS.RESTORE)} className="px-2 py-1 gap-2 flex items-center text-orange-400 cursor-pointer hover:bg-zinc-800 rounded focus-visible:outline-none" aria-label="Phục hồi đơn đặt">
                            <RefreshCw size={14} /> <span>Phục hồi đơn đặt</span>
                        </DropdownMenu.Item>
                    )}

                    {/* --- NHÓM NGUY HIỂM (CẨN TRỌNG) --- */}
                    {(status === 'pending' || status === 'confirmed') && (
                        <>
                            <DropdownMenu.Separator className="h-px bg-zinc-800 my-1" />
                            <DropdownMenu.Item
                                onClick={() => handle(ACTIONS.CANCEL)}
                                className="px-2 py-1 gap-2 flex items-center text-red-400 cursor-pointer hover:bg-red-500/10 rounded focus-visible:outline-none"
                                aria-label="Hủy đơn đặt chỗ"
                            >
                                <Trash2 size={14} /> <span>Hủy đơn đặt chỗ</span>
                            </DropdownMenu.Item>
                        </>
                    )}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}