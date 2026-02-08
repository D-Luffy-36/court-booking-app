'use client';

import { toast } from "sonner";
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Spinner } from '@/components/ui/LoadingSpiner';
import { CircularProgress } from '@/components/ui/CircularProgress';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { SuccessMessage } from '@/components/ui/SuccessMessage';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { Input } from '@/components/form/Input';
import { Card } from '@/components/ui/Card';

export default function UITestPage() {
    return (
        <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold">UI Test</h1>

            {/* Toast demo buttons */}
            <div className="space-x-2">
                <button onClick={() => toast("Hello!")}>
                    Toast
                </button>

                <button onClick={() => toast.success("Success!")}>
                    Success
                </button>

                <button onClick={() => toast.error("Error!")}>
                    Error
                </button>

                <button
                    onClick={() =>
                        toast.promise(
                            new Promise((res) => setTimeout(res, 2000)),
                            {
                                loading: "Saving...",
                                success: "Saved!",
                                error: "Failed!",
                            }
                        )
                    }
                >
                    Promise toast
                </button>
            </div>

            <Spinner />
            <ProgressBar value={55} />
            <CircularProgress value={75} />

            <ErrorMessage
                message="Something went wrong"
                onRetry={() => toast("Retry clicked")}
            />

            <SuccessMessage message="Saved successfully!" />

            <EmptyState
                title="No Data"
                description="You don’t have any items yet."
                action={
                    <button onClick={() => toast("Create clicked")}>
                        Create
                    </button>
                }
            />

            <SkeletonLoader />

            <Input
                label="Email"
                placeholder="you@example.com"
                error="Invalid email"
            />

            <Card elevated>
                <p>This is an elevated card</p>
            </Card>
        </div>
    );
}
