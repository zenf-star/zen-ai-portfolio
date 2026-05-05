import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Github, ArrowUpRight, X } from 'lucide-react';
import type { Project } from '../types';
import { cn } from '../lib/utils';

interface ProjectCardProps {
  project: Project;
}

const getTagStyles = (tag: string) => {
  switch (tag.toLowerCase()) {
    case 'agent':
      return 'bg-blue-50 text-blue-600 border-blue-100/50';
    case 'skill':
      return 'bg-amber-50 text-amber-600 border-amber-100/50';
    case 'dashboard':
      return 'bg-rose-50 text-rose-600 border-rose-100/50';
    case 'design':
      return 'bg-emerald-50 text-emerald-600 border-emerald-100/50';
    default:
      return 'bg-zinc-100 text-zinc-500 border-zinc-200/50';
  }
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <motion.div
        layoutId={`card-${project.id}`}
        onClick={() => setIsExpanded(true)}
        initial="initial"
        whileHover="hover"
        variants={{
          initial: { y: 0, scale: 1 },
          hover: { 
            y: -8, 
            scale: 1.01,
            transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }
          }
        }}
        className="group relative bg-white border border-zinc-200/50 p-6 cursor-pointer hover:border-zinc-400 transition-colors shadow-sm hover:shadow-2xl h-full flex flex-col overflow-hidden"
      >
        {/* Accent line that reveals on hover */}
        <motion.div 
          className={cn(
            "absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity",
            project.tag.toLowerCase() === 'agent' ? 'bg-blue-500' :
            project.tag.toLowerCase() === 'skill' ? 'bg-amber-500' :
            project.tag.toLowerCase() === 'dashboard' ? 'bg-rose-500' :
            project.tag.toLowerCase() === 'design' ? 'bg-emerald-500' : 'bg-zinc-500'
          )}
        />

        <div className="flex justify-between items-start mb-4">
          <span className={cn(
            "text-[10px] font-mono tracking-widest px-2 py-0.5 border rounded-sm uppercase transition-all group-hover:shadow-sm",
            getTagStyles(project.tag)
          )}>
            {project.tag}
          </span>
          <motion.div
            variants={{
              initial: { x: 0, y: 0, opacity: 0.3 },
              hover: { x: 2, y: -2, opacity: 1 }
            }}
          >
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
          </motion.div>
        </div>

        <motion.h3 
          layoutId={`title-${project.id}`}
          className="text-xl font-serif text-zinc-900 mb-2 group-hover:translate-x-1 transition-transform"
        >
          {project.title}
        </motion.h3>
        
        <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-600 transition-colors">
          {project.oneLiner}
        </p>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              layoutId={`card-${project.id}`}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white overflow-hidden shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur hover:bg-white rounded-full border border-zinc-200 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-12 overflow-y-auto w-full">
                <div className="mb-12 border-b border-zinc-100 pb-12">
                  <span className={cn(
                    "text-[10px] font-mono tracking-widest px-2 py-0.5 border rounded-sm uppercase mb-6 inline-block",
                    getTagStyles(project.tag)
                  )}>
                    {project.tag}
                  </span>
                  
                  <motion.h2 
                    layoutId={`title-${project.id}`}
                    className="text-4xl md:text-6xl font-serif text-zinc-900 mb-4"
                  >
                    {project.title}
                  </motion.h2>

                  <p className="text-xl text-zinc-500 font-sans font-light leading-relaxed mb-8 max-w-2xl">
                    {project.oneLiner}
                  </p>
                  
                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-zinc-900 hover:text-brand-secondary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-5 h-5" />
                      View Repository
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                  <div className="md:col-span-12 space-y-12">
                    <section className="space-y-4">
                      <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">Description</h4>
                      <div className="text-base text-zinc-700 leading-relaxed font-sans prose prose-zinc">
                        {project.description}
                      </div>
                    </section>

                    <section className="space-y-4">
                      <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">Key Features</h4>
                      <ul className="space-y-3">
                        {project.keyFeatures.map((feature, idx) => {
                          const colonIndex = feature.indexOf(':');
                          if (colonIndex !== -1) {
                            const headline = feature.substring(0, colonIndex);
                            const detail = feature.substring(colonIndex + 1);
                            return (
                              <li key={idx} className="flex items-start gap-3 text-sm text-zinc-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 mt-1.5 shrink-0" />
                                <span>
                                  <strong className="font-semibold text-zinc-900">{headline}:</strong>{detail}
                                </span>
                              </li>
                            );
                          }
                          return (
                            <li key={idx} className="flex items-start gap-3 text-sm text-zinc-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 mt-1.5 shrink-0" />
                              {feature}
                            </li>
                          );
                        })}
                      </ul>
                    </section>

                    <section className="space-y-4">
                      <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">Demo</h4>
                      <div className="aspect-video bg-zinc-50 rounded-xl border border-zinc-200 flex items-center justify-center relative overflow-hidden group">
                        {project.demoUrl ? (
                          <>
                            {project.demoUrl.includes('loom.com/embed') || project.demoUrl.includes('youtube.com/embed') ? (
                              <iframe 
                                src={project.demoUrl} 
                                allowFullScreen 
                                className="w-full h-full border-0"
                              />
                            ) : project.demoUrl.match(/\.(mp4|webm|ogg)$/) ? (
                              <video 
                                src={project.demoUrl} 
                                controls 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <img 
                                src={project.demoUrl} 
                                alt="Demo preview" 
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                referrerPolicy="no-referrer"
                              />
                            )}
                          </>
                        ) : (
                          <div className="text-zinc-400 text-xs font-mono">Demo Preview Placeholder</div>
                        )}
                        {!project.demoUrl?.includes('embed') && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="px-4 py-2 bg-white/90 backdrop-blur text-[10px] font-mono tracking-widest uppercase border border-zinc-200 shadow-sm">
                              Platform Preview
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
                  </div>

                  {project.readme && (
                    <div className="md:col-span-12 mt-12 pt-12 border-t border-zinc-100">
                      <section className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="h-px flex-1 bg-zinc-100" />
                          <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 bg-white px-4">
                            {project.tag === 'Skill' ? 'SKILL.MD' : 'README.md'}
                          </h4>
                          <div className="h-px flex-1 bg-zinc-100" />
                        </div>
                        <div className="markdown-body p-8 bg-zinc-50/50 rounded-xl border border-zinc-100">
                          <ReactMarkdown>{project.readme}</ReactMarkdown>
                        </div>
                      </section>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
