import ContentSplitSection from "../sections/ContentSplitSection";

export default function IntroSection() {
  return (
    <ContentSplitSection
      eyebrow="Our Approach"
      title="Accounting should do more than tick a compliance box."
      paragraphs={[
        "At Dieux Accounting & Advisory, we work as an extension of our clients' businesses — providing clear financial information, proactive advice and practical solutions that help individuals and businesses understand their finances and achieve their objectives.",
        "Our approach combines professional accounting expertise with modern technology and commercial insight, giving you a responsive, efficient and genuinely personalised service.",
      ]}
      image="intro-team-workplace"
      cta={{ label: "More about us", to: "/about" }}
    />
  );
}
