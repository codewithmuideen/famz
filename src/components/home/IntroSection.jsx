import ContentSplitSection from "../sections/ContentSplitSection";
import { useSiteContent } from "../../hooks/useSiteContent";

const defaults = {
  eyebrow: "Our Approach",
  title: "Accounting should do more than tick a compliance box.",
  paragraph1: "At Dieux Accounting & Advisory, we work as an extension of our clients' businesses, providing clear financial information, proactive advice and practical solutions that help individuals and businesses understand their finances and achieve their objectives.",
  paragraph2: "Our approach combines professional accounting expertise with modern technology and commercial insight, giving you a responsive, efficient and genuinely personalised service.",
  image: "intro-team-workplace",
};

export default function IntroSection() {
  const { content } = useSiteContent("home", "intro", defaults);

  return (
    <ContentSplitSection
      eyebrow={content.eyebrow}
      title={content.title}
      paragraphs={[content.paragraph1, content.paragraph2]}
      image={content.image}
      cta={{ label: "More about us", to: "/who-we-are" }}
    />
  );
}
