import { useEffect, useRef } from "react";

const skills = [
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "REST APIs", icon: "https://api.iconify.design/mdi:cloud-cog.svg?color=%231a73e8&width=64&height=64" },
  { name: "IoT", icon: "https://api.iconify.design/mdi:cloud-outline.svg?color=%2300bcd4&width=64&height=64" },
  { name: "Browser Ext", icon: "https://api.iconify.design/mdi:puzzle.svg?color=%231a73e8&width=64&height=64" },
  { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

const ITEM_WIDTH = 138;
const SPEED = 0.6;
const allItems = [...skills, ...skills, ...skills];

function Skills() {
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add("fade-in-visible");
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const N = skills.length;
    const totalWidth = N * ITEM_WIDTH;

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= totalWidth * 2) posRef.current -= totalWidth;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      }

      if (wrapperRef.current) {
        const wrapperRect = wrapperRef.current.getBoundingClientRect();
        const centerX = wrapperRect.left + wrapperRect.width / 2;

        itemRefs.current.forEach((el) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const itemCenterX = rect.left + rect.width / 2;
          const dist = Math.abs(centerX - itemCenterX);

          let scale;
          if (dist < ITEM_WIDTH * 0.5) scale = 1.6;
          else if (dist < ITEM_WIDTH * 1.5) scale = 1.6 - ((dist - ITEM_WIDTH * 0.5) / ITEM_WIDTH) * 0.3;
          else if (dist < ITEM_WIDTH * 2.5) scale = 1.3 - ((dist - ITEM_WIDTH * 1.5) / ITEM_WIDTH) * 0.3;
          else scale = 1.0;

          el.style.transform = `scale(${scale})`;
        });
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <section id="skills" className="section skills-section fade-in-section" ref={sectionRef}>
      <div className="container text-center" style={{ position: "relative", zIndex: 10 }}>
        <h2 className="skills-title">Skills</h2>
      </div>

      <div
        className="carousel-wrapper"
        ref={wrapperRef}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div className="carousel-track" ref={trackRef}>
          {allItems.map((skill, i) => (
            <div
              className="skill-item"
              key={i}
              ref={el => itemRefs.current[i] = el}
              style={{ width: `${ITEM_WIDTH}px`, transformOrigin: "center bottom" }}
            >
              <img src={skill.icon} alt={skill.name} className="skill-icon" />
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}

export default Skills;