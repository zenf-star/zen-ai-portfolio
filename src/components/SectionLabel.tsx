export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-mono text-zinc-400 block uppercase tracking-[0.2em]">
      {children}
    </span>
  );
}
