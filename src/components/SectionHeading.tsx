import SectionLabel from './SectionLabel';

interface SectionHeadingProps {
  title?: string;
  subtitle?: string;
  label?: string;
}

export default function SectionHeading({ title, subtitle, label }: SectionHeadingProps) {
  const hasContent = title || subtitle;

  return (
    <div className="space-y-6">
      {label && <SectionLabel>{label}</SectionLabel>}
      {hasContent && (
        <div className="space-y-4">
          {title && (
            <h2 className="text-4xl md:text-5xl font-serif text-brand-secondary leading-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <div className="relative bg-white/[0.03] backdrop-blur-[8px] backdrop-saturate-150 rounded-2xl overflow-hidden">
              {/* Subtle Shimmer Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              <div className="relative z-10 pl-0 pt-2 pb-4 pr-8">
                <p className="text-sm text-zinc-600 font-sans tracking-wide max-w-2xl leading-relaxed">
                  {subtitle}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
