"use client";
import Image from "next/image";
import { FaCar, FaCalendar, FaMoneyBillWave } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

export default function BookingsList({ bookings }) {

    const [loading, setLoading] = useState(null);
    const router = useRouter();

    const handleCancel = async (bookingId) => {
        setLoading(bookingId);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`,
                { method: "DELETE" }
            );
            if (!res.ok) throw new Error("Failed to cancel booking");

            toast.success("Booking cancelled!");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(null);
        }
    };

    if (bookings.length === 0) return (
        <p className="text-center text-base-content/70">You have no bookings yet.</p>
    );

    return (
        <div className="flex flex-col gap-6">
            {bookings.map((booking) => (
                <div key={booking._id} className="card bg-base-200 shadow-md">
                    <div className="card-body flex flex-row gap-6 items-center">
                        <div className="relative w-32 h-24 rounded-lg overflow-hidden shrink-0">
                            <Image
                                src={booking.carImage}
                                alt={booking.carName}
                                fill
                                sizes="128px"
                                loading="eager"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <h3 className="text-xl font-bold">{booking.carName}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-base-content/70">
                                <span className="flex items-center gap-2">
                                    <FaMoneyBillWave className="text-primary" />
                                    ${booking.totalPrice}/day
                                </span>
                                <span className="flex items-center gap-2">
                                    <FaCalendar className="text-primary" />
                                    {new Date(booking.bookingDate).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FaCar className="text-primary" />
                                    {booking.driverNeeded ? "Driver included" : "Self drive"}
                                </span>
                            </div>
                            {booking.specialNote && (
                                <p className="text-sm text-base-content/50 italic">
                                    &quot;{booking.specialNote}&quot;
                                </p>
                            )}
                        </div>
                        <button
                            className="btn btn-error btn-sm shrink-0"
                            onClick={() => handleCancel(booking._id)}
                            disabled={loading === booking._id}
                        >
                            {loading === booking._id ? "Cancelling..." : "Cancel"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}