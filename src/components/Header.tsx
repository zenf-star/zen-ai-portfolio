import { motion } from 'motion/react';

export default function Header() {
  const navItems = [
    { label: 'Profile', href: '#profile' },
    { label: 'Selected Works', href: '#portfolio' },
    { label: 'Contact', href: 'mailto:zen.f@aspireapp.com' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-8 flex justify-between items-center pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3 pointer-events-auto"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-brand-secondary" />
        <span className="font-mono text-xs font-bold tracking-tighter uppercase px-2 py-0.5 border border-zinc-900 rounded-sm">
          Zen F. / Portfolio
        </span>
      </motion.div>

      <nav className="hidden md:flex items-center gap-10 pointer-events-auto bg-white/70 backdrop-blur-md px-8 py-3 border border-zinc-200/50 rounded-full shadow-sm">
        {navItems.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Removed Contact button */}
    </header>
  );
}
