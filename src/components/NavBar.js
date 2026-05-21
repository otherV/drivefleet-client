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

    return (
        <nav className="navbar bg-base-200 px-6">
            <div className="flex-1">
                <Link href="/" className="text-xl font-bold text-primary">DriveFleet</Link>
            </div>
            <div className="flex-none gap-4">
                <Link href="/" className="btn btn-ghost">Home</Link>
                <Link href="/cars" className="btn btn-ghost">Explore Cars</Link>
                <ThemeToggle />
                {isPending ? (
                    <span className="loading loading-spinner loading-sm"></span>
                ) : session ? (
                    <>
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
                    </>
                ) : (
                    <Link href="/login" className="btn btn-primary">Login</Link>
                )}
            </div>
        </nav>
    );
}