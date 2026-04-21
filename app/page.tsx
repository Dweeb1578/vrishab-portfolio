'use client';

import ChatWidget from '../components/ChatWidget';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import Thoughts from '../components/Thoughts';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Leadership from '../components/Leadership';
import FloatingNav from '../components/FloatingNav';
import CustomCursor from '../components/CustomCursor';

export default function Home() {
  return (
    <main className="min-h-screen font-sans selection:bg-orange-200 dark:selection:bg-orange-500/40 overflow-x-hidden">

      <FloatingNav />

      <div className="relative z-10 mx-auto">
        <Hero />
        <Thoughts />
        <Experience />
        <Projects />
        <Leadership />

        <section id="contact" className="py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <Contact />
          </div>
        </section>

        <footer className="py-8 text-center text-stone-500 dark:text-stone-500 text-sm relative z-10 border-t border-stone-200 dark:border-stone-800">
          <p>© 2025 Vrishab Nair. Built with Next.js, Framer Motion & Artificial Intelligence.</p>
        </footer>
      </div>

      <ChatWidget />
      <CustomCursor />
    </main>
  );
}
