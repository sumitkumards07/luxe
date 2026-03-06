"use client";

import { useRef, useEffect, useState } from "react";
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

const gallery = [
    { src: "/assets/mumbai_sky_villa_worli_view_1772810164219.png", alt: "Main Living", span: "col-span-12 md:col-span-8" },
    { src: "/assets/altamount_sky_villa_detail_1772815420700.png", alt: "Suite", span: "col-span-6 md:col-span-4" },
    { src: "/assets/mumbai_marine_drive_luxury_penthouse_view_1772810098008.png", alt: "Terrace", span: "col-span-6 md:col-span-4" },
    { src: "/assets/alibaug_modernist_coastal_villa_1772810141396.png", alt: "Pool", span: "col-span-12 md:col-span-8", overlay: true },
];

const stats = [
    { icon: "bed", val: "5", label: "Bedrooms" },
    { icon: "bathtub", val: "6.5", label: "Bathrooms" },
    { icon: "square_foot", val: "12,000", label: "SQ FT" },
    { icon: "pool", val: "Private", label: "Infinity Pool" },
];

const amenities = [
    { icon: "concierge", title: "Global Concierge", desc: "Access to private jets, yacht charters, and exclusive cultural events in Mumbai." },
    { icon: "security", title: "Z+ Level Security", desc: "Discreet, high-tech surveillance and secure entry systems for ultimate peace of mind." },
    { icon: "directions_car", title: "Automated Car Lift", desc: "Private elevator for your automobile collection straight to your floor." },
];

export default function Penthouse() {
    const [heroRef, heroVis] = useFadeIn();
    const [galRef, galVis] = useFadeIn();
    const [statsRef, statsVis] = useFadeIn();
    const [detRef, detVis] = useFadeIn();
    const [amenRef, amenVis] = useFadeIn();
    const [formRef, formVis] = useFadeIn();

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        setIsSubmitted(true);
        // Reset after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <section id="penthouse" className="bg-[#F5F5F7]">
            {/* Hero banner */}
            <div className="relative h-[50vh] sm:h-[70vh] w-full overflow-hidden rounded-b-[2rem] sm:rounded-b-[3rem]">
                <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: "url('/assets/mumbai_sky_villa_worli_view_1772810164219.png')" }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-[#F5F5F7]" />
                </div>
                <div ref={heroRef} className={`relative h-full flex flex-col justify-end items-center pb-10 sm:pb-16 px-4 text-center transition-all duration-700 ${heroVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <Link href="/property/altamount-sky-villa" className="glass-light p-5 sm:p-8 rounded-2xl sm:rounded-3xl max-w-4xl w-full hover:shadow-2xl transition-all block group">
                        <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-2 sm:mb-4 text-slate-900 group-hover:text-[#d4af35] transition-colors">The Altamount Sky Villa</h2>
                        <p className="text-base sm:text-xl text-slate-500 mb-4 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[#d4af35]">location_on</span>Altamount Road, Mumbai
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 border-t border-slate-200 pt-4 sm:pt-6">
                            <div className="text-center"><span className="block text-[#d4af35] text-xs uppercase tracking-widest mb-1">Price</span><span className="text-xl sm:text-3xl font-bold text-slate-900">₹120 Cr</span></div>
                            <div className="text-center"><span className="block text-[#d4af35] text-xs uppercase tracking-widest mb-1">Status</span><span className="text-xl sm:text-3xl font-bold text-slate-900">Off-Market</span></div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Gallery */}
            <div className="py-16 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
                <div ref={galRef} className={`grid grid-cols-12 gap-3 sm:gap-4 transition-all duration-700 ${galVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    {gallery.map((img, i) => (
                        <div key={i} className={`${img.span} rounded-2xl overflow-hidden group relative h-48 sm:h-auto shadow-lg shadow-slate-200/50`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={img.alt} src={img.src} />
                            {img.overlay && (
                                <Link href="/property/altamount-sky-villa" className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="bg-white text-slate-900 px-5 sm:px-8 py-2 sm:py-3 rounded-full font-bold flex items-center gap-2 text-sm shadow-xl hover:scale-105 transition-transform">View All 42 Photos <span className="material-symbols-outlined">grid_view</span></span>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="py-8 sm:py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div ref={statsRef} className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 transition-all duration-700 ${statsVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        {stats.map((s, i) => (
                            <div key={i} className="flex flex-col items-center p-4 sm:p-8 rounded-2xl bg-[#F5F5F7] border border-slate-200">
                                <span className="material-symbols-outlined text-2xl sm:text-4xl text-[#d4af35] mb-2 sm:mb-4">{s.icon}</span>
                                <span className="text-lg sm:text-2xl font-bold text-slate-900">{s.val}</span>
                                <span className="text-xs uppercase tracking-widest text-slate-500">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Details */}
            <div className="py-16 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-10 sm:gap-16 items-start">
                <div ref={detRef} className={`w-full md:w-1/2 space-y-10 sm:space-y-16 transition-all duration-700 ${detVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div>
                        <h3 className="text-[#d4af35] text-xs font-bold uppercase tracking-widest mb-3 italic">Vision</h3>
                        <h4 className="text-2xl sm:text-4xl font-bold mb-4 text-slate-900">A New Standard of Living</h4>
                        <p className="text-base sm:text-lg text-slate-500 leading-relaxed">Designed by renowned architect Marcus Sterling, The Obsidian Penthouse represents the pinnacle of contemporary luxury.</p>
                    </div>
                    <div>
                        <h4 className="text-2xl sm:text-4xl font-bold mb-4 text-slate-900">Unrivaled Finishes</h4>
                        <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-6">From the hand-polished basalt floors to the custom matte gold fixtures, no detail has been overlooked.</p>
                        <ul className="space-y-3 sm:space-y-4">
                            {["Imported Italian Calacatta Viola marble", "Smart Home integration by Savant", "Custom acoustic noise-cancellation glass"].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-slate-700 text-sm sm:text-base">
                                    <span className="material-symbols-outlined text-[#d4af35]">check_circle</span>{item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-full md:w-1/2 md:sticky md:top-32">
                    <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="w-full aspect-[4/5] object-cover" alt="Marble" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiK6ZqQqnfl_Es7j1KRqj66uQOWHr-ycDlaRBH8dMij8mTIDkES6--iS8UHuJdWmKkCNYutP_7a_qGl7d7tbxgTn5PTvX_JVQc9vbEIksoELfIdKjXQMokBugL6raT8UImgALC6Ex6MQezyWMkeurXOs6JoqtWT5_83709vAf-We2mhsr2d3wd57a35DO503sBW2pXK569LWx5a6Ei0RLvQFbHBQcilHOyjhtgpoUKIFSA2eTJzD7giddaq2S55EmCCe8DwMIE4w" />
                    </div>
                </div>
            </div>

            {/* Amenities */}
            <div className="py-16 sm:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-20">
                    <div ref={amenRef} className={`transition-all duration-700 ${amenVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        <h3 className="text-2xl sm:text-4xl font-bold mb-8 text-slate-900">The Obsidian Lifestyle</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {amenities.map((a, i) => (
                                <div key={i} className="flex gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-[#F5F5F7] border border-slate-200 items-start">
                                    <span className="material-symbols-outlined text-[#d4af35] text-2xl sm:text-3xl">{a.icon}</span>
                                    <div><h4 className="text-lg font-bold mb-1 text-slate-900">{a.title}</h4><p className="text-slate-500 text-sm">{a.desc}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-2xl overflow-hidden min-h-[300px] border border-slate-200 relative shadow-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="w-full h-full object-cover" alt="Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtmPwLO_jmoWuxaGnSRwSqpT2DEk8zGLxyLFQlukq8CRq8XYsnwROTL2qEmebWY65_igPRSdixMUvo_GUNBTgeOqG6r1_Me6LuTjDJh8O3fmP8NCDZWU9lxX72ezDxH_Kqy9wNTxVnUal2Yw6Zecv0Ox-ZXxEdvo-8oZGXkraqUZI3Men1sjYx5cl0ZfvfR3pCKmxZwDvCNMrZVF2Sqa138hzYYIYGjwDIA_cJKDuB9e8hhtiUYMHZhgJoXSBVMxkXaKSjAHRjBw" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white/70 backdrop-blur-sm">
                            <span className="material-symbols-outlined text-[#d4af35] text-4xl sm:text-6xl mb-4">explore</span>
                            <h4 className="text-2xl sm:text-3xl font-bold mb-3 text-slate-900">The Golden Precinct</h4>
                            <p className="text-slate-600 max-w-md text-sm">Located at the prestigious heart of South Mumbai, overlooking the Arabian Sea and the city&apos;s most iconic heritage landmarks.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking */}
            <div className="py-16 sm:py-32 px-4 sm:px-6">
                <div ref={formRef} className={`max-w-4xl mx-auto rounded-[2rem] bg-white border border-slate-200 p-8 sm:p-12 md:p-20 text-slate-900 relative overflow-hidden shadow-2xl shadow-slate-200/50 transition-all duration-700 ${formVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <div className="absolute top-0 right-0 p-8 opacity-5 hidden sm:block"><span className="material-symbols-outlined text-[12rem] text-slate-200">mail</span></div>
                    {isSubmitted ? (
                        <div className="relative z-10 text-center py-10 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
                            </div>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Inquiry Sent Successfully</h3>
                            <p className="text-base sm:text-xl font-light text-slate-500">Your private agent will contact you shortly to arrange a viewing.</p>
                        </div>
                    ) : (
                        <>
                            <div className="relative z-10 text-center mb-8 sm:mb-12">
                                <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">Schedule a Private Viewing</h3>
                                <p className="text-base sm:text-xl font-light text-slate-500">Experience the apex of luxury living in person.</p>
                            </div>
                            <form className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <input className="bg-slate-50 border-slate-200 focus:border-[#d4af35] rounded-xl p-3 sm:p-4 placeholder:text-slate-400 font-medium text-sm text-slate-900 outline-none transition-all" placeholder="Full Name" type="text" />
                                <input className="bg-slate-50 border-slate-200 focus:border-[#d4af35] rounded-xl p-3 sm:p-4 placeholder:text-slate-400 font-medium text-sm text-slate-900 outline-none transition-all" placeholder="Email Address" type="email" />
                                <input className="bg-slate-50 border-slate-200 focus:border-[#d4af35] rounded-xl p-3 sm:p-4 placeholder:text-slate-400 font-medium text-sm text-slate-900 outline-none transition-all" placeholder="Phone Number" type="tel" />
                                <select className="bg-slate-50 border-slate-200 focus:border-[#d4af35] rounded-xl p-3 sm:p-4 font-medium text-sm text-slate-500 outline-none transition-all">
                                    <option>Preferred Date</option><option>Within 24 Hours</option><option>This Week</option><option>Next Month</option>
                                </select>
                                <div className="md:col-span-2">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="w-full bg-[#d4af35] text-white py-4 rounded-xl text-lg font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
                                    >
                                        Submit Inquiry <span className="material-symbols-outlined">arrow_forward</span>
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
