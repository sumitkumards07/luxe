import Link from 'next/link';

export default function GlobalNavbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
            <div className="glass-light px-8 py-3 rounded-full flex items-center gap-12 shadow-lg border border-white/20">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-slate-900 hover:text-[#d4af35] transition-colors">
                    LUXE
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/#listings" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-widest">Listings</Link>
                    <Link href="/#experience" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-widest">Experience</Link>
                    <Link href="/#penthouse" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-widest">Sky Villa</Link>
                    <Link href="/#contact" className="text-sm font-bold text-slate-100 bg-slate-900 px-6 py-2 rounded-full hover:bg-[#d4af35] transition-all uppercase tracking-widest">Inquire</Link>
                </div>
            </div>
        </nav>
    );
}
