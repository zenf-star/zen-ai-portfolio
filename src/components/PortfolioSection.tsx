import { motion } from 'motion/react';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import SectionHeading from './SectionHeading';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  },
};

export default function PortfolioSection() {
  const categories = ['Automation', 'Frontend', 'Community'] as const;

  return (
    <section id="portfolio" className="py-24 space-y-24 lg:space-y-32">
      {categories.map((cat, index) => (
        <div key={cat} className="space-y-16">
          <SectionHeading 
            label={index === 0 ? "Selected works" : undefined}
            title={cat === 'Automation' ? 'Agents + Systems' : cat === 'Frontend' ? 'Designs + Visualisations' : 'Community & SOPs'} 
            subtitle={
              cat === 'Automation' ? "Tools that I've built or contributed significantly to. Each one started as problem someone hated, and ended as an AI-powered solution. Click into any of these projects for more details." : 
              cat === 'Frontend' ? 'Interfaces and visualisations designed for clarity in high-density environments. These are the control surfaces and logs for complex systems—built to make technical data legible and actionable.' : 
              'Encoding knowledge into shared skills.'
            }
          />
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1"
          >
            {projects
              .filter(p => p.category === cat)
              .map(project => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
          </motion.div>
        </div>
      ))}
    </section>
  );
}
