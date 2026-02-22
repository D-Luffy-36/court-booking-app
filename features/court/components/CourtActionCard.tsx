import { Court } from "../types/court.types";

interface CourtActionCardProps {
    court: Court;
    onBook: (id: string | number) => void;
    onEdit: (id: string | number) => void;
    onDelete: (id: string | number) => void;
    onMaintenance: (id: string | number) => void;
}

const CourtActionCard = ({
    court,
    onBook,
    onEdit,
    onDelete,
    onMaintenance,
}: CourtActionCardProps) => {
    // Helper để lấy style và text dựa trên trạng thái sân
    const getStatusConfig = () => {
        // Ưu tiên hiển thị bảo trì nếu có field này
        // if (court.is_maintenance) {
        //   return {
        //     label: "Đang bảo trì",
        //     classes: "bg-warning/10 text-warning",
        //     dotColor: "bg-warning",
        //   };
        // }

        return court.is_available
            ? {
                label: "Sẵn sàng",
                classes: "bg-success/10 text-success",
                dotColor: "bg-success",
            }
            : {
                label: "Đang được thuê",
                classes: "bg-error/10 text-error",
                dotColor: "bg-error",
            };
    };

    const status = getStatusConfig();

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5 shadow-sm hover:shadow-md transition-shadow">
            {/* Header - Status Badge */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-gray-600">
                        Trạng thái
                    </div>
                    <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${status.classes}`}
                    >
                        <span className={`w-2 h-2 rounded-full ${status.dotColor} animate-pulse`}></span>
                        {status.label}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100"></div>

            {/* Actions Section */}
            <div className="space-y-3">
                {/* Primary Action - Book */}
                <button
                    onClick={() => onBook(court.id)}
                    disabled={!court.is_available}
                    className="btn-primary w-full py-3 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary transition-all hover:shadow-md"
                >
                    <span className="inline-flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Đặt lịch ngay
                    </span>
                </button>

                {/* Secondary Actions Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => onEdit(court.id)}
                        className="btn-secondary py-2.5 text-sm font-medium hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                        <span className="inline-flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Chỉnh sửa
                        </span>
                    </button>

                    <button
                        onClick={() => onMaintenance(court.id)}
                        className="btn-secondary py-2.5 text-sm font-medium text-warning hover:bg-warning/5 border-warning/20 transition-colors"
                    >
                        <span className="inline-flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Bảo trì
                        </span>
                    </button>
                </div>

                {/* Danger Zone - Delete */}
                <button
                    onClick={() => onDelete(court.id)}
                    className="btn-secondary w-full py-2.5 text-sm font-medium text-error hover:bg-error/5 border-error/20 transition-colors group"
                >
                    <span className="inline-flex items-center gap-2">
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Xóa sân
                    </span>
                </button>
            </div>
        </div>
    );
};

export default CourtActionCard;