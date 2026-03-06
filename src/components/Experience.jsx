"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "./ui/moving-border";
import Link from "next/link";

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

const content = [
    {
        title: "Monsoon at the Lake",
        cta: "Explore Udaipur",
        text: "Experience the ethereal beauty of Udaipur as the rains transform Lake Pichola into a silver mirror. Our heritage-inspired villas offer a front-row seat to nature's most dramatic seasonal performance.",
        image: "/assets/udaipur_lake_pichola_luxury_villa_view_1772810119505.png",
        label: "The Lake Palace View, Udaipur",
        href: "/property/udaipur-vista"
    },
    {
        title: "Urban Solitude",
        cta: "The Mumbai Skies",
        text: "High above the rhythmic chaos of Mumbai, find a silence so profound it feels otherworldly. Our sky villas in Worli and Altamount Road are engineered for absolute stillness and panoramic mastery.",
        image: "/assets/mumbai_sky_villa_worli_view_1772810164219.png",
        label: "Worli Skyline, Mumbai",
        href: "/property/altamount-sky-villa"
    },
    {
        title: "Tropical Modernism",
        cta: "Coastline Retreats",
        text: "Alibaug is evolving. Beyond the traditional getaway, we are curating modernist sanctuaries that blend raw concrete with lush tropical greenery, creating a new architectural vernacular for the Indian coast.",
        image: "/assets/alibaug_modernist_coastal_villa_1772810141396.png",
        label: "Coastal Sanctuary, Alibaug",
        href: "/property/alibaug-sanctuary"
    },
];

export default function Experience() {
    const [headRef, headVisible] = useFadeIn();
    const [footRef, footVisible] = useFadeIn();

    /* Sticky Scroll Logic */
    const [activeCard, setActiveCard] = useState(0);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / (content.length - 1));
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0
        );
        setActiveCard(closestBreakpointIndex);
    });

    return (
        <section id="experience" className="relative bg-[#F5F5F7] sm:bg-white">
            <div ref={headRef} className={`min-h-[40vh] sm:min-h-[60vh] flex items-end px-4 sm:px-6 lg:px-20 pb-12 sm:pb-20 transition-all duration-700 ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="max-w-4xl">
                    <span className="text-[#d4af35] font-medium tracking-[0.3em] uppercase mb-4 block text-xs sm:text-sm">The Property Experience</span>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-light leading-tight text-slate-900">
                        Living at the intersection of <span className="italic font-normal">art</span> and <span className="text-[#d4af35]">atmosphere</span>.
                    </h2>
                </div>
            </div>

            {/* Scroll Container */}
            <div ref={containerRef} className="relative flex flex-col lg:flex-row px-0 sm:px-6 lg:px-20 min-h-[300vh] sm:min-h-[250vh]">

                {/* Left Text Column (Mobile + Desktop) */}
                <div className="w-full lg:w-1/2 relative lg:static z-20">
                    {content.map((item, index) => (
                        <div key={index} className="lg:min-h-screen py-16 px-4 sm:px-0 lg:py-0 flex flex-col justify-center pr-0 lg:pr-24">
                            <Link href={item.href} className="block w-full h-auto mb-8 sm:mb-0 shadow-xl rounded-[1.5rem]">
                                <Button
                                    as={motion.div}
                                    initial={{ opacity: 0.3 }}
                                    animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                                    transition={{ duration: 0.5 }}
                                    duration={Math.floor(Math.random() * 2000) + 3000}
                                    borderRadius="1.5rem"
                                    containerClassName="w-full h-full p-0"
                                    className="bg-white/90 backdrop-blur-xl p-8 sm:p-12 flex flex-col justify-start items-start text-left w-full h-full cursor-pointer hover:bg-white transition-colors"
                                >
                                    <div className={`mb-6 h-[2px] w-12 transition-colors duration-500 ${activeCard === index ? 'bg-[#d4af35]' : 'bg-slate-300'}`} />
                                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 text-slate-900">{item.title}</h3>
                                    <p className="text-sm sm:text-lg md:text-xl text-slate-600 font-light leading-relaxed">{item.text}</p>
                                    <div className="mt-8 sm:mt-12 flex items-center gap-4 text-[#d4af35] group cursor-pointer">
                                        <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">{item.cta}</span>
                                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
                                    </div>
                                </Button>
                            </Link>

                            {/* Mobile inline image (only visible on small screens) */}
                            <div className="lg:hidden w-full h-64 sm:h-80 rounded-2xl overflow-hidden mt-8 shadow-2xl relative border border-slate-200">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                    <span className="text-white text-xs tracking-widest uppercase font-bold">{item.label}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Sticky Image Container (Desktop Only) */}
                <div className="hidden lg:flex w-1/2 h-screen sticky top-0 py-24 items-center justify-center">
                    <div className="relative w-full h-[80vh] overflow-hidden rounded-3xl border border-slate-200 shadow-2xl bg-slate-100">
                        {content.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0,
                                    scale: activeCard === index ? 1 : 1.05
                                }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: activeCard === index ? 1 : 0,
                                        y: activeCard === index ? 0 : 20
                                    }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="absolute bottom-10 left-10 z-20"
                                >
                                    <p className="text-[#d4af35] text-xs font-bold tracking-[0.4em] uppercase mb-2">Featured Estate</p>
                                    <h4 className="text-white text-2xl font-light">{item.label}</h4>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="min-h-[60vh] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 text-center bg-[#F5F5F7]">
                <div ref={footRef} className={`max-w-2xl transition-all duration-700 ${footVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <span className="material-symbols-outlined text-[#d4af35] text-5xl sm:text-6xl mb-6 sm:mb-8">diamond</span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-light mb-8 sm:mb-12 italic text-slate-900">Your sanctuary awaits.</h2>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                        <a href="#contact" className="bg-slate-900 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-slate-800 transition-colors shadow-lg">Schedule a Viewing</a>
                        <a href="#listings" className="border border-slate-300 text-slate-700 px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white text-sm transition-colors">View Portfolio</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
