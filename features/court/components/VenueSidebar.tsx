import { MapPin, Phone, Clock, DollarSign, Calendar, User, FileText } from 'lucide-react';

export const VenueSidebar = () => {
    return (
        <div className="w-full bg-card text-text-secondary p-6 rounded-2xl border border-border shadow-sm">
            {/* Thông tin sân */}
            <section className="mb-6">
                <h3 className="text-text-primary font-bold mb-4 text-lg flex items-center gap-2">
                    <span className="w-1 h-5 bg-primary rounded-full"></span>
                    Thông tin sân
                </h3>

                <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                        <div className="p-2 bg-muted rounded-lg h-fit text-primary">
                            <MapPin size={18} />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted font-medium uppercase">Địa chỉ</p>
                            <p className="text-sm text-text-primary font-medium">Số 10, Đường Hùng Vương, Hà Nội</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-start">
                        <div className="p-2 bg-muted rounded-lg h-fit text-primary">
                            <Phone size={18} />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted font-medium uppercase">Điện thoại</p>
                            <p className="text-sm text-text-primary font-medium">090 123 4567</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-start">
                        <div className="p-2 bg-muted rounded-lg h-fit text-primary">
                            <Clock size={18} />
                        </div>
                        <div>
                            <p className="text-xs text-text-muted font-medium uppercase">Giờ hoạt động</p>
                            <p className="text-sm text-text-primary font-medium">6:00 - 22:00</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="border-t border-border my-6"></div>

            {/* Cài đặt chung */}
            <section className="mb-8">
                <h3 className="text-text-primary font-bold mb-4 text-lg flex items-center gap-2">
                    <span className="w-1 h-5 bg-primary rounded-full"></span>
                    Cài đặt chung
                </h3>
                <ul className="space-y-2">
                    <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted text-text-secondary hover:text-primary cursor-pointer transition-all">
                        <DollarSign size={18} />
                        <span className="text-sm font-medium">Quản lý giá</span>
                    </li>
                    <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted text-text-secondary hover:text-primary cursor-pointer transition-all">
                        <User size={18} />
                        <span className="text-sm font-medium">Cấu hình người dùng</span>
                    </li>
                </ul>
            </section>

            <button className="btn-primary w-full py-3 flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                <FileText size={18} />
                Xuất báo cáo
            </button>
        </div>
    );
};