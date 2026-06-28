import { TbRobot, TbTrendingUp, TbBolt, TbRocket } from "react-icons/tb";
import CardStack from "./CardStack";
import StarBorder from "./StarBorder";

const ClientReviews = () => {
  const reviews = [
    {
      id: "review-1",
      name: "Atish Jain",
      role: "Founder",
      company: "Build With AI",
      comment:
        "Bhargavi is an outstanding developer who built our Next.js platform from scratch. She integrated a streaming chatbot, real-time node rendering, and an AI resume builder with zero supervision. A rare talent who delivers production-grade results under pressure.",
      accent: "text-mint border-mint/20 bg-mint/5",
      icon: <TbRobot className="text-2xl" />,
      project: "BUILD_WITH_AI",
      starColor: "#57db96",
      iconBg: "bg-[#57db96] text-[#060919]",
    },
    {
      id: "review-2",
      name: "Pavan",
      role: "Lead Systems Architect",
      company: "BullBoom Platform",
      comment:
        "We hired Bhargavi to architect BullBoom's trading engine. She built high-frequency WebSockets pipelines that handle real-time market simulation without a single packet drop. Her database optimization reduced query times by 40% and improved responsiveness.",
      accent: "text-royal border-royal/20 bg-royal/5",
      icon: <TbTrendingUp className="text-2xl" />,
      project: "BULLBOOM_TRADING",
      starColor: "#3b82f6",
      iconBg: "bg-[#3b82f6] text-white",
    },
    {
      id: "review-3",
      name: "Juhid",
      role: "Operations Director",
      company: "AH Career Platform",
      comment:
        "Working with Tejaswi on AHCareer was a great experience. She engineered our LMS modules and our AI-guided interview sandbox. Her ability to translate raw system design ideas into premium, responsive UI is exceptional.",
      accent: "text-fuchsia border-fuchsia/20 bg-fuchsia/5",
      icon: <TbBolt className="text-2xl" />,
      project: "AH_CAREER_LMS",
      starColor: "#d946ef",
      iconBg: "bg-[#d946ef] text-[#060919]",
    },
  ];

  const renderReviewCard = (review) => {
    return (
      <StarBorder
        as="div"
        className="w-full h-full select-none block"
        color={review.starColor}
        speed="3.5s"
        borderRadius="32px"
      >
        <div className="flex flex-col justify-between p-8 md:p-10 min-h-[320px] md:min-h-[290px] w-full relative overflow-hidden bg-bg-secondary/95 backdrop-blur-md select-none border border-border">
          {/* Grid background inside card */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] opacity-35 pointer-events-none" />

          {/* Card Upper Row */}
          <div className="flex items-center justify-between z-10 relative">
            <div className="flex items-center gap-4">
              {/* Rounded Square Icon */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${review.iconBg}`}>
                {review.icon}
              </div>
              <div>
                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">
                  {review.company}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-text-primary uppercase tracking-tight leading-none mt-1">
                  {review.name}
                </h3>
              </div>
            </div>

            {/* Project Identifier Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-bg-tertiary text-[9px] font-mono text-text-secondary uppercase tracking-widest">
              {review.project}
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="my-6 z-10 relative pr-4">
            <p className="text-sm md:text-base text-text-secondary font-light leading-relaxed tracking-wide italic">
              "{review.comment}"
            </p>
          </div>

          {/* Card Footer / Swipe Prompter */}
          <div className="text-center mt-auto z-10 relative">
            <span className="text-[9px] font-mono text-text-muted/50 tracking-[0.25em] uppercase italic">
              Drag or click to see next card
            </span>
          </div>
        </div>
      </StarBorder>
    );
  };

  return (
    <section className="py-28 px-6 md:px-8 bg-bg-primary relative z-20 overflow-hidden transition-colors duration-300">
      {/* Dynamic light glows */}
      <div className="absolute top-1/4 left-1/10 w-[600px] h-[600px] bg-mint/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[600px] h-[600px] bg-royal/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-mint/25 bg-mint/5 text-[9px] font-black uppercase tracking-[0.25em] text-mint mb-6 shadow-sm">
            <TbRocket className="text-xs animate-pulse" /> CLIENT REVIEWS
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-text-primary mb-6 max-w-3xl leading-none">
            What my clients <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mint via-fuchsia to-royal italic">
              say about me
            </span>
          </h2>
          <p className="text-xs md:text-sm text-text-secondary max-w-xl mx-auto font-light leading-relaxed">
            Verifiable transmissions from startup founders, tech leads, and product owners validating technical excellence and deployment pipelines.
          </p>
        </div>

        {/* Card Stack container */}
        <div className="w-full flex flex-col items-center">
          <CardStack
            items={reviews}
            renderCard={renderReviewCard}
            className="z-20"
          />
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
