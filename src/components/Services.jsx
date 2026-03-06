"use client";

import React from "react";
import { motion } from "framer-motion";

const services = [
    {
        title: "Asset Curation",
        desc: "We don't just list properties; we curate generational assets. Our portfolio includes exclusive off-market estates in Lutyens' Delhi, South Mumbai, and beyond.",
        icon: "diamond",
    },
    {
        title: "Legal & Fiduciary",
        desc: "Bespoke advisory services for structured real estate acquisitions, ensuring absolute discretion and regulatory compliance across jurisdictions.",
        icon: "gavel",
    },
    {
        title: "Architectural Advisory",
        desc: "Collaborating with world-class designers to help you reimagine and customize your sanctuary before you even move in.",
        icon: "architecture",
    },
    {
        title: "Lifestyle Concierge",
        desc: "Post-acquisition support including private jet charters, art advisory, and exclusive access to India's most prestigious social clubs.",
        icon: "concierge",
    },
];

export default function Services() {
    return (
        <section className="py-24 bg-[#F5F5F7]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-[#d4af35] text-xs font-bold uppercase tracking-[0.3em] mb-4">Beyond the Residence</h2>
                        <h3 className="text-4xl md:text-6xl font-bold text-slate-900">Our Curated Ecosystem</h3>
                    </div>
                    <p className="text-slate-500 max-w-sm text-lg">
                        A comprehensive suite of bespoke services designed for the complexities of ultra-high-net-worth real estate.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-[#F5F5F7] flex items-center justify-center mb-6 group-hover:bg-[#d4af35] transition-colors duration-500">
                                <span className="material-symbols-outlined text-[#d4af35] text-3xl group-hover:text-white">
                                    {service.icon}
                                </span>
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
