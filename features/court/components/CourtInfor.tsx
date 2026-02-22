import { Court } from "../types/court.types";

interface CourtInfoProps {
    court: Court;
}

/**
 * Component hiển thị thông số kỹ thuật chi tiết của sân
 */
export default function CourtInfo({ court }: CourtInfoProps) {
    // Format các giá trị hiển thị để tránh code HTML bị rác
    const formattedPrice = court.price_per_hour?.toLocaleString("vi-VN") + "đ/giờ";
    const formattedDate = court.created_at
        ? new Date(court.created_at).toLocaleDateString("vi-VN")
        : "---";

    return (
        <div className="lg:col-span-2 card">
            {/* Header tiêu đề */}
            <h3 className="text-xl font-bold text-primary italic mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                Thông số kỹ thuật
            </h3>

            {/* Grid nội dung */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <InfoRow label="Loại sân" value={court.type} />

                <InfoRow
                    label="Giá thuê"
                    value={formattedPrice}
                    valueClassName="text-primary font-bold"
                />

                <InfoRow
                    label="Ngày tạo"
                    value={formattedDate}
                    valueClassName="text-text-primary italic text-sm"
                />

                <InfoRow
                    label="Kích thước"
                    value="Tiêu chuẩn"
                />
            </div>
        </div>
    );
}

/**
 * Sub-component nhỏ để tái sử dụng cấu trúc dòng thông tin
 */
interface InfoRowProps {
    label: string;
    value: string | number;
    valueClassName?: string;
}

function InfoRow({ label, value, valueClassName = "text-text-primary font-medium" }: InfoRowProps) {
    return (
        <div className="flex justify-between border-b border-border pb-2">
            <span className="text-text-secondary">{label}:</span>
            <span className={valueClassName}>{value}</span>
        </div>
    );
}