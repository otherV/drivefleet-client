import CarsFilter from "@/components/CarsFilter";

async function getCars(search, type) {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (type) params.append("type", type);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cars?${params.toString()}`
    );
    const data = await res.json();
    return data;
}

export default async function ExploreCarsPage({ searchParams }) {
    const { search, type } = await searchParams;
    const cars = await getCars(search, type);

    return (
        <div className="min-h-screen bg-base-100 py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-black uppercase text-center mb-16">
                    Explore <span className="text-primary">Cars</span>
                </h1>
                <CarsFilter cars={cars} currentSearch={search} currentType={type} />
            </div>
        </div>
    );
}