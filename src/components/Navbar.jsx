"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { label: "Home", href: "#hero", icon: "home" },
    { label: "Listings", href: "#listings", icon: "apartment" },
    { label: "Experience", href: "#experience", icon: "architecture" },
    { label: "Penthouse", href: "#penthouse", icon: "diamond" },
    { label: "Contact", href: "#contact", icon: "mail" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Floating Dock Navbar */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]"
            >
                <div
                    className={`
            rounded-full px-3 py-2 flex items-center gap-1 transition-all duration-500
            ${scrolled
                            ? "bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl shadow-slate-200/50"
                            : "glass-light shadow-lg"
                        }
          `}
                >
                    {/* Logo */}
                    <a href="#hero" className="flex items-center gap-2 px-4 py-2">
                        <span className="material-symbols-outlined text-2xl text-[#d4af35]">
                            architecture
                        </span>
                        <span className="text-lg font-bold tracking-tighter hidden sm:block text-slate-900">
                            LUXE
                        </span>
                    </a>

                    {/* Desktop Nav Items */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className={`
                  group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  transition-all duration-300 hover:scale-105 text-slate-600 hover:text-slate-900 hover:bg-slate-100
                `}
                            >
                                <span className="material-symbols-outlined text-lg opacity-60 group-hover:opacity-100 transition-opacity">
                                    {item.icon}
                                </span>
                                <span className="hidden lg:block">{item.label}</span>
                            </a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <a
                        href="#contact"
                        className="ml-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 hidden sm:block bg-slate-900 text-white hover:bg-slate-800 shadow-md"
                    >
                        Inquire
                    </a>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-slate-900"
                    >
                        <span className="material-symbols-outlined">
                            {mobileOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[99] bg-white/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden"
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 text-2xl font-light text-slate-800 hover:text-[#d4af35] transition-colors"
                            >
                                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                {item.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setMobileOpen(false)}
                            className="mt-6 px-8 py-3 bg-slate-900 text-white rounded-full font-bold"
                        >
                            Inquire Now
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
