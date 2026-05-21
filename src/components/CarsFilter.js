"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CarCard from "@/components/CarCard";

const CAR_TYPES = ["Sedan", "SUV", "Hatchback", "Luxury", "Sports", "Van"];

export default function CarsFilter({ cars, currentSearch, currentType }) {
    const [search, setSearch] = useState(currentSearch || "");
    const [type, setType] = useState(currentType || "");
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (type) params.append("type", type);
        router.push(`/cars?${params.toString()}`);
    };

    const handleReset = () => {
        setSearch("");
        setType("");
        router.push("/cars");
    };

    return (
        <>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-12">
                <input
                    type="text"
                    placeholder="Search by car name..."
                    className="input input-bordered flex-1"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="select select-bordered w-full md:w-48"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="">All Types</option>
                    {CAR_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
                <button type="submit" className="btn btn-primary">Search</button>
                {(currentSearch || currentType) && (
                    <button type="button" className="btn btn-ghost" onClick={handleReset}>
                        Reset
                    </button>
                )}
            </form>

            {cars.length === 0 ? (
                <p className="text-center text-base-content/70">No cars found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map((car, index) => (
                        <CarCard key={car._id} car={car} eager={(index === 0) ? "eager" : "lazy"} />
                    ))}
                </div>
            )}
        </>
    );
}