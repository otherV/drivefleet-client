import Link from "next/link";
import Image from "next/image";
import { FaUsers, FaMapMarkerAlt, FaTag } from "react-icons/fa";

export default function CarCard({ car, eager }) {
    return (
        <div className="card bg-base-200 shadow-md hover:shadow-xl transition-shadow duration-300">
            <figure className="relative h-48">
                <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading={eager}
                    className="object-cover"
                />
            </figure>
            <div className="card-body p-4">
                <div className="flex justify-between items-start">
                    <h3 className="card-title text-lg font-bold">{car.name}</h3>
                    <span className="badge badge-primary">{car.type}</span>
                </div>
                <div className="flex flex-col gap-1 text-sm text-base-content/70 mt-1">
                    <span className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-primary" /> {car.location}
                    </span>
                    <span className="flex items-center gap-2">
                        <FaUsers className="text-primary" /> {car.seats} Seats
                    </span>
                    <span className="flex items-center gap-2">
                        <FaTag className="text-primary" /> ${car.price}/day
                    </span>
                </div>
                <div className="card-actions justify-end mt-3">
                    <Link href={`/cars/${car._id}`} className="btn btn-primary btn-sm w-full">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}