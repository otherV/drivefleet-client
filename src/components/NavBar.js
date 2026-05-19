import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="navbar bg-base-200 px-6">
            <div className="flex-1">
                <Link href="/" className="text-xl font-bold text-primary">DriveFleet</Link>
            </div>
            <div className="flex-none gap-4">
                <Link href="/" className="btn btn-ghost">Home</Link>
                <Link href="/cars" className="btn btn-ghost">Explore Cars</Link>
                <Link href="/login" className="btn btn-primary">Login</Link>
            </div>
        </nav>
    );
}