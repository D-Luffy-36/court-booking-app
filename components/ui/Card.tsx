/* =========================
   9. Card
========================= */
export function Card({
    children,
    elevated = false,
}: {
    children: React.ReactNode;
    elevated?: boolean;
}) {
    return (
        <div className={elevated ? 'card-elevated' : 'card'}>
            {children}
        </div>
    );
}