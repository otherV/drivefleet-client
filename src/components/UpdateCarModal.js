"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const CAR_TYPES = ["Sedan", "SUV", "Hatchback", "Luxury", "Sports", "Van"];

export default function UpdateCarModal({ car }) {
    const [form, setForm] = useState({
        price: car.price,
        type: car.type,
        image: car.image,
        location: car.location,
        description: car.description,
        availability: car.availability,
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const modalRef = useRef(null);

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm({
            ...form,
            [e.target.name]: value
        });
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {

            const { data: tokenData, error: tokenError } = await authClient.token();
            if (tokenError) throw new Error("Failed to get token");
            const token = tokenData.token;

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/cars/${car._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...form,
                        price: Number(form.price),
                    }),
                }
            );
            if (!res.ok) throw new Error("Failed to update car");

            toast.success("Car updated successfully!");
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
                className="btn btn-primary btn-sm"
                onClick={() => modalRef.current.showModal()}
            >
                Update
            </button>

            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl mb-6">Update {car.name}</h3>
                    <div className="flex flex-col gap-4">
                        <select
                            name="type"
                            className="select select-bordered w-full"
                            value={form.type}
                            onChange={handleChange}
                        >
                            {CAR_TYPES.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="price"
                            placeholder="Daily Rent Price ($)"
                            className="input input-bordered w-full"
                            value={form.price}
                            onChange={handleChange}
                        />
                        <input
                            type="url"
                            name="image"
                            placeholder="Image URL"
                            className="input input-bordered w-full"
                            value={form.image}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Pickup Location"
                            className="input input-bordered w-full"
                            value={form.location}
                            onChange={handleChange}
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            className="textarea textarea-bordered w-full"
                            rows={3}
                            value={form.description}
                            onChange={handleChange}
                        />
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="availability"
                                id="availability"
                                className="checkbox checkbox-primary"
                                checked={form.availability}
                                onChange={handleChange}
                            />
                            <label htmlFor="availability">Available for rent</label>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-ghost mr-2">Cancel</button>
                        </form>
                        <button
                            className="btn btn-primary"
                            onClick={handleUpdate}
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Save Changes"}
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