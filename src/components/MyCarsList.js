"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaUsers, FaTag } from "react-icons/fa";
import UpdateCarModal from "./UpdateCarModal";

export default function MyCarsList({ cars }) {
    const [loading, setLoading] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const router = useRouter();
    const modalRef = useRef(null);

    const openDeleteModal = (car) => {
        setSelectedCar(car);
        modalRef.current.showModal();
    };

    const handleDelete = async () => {
        setLoading(selectedCar._id);
        modalRef.current.close();
        try {

            const { data: tokenData, error: tokenError } = await authClient.token();
            if (tokenError) throw new Error("Failed to get token");
            const token = tokenData.token;

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/cars/${selectedCar._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            if (!res.ok) throw new Error("Failed to delete car");
            toast.success("Car deleted successfully!");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(null);
        }
    };

    if (cars.length === 0) return (
        <p className="text-center text-base-content/70">You have no cars listed yet.</p>
    );

    return (
        <>
            <div className="flex flex-col gap-6">
                {cars.map((car, index) => (
                    <div key={car._id} className="card bg-base-200 shadow-md">
                        <div className="card-body flex flex-row gap-6 items-center">
                            <div className="relative w-32 h-24 rounded-lg overflow-hidden shrink-0">
                                <Image
                                    src={car.image}
                                    alt={car.name}
                                    fill
                                    sizes="128px"
                                    loading={(index === 0) ? "eager" : "lazy"}
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-xl font-bold">{car.name}</h3>
                                    <span className="badge badge-primary">{car.type}</span>
                                    <span className={`badge ${car.availability ? "badge-success" : "badge-error"}`}>
                                        {car.availability ? "Available" : "Unavailable"}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-base-content/70">
                                    <span className="flex items-center gap-2">
                                        <FaTag className="text-primary" />${car.price}/day
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FaUsers className="text-primary" />{car.seats} Seats
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-primary" />{car.location}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 shrink-0">

                                {/* Component for Update Button & Model Inputs */}
                                <UpdateCarModal car={car} />

                                <button
                                    className="btn btn-error btn-sm"
                                    onClick={() => openDeleteModal(car)}
                                    disabled={loading === car._id}
                                >
                                    {loading === car._id ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl mb-2">Delete Car</h3>
                    <p className="text-base-content/70">
                        Are you sure you want to delete <span className="text-primary font-bold">{selectedCar?.name}</span>? This action cannot be undone.
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-ghost mr-2">Cancel</button>
                        </form>
                        <button
                            className="btn btn-error"
                            onClick={handleDelete}
                        >
                            Yes, Delete
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