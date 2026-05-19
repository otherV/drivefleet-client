"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const validatePassword = (password) => {
        if (password.length < 6) return "Password must be at least 6 characters";
        if (!/[A-Z]/.test(password)) return "Password must have at least one uppercase letter";
        if (!/[a-z]/.test(password)) return "Password must have at least one lowercase letter";
        return null;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const passwordError = validatePassword(form.password);
        if (passwordError) {
            toast.error(passwordError);
            return;
        }
        setLoading(true);
        await authClient.signUp.email(
            {
                name: form.name,
                email: form.email,
                image: form.photoURL,
                password: form.password,
            },
            {
                onSuccess: () => {
                    toast.success("Account created! Please login.");
                    router.push("/login");
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
                <h2 className="card-title text-2xl font-bold justify-center mb-4">Register</h2>
                <form onSubmit={handleRegister} className="flex flex-col gap-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        className="input input-bordered w-full"
                        value={form.name}
                        onChange={handleChange}
                    />
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
                        type="url"
                        name="photoURL"
                        placeholder="Photo URL"
                        className="input input-bordered w-full"
                        value={form.photoURL}
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
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>
                <div className="divider text-xs">OR</div>
                <button className="btn btn-outline w-full" onClick={handleGoogle}>
                    <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
                    Continue with Google
                </button>
                <p className="text-center mt-2 text-sm">
                    <span>Already have an account? </span>
                    <Link href="/login" className="text-primary">Login</Link>
                </p>
            </div>
        </div>
    );
}