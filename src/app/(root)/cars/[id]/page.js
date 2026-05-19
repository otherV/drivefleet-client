import BookingModal from "@/components/BookingModal";
import Image from "next/image";
import { FaUsers, FaMapMarkerAlt, FaTag, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

async function getCar(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`);
    const data = await res.json();
    return data;
}

export default async function CarDetailsPage({ params }) {
    const { id } = await params;
    const car = await getCar(id);

    return (
        <div className="min-h-screen bg-base-100 py-16 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    <div className="relative h-80 lg:h-full min-h-72 rounded-xl overflow-hidden">
                        <Image
                            src={car.image}
                            alt={car.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            loading="eager"
                            className="object-cover"
                        />
                    </div>


                    <div className="flex flex-col gap-6">
                        <div>
                            <span className="badge badge-primary mb-3">{car.type}</span>
                            <h1 className="text-4xl font-black uppercase">{car.name}</h1>
                        </div>

                        <p className="text-base-content/70">{car.description}</p>

                        <div className="flex flex-col gap-3 text-sm">
                            <span className="flex items-center gap-3">
                                <FaTag className="text-primary" />
                                <span className="font-bold text-lg">${car.price}<span className="text-base-content/70 font-normal text-sm">/day</span></span>
                            </span>
                            <span className="flex items-center gap-3">
                                <FaUsers className="text-primary" /> {car.seats} Seats
                            </span>
                            <span className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-primary" /> {car.location}
                            </span>
                            <span className="flex items-center gap-3">
                                {car.availability
                                    ? <><FaCheckCircle className="text-success" /> Available</>
                                    : <><FaTimesCircle className="text-error" /> Not Available</>
                                }
                            </span>
                        </div>

                        <BookingModal car={car} />
                    </div>
                </div>
            </div>
        </div>
    );
}