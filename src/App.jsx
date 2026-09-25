import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Program from './components/Program';
import Audience from './components/Audience';
import Lessons from './components/Lessons';
import Gallery from './components/Gallery';
import Vision from './components/Vision';
import Pricing from './components/Pricing';
import Faq from './components/Faq';
import Footer from './components/Footer';
import { AccessProvider } from './components/Access';

export default function App() {
  return (
    <AccessProvider>
      <a
        href="#glavni-sadrzaj"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-[2px] focus:bg-espreso focus:px-5 focus:py-3 focus:text-vanila"
      >
        Preskoči na sadržaj
      </a>
      <Header />
      <main id="glavni-sadrzaj">
        <Hero />
        <About />
        <Program />
        <Audience />
        <Lessons />
        <Gallery />
        <Vision />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </AccessProvider>
  );
}
