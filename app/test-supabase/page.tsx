// app/test-supabase/page.tsx
import { createClient } from '@/app/lib/supabase/server'

export default async function TestSupabasePage() {
    const supabase = createClient()

    // Test connection
    const { data, error } = await (await supabase).from('courts').select('*')

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>

            {error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p className="font-bold">❌ Lỗi kết nối:</p>
                    <p>{error.message}</p>
                </div>
            ) : (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    <p className="font-bold">✅ Kết nối thành công!</p>
                    <p>Tìm thấy {data?.length || 0} sân</p>
                    <pre className="mt-4 bg-white p-4 rounded overflow-auto">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    )
}