"use client";
import { ToastContainer } from "react-toastify";
import { useState, useEffect, useRef } from "react";

export default function ToastProvider() {
    const [theme, setTheme] = useState("dark");
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            const current = document.documentElement.getAttribute("data-theme");
            setTheme(current === "drivefleet-light" ? "light" : "dark");
            initialized.current = true;
        }

        const observer = new MutationObserver(() => {
            const current = document.documentElement.getAttribute("data-theme");
            setTheme(current === "drivefleet-light" ? "light" : "dark");
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        return () => observer.disconnect();
    }, []);

    return <ToastContainer position="bottom-center" theme={theme} />;
}