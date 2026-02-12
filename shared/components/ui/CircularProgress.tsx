/* =========================
   3. Circular Progress
========================= */
export function CircularProgress({ value }: { value: number }) {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="relative w-24 h-24">
            <svg className="transform -rotate-90 w-full h-full">
                <circle
                    cx="48"
                    cy="48"
                    r="45"
                    stroke="var(--border)"
                    strokeWidth="6"
                    fill="none"
                />
                <circle
                    cx="48"
                    cy="48"
                    r="45"
                    stroke="var(--primary)"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-300"
                />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{value}%</span>
            </div>
        </div>
    );
}
