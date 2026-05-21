"use client";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Logged out successfully!");
                    router.push("/login");
                },
                onError: ({ error }) => {
                    console.error(error);
                    toast.error("Something went wrong. Please try again.");
                },
            },
        });
    };

    const navLinks = (
        <>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/cars">Explore Cars</Link></li>
            {session && (
                <>
                    <li><Link href="/add-car">Add Car</Link></li>
                    <li><Link href="/my-bookings">My Bookings</Link></li>
                </>
            )}
        </>
    );

    return (
        <>
            <div className="drawer">
                <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <nav className="navbar bg-base-200 px-4">
                        {/* Mobile hamburger */}
                        <div className="navbar-start">
                            <label htmlFor="mobile-drawer" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </label>
                            <Link href="/" className="text-xl font-bold text-primary">DriveFleet</Link>
                        </div>

                        {/* Desktop links */}
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                {navLinks}
                            </ul>
                        </div>

                        {/* Right side */}
                        <div className="navbar-end gap-2">
                            <ThemeToggle />
                            {isPending ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : session ? (
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <Image
                                                src={session.user.image || "/default-avatar.png"}
                                                alt={session.user.name}
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-50 mt-3 w-52 p-2 shadow">
                                        <li className="menu-title text-xs">{session.user.name}</li>
                                        <li><Link href="/add-car">Add Car</Link></li>
                                        <li><Link href="/my-bookings">My Bookings</Link></li>
                                        <li><Link href="/my-cars">My Added Cars</Link></li>
                                        <li><button onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </div>
                            ) : (
                                <div className="hidden lg:flex gap-2">
                                    <Link href="/login" className="btn btn-ghost">Login</Link>
                                    <Link href="/register" className="btn btn-primary">Register</Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>

                {/* Drawer sidebar */}
                <div className="drawer-side z-50">
                    <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
                    <div className="bg-base-200 min-h-full w-64 p-6 flex flex-col gap-6">
                        <Link href="/" className="text-xl font-bold text-primary">DriveFleet</Link>
                        <ul className="menu gap-2">
                            {navLinks}
                            {!session && (
                                <>
                                    <li><Link href="/login">Login</Link></li>
                                    <li><Link href="/register">Register</Link></li>
                                </>
                            )}
                            {session && (
                                <>
                                    <li><Link href="/my-cars">My Added Cars</Link></li>
                                    <li>
                                        <button onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}