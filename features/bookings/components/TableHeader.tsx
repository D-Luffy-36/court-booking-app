"use client"
import React from 'react'

export default function TableHeader() {
    return (
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-zinc-800 bg-zinc-900/30 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
            <div className="col-span-4">Khách hàng</div>
            <div className="col-span-3">Thời gian </div>
            <div className="col-span-2">Thanh toán</div>
            <div className="col-span-2">Trạng thái</div>
            <div className="col-span-1 text-right">Thao tác</div>
        </div>
    )
}