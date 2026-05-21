"use client";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "drivefleet-dark";
        return localStorage.getItem("theme") || "drivefleet-dark";
    });

    // apply theme on mount
    if (typeof window !== "undefined") {
        document.documentElement.setAttribute("data-theme", theme);
    }

    const toggleTheme = () => {
        const newTheme = theme === "drivefleet-dark" ? "drivefleet-light" : "drivefleet-dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <label className="swap swap-rotate btn btn-ghost btn-circle">
            <input
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === "drivefleet-light"}
            />
            <FaSun className="swap-on" size={18} />
            <FaMoon className="swap-off" size={18} />
        </label>
    );
}