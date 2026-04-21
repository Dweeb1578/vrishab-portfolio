'use client';

import ChatWidget from '../components/ChatWidget';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Leadership from '../components/Leadership';
import FloatingNav from '../components/FloatingNav';
import CustomCursor from '../components/CustomCursor';

export default function Home() {
  return (
    <main className="min-h-screen font-sans selection:bg-orange-200 dark:selection:bg-orange-500/40 overflow-x-hidden">

      {/* BACKGROUND EFFECT */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-rose-500/10 dark:bg-rose-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] rounded-full"></div>
      </div>

      <FloatingNav />

      <div className="relative z-10 mx-auto">
        <Hero />
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
