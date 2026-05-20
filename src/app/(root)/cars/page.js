import CarCard from "@/components/CarCard";

async function getCars() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`);
    const data = await res.json();
    return data;
}

export default async function ExploreCarsPage() {
    const cars = await getCars();

    return (
        <div className="min-h-screen bg-base-100 py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-black uppercase text-center mb-16">
                    Explore <span className="text-primary">Cars</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map((car, index) => (
                        <CarCard
                            key={car._id}
                            car={car}
                            eager={(index === 0) ? "eager" : "lazy"}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}