"use client";

import { useRef, useEffect, useState } from "react";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";

function useFadeIn() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
}

/* ── Aceternity-style BentoGrid ── */
function BentoGrid({ children, className = "" }) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto ${className}`}>
            {children}
        </div>
    );
}

function BentoGridItem({ title, description, image, label, stats, icon, className = "" }) {
    return (
        <div className={`group/bento relative row-span-1 rounded-3xl overflow-hidden shadow-sm cursor-pointer
      hover:shadow-2xl hover:shadow-slate-900/50 transition-all duration-500 flex flex-col justify-end h-[400px] sm:h-[450px] ${className}`}>

            {/* Background Image & Dynamic Gradient */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover/bento:scale-110" />

            {/* Default Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover/bento:opacity-0" />

            {/* Hover Dark Overlay for Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 opacity-0 transition-opacity duration-700 ease-out group-hover/bento:opacity-100" />

            {/* Top Labels (Slide down and fade in) */}
            <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-10 transform -translate-y-4 opacity-0 group-hover/bento:translate-y-0 group-hover/bento:opacity-100 transition-all duration-500 ease-out">
                <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                    {label}
                </span>
                <span className="material-symbols-outlined text-white/80 hover:text-[#d4af35] transition-colors text-xl bg-black/30 p-2.5 rounded-full backdrop-blur-md border border-white/10">
                    favorite
                </span>
            </div>

            {/* Content Overlay (Slides up on hover) */}
            <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-4 transform translate-y-12 sm:translate-y-16 group-hover/bento:translate-y-0 transition-transform duration-500 ease-out">
                {/* Stats Pills (Fade in) */}
                <div className="flex flex-wrap gap-2 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 delay-100">
                    {stats.map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5">
                            <span className="material-symbols-outlined text-[#d4af35] text-[15px]">{item.icon}</span>
                            <span className="text-[10px] text-white font-medium uppercase tracking-wider">{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#d4af35] text-2xl">{icon}</span>
                        <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight line-clamp-1">{title}</h3>
                    </div>
                    {/* Description (Fade in) */}
                    <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed line-clamp-2 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 delay-150">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

const properties = [
    {
        title: "The Obsidian Penthouse",
        description: "Manhattan's crown jewel. 8,450 sq ft of unparalleled luxury with private rooftop and Central Park views.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDCSW8NRfDaEYK8M42MtWibgq-kw5_gkigmhCJ3UQ2XRfsmQKemXJpkgfahoR9RO5pafxaXhonKG8mJLRLaMuTiz0VPMw-MxPRmiuUP2EBZn8onzojYFscN5iI_CPXXtoM48WQi5533AvjcbAMNao0Rf2UrhJyhvG_J2SlTvDADvJB6RNJijj8X14xf2gXbt5uZYZNfaoNMBwBbewSF4CzrUPrZmsjZZziYQZgM_ZELezQKM6Wap6sgMo3ACG8XC9jKUZeLw6-3g",
        label: "New Exclusive",
        stats: [{ icon: "square_foot", label: "8,450 sq ft" }, { icon: "bed", label: "5 Beds" }, { icon: "bathtub", label: "6.5 Baths" }],
        span: "md:col-span-1",
        icon: "diamond",
    },
    {
        title: "Azure Waterfront Villa",
        description: "Miami's most coveted waterfront address. 6,200 sq ft with infinity pool overlooking Biscayne Bay.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABRqLpvKG2Do-hahHal6OsacOh0wgH18j5037M66I7IMnXoWz7A7sfd5fsAEJtjZoVoSwPey3MHiyi_jc8pHTy1ez4xhMKXP1BOcGSojviaVfeai0lVrjx9Z2uUdfTBH9a6kz9LYlu7Zq6gSxpZApxxLgbQWvjKER3YyVcVawqoD3kWPNPV1Yj86CxpWVBud1ig8bryBIA_XCjPcl0mNs63iSLJdCrBRpTvNahv8TjtBEbsRKTIdFKcR4xXQ5iZX8GWNnnvifoag",
        label: "Featured",
        stats: [{ icon: "square_foot", label: "6,200 sq ft" }, { icon: "bed", label: "4 Beds" }],
        span: "md:col-span-1",
        icon: "water",
    },
    {
        title: "Emerald Estate, Aspen",
        description: "Alpine serenity meets modern luxury. 12,000 sq ft nestled in pristine mountain landscape.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXK5oxl8tNrNjtwekOR61jdNKYSt0_gZC-qtniA1GwCTqVobmlKLlStnfbWTJnOXp5itUUYbmkX3M8JcYNoMpsAl8WFxCfHlUWoBFW0FrvXiTn0Ta7z05mDquPts3ZRzmqhjX1X6x1HHXTfYXiEOMfDrqomhPNBGp6GkRc1iyXXavYCeTb4o7clnytBzHB5DdQY0eVp7XSBBGi3b-tQLVgQ7RHCWk1uI50tULc0hD9z2ib0xTjcGEDXMPkhkCTHtXZP3LazIQTfA",
        label: "Mountain",
        stats: [{ icon: "bed", label: "6 Beds" }, { icon: "square_foot", label: "12,000 sq ft" }],
        span: "md:col-span-1",
        icon: "forest",
    },
    {
        title: "The Gilded Loft, SoHo",
        description: "Industrial elegance in the heart of SoHo. Exposed brick meets contemporary artistry.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2FzrRdKCYey5a9uNJTi8nOGqQEchu64OZ3mryGnVtLF2gsVeo8MjvtGI0G4tXz2k0U_4bz6MQ7efHmUYuwvGWJnLjfPqgPUdBfCHDy7-8asvQhZ5ipOfDLLsUBdIWoZavJH9BDR_rIFdA5-_wr1CAx1exYcGgthuMYc_I9Tc6B3K6qNdkUGrdpsHNSWAnSl1t-eVCxO5jPUb2t37Fw-NwbBjY6xy0cIIhbIjOiCfyihNrPtrvpG54ITxl7PO4rrGNiChQtmeocQ",
        label: "Loft",
        stats: [{ icon: "bed", label: "2 Beds" }, { icon: "square_foot", label: "2,800 sq ft" }],
        span: "md:col-span-1",
        icon: "location_city",
    },
];

export default function FeaturedListings() {
    const [ref, visible] = useFadeIn();
    const [ctaRef, ctaVisible] = useFadeIn();

    return (
        <section id="listings" className="py-16 sm:py-24 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div ref={ref} className={`mb-12 sm:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <span className="text-[#d4af35] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Selected Works</span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
                        Featured <span className="italic font-light">Listings</span>
                    </h2>
                    <p className="text-slate-500 text-base sm:text-lg font-light max-w-xl">
                        A curated anthology of architectural masterpieces that redefine the art of living.
                    </p>
                </div>

                <BentoGrid>
                    {properties.map((p, i) => (
                        <BentoGridItem
                            key={i}
                            className={p.span}
                            title={p.title}
                            description={p.description}
                            image={p.image}
                            label={p.label}
                            stats={p.stats}
                            icon={p.icon}
                        />
                    ))}
                </BentoGrid>

                <div ref={ctaRef} className={`mt-12 sm:mt-20 p-8 sm:p-12 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="text-center md:text-left">
                        <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">Seeking something truly unique?</h4>
                        <p className="text-slate-500 font-light italic">Access our private collection of off-market residences.</p>
                    </div>
                    <button className="bg-slate-900 text-white font-bold px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center gap-3 whitespace-nowrap shadow-lg">
                        Request Private Access
                        <span className="material-symbols-outlined text-lg">lock_open</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
