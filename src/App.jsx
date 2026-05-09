import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#fafaf9",
  surface: "#ffffff",
  surface2: "#f5f4f2",
  border: "#e8e6e1",
  text: "#1a1a18",
  muted: "#8a8880",
  accent: "#c9a96e",
  accent2: "#2d2d2b",
  tag: "#f0ede8",
};

const skills = [
  { name: "React", level: 60 },
  { name: "Python", level: 55 },
  { name: "Node.js", level: 50 },
  { name: "Java", level: 45 },
  { name: "SQL", level: 60 },
  { name: "Git", level: 65 },
];

const projects = [
  {
    title: "Site de Viagem",
    desc: "Plataforma web para exploração de destinos turísticos com interface intuitiva, design responsivo e foco total na experiência do usuário.",
    tags: ["HTML", "CSS", "JavaScript"],
    number: "01",
  },
];

const experiences = [
  {
    role: "Produtor de Conferências",
    company: "Eventos Corporativos",
    period: "2024 — Atual",
    desc: "Planejamento, organização e execução de eventos de grande porte, coordenando equipes e garantindo excelência na entrega.",
  },
  {
    role: "Especialista em Produção",
    company: "TourService",
    period: "2019 — 2024",
    desc: "Logística e organização de produtos e experiências para clientes, com foco em qualidade, prazo e satisfação.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SkillBar({ name, level, delay }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: C.text, fontWeight: 500, letterSpacing: 0.3, fontFamily: "'DM Sans', sans-serif" }}>{name}</span>
        <span style={{ fontSize: 12, color: C.muted, fontFamily: "'DM Sans', sans-serif" }}>{level}%</span>
      </div>
      <div style={{ height: 2, background: C.border, borderRadius: 2 }}>
        <div style={{
          height: "100%",
          width: visible ? `${level}%` : "0%",
          background: `linear-gradient(90deg, ${C.accent}, #e8c99a)`,
          borderRadius: 2,
          transition: `width 1.4s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
        }} />
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["home", "sobre", "skills", "projetos", "experiencia", "contato"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "sobre", label: "Sobre" },
    { id: "skills", label: "Skills" },
    { id: "projetos", label: "Projetos" },
    { id: "experiencia", label: "Experiência" },
    { id: "contato", label: "Contato" },
  ];

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Georgia', serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #c9a96e33; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #fafaf9; }
        ::-webkit-scrollbar-thumb { background: #c9a96e66; border-radius: 2px; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatReverse {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.5px;
          color: #8a8880;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 0;
          position: relative;
          transition: color 0.3s;
        }
        .nav-link:hover { color: #1a1a18; }
        .nav-link.active { color: #1a1a18; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #c9a96e;
          transition: width 0.3s;
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .btn-primary {
          display: inline-block;
          padding: 14px 36px;
          background: #1a1a18;
          color: #fafaf9;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1px;
          border: none;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
          text-decoration: none;
        }
        .btn-primary:hover { background: #c9a96e; transform: translateY(-2px); }
        .btn-outline {
          display: inline-block;
          padding: 13px 36px;
          background: transparent;
          color: #1a1a18;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1px;
          border: 1px solid #e8e6e1;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
        }
        .btn-outline:hover { border-color: #c9a96e; color: #c9a96e; transform: translateY(-2px); }
        .tag {
          display: inline-block;
          padding: 5px 14px;
          background: #f0ede8;
          color: #8a8880;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          border-radius: 2px;
        }
        .project-row {
          padding: 48px 0;
          border-top: 1px solid #e8e6e1;
          display: grid;
          grid-template-columns: 80px 1fr 40px;
          gap: 40px;
          align-items: center;
          transition: all 0.4s ease;
          cursor: default;
        }
        .project-row:hover { padding-left: 12px; }
        .project-row:hover .project-arrow { color: #c9a96e; transform: translateX(6px); }
        .project-arrow { transition: all 0.3s; color: #e8e6e1; font-size: 24px; }
        .contact-row {
          display: flex;
          align-items: center;
          padding: 28px 0;
          border-bottom: 1px solid #e8e6e1;
          text-decoration: none;
          color: #1a1a18;
          transition: all 0.3s;
        }
        .contact-row:hover { padding-left: 10px; }
        .contact-row:hover .contact-arrow { transform: translateX(8px); color: #c9a96e; }
        .contact-arrow { transition: all 0.3s; color: #8a8880; font-size: 20px; margin-left: auto; }
        .info-row {
          padding: 22px 0;
          border-bottom: 1px solid #e8e6e1;
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 24px;
          align-items: start;
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "22px 60px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrolled ? "rgba(250,250,249,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        transition: "all 0.5s ease",
      }}>
        <button onClick={() => scrollTo("home")} style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 20, fontWeight: 600, color: C.text, letterSpacing: 0.5,
        }}>
          Vinicius<span style={{ color: C.accent }}>.</span>
        </button>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-link${activeSection === item.id ? " active" : ""}`}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
          <a href="mailto:viniciuspr2006@gmail.com" className="btn-primary" style={{ padding: "10px 24px", fontSize: 12 }}>
            Falar comigo
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 60px 90px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: "8%", right: "-8%",
          width: 560, height: 560, borderRadius: "50%",
          border: `1px solid ${C.border}`,
          animation: "float 14s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "14%", right: "4%",
          width: 360, height: 360, borderRadius: "50%",
          border: `1px solid ${C.accent}2a`,
          animation: "floatReverse 11s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "22%", right: "22%",
          width: 10, height: 10, borderRadius: "50%",
          background: C.accent,
          animation: "float 5s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "40%", right: "38%",
          width: 5, height: 5, borderRadius: "50%",
          background: C.border,
          animation: "floatReverse 7s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        {/* Label */}
        <div style={{ animation: "fadeUp 1s ease 0.2s both", display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
          <div style={{ width: 40, height: 1, background: C.accent }} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, letterSpacing: 3, color: C.accent,
            textTransform: "uppercase", fontWeight: 500,
          }}>
            Desenvolvedor · Estudante FIAP · São Paulo
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(64px, 9vw, 118px)",
          fontWeight: 300, lineHeight: 0.92,
          letterSpacing: -3,
          animation: "fadeUp 1s ease 0.35s both",
        }}>
          Vinicius<br />
          <em style={{ color: C.accent, fontStyle: "italic", fontWeight: 300 }}>Pacheco</em><br />
          <span style={{ color: C.muted }}>Ruiz</span>
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 16, color: C.muted,
          maxWidth: 400, lineHeight: 1.85,
          marginTop: 40,
          animation: "fadeUp 1s ease 0.55s both",
          fontWeight: 300,
        }}>
          Transformando lógica em experiências digitais. Apaixonado por tecnologia, código limpo e soluções que realmente importam.
        </p>

        <div style={{ display: "flex", gap: 14, marginTop: 48, animation: "fadeUp 1s ease 0.7s both" }}>
          <button className="btn-primary" onClick={() => scrollTo("projetos")}>Ver Projetos</button>
          <button className="btn-outline" onClick={() => scrollTo("sobre")}>Sobre mim</button>
        </div>

        {/* Stats */}
        <div style={{
          position: "absolute", right: 60, bottom: 90,
          display: "flex", gap: 48,
          animation: "fadeIn 1s ease 1.2s both",
        }}>
          {[
            { n: "06+", label: "Tecnologias" },
            { n: "ADS", label: "FIAP" },
            { n: "SP", label: "Brasil" },
          ].map(s => (
            <div key={s.n} style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 400, color: C.text }}>{s.n}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.muted, letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll line */}
        <div style={{
          position: "absolute", bottom: 0, left: 60,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          animation: "fadeIn 1s ease 1.5s both",
        }}>
          <div style={{ width: 1, height: 80, background: `linear-gradient(${C.accent}, transparent)` }} />
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" style={{ padding: "140px 60px", background: C.surface }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <div style={{ width: 40, height: 1, background: C.accent }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.accent, letterSpacing: 3, textTransform: "uppercase" }}>Sobre mim</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, lineHeight: 1.15, marginBottom: 32 }}>
              Onde experiência<br /><em style={{ color: C.accent }}>encontra</em> tecnologia
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.9, marginBottom: 20, fontWeight: 300 }}>
              Sou estudante de <strong style={{ color: C.text, fontWeight: 500 }}>Análise e Desenvolvimento de Sistemas</strong> na FIAP, São Paulo. Antes de entrar para a tecnologia, trabalhei anos com produção de eventos e logística — o que me deu visão diferenciada sobre organização, entrega e foco no resultado.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.9, fontWeight: 300 }}>
              Hoje canalizo essa bagagem para o desenvolvimento web, com interesse especial em segurança de sistemas e boas práticas de código. Acredito que <strong style={{ color: C.text, fontWeight: 500 }}>código bem feito é aquele que resolve problemas reais</strong>.
            </p>
            <div style={{ marginTop: 44 }}>
              <button className="btn-outline" onClick={() => scrollTo("contato")}>Falar comigo →</button>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            {[
              { label: "Formação", value: "ADS — FIAP", sub: "Análise e Desenvolvimento de Sistemas" },
              { label: "Localização", value: "São Paulo, Brasil", sub: "Disponível para remoto" },
              { label: "Status", value: "Aberto a oportunidades", sub: "Estágio e projetos" },
              { label: "Foco", value: "Web Dev & Segurança", sub: "Front-end, Back-end, Cybersecurity" },
            ].map(item => (
              <div key={item.label} className="info-row">
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase", paddingTop: 2 }}>
                  {item.label}
                </span>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.text, fontWeight: 500 }}>{item.value}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, marginTop: 3 }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "140px 60px", background: C.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 40, height: 1, background: C.accent }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.accent, letterSpacing: 3, textTransform: "uppercase" }}>Tecnologias</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, marginBottom: 70 }}>
              O que estou<br /><em style={{ color: C.accent }}>dominando</em>
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 100px" }}>
            {skills.map((s, i) => <SkillBar key={s.name} {...s} delay={i * 100} />)}
          </div>
          <FadeIn delay={300}>
            <div style={{
              marginTop: 60, padding: "28px 32px",
              background: C.surface, border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", gap: 20,
            }}>
              <div style={{ width: 3, height: 44, background: C.accent, flexShrink: 0 }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.8, fontWeight: 300 }}>
                Em constante evolução. Cada projeto é uma oportunidade de aprender algo novo — seja uma tecnologia, um padrão ou uma boa prática de segurança.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" style={{ padding: "140px 60px", background: C.surface }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 40, height: 1, background: C.accent }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.accent, letterSpacing: 3, textTransform: "uppercase" }}>Projetos</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, marginBottom: 64 }}>
              O que já<br /><em style={{ color: C.accent }}>construí</em>
            </h2>
          </FadeIn>

          {projects.map((p, i) => (
            <FadeIn key={p.title} delay={i * 100}>
              <div className="project-row">
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: C.border }}>{p.number}</span>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.8, maxWidth: 520, fontWeight: 300, marginBottom: 16 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <span className="project-arrow">→</span>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={150}>
            <div style={{ padding: "48px 0", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "80px 1fr", gap: 40, alignItems: "center", opacity: 0.35 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: C.border }}>02</span>
              <div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.muted, marginBottom: 6 }}>Em desenvolvimento</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, fontWeight: 300 }}>Próximo projeto em breve...</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* EXPERIÊNCIA */}
      <section id="experiencia" style={{ padding: "140px 60px", background: C.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100 }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 40, height: 1, background: C.accent }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.accent, letterSpacing: 3, textTransform: "uppercase" }}>Experiência</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, lineHeight: 1.15 }}>
              Minha<br /><em style={{ color: C.accent }}>trajetória</em>
            </h2>
          </FadeIn>

          <div>
            {[...experiences, {
              role: "Estudante de ADS",
              company: "FIAP — São Paulo",
              period: "2026 — Atual",
              desc: null,
              tags: ["React", "Python", "Java", "Node.js", "SQL"],
            }].map((exp, i, arr) => (
              <FadeIn key={i} delay={i * 120}>
                <div style={{ paddingBottom: 40, marginBottom: 40, borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{exp.period}</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, marginBottom: 4 }}>{exp.role}</h3>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted, marginBottom: 12 }}>{exp.company}</div>
                  {exp.desc && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.8, fontWeight: 300 }}>{exp.desc}</p>}
                  {exp.tags && (
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                      {exp.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" style={{ padding: "140px 60px", background: C.surface }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 40, height: 1, background: C.accent }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.accent, letterSpacing: 3, textTransform: "uppercase" }}>Contato</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 300, lineHeight: 1.1, marginBottom: 24, maxWidth: 700 }}>
              Vamos construir<br />algo <em style={{ color: C.accent }}>juntos</em>?
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.8, maxWidth: 460, marginBottom: 64, fontWeight: 300 }}>
              Estou em busca de oportunidades, projetos colaborativos e conexões na área de tecnologia. Me manda uma mensagem!
            </p>
          </FadeIn>

          <div style={{ maxWidth: 580 }}>
            {[
              { label: "Email", value: "viniciuspr2006@gmail.com", href: "mailto:viniciuspr2006@gmail.com" },
              { label: "GitHub", value: "github.com/viniciuspr27", href: "https://github.com/viniciuspr27" },
              { label: "LinkedIn", value: "Vinicius Pacheco Ruiz", href: "https://www.linkedin.com/in/vinicius-pacheco-ruiz-66026033b/" },
            ].map((link, i) => (
              <FadeIn key={link.label} delay={i * 100}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="contact-row">
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase", minWidth: 80 }}>{link.label}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.text, fontWeight: 400, marginLeft: 32 }}>{link.value}</span>
                  <span className="contact-arrow">→</span>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "36px 60px",
        borderTop: `1px solid ${C.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: C.bg,
      }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: C.muted }}>
          Vinicius Pacheco Ruiz<span style={{ color: C.accent }}>.</span>
        </span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, letterSpacing: 2 }}>
          © 2025 · São Paulo, Brasil
        </span>
      </footer>
    </div>
  );
}
