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
                {[
                    { label: "Loại sân", value: court.type, className: "text-primary italic" },
                    { label: "Giá thuê", value: formattedPrice, className: "text-primary font-bold italic" },
                    { label: "Ngày tạo", value: formattedDate, className: "text-primary italic text-sm" },
                    { label: "Kích thước", value: court.pitch_size ? `${court.pitch_size}` : "---", className: "text-primary italic text-sm" },
                ].map((item, idx) => (
                    <InfoRow
                        key={idx}
                        label={item.label}
                        value={item.value}
                        valueClassName={item.className}
                    />
                ))}
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