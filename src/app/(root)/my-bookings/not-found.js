import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center px-6">
            <div className="text-center">
                <h1 className="text-9xl font-black text-primary">404</h1>
                <h2 className="text-3xl font-bold uppercase mt-4 mb-4">Page Not Found</h2>
                <p className="text-base-content/70 mb-8 max-w-md mx-auto">
                    Looks like this page took a wrong turn. Let&apos;s get you back on the road.
                </p>
                <Link href="/" className="btn btn-primary btn-lg gap-2">
                    <FaHome />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}