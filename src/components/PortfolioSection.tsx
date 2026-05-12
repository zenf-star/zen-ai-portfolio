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
  return (
    <section id="portfolio" className="py-24">
      <div className="space-y-16">
        <SectionHeading
          label="Selected works"
          title="Projects"
          subtitle="Tools, agents, and interfaces I've built or contributed significantly to. Click any card for the mechanism and how it's used."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1"
        >
          {projects.map(project => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
