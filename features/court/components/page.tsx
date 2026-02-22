import { CourtForm } from "@/features/court/components/CourtForm";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";

export default function NewCourtPage() {
    return (
        <div className="space-y-8">
            <DashboardHeader
                title="Thêm sân bóng mới"
                description="Nhập thông tin chi tiết để tạo sân mới vào hệ thống."
            />
            <CourtForm />
        </div>
    );
}