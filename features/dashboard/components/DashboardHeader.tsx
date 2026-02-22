interface HeaderProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
}

export function DashboardHeader({ title, description, actions }: HeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                {/* Dùng text-text-primary hoặc trắng tùy theo CSS của bạn */}
                <h1 className="text-3xl font-bold text-primary tracking-tight">
                    {title}
                </h1>
                {description && (
                    <p className="text-primary-hover text-sm mt-1 italic">
                        {description}
                    </p>
                )}
            </div>

            {/* Khu vực Quick Actions */}
            <div className="flex items-center gap-2">
                {actions}
            </div>
        </div>
    );
}