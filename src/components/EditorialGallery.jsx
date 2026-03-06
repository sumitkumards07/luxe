"use client";

import React from "react";
import { Play } from "lucide-react";
import Link from "next/link";

export default function EditorialGallery() {
    return (
        <section id="listings" className="py-24 sm:py-32 px-4 sm:px-8 md:px-16 max-w-[1400px] mx-auto bg-white text-slate-900 border-x border-slate-100">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 sm:mb-20">
                <div className="max-w-xl">
                    <h2 className="text-[#d4af35] text-xs font-bold uppercase tracking-[0.3em] mb-4">Curated Portfolio</h2>
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-slate-900 leading-[1.1]">
                        Spaces designed for the <span className="italic font-serif text-[#d4af35]">extraordinary in India.</span>
                    </h3>
                </div>
                <p className="text-slate-500 max-w-md text-sm sm:text-base mt-6 md:mt-0 font-light leading-relaxed border-l-2 border-[#d4af35]/20 pl-6">
                    We bypass traditional listings to bring you off-market masterpieces and architecturally significant homes across the subcontinent.
                </p>
            </div>

            {/* Magazine-style asymmetrical grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">

                {/* Featured Property Large */}
                <Link href="/property/udaipur-vista" className="md:col-span-8 group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 bg-slate-50 p-4 rounded-[2rem] border border-slate-100 block">
                    <div className="overflow-hidden rounded-2xl h-[50vh] sm:h-[60vh] md:h-[70vh] relative mb-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/assets/udaipur_lake_pichola_luxury_villa_view_1772810119505.png"
                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                            alt="The Udaipur Vista"
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Minimal Label overlay */}
                        <div className="absolute top-6 left-6 flex gap-2">
                            <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">Heritage Luxe</span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0 px-2 pb-2">
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">The Udaipur Vista</h3>
                            <p className="text-[#d4af35] italic font-serif text-lg">Lake Pichola, Udaipur</p>
                        </div>
                        <p className="font-bold tracking-widest text-slate-900 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">₹85 Cr</p>
                    </div>
                </Link>

                {/* Featured Property Small */}
                <Link href="/property/alibaug-sanctuary" className="md:col-span-4 group cursor-pointer mt-8 md:mt-40 shadow-sm hover:shadow-2xl transition-all duration-700 bg-slate-50 p-4 rounded-[2rem] border border-slate-100 block">
                    <div className="overflow-hidden rounded-2xl h-[40vh] sm:h-[45vh] relative mb-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/assets/alibaug_modernist_coastal_villa_1772810141396.png"
                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter grayscale hover:grayscale-0"
                            alt="The Alibaug Sanctuary"
                        />
                    </div>
                    <div className="flex flex-col justify-between items-start px-2 pb-2">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">The Alibaug Sanctuary</h3>
                            <p className="text-[#d4af35] italic font-serif text-lg">Alibaug, Maharashtra</p>
                        </div>
                        <p className="font-bold tracking-widest text-[#d4af35] mt-2">₹42 Cr</p>
                    </div>
                </Link>

                {/* Third Property Medium (Spanning Full Width below) */}
                <Link href="/property/worli-sky-villa" className="md:col-span-12 group cursor-pointer mt-8 md:mt-16 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16 shadow-sm hover:shadow-2xl transition-all duration-700 bg-slate-50 p-6 rounded-[3rem] border border-slate-100 block">
                    <div className="w-full md:w-7/12 overflow-hidden rounded-2xl h-[40vh] sm:h-[50vh] relative mb-6 md:mb-0 shadow-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/assets/mumbai_sky_villa_worli_view_1772810164219.png"
                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                            alt="Worli Sea-Link Penthouse"
                        />
                    </div>
                    <div className="w-full md:w-5/12 flex flex-col justify-center items-start pl-2 md:pl-0 pr-0 md:pr-12">
                        <span className="text-[#d4af35] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Privately Listed</span>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-2">Worli Sea-Link <br /><span className="italic font-serif text-[#d4af35]">Sanctuary</span></h3>
                        <p className="text-slate-500 font-light mt-4 mb-8 leading-relaxed">Perched high above Worli, this architectural marvel completely blurs the lines between interior luxury and the raw power of the Arabian Sea, with a panoramic view of the Bandra-Worli Sea Link.</p>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#d4af35] group-hover:text-slate-900 transition-colors">
                                Explore Estate <span className="w-8 h-[1px] bg-[#d4af35] group-hover:bg-slate-900 transition-colors" />
                            </div>
                            <span className="text-slate-900 font-bold tracking-widest bg-white px-4 py-2 rounded-full border border-slate-100">₹115 Cr</span>
                        </div>
                    </div>
                </Link>

            </div>
        </section>
    );
}
