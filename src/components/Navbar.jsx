import { useEffect, useState } from "react";

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const handleScroll = () => {
      // Activate contact when scrolled to bottom of page
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

      if (atBottom) {
        setActiveSection("contact");
        return;
      }

      let current = "home";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
      <div className="container-fluid px-4">
        <a className="navbar-brand d-flex align-items-center" href="#home">
          <img
            src={`${import.meta.env.BASE_URL}assets/images/loho-removebg-preview.png`}
            alt="Logo"
            height="55"
            className="me-2"
          />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {["home", "about", "skills", "portfolio", "contact"].map((item) => (
              <li className="nav-item" key={item}>
                <a
                  className={`nav-link ${activeSection === item ? "active-link" : ""}`}
                  href={`#${item}`}
                >
                  {item.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;