export default function Footer() {
  const links = [
    { label: 'LinkedIn', href: '#' },
    { label: 'GitHub', href: 'https://github.com/zen-f' },
    { label: 'X (Twitter)', href: '#' },
    { label: 'Mail', href: 'mailto:zen.f@aspireapp.com' },
  ];

  return (
    <footer className="py-12 border-t border-zinc-200 mt-32">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-zinc-400">© 2024 DESIGNED BY ZEN F.</span>
        </div>
        
        <div className="flex gap-8">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
