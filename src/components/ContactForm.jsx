"use client";

import { useRef, useEffect, useState, useCallback } from "react";

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

/* ── WebGL Shader Gradient Background ── */
const VERT = `attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.0,1.0);}`;
const FRAG = `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

vec3 palette(float t){
  vec3 a=vec3(0.92,0.9,0.85);
  vec3 b=vec3(0.08,0.06,0.12);
  vec3 c=vec3(0.83,0.69,0.22);
  vec3 d=vec3(0.6,0.5,0.3);
  return a + b*cos(6.28318*(c*t+d));
}

void main(){
  vec2 uv=(gl_FragCoord.xy*2.0 - u_resolution)/min(u_resolution.x,u_resolution.y);
  float d=length(uv);
  vec3 col=palette(d + u_time*0.15);
  d=sin(d*6.0 + u_time*0.5)/6.0;
  d=abs(d);
  d=smoothstep(0.0,0.12,d);
  col *= d;
  col = mix(col, vec3(0.96,0.96,0.97), 0.45);
  gl_FragColor=vec4(col,1.0);
}`;

function ShaderGradient() {
    const canvasRef = useRef(null);
    const animRef = useRef(null);

    const init = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext("webgl");
        if (!gl) return;

        const resize = () => {
            canvas.width = canvas.clientWidth * window.devicePixelRatio;
            canvas.height = canvas.clientHeight * window.devicePixelRatio;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener("resize", resize);

        const compile = (type, src) => {
            const s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
        };

        const prog = gl.createProgram();
        gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
        gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(prog);
        gl.useProgram(prog);

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const pos = gl.getAttribLocation(prog, "a_position");
        gl.enableVertexAttribArray(pos);
        gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

        const uTime = gl.getUniformLocation(prog, "u_time");
        const uRes = gl.getUniformLocation(prog, "u_resolution");

        const render = (t) => {
            gl.uniform1f(uTime, t * 0.001);
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            animRef.current = requestAnimationFrame(render);
        };
        animRef.current = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", resize);
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, []);

    useEffect(() => {
        const cleanup = init();
        return cleanup;
    }, [init]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ filter: "blur(40px) saturate(1.2)" }}
        />
    );
}

/* ── Press Logos ── */
const logoSrc = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBaevvKmxvye0yyO0BWjjB107Etni0Mae6pG79Vb8n4VonNZnK5Rw39e43UdRhhrQHPAHPVweTDI6E_JCTSXmcJQABzIcwkLdDdt43ltj9x58DMBX2NqJZwVnl_IRrfaJo_lU0dQ-thmYkhGBz2XJjHjIiGFxTYLf9UxQ55RuLMR48V3Pu6OTMYQJWfAtVaejs2pN1b-MGcIJ7IIjZgnleJoIpTBEHb5Tf_vmw5-f-lH8GtAnuw5TOWcJLa2_AwOlEhZajztl4xZQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBa73n_eFgnQomhNalKDOc2htH6woDqC2fXS5dPo4_PxxwhxsiWGGR7KLNl_OvA1tMtf0lAEbeUboHr7A7rLZAQ2e9tY1N7-3NMOAA2JLco6mgJNuYLzItdt3K58AhqwdR_r8NXX3o2j7pK9EXTWv-S9PhbWscGOOd55A-_T_3pr2AKGPi0obDR5GHq27X5aEGWpe07Yh6i2WbsTmOwOHu0MTdlv0i6v9FUOmV8woW4xSQ3EX5JAnx1WORNoxfVL--qZhyF_aaZ0A",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAXI0oYETxRaSJKn7DJxvKZnUIsJh7vp0sXxT0SmJkGDWr7UVHx7V7bFvs6w9t-DtqePkf-_RzfSU3O6iaqnhasACcE0PrNAt-6-3OiYGosopgLh13_w2WeAtvyUhGOiJm2HwoQ81XVvcpYDyUlGQz-VdxOOX1fUfEUY1bCls6eh8evKVQHnD8q5QpqJNh-ltAgets4iZNlGC2c8HOupv2gbq1wHeOd7e_RfHTk4fUz9Lg63bDnJ28thD4PHwxahfJYchhl7SCykQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAh1sFm6MHexkjVkfCRYt5KE48j3Qjwze5H5U9eGvH7qvrgJoIB9xsqfIU6RrDB0onQjDDifM7lMD08Djujtb33wJfuKvq26IHMD55IPSZzDRqsAmDdstbfgRNRJsez72qEbrdvYgfTGyCeVOWr_S_ZQ7rTsiJlmdLB3TOEvsfx2V_gIP4lI1_DeuOWVJ8pu_5lqyFsxZNni8u-9_xffg9baqRuCQAKzfT6ziCP6Hv1ZFeTxfOT5lrViliuqLPzYdcqLPtF62rbzw",
];

export default function ContactForm() {
    const [ref, visible] = useFadeIn();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        setIsSubmitted(true);
        // Reset after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <>
            {/* Social Proof */}
            <section id="contact" className="py-12 sm:py-20 overflow-hidden border-t border-slate-200 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <h2 className="text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-8 sm:mb-12">Featured in Premier Indian & Global Press</h2>
                    <div className="relative flex overflow-hidden">
                        <div className="animate-infinite-scroll flex items-center gap-12 sm:gap-16 md:gap-32">
                            {[...logoSrc, ...logoSrc].map((src, i) => (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img key={i} alt="Press" className="h-5 sm:h-6 md:h-8 opacity-30 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-500" src={src} />
                            ))}
                        </div>
                        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent" />
                        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent" />
                    </div>
                </div>
            </section>

            {/* Contact Section with Shader Background */}
            <section className="relative py-24 sm:py-32 md:py-40 overflow-hidden">
                {/* WebGL Shader Gradient */}
                <ShaderGradient />
                <div className="absolute inset-0 bg-[#F5F5F7]/30 backdrop-blur-sm" />

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div ref={ref} className={`max-w-4xl mx-auto transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                        {/* Header */}
                        <div className="text-center mb-12 sm:mb-16">
                            <span className="text-[#d4af35] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Get In Touch</span>
                            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-4 sm:mb-6">
                                Ready to find your sanctuary in India?
                            </h2>
                            <p className="text-slate-500 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto">
                                Experience the pinnacle of Indian luxury living. Our consultants are ready to curate your next escape.
                            </p>
                        </div>

                        {/* Glassmorphism Form Card */}
                        <div className="glass-light rounded-3xl p-6 sm:p-10 md:p-14 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                            {isSubmitted ? (
                                <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Inquiry Sent Successfully</h3>
                                    <p className="text-slate-500">A luxury consultant will reach out to you within 24 hours.</p>
                                </div>
                            ) : (
                                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#d4af35] font-bold mb-2">Full Name</label>
                                        <input
                                            className="w-full bg-white/60 border border-slate-200 rounded-xl py-3 sm:py-4 px-4 text-slate-900 placeholder:text-slate-400 font-light text-sm sm:text-base focus:ring-2 focus:ring-[#d4af35]/20 focus:border-[#d4af35] transition-all"
                                            placeholder="E.g. Rohan Malhotra"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#d4af35] font-bold mb-2">Email Address</label>
                                        <input
                                            className="w-full bg-white/60 border border-slate-200 rounded-xl py-3 sm:py-4 px-4 text-slate-900 placeholder:text-slate-400 font-light text-sm sm:text-base focus:ring-2 focus:ring-[#d4af35]/20 focus:border-[#d4af35] transition-all"
                                            placeholder="rohan@private.in"
                                            type="email"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#d4af35] font-bold mb-2">Phone</label>
                                        <input
                                            className="w-full bg-white/60 border border-slate-200 rounded-xl py-3 sm:py-4 px-4 text-slate-900 placeholder:text-slate-400 font-light text-sm sm:text-base focus:ring-2 focus:ring-[#d4af35]/20 focus:border-[#d4af35] transition-all"
                                            placeholder="+91 99887 76655"
                                            type="tel"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#d4af35] font-bold mb-2">Interest</label>
                                        <select className="w-full bg-white/60 border border-slate-200 rounded-xl py-3 sm:py-4 px-4 text-slate-500 font-light text-sm sm:text-base focus:ring-2 focus:ring-[#d4af35]/20 focus:border-[#d4af35] transition-all">
                                            <option>Select a property</option>
                                            <option>The Altamount Sky Villa (Mumbai)</option>
                                            <option>The Udaipur Vista (Lake Pichola)</option>
                                            <option>The Alibaug Sanctuary</option>
                                            <option>Worli Sea-Link Sanctuary</option>
                                            <option>Other / General Inquiry</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-[#d4af35] font-bold mb-2">Message</label>
                                        <textarea
                                            className="w-full bg-white/60 border border-slate-200 rounded-xl py-3 sm:py-4 px-4 text-slate-900 placeholder:text-slate-400 font-light text-sm sm:text-base focus:ring-2 focus:ring-[#d4af35]/20 focus:border-[#d4af35] transition-all resize-none"
                                            placeholder="Describe your dream residence in India..."
                                            rows="3"
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-[#d4af35]">verified_user</span>
                                            <span className="text-xs text-slate-400 font-light">Discreet & confidential handling guaranteed.</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            className="w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-5 bg-slate-900 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all duration-300 shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:scale-[1.02]"
                                        >
                                            Submit Inquiry
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-8 sm:py-12 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-[10px] uppercase tracking-widest text-slate-400">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#d4af35] text-xl">architecture</span>
                        <span className="text-sm font-bold tracking-tighter text-slate-900">LUXE</span>
                    </div>
                    <div className="flex gap-4 sm:gap-8">
                        <a className="hover:text-slate-900 transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-slate-900 transition-colors" href="#">Legal Terms</a>
                        <a className="hover:text-slate-900 transition-colors" href="#">Press Kit</a>
                    </div>
                    <div className="text-center md:text-right">© 2026 LUXE ESTATE INDIA. ALL RIGHTS RESERVED.</div>
                    <div className="flex gap-4 sm:gap-6">
                        <a className="hover:text-slate-900 transition-colors flex items-center gap-1" href="#">
                            <span className="material-symbols-outlined text-sm">public</span> INSTAGRAM
                        </a>
                        <a className="hover:text-slate-900 transition-colors flex items-center gap-1" href="#">
                            <span className="material-symbols-outlined text-sm">podcasts</span> LINKEDIN
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
