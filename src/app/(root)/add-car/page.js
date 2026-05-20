import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AddCarForm from "@/components/AddCarForm";

export default async function AddCarPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) redirect("/login");

    return (
        <div className="min-h-screen bg-base-100 py-16 px-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-black uppercase text-center mb-16">
                    Add <span className="text-primary">Car</span>
                </h1>
                <AddCarForm userId={session.user.id} />
            </div>
        </div>
    );
}