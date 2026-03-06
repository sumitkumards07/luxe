"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const testimonials = [
    {
        quote:
            "The attention to detail and the 'Quiet Luxury' approach is exactly what the Indian elite have been waiting for. A truly world-class experience.",
        name: "Aditya Vikram Birla",
        title: "Industrialist & Art Collector",
    },
    {
        quote:
            "Finding a sanctuary in the heart of Mumbai seemed impossible until I discovered LUXE. Their off-market Altamount road villa is a masterpiece.",
        name: "Ananya Panday",
        title: "Global Resident & Philanthropist",
    },
    {
        quote:
            "The Alibaug property they curated for us perfectly blends tropical aesthetics with modern comfort. It's our home away from home.",
        name: "Vikram Sethi",
        title: "Tech Visionary",
    },
    {
        quote:
            "Udaipur has many palaces, but the private lake-view villa LUXE secured for us offers a level of privacy and heritage that is unmatched.",
        name: "Rajeshwari Devi",
        title: "Heritage Preservationist",
    },
    {
        quote:
            "Their AI concierge understood my exact requirements—sunlight, silence, and scale—before I even finished typing. Remarkable.",
        name: "Karan Johar",
        title: "Creative Director",
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 mb-16">
                <div className="max-w-3xl">
                    <h2 className="text-[#d4af35] text-xs font-bold uppercase tracking-[0.3em] mb-4">Voices of Distinction</h2>
                    <p className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                        Trusted by India&apos;s most discerning visionaries and global citizens.
                    </p>
                </div>
            </div>
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
            />
        </section>
    );
}
