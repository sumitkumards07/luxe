"use client";

import React, { use } from "react";
import { properties } from "@/lib/properties";
import GlobalNavbar from "@/components/GlobalNavbar";
import Footer from "@/components/ContactForm";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function PropertyPage({ params }) {
    const { id } = use(params);
    const property = properties.find((p) => p.id === id);
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    if (!property) {
        notFound();
    }

    const handleSubmit = () => {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <main className="min-h-screen bg-white text-slate-900 selection:bg-[#d4af35] selection:text-white">
            <GlobalNavbar />

            {/* Hero Section */}
            <section className="relative h-[70vh] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${property.image})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end pb-12 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
                    <Link href="/#listings" className="inline-flex items-center gap-2 text-white/80 hover:text-[#d4af35] transition-colors mb-8 group">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Back to Portfolio</span>
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block bg-[#d4af35] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 shadow-lg">
                            {property.category}
                        </span>
                        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-none mb-4 drop-shadow-sm text-slate-900">
                            {property.title}
                        </h1>
                        <div className="flex items-center gap-2 text-slate-600 mb-6">
                            <MapPin className="w-5 h-5 text-[#d4af35]" />
                            <span className="text-lg md:text-xl font-light">{property.location}</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Left: Details */}
                <div className="lg:col-span-8 space-y-16">
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#d4af35] mb-6">The Residence</h2>
                        <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed">
                            {property.description}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {property.stats.map((stat, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:shadow-xl hover:translate-y-[-4px]">
                                <span className="block text-[10px] uppercase tracking-widest text-[#d4af35] mb-1">{stat.label}</span>
                                <span className="text-2xl font-bold text-slate-900">{stat.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Key Features */}
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#d4af35] mb-8">Key Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {property.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-[#d4af35]/30 transition-colors">
                                    <CheckCircle2 className="w-5 h-5 text-[#d4af35]" />
                                    <span className="text-slate-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#d4af35] mb-8">Architectural Gallery</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {property.gallery.map((img, i) => (
                                <div key={i} className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
                                    <img src={img} alt={`${property.title} view ${i + 1}`} className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Sticky Inquiry Box */}
                <div className="lg:col-span-4">
                    <div className="sticky top-32 p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden relative">
                        {isSubmitted ? (
                            <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Inquiry Sent Successfully</h3>
                                <p className="text-xs text-slate-500">We will contact you shortly.</p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8 pb-8 border-b border-slate-100">
                                    <span className="text-[10px] uppercase tracking-widest text-[#d4af35] mb-1 block">Listed Price</span>
                                    <div className="text-4xl font-bold text-slate-900">{property.price}</div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Inquiry Status</label>
                                        <div className="flex items-center gap-2 text-green-600 font-bold uppercase text-xs tracking-widest">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            Now accepting private viewings
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        className="w-full py-4 bg-[#d4af35] text-white rounded-xl font-bold uppercase tracking-widest shadow-xl shadow-[#d4af35]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                    >
                                        Arrange Viewings <ChevronRight className="w-4 h-4" />
                                    </button>

                                    <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest">
                                        Secure & Confidential Inquiry
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
