"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        await authClient.signIn.email(
            {
                email: form.email,
                password: form.password,
            },
            {
                onSuccess: () => {
                    toast.success("Welcome back!");
                    router.push("/");
                },
                onError: ({ error }) => {
                    setLoading(false);
                    toast.error(error.message);
                },
            }
        );
    };

    const handleGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <div className="card bg-base-200 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl font-bold justify-center mb-4">Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="input input-bordered w-full"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="input input-bordered w-full"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-2"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="divider text-xs">OR</div>
                <button className="btn btn-outline w-full" onClick={handleGoogle}>
                    <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
                    Login with Google
                </button>
                <p className="text-center mt-2 text-sm">
                    <span>Don&apos;t have an account? </span>
                    <Link href="/register" className="text-primary">Register</Link>
                </p>
            </div>
        </div>
    );
}