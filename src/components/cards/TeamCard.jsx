import ImageReveal from "../common/ImageReveal";
import ScrollReveal from "../common/ScrollReveal";

export default function TeamCard({ member, index = 0 }) {
  return (
    <ScrollReveal delay={index * 0.06} className="h-full">
      <div className="flex h-full flex-col gap-4">
        <ImageReveal
          src={member.image}
          alt={`Portrait of ${member.name}`}
          effect="scale"
          className="aspect-[3/4] w-full"
        />
        <div>
          <h3 className="text-lg text-ink">{member.name}</h3>
          <p className="text-sm text-brand-gold">{member.role}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{member.bio}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}
