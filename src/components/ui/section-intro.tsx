import { Badge } from '@/components/ui/badge';

/**
 * Reusable section header with eyebrow label, title, and description.
 * Use level={1} for the primary heading on a page, level={2} (default) for sub-sections.
 */
export function SectionIntro({
  eyebrow,
  title,
  description,
  level = 2,
}: {
  eyebrow: string;
  title: string;
  description: string;
  level?: 1 | 2;
}) {
  const Tag = `h${level}` as 'h1' | 'h2';
  return (
    <div className="max-w-3xl space-y-4">
      <Badge className="border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan-light">
        {eyebrow}
      </Badge>
      <Tag className="text-heading text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </Tag>
      <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
        {description}
      </p>
    </div>
  );
}
