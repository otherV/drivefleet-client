import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyCarsList from "@/components/MyCarsList";

export default async function MyCarsPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) redirect("/login");

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cars?userId=${session.user.id}`
    );
    const cars = await res.json();

    return (
        <div className="min-h-screen bg-base-100 py-16 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-black uppercase text-center mb-16">
                    My Added <span className="text-primary">Cars</span>
                </h1>
                <MyCarsList cars={cars} />
            </div>
        </div>
    );
}