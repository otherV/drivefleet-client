"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CAR_TYPES = ["Sedan", "SUV", "Hatchback", "Luxury", "Sports", "Van"];

export default function AddCarForm({ userId }) {
    const [form, setForm] = useState({
        name: "",
        price: "",
        type: "",
        image: "",
        seats: "",
        location: "",
        description: "",
        availability: true,
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm({ ...form, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    price: Number(form.price),
                    seats: Number(form.seats),
                    addedBy: userId,
                }),
            });
            if (!res.ok) throw new Error("Failed to add car");
            toast.success("Car added successfully!");
            router.push("/my-cars");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                name="name"
                placeholder="Car Name"
                required
                className="input input-bordered w-full"
                value={form.name}
                onChange={handleChange}
            />
            <select
                name="type"
                required
                className="select select-bordered w-full"
                value={form.type}
                onChange={handleChange}
            >
                <option value="">Select Car Type</option>
                {CAR_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            <input
                type="number"
                name="price"
                placeholder="Daily Rent Price ($)"
                required
                className="input input-bordered w-full"
                value={form.price}
                onChange={handleChange}
            />
            <input
                type="url"
                name="image"
                placeholder="Image URL"
                required
                className="input input-bordered w-full"
                value={form.image}
                onChange={handleChange}
            />
            <input
                type="number"
                name="seats"
                placeholder="Seat Capacity"
                required
                className="input input-bordered w-full"
                value={form.seats}
                onChange={handleChange}
            />
            <input
                type="text"
                name="location"
                placeholder="Pickup Location"
                required
                className="input input-bordered w-full"
                value={form.location}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Description"
                required
                className="textarea textarea-bordered w-full"
                rows={4}
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
            <button
                type="submit"
                className="btn btn-primary w-full mt-2"
                disabled={loading}
            >
                {loading ? "Adding Car..." : "Add Car"}
            </button>
        </form>
    );
}