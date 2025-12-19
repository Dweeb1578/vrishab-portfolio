import ChatWidget from '../components/ChatWidget';
import {
  ArrowRight, Zap, Github, Linkedin, Mail,
  ExternalLink, Presentation, LayoutTemplate, TrendingUp,
  Users, Briefcase, Flag, Code2, Layers, Lightbulb, Smartphone, CreditCard, ShoppingBag
} from 'lucide-react';
import { Bot } from 'lucide-react';
import { Workflow } from 'lucide-react';
import Contact from '../components/Contact';
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">

      {/* BACKGROUND EFFECT */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* 1. NAVBAR */}
        <nav className="flex justify-between items-center py-8 mb-16 sticky top-0 bg-slate-950/80 backdrop-blur-md z-50 border-b border-white/5">
          <div className="text-xl font-bold tracking-tighter text-white">VN.</div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a>
            <a href="#leadership" className="hover:text-blue-400 transition-colors">Leadership</a>
            <a href="#work" className="hover:text-blue-400 transition-colors">Work</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </nav>

        {/* 2. HERO SECTION - COMPACT TOP SPACING */}
        <section id="about" className="pt-2 pb-16 md:pt-8 md:pb-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-24">

          {/* LEFT COLUMN: TEXT CONTENT */}
          <div className="flex flex-col items-start flex-1 z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Open to Product & Founder's Office Roles
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Intelligent</span> <br />
              Digital Products.
            </h1>

            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              I'm <strong className="text-slate-200">Vrishab Nair</strong>. I bridge the gap between engineering execution and user-centric product strategy. Currently building at the intersection of Hardware, AI, and Operations.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-7 py-3 bg-white text-slate-950 rounded-lg font-bold hover:bg-slate-200 transition flex items-center gap-2">
                Let's Talk <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: BIG CIRCLE PHOTO */}
          <div className="relative flex-shrink-0 z-10">

            {/* Clickable Link Wrapper */}
            <a
              href="https://www.linkedin.com/in/vrishab-nair-212769290/"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative rounded-full group"
              title="Visit LinkedIn Profile"
            >
              {/* The Circle Container */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-[6px] border-slate-900 shadow-2xl bg-slate-950 relative">
                <img
                  src="/image_0.png"
                  alt="Vrishab Nair"
                  className="w-full h-full object-cover transition duration-700 ease-in-out scale-100 group-hover:scale-110 group-hover:brightness-110 cursor-pointer"
                />
              </div>
            </a>

            {/* Subtle dark backdrop glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-blue-500/10 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
          </div>

        </section>
        {/* 3. INTERNSHIPS */}
        <section id="experience" className="mb-24 scroll-mt-24">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <span className="h-px w-8 bg-blue-500"></span> Internships
          </h2>

          <div className="relative border-l border-slate-800 ml-3 md:ml-6 space-y-12">

            {/* Role 1: Pinch */}
            <div className="relative pl-8 md:pl-12 group">
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-slate-950 group-hover:ring-blue-500/20 transition-all"></div>

              {/* Card Container */}
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/30 transition-all shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">Founders Office Intern</h3>
                    <div className="text-blue-400 font-medium flex items-center gap-2 mt-1">
                      <Briefcase size={16} /> Pinch
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    May 2025 - August 2025
                  </span>
                </div>

                <div className="text-slate-400 leading-relaxed">
                  <p className="mb-3 italic text-slate-500">Working directly with founders on product strategy, fundraising, and operations.</p>
                  <ul className="list-disc list-outside ml-4 space-y-2 marker:text-blue-500 mb-6">
                    <li>Identified product gaps through competitive analysis of 7 networking apps and designed 3 Figma prototypes, leading to the prioritization of 2 high-impact roadmap features.</li>
                    <li>Launched "Streaks" gamification feature by coordinating with engineering and design, driving an 18% increase in 7-day user retention.</li>
                    <li>Revamped the company website and implemented a new SEO strategy to improve organic search rankings.</li>
                    <li>Built the investor pitch deck and sourced 34+ VCs, successfully securing 2 strategic investor meetings.</li>
                    <li>Executed end-to-end hiring for 2 Marketing Executives via LinkedIn and Founder's Network.</li>
                  </ul>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2">
                    {['Product Strategy', 'Figma', 'Growth', 'Fundraising', 'SEO'].map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Role 2: Stamp My Visa */}
            <div className="relative pl-8 md:pl-12 group">
              <div className="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full bg-slate-700 ring-4 ring-slate-950 group-hover:ring-slate-600/20 transition-all"></div>

              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-600/30 transition-all shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">Generalist Intern</h3>
                    <div className="text-blue-400 font-medium flex items-center gap-2 mt-1">
                      <Briefcase size={16} /> Stamp My Visa
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    May 2025 - July 2025
                  </span>
                </div>

                <div className="text-slate-400 leading-relaxed">
                  <p className="mb-3 italic text-slate-500">Focused on UX optimization, process automation, and internal operations.</p>
                  <ul className="list-disc list-outside ml-4 space-y-2 marker:text-slate-600 mb-6">
                    <li>Redesigned the 'Automaton' product user flow and created UI mockups, streamlining a complex 9-step process into 4 steps to reduce drop-off.</li>
                    <li>Produced 3 comprehensive training videos and onboarding decks, slashing new hire onboarding time from 2 weeks to just 5 days.</li>
                  </ul>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2">
                    {['UX Design', 'Process Optimization', 'Operations', 'UI Mockups'].map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Role 3: Nam Nam Foods */}
            <div className="relative pl-8 md:pl-12 group">
              <div className="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full bg-slate-700 ring-4 ring-slate-950 group-hover:ring-slate-600/20 transition-all"></div>

              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-600/30 transition-all shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">Product Marketing Intern</h3>
                    <div className="text-blue-400 font-medium flex items-center gap-2 mt-1">
                      <Briefcase size={16} /> Nam Nam Foods
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    Jan 2025 - March 2025
                  </span>
                </div>

                <div className="text-slate-400 leading-relaxed">
                  <p className="mb-3 italic text-slate-500">Led digital growth strategies, packaging design, and content optimization.</p>
                  <ul className="list-disc list-outside ml-4 space-y-2 marker:text-slate-600 mb-6">
                    <li>Designed and executed a multi-channel Valentine's Campaign (Instagram, WhatsApp, Email), driving a 47% sales increase over 2 months.</li>
                    <li>Optimized Instagram content strategy using analytics, growing account reach by 83% and followers by 15%.</li>
                    <li>Redesigned product packaging based on customer feedback analysis to improve brand perception.</li>
                  </ul>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2">
                    {['Growth Marketing', 'Analytics', 'GTM Strategy', 'Content'].map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. LEADERSHIP */}
        <section id="leadership" className="mb-24 scroll-mt-24">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <span className="h-px w-8 bg-emerald-500"></span> Leadership
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* PoR 1: 180DC (Kept the Fintech detail) */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/30 transition-all md:col-span-2 group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-100 group-hover:text-emerald-400 transition-colors">President</h3>
                  <div className="text-emerald-500 text-sm font-medium">180 Degrees Consulting, BITS Hyderabad</div>
                </div>
                <Users size={20} className="text-slate-600 group-hover:text-emerald-500 transition-colors" />
              </div>
              <div className="text-slate-400 text-sm space-y-4">
                <p>
                  Leading a branch of 25+ consultants to solve strategic problems for social enterprises and startups.
                  Responsible for client acquisition, project delivery, and branch strategy.
                </p>
                <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl">
                  <h4 className="text-emerald-300 font-semibold mb-2 text-xs uppercase tracking-wide flex items-center gap-2">
                    <Zap size={12} /> Current Strategic Engagement
                  </h4>
                  <p className="mb-2">
                    Directing a high-impact project with an early-stage <strong>FinTech Startup</strong> to simplify personal finance & IT returns.
                  </p>
                  <ul className="list-disc list-outside ml-4 space-y-1 marker:text-emerald-500">
                    <li>Spearheading <strong>User Research</strong> and interviews to identify pain points in the current tax-filing workflow.</li>
                    <li>Leading the <strong>UI/UX Overhaul</strong> of the core money-tracking dashboard to improve usability and retention.</li>
                    <li>Collaborating with founders on <strong>Feature Development</strong> prioritization for the Q3 product roadmap.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* PoR 2: NSS (UPDATED with n8n Project) */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-100 group-hover:text-emerald-400 transition-colors">Student's Anonymous Lead</h3>
                  <div className="text-emerald-500 text-sm font-medium">National Service Scheme</div>
                </div>
                <Users size={20} className="text-slate-600 group-hover:text-emerald-500 transition-colors" />
              </div>
              <div className="text-slate-400 text-sm space-y-3">
                <p>Leading a 22-member peer support team providing confidential counseling for students.</p>
                <ul className="list-disc list-outside ml-4 space-y-2 marker:text-emerald-500">
                  <li><strong>Automated "The Appreciation Project":</strong> Built an <strong>n8n workflow</strong> with <strong>Sentiment Analysis</strong> to filter and route messages from Google Forms to recipients.</li>
                  <li>Eliminated manual verification "grunt work," boosting operational efficiency by <strong>200%</strong>.</li>
                  <li>Organized 6 mental health awareness events reaching 300+ students.</li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">n8n Automation</span>
                  <span className="px-2 py-1 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Sentiment Analysis</span>
                </div>
              </div>
            </div>

            {/* PoR 3: Dept of Publicity */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-100 group-hover:text-emerald-400 transition-colors">Social Media Lead</h3>
                  <div className="text-emerald-500 text-sm font-medium">Dept. of Publicity and Public Relations</div>
                </div>
                <Flag size={20} className="text-slate-600 group-hover:text-emerald-500 transition-colors" />
              </div>
              <ul className="list-disc list-outside ml-4 text-sm text-slate-400 space-y-2 marker:text-emerald-500">
                <li>Managed ATMOS 2024 Instagram (8k+ followers) and developed content strategy.</li>
                <li>Executed paid ads driving 3M+ reach and ₹19L in ticket sales (78% YoY increase).</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-1 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Content Strategy</span>
                <span className="px-2 py-1 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Performance Marketing</span>
              </div>
            </div>

          </div>
        </section>
        {/* 5. SELECTED WORK */}
        <section id="work" className="mb-32 scroll-mt-24">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <span className="h-px w-8 bg-purple-500"></span> Selected Work
          </h2>
          {/* CLASSIFICATION 1: TECH PROJECTS */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
              <Code2 className="text-purple-400" size={20} /> Tech Projects
            </h3>

            {/* Switched to 3 columns to fit the new project perfectly */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Project 1: Portfolio RAG AI */}
              <div className="group relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-all hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)] flex flex-col">
                <div className="absolute top-8 right-8 p-3 bg-purple-500/10 rounded-xl text-purple-400">
                  <Zap size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Portfolio RAG AI</h3>
                <p className="text-slate-400 mb-6 flex-1">
                  An intelligent portfolio assistant powered by Llama 3 and Vector Embeddings. It reads my technical resume and answers recruiter questions in real-time.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-300">Next.js</span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-300">Pinecone</span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-300">AI SDK</span>
                </div>
              </div>

              {/* Project 2: PM Coach AI */}
              <div className="group relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] flex flex-col">
                <div className="absolute top-8 right-8 p-3 bg-blue-500/10 rounded-xl text-blue-400">
                  <Bot size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">PM Coach AI</h3>
                <p className="text-slate-400 mb-6 flex-1">
                  A Senior PM mentor bot. Fine-tuned Llama 7B on 3,000+ FAANG questions and built a RAG pipeline with ChromaDB to index curated product strategy literature.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-300">Llama 7B</span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-300">Unsloth</span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-300">ChromaDB</span>
                </div>
              </div>

              {/* Project 3: Appreciation Automation (NEW) */}
              <div className="group relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-all hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] flex flex-col">
                <div className="absolute top-8 right-8 p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                  <Workflow size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Sentiment Auto-Router</h3>
                <p className="text-slate-400 mb-6 flex-1">
                  Engineered an autonomous workflow to process anonymous letters. Integrated NLP sentiment analysis to filter toxicity and route positive messages, boosting efficiency by 200%.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-300">n8n</span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-300">NLP</span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono text-slate-300">Webhooks</span>
                </div>
              </div>

            </div>
          </div>
          {/* CLASSIFICATION 2: PRODUCT DECKS & CASE STUDIES */}
          <div>
            <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
              <Layers className="text-purple-400" size={20} /> Product Decks & Case Studies
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Deck 1: Blinkit */}
              <a href="https://drive.google.com/file/d/1WJZQlv7F2qlrg8mMC1e1KGFW3Fa_mN2z/view?usp=sharing" className="group p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-purple-500/50 hover:bg-slate-800/50 transition-all flex flex-col">
                <div className="mb-4 p-3 bg-slate-800 w-fit rounded-lg text-purple-400">
                  <ShoppingBag size={20} />
                </div>
                <h3 className="font-bold text-lg text-slate-200 mb-2 group-hover:text-purple-400 transition-colors">Blinkit Feature Proposal</h3>
                <p className="text-sm text-slate-500 mb-4 flex-1">
                  Product teardown and PRD for a new "Group Ordering" feature to increase average order value.
                </p>
                <div className="text-xs font-mono text-purple-400 flex items-center gap-2">
                  View Deck <ExternalLink size={12} />
                </div>
              </a>

              {/* Deck 2: FinEase */}
              <a href="https://drive.google.com/file/d/190tYSvpGNnV_2nc55VNXTXLh_PuPUcxK/view?usp=sharing" className="group p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-purple-500/50 hover:bg-slate-800/50 transition-all flex flex-col">
                <div className="mb-4 p-3 bg-slate-800 w-fit rounded-lg text-purple-400">
                  <CreditCard size={20} />
                </div>
                <h3 className="font-bold text-lg text-slate-200 mb-2 group-hover:text-purple-400 transition-colors">FinEase Case Study</h3>
                <p className="text-sm text-slate-500 mb-4 flex-1">
                  FinTech product strategy focusing on simplifying personal finance for Gen-Z users.
                </p>
                <div className="text-xs font-mono text-purple-400 flex items-center gap-2">
                  View Case Study <ExternalLink size={12} />
                </div>
              </a>

              {/* Deck 3: ECOX LABS */}
              <a href="https://drive.google.com/file/d/1B6yleuSY24NRVgcBxB1ectl6MUKx6zqr/view?usp=sharing" className="group p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-purple-500/50 hover:bg-slate-800/50 transition-all flex flex-col">
                <div className="mb-4 p-3 bg-slate-800 w-fit rounded-lg text-purple-400">
                  <Lightbulb size={20} />
                </div>
                <h3 className="font-bold text-lg text-slate-200 mb-2 group-hover:text-purple-400 transition-colors">ECOX LABS (ReTHINK)</h3>
                <p className="text-sm text-slate-500 mb-4 flex-1">
                  <strong>3rd Place Winner.</strong> Proposed decentralized agri-waste supply chain. Designed 'KhetSe' app wireframes.
                </p>
                <div className="text-xs font-mono text-purple-400 flex items-center gap-2">
                  View Deck <ExternalLink size={12} />
                </div>
              </a>

              {/* Deck 4: Purple Pandit */}
              <a href="https://drive.google.com/file/d/1rb8lnAwjO4orcyNT2US3Jp2Jzdl9YnoG/view?usp=sharing" className="group p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-purple-500/50 hover:bg-slate-800/50 transition-all flex flex-col">
                <div className="mb-4 p-3 bg-slate-800 w-fit rounded-lg text-purple-400">
                  <TrendingUp size={20} />
                </div>
                <h3 className="font-bold text-lg text-slate-200 mb-2 group-hover:text-purple-400 transition-colors">Purple Pandit Strategy</h3>
                <p className="text-sm text-slate-500 mb-4 flex-1">
                  Market entry and growth strategy case study for a D2C brand expansion.
                </p>
                <div className="text-xs font-mono text-purple-400 flex items-center gap-2">
                  View Deck <ExternalLink size={12} />
                </div>
              </a>

              {/* Deck 5: Instagram */}
              <a href="https://drive.google.com/file/d/18o8R1TI4onMn0aCta6A2RYDVxxfy5CSR/view?usp=sharing" className="group p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-purple-500/50 hover:bg-slate-800/50 transition-all flex flex-col">
                <div className="mb-4 p-3 bg-slate-800 w-fit rounded-lg text-purple-400">
                  <Smartphone size={20} />
                </div>
                <h3 className="font-bold text-lg text-slate-200 mb-2 group-hover:text-purple-400 transition-colors">Instagram Analysis</h3>
                <p className="text-sm text-slate-500 mb-4 flex-1">
                  Feature analysis and engagement strategy proposal for maximizing creator retention.
                </p>
                <div className="text-xs font-mono text-purple-400 flex items-center gap-2">
                  View Deck <ExternalLink size={12} />
                </div>
              </a>

              {/* Deck 6: Interbits */}
              <a href="https://drive.google.com/file/d/1CaQM4fR0ZXKjP3ojlTaZmzIdFmcBXDFY/view?usp=sharing" className="group p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-purple-500/50 hover:bg-slate-800/50 transition-all flex flex-col">
                <div className="mb-4 p-3 bg-slate-800 w-fit rounded-lg text-purple-400">
                  <LayoutTemplate size={20} />
                </div>
                <h3 className="font-bold text-lg text-slate-200 mb-2 group-hover:text-purple-400 transition-colors">StylePronto</h3>
                <p className="text-sm text-slate-500 mb-4 flex-1">
                  Comprehensive product strategy + User Interviews for a GenZ AI Powered Fashion Brand.
                </p>
                <div className="text-xs font-mono text-purple-400 flex items-center gap-2">
                  View Deck <ExternalLink size={12} />
                </div>
              </a>

            </div>
          </div>

        </section>

        {/* 6. CONTACT SECTION (Interactive) */}
        <Contact />

        {/* FOOTER */}
        <footer className="py-8 text-center text-slate-600 text-sm">
          <p>© 2024 Vrishab Nair. Built with Next.js & Artificial Intelligence.</p>
        </footer>

      </div>

      <ChatWidget />
    </main>
  );
}