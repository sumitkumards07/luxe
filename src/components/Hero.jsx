"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-24 px-4 sm:px-8 md:px-16 bg-[#F5F5F7] text-slate-900 font-sans selection:bg-[#d4af35] selection:text-white"
        >
            {/* Parallax Video/Image Background */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105 w-full h-[120%] opacity-70"
                    style={{ backgroundImage: "url('/assets/mumbai_marine_drive_luxury_penthouse_view_1772810098008.png')" }}
                    aria-label="Luxury Penthouse view of Mumbai Marine Drive"
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F7] via-[#F5F5F7]/30 to-black/10"></div>
            </motion.div>

            {/* Editorial Typography & AI Search */}
            <div className="relative z-10 max-w-5xl mt-24">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-5xl sm:text-6xl md:text-8xl font-light tracking-tight leading-[1] sm:leading-[0.9] mb-8 text-slate-900 drop-shadow-sm"
                >
                    Don&apos;t just look for a house. <br />
                    <span className="italic font-serif text-[#d4af35]">Find your sanctuary in India.</span>
                </motion.h1>

                {/* The Primary CTA */}
                <div className="flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className="flex items-center gap-6"
                    >
                        <a href="#contact" className="px-10 py-5 bg-[#d4af35] text-white rounded-full font-bold text-base uppercase tracking-widest hover:scale-105 hover:bg-[#b8941e] transition-all flex items-center gap-3 shadow-2xl shadow-[#d4af35]/40 active:scale-95">
                            Book a Private Viewing <ArrowUpRight className="w-5 h-5" />
                        </a>
                        <div className="hidden sm:flex flex-col">
                            <span className="text-slate-900 font-bold text-sm uppercase tracking-widest">Limited Access</span>
                            <span className="text-slate-500 text-[10px] uppercase tracking-widest">Exclusive to Private Clients</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 md:left-16 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Scroll</span>
                <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-[#d4af35] to-transparent" />
            </motion.div>
        </section>
    );
}
