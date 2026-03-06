import GlobalNavbar from "@/components/GlobalNavbar";
import Hero from "@/components/Hero";
import EditorialGallery from "@/components/EditorialGallery";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Penthouse from "@/components/Penthouse";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      <GlobalNavbar />
      <Hero />
      <div className="bg-white">
        <EditorialGallery />
      </div>
      <Experience />
      <Services />
      <div className="bg-white">
        <Penthouse />
      </div>
      <Testimonials />
      <div className="bg-[#F5F5F7]">
        <ContactForm />
      </div>
    </main>
  );
}
