/* =========================
   2. Progress Bar
========================= */
export function ProgressBar({ value }: { value: number }) {
    return (
        <div className="progress-bar">
            <div
                className="progress-bar-fill"
                style={{ width: `${value}%` }}
            />
        </div>
    );
}