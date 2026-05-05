import { motion } from 'motion/react';
import SectionHeading from './SectionHeading';

export default function Hero() {
  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Hero Title Section */}
      <section className="pt-32 pb-8 md:pt-48 md:pb-12">
        <div className="max-w-5xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-9xl font-serif text-zinc-900 leading-[0.9] tracking-tight">
              Hi, I'm <span className="relative inline-block">
                <span className="text-brand-secondary">Zen.</span>
                <motion.svg 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="absolute -bottom-8 -left-2 w-[115%] h-10 md:h-12 text-brand-secondary/30 -z-10 pointer-events-none select-none origin-left"
                  viewBox="0 0 120 20"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <clipPath id="brushClip">
                      <motion.rect 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                      />
                    </clipPath>
                  </defs>
                  <path 
                    clipPath="url(#brushClip)"
                    d="M2,13 C40,16.5 80,14 118,11.5 C80,6 40,8.5 2,10 Z" 
                    fill="currentColor" 
                  />
                </motion.svg>
              </span>
            </h1>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-serif text-brand-secondary leading-snug"
          >
            I build AI solutions, then coach teams to build their own.
          </motion.h2>
        </div>
      </section>

      {/* Profile Details Section */}
      <section id="profile" className="pb-8 lg:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-16"
        >
          <SectionHeading label="Profile" title="About Me" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7">
              <div className="relative space-y-7 pl-0 pt-2 pb-4 pr-8 bg-white/[0.03] backdrop-blur-[8px] backdrop-saturate-150 rounded-2xl overflow-hidden">
                {/* Subtle Shimmer Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                <p className="text-base text-zinc-700 leading-loose font-sans font-normal">
                  AI-native operator. I embed with teams to change how they work with AI. I build AI-powered processes, automations, and agents alongside the people whose work they transform.
                </p>
                <p className="text-base text-zinc-700 leading-loose font-sans font-normal">
                  At Aspire, I've built agents who triage bugs, agents who actively listen and synthesise our Voice of Customer, and even agents who build other agents.
                </p>
                <p className="text-base text-zinc-700 leading-loose font-sans font-normal">
                  I've shipped internal AI-powered dashboards which service 100+ team members.
                </p>
                <p className="text-base text-zinc-700 leading-loose font-sans font-normal">
                  I've coached non-technical teams from first prompt to first agent.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-5">
              <div className="relative space-y-7 pl-0 pt-2 pb-4 pr-8 bg-white/[0.03] backdrop-blur-[8px] backdrop-saturate-150 rounded-2xl overflow-hidden h-full">
                {/* Subtle Shimmer Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 relative z-10">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-mono block">Current Role</span>
                    <p className="text-sm font-medium text-zinc-900 leading-relaxed flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-brand-secondary mt-2 shrink-0" />
                      <span>
                        <span className="text-black font-semibold">Chief of Staff</span><br/>@ Aspire
                      </span>
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-mono block">location</span>
                    <p className="text-sm font-medium text-zinc-900 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-brand-secondary shrink-0" />
                      Singapore
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-mono block">Specialisation</span>
                    <div className="space-y-3">
                      {['Agent Systems', 'Automation', 'Frontend Design'].map((item) => (
                        <p key={item} className="text-sm font-medium text-zinc-900 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-brand-secondary shrink-0" />
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-mono block">Available For</span>
                    <div className="space-y-3">
                      {['AI Consultation', 'Workshops'].map((item) => (
                        <p key={item} className="text-sm font-medium text-zinc-900 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-brand-secondary shrink-0" />
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
