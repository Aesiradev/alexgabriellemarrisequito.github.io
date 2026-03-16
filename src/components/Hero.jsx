function Hero() {
  return (
    <section id="home" className="hero-section d-flex align-items-center">
      <div className="hero-tint" />

      <div className="container">
        <div className="row align-items-center justify-content-center">

          <div className="col-12 col-md-4 text-center mb-4 mb-md-0">
            <div className="profile-circle mx-auto">
              <img
                src={`${import.meta.env.BASE_URL}assets/images/porfoliouser.jpg`}
                alt="Alex Sequito"
                className="profile-img"
              />
            </div>
          </div>

          <div className="col-12 col-md-8 text-center text-md-start hero-text">
            <small className="intro-text">HI, MY NAME IS</small>

            <h1 className="hero-name">
              ALEX GABRIELLE <br />
              MARRI A. SEQUITO
            </h1>

            <h4 className="hero-title">FULL-STACK DEVELOPER</h4>

            <p className="hero-sub">
              WEB • BACKEND • APIs • IoT • BROWSER EXTENSIONS
            </p>

            <a
              href={`${import.meta.env.BASE_URL}assets/Resume.pdf`}
              download="SequitoDev_Resume.pdf"
              className="btn btn-resume mt-3"
            >
              <i className="bi bi-download me-2"></i>
              RESUME
            </a>
          </div>

        </div>
        <div className="section-divider" />
      </div>
    </section>
  );
}

export default Hero;