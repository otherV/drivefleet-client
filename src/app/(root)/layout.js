import Navbar from "@/components/NavBar";

export default function RootGroupLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}