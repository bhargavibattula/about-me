import SatelliteIntercept from "../components/SatelliteIntercept";

const Projects = () => {
  return (
    <section id="work" className="relative mt-20 md:mt-30 overflow-hidden">
      <div className="c-space mb-10">
        <h2 className="text-heading uppercase italic tracking-tighter">Satellite Intercept</h2>
        <p className="subtext mt-2 font-mono uppercase tracking-[0.2em] text-xs">Awaiting signal discovery // Scanning sector Delta-7...</p>
      </div>

      <div className="relative w-full">
        <SatelliteIntercept />
      </div>
    </section>
  );
};

export default Projects;


