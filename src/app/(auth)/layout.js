import Link from "next/link";

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-base-100">
            <div className="p-4">
                <Link href="/" className="text-xl font-bold text-primary">DriveFleet</Link>
            </div>
            <div className="flex-1 flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}