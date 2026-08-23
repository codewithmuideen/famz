/**
 * Reusable marquee strip. Dieux has no third-party logos/awards to display yet,
 * so this renders a scrolling strip of sector names — swap `items` for real
 * client/partner logos later without touching the component.
 */
export default function LogoCloud({ items, label = "Sectors we work with" }) {
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-line bg-surface-cream py-8">
      <div className="container-page mb-4">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
          {label}
        </span>
      </div>
      <div className="no-scrollbar overflow-hidden">
        <div className="flex w-max animate-marquee gap-10 [animation-play-state:running] hover:[animation-play-state:paused] motion-reduce:animate-none">
          {doubled.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="whitespace-nowrap font-display text-xl text-ink-soft sm:text-2xl"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
