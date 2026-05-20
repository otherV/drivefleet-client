import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BookingsList from "@/components/BookingsList";

export default async function MyBookingsPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) redirect("/login");

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings?userId=${session.user.id}`
    );
    const bookings = await res.json();

    return (
        <div className="min-h-screen bg-base-100 py-16 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-black uppercase text-center mb-16">
                    My <span className="text-primary">Bookings</span>
                </h1>
                <BookingsList bookings={bookings} />
            </div>
        </div>
    );
}