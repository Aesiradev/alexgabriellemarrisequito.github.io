import { useEffect, useRef } from "react";

function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section fade-in-section" ref={sectionRef}>
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT — Profile Summary */}
          <div className="col-md-4 text-center about-profile">
            <div className="about-circle">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/porfoliouser.jpg`}
                alt="Alex Sequito"
                className="profile-img"
              />
            </div>
            <h5 className="about-name mt-3">ALEX GABRIELLE<br />MARRI A. SEQUITO</h5>
            <p className="about-role">SOFTWARE DEVELOPER</p>
            <div className="about-socials mt-2">
              <a href="https://github.com/Aesiradev" className="social-icon me-3"><i className="bi bi-github"></i></a>
              <a href="https://linkedin.com/in/alex-gabrielle-marri-sequito-6ba7a9276" className="social-icon"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* RIGHT — About Text */}
          <div className="col-md-8 about-text">
            <h2 className="about-title">About</h2>
            <p>
              Full-stack developer with experience across frontend and backend development,
              specializing in Laravel-based systems, RESTful API design, JWT authentication,
              and Dockerized development workflows. Comfortable building responsive user
              interfaces and connecting them to secure, well-structured backend services.
            </p>
            <p>
              Experienced in developing data-driven web applications and integrating IoT
              hardware with web platforms for real-time monitoring, visualization, and
              analytics. Strong focus on maintainable code, scalable architecture, and
              delivering production-ready solutions that bridge modern frontend technologies
              and robust backend systems.
            </p>
            <p>
              Engineered a Chromium-based browser extension leveraging DOM traversal and
              content-script architecture to optimize and accelerate web search workflows —
              reducing query overhead and streamlining information retrieval across
              multi-source environments.
            </p>
          </div>
        </div>
        <div className="section-divider" />
      </div>
    </section>
  );
}

export default About;