"use client";
import { useState, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function BookingModal({ car }) {
    const [form, setForm] = useState({ driverNeeded: false, specialNote: "" });
    const [loading, setLoading] = useState(false);
    const { data: session } = authClient.useSession();
    const router = useRouter();
    const modalRef = useRef(null);

    const handleChange = (e) => {
        const value =
            (e.target.type === "checkbox")
                ? e.target.checked
                : e.target.value;
        setForm({
            ...form,
            [e.target.name]: value
        });
    };

    const handleBooking = async () => {
        if (!session) {
            toast.error("Please login to book a car");
            router.push("/login");
            return;
        }
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    carId: car._id,
                    carName: car.name,
                    carImage: car.image,
                    pricePerDay: car.price,
                    totalPrice: car.price,
                    bookingDate: new Date(),
                    driverNeeded: form.driverNeeded,
                    specialNote: form.specialNote,
                    bookedBy: session.user.id,
                }),
            });
            if (!res.ok) throw new Error("Booking failed");

            toast.success("Car booked successfully!");
            modalRef.current.close();
            router.refresh();

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                className="btn btn-primary btn-lg w-full mt-auto"
                onClick={() => modalRef.current.showModal()}
            >
                Book Now
            </button>

            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl mb-6">Book {car.name}</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="driverNeeded"
                                id="driverNeeded"
                                className="checkbox checkbox-primary"
                                checked={form.driverNeeded}
                                onChange={handleChange}
                            />
                            <label htmlFor="driverNeeded">I need a driver</label>
                        </div>
                        <textarea
                            name="specialNote"
                            placeholder="Any special notes? (optional)"
                            className="textarea textarea-bordered w-full"
                            rows={4}
                            value={form.specialNote}
                            onChange={handleChange}
                        />
                        <div className="text-sm text-base-content/70">
                            Price: <span className="text-primary font-bold">${car.price}/day</span>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-ghost mr-2">Cancel</button>
                        </form>
                        <button
                            className="btn btn-primary"
                            onClick={handleBooking}
                            disabled={loading}
                        >
                            {loading ? "Booking..." : "Confirm Booking"}
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}