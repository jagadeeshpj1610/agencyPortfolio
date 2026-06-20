import React, { useState, useEffect, useRef } from "react";


const WHATSAPP_NUMBER = "917093461337"; // placeholder — replace with real number
const waLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

/* ---------- Fonts ---------- */
function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
}

/* ---------- Global styles ---------- */
const GlobalStyle = () => (
  <style>{`
    :root {
      --base: #0a1628;
      --panel: #0d1b2a;
      --card: #13233d;
      --card-hover: #17304f;
      --border: rgba(59, 130, 246, 0.18);
      --border-strong: rgba(59, 130, 246, 0.4);
      --accent: #2563eb;
      --accent-light: #3b82f6;
      --text: #e0f0ff;
      --text-muted: #7c93b8;
      --white: #ffffff;
      --font-display: 'Space Grotesk', 'Inter', sans-serif;
      --font-body: 'Inter', sans-serif;
      --font-mono: 'IBM Plex Mono', monospace;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      background: var(--base);
      color: var(--text);
      font-family: var(--font-body);
      -webkit-font-smoothing: antialiased;
    }
    .bd-root { background: var(--base); }
    .bd-root *:focus-visible {
      outline: 2px solid var(--accent-light);
      outline-offset: 3px;
      border-radius: 4px;
    }
    a { color: inherit; text-decoration: none; }
    button { font-family: inherit; cursor: pointer; }

    .container {
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 12.5px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--accent-light);
      background: rgba(37, 99, 235, 0.1);
      border: 1px solid var(--border-strong);
      padding: 7px 14px;
      border-radius: 100px;
      margin-bottom: 22px;
    }

    .glass-card {
      background: linear-gradient(160deg, rgba(19,35,61,0.9), rgba(13,27,42,0.7));
      border: 1px solid var(--border);
      border-radius: 16px;
      backdrop-filter: blur(10px);
      transition: transform 0.35s cubic-bezier(.2,.8,.2,1), border-color 0.35s, box-shadow 0.35s, background 0.35s;
    }
    .glass-card:hover {
      transform: translateY(-6px);
      border-color: var(--border-strong);
      box-shadow: 0 20px 50px -20px rgba(37, 99, 235, 0.35);
      background: linear-gradient(160deg, rgba(23,48,79,0.95), rgba(13,27,42,0.8));
    }

    .section { padding: 110px 0; position: relative; }
    @media (max-width: 768px) { .section { padding: 70px 0; } }

    .section-head { max-width: 640px; margin: 0 auto 56px; text-align: center; }
    .section-title {
      font-family: var(--font-display);
      font-weight: 600;
      font-size: clamp(28px, 4vw, 42px);
      line-height: 1.15;
      color: var(--white);
      margin: 0 0 14px;
      letter-spacing: -0.01em;
    }
    .section-sub {
      color: var(--text-muted);
      font-size: 16.5px;
      line-height: 1.6;
      margin: 0;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      font-family: var(--font-body);
      font-weight: 600;
      font-size: 15px;
      padding: 14px 26px;
      border-radius: 10px;
      border: 1px solid transparent;
      transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s;
      white-space: nowrap;
    }
    .btn:active { transform: scale(0.97); }
    .btn-primary {
      background: linear-gradient(135deg, var(--accent-light), var(--accent));
      color: var(--white);
      box-shadow: 0 8px 24px -8px rgba(37,99,235,0.55);
    }
    .btn-primary:hover { box-shadow: 0 12px 30px -8px rgba(59,130,246,0.7); transform: translateY(-2px); }
    .btn-ghost {
      background: rgba(255,255,255,0.02);
      color: var(--text);
      border: 1px solid var(--border-strong);
    }
    .btn-ghost:hover { background: rgba(59,130,246,0.1); border-color: var(--accent-light); transform: translateY(-2px); }
    .btn-sm { padding: 10px 18px; font-size: 13.5px; }

    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .reveal.in { opacity: 1; transform: translateY(0); }

    @media (prefers-reduced-motion: reduce) {
      .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
      * { animation-duration: 0.001ms !important; }
    }
  `}</style>
);


function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0, as = "div", className = "", style = {} }) {
  const [ref, vis] = useReveal();
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${vis ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}


function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Packages", href: "#packages" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "rgba(10,22,40,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <nav
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 76,
        }}
      >
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: "linear-gradient(135deg, var(--accent-light), var(--accent))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              fontSize: 15,
              color: "#fff",
            }}
          >
            {"</>"}
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 19,
              color: "var(--white)",
              letterSpacing: "-0.01em",
            }}
          >
            build<span style={{ color: "var(--accent-light)" }}>.dev</span>
          </span>
        </a>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 36,
          }}
          className="bd-desktop-links"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontSize: 14.5,
                fontWeight: 500,
                color: "var(--text-muted)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={waLink("Hi! I'd like a free quote for a website.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm bd-desktop-cta"
        >
          Get a Free Quote
        </a>

        <button
          className="bd-mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "1px solid var(--border-strong)",
            borderRadius: 8,
            width: 40,
            height: 40,
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text)",
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div
          className="bd-mobile-menu"
          style={{
            background: "rgba(10,22,40,0.98)",
            borderTop: "1px solid var(--border)",
            padding: "20px 24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ fontSize: 15.5, fontWeight: 500, color: "var(--text)" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink("Hi! I'd like a free quote for a website.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ marginTop: 6 }}
          >
            Get a Free Quote
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .bd-desktop-links, .bd-desktop-cta { display: none !important; }
          .bd-mobile-toggle { display: flex !important; }
        }
        @media (min-width: 861px) {
          .bd-mobile-menu { display: none !important; }
        }
      `}</style>
    </header>
  );
}

const PREVIEW_SCREENS = [
  {
    label: "Coaching Center",
    barColor: "#3b82f6",
    title: "Sri Vidya Academy",
    tagline: "NEET & JEE Coaching · Vijayawada",
    accent: "#3b82f6",
    bg: "linear-gradient(135deg, #0d1b2a, #13233d)",
    chips: ["Admissions Open", "98% Results", "Top Faculty"],
  },
  {
    label: "Clinic",
    barColor: "#22c55e",
    title: "Lakshmi Dental Care",
    tagline: "General & Cosmetic Dentistry · Guntur",
    accent: "#22c55e",
    bg: "linear-gradient(135deg, #0d1b2a, #142b22)",
    chips: ["Book Appointment", "10+ Years", "Painless Care"],
  },
  {
    label: "CA Firm",
    barColor: "#f59e0b",
    title: "Rao & Associates",
    tagline: "Chartered Accountants · Visakhapatnam",
    accent: "#f59e0b",
    bg: "linear-gradient(135deg, #0d1b2a, #2a2313)",
    chips: ["GST Filing", "Tax Planning", "Audit Services"],
  },
];

function MockBrowser() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % PREVIEW_SCREENS.length);
        setFade(true);
      }, 350);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const screen = PREVIEW_SCREENS[idx];

  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid var(--border-strong)",
        background: "rgba(13,27,42,0.6)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.06)",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* browser chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 16px",
          borderBottom: "1px solid var(--border)",
          background: "rgba(10,22,40,0.6)",
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
        <div
          style={{
            marginLeft: 10,
            flex: 1,
            background: "rgba(255,255,255,0.04)",
            borderRadius: 6,
            padding: "5px 12px",
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            color: "var(--text-muted)",
          }}
        >
          {screen.title.toLowerCase().replace(/\s+/g, "")}.in
        </div>
      </div>

      {/* screen content */}
      <div
        style={{
          minHeight: 280,
          background: screen.bg,
          padding: "30px 26px",
          opacity: fade ? 1 : 0,
          transition: "opacity 0.35s ease",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: screen.accent,
            background: `${screen.accent}1a`,
            border: `1px solid ${screen.accent}55`,
            padding: "3px 10px",
            borderRadius: 100,
            marginBottom: 16,
          }}
        >
          {screen.label}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 24,
            color: "#fff",
            margin: "0 0 8px",
          }}
        >
          {screen.title}
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: 13.5, margin: "0 0 22px" }}>
          {screen.tagline}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {screen.chips.map((c) => (
            <span
              key={c}
              style={{
                fontSize: 11.5,
                fontWeight: 600,
                color: "var(--text)",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "6px 12px",
                borderRadius: 8,
              }}
            >
              {c}
            </span>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 22,
            right: 26,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            color: screen.accent,
            fontFamily: "var(--font-mono)",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: screen.accent,
              boxShadow: `0 0 0 0 ${screen.accent}`,
              animation: "pulse 1.6s infinite",
            }}
          />
          Live preview
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, justifyContent: "center", padding: "12px 0" }}>
        {PREVIEW_SCREENS.map((_, i) => (
          <span
            key={i}
            style={{
              width: i === idx ? 18 : 6,
              height: 6,
              borderRadius: 4,
              background: i === idx ? "var(--accent-light)" : "rgba(255,255,255,0.15)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.5); }
          70% { box-shadow: 0 0 0 8px rgba(59,130,246,0); }
          100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
        }
      `}</style>
    </div>
  );
}

function GridBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 20%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 20%, black 40%, transparent 90%)",
        }}
      />
      <div
        className="bd-orb"
        style={{
          position: "absolute",
          top: "-10%",
          left: "-8%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.28), transparent 70%)",
          filter: "blur(20px)",
          animation: "float1 14s ease-in-out infinite",
        }}
      />
      <div
        className="bd-orb"
        style={{
          position: "absolute",
          top: "20%",
          right: "-6%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.22), transparent 70%)",
          filter: "blur(20px)",
          animation: "float2 17s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0,0); }
          50% { transform: translate(30px, 40px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0,0); }
          50% { transform: translate(-25px, -30px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bd-orb { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        paddingTop: 110,
        paddingBottom: 100,
        overflow: "hidden",
      }}
    >
      <GridBackground />
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <Reveal>
            <span className="eyebrow">📍 Web Development Agency · Andhra Pradesh</span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(34px, 5vw, 56px)",
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                color: "var(--white)",
                margin: "0 0 22px",
              }}
            >
              We Build Websites That Grow Your Business
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.65,
                color: "var(--text-muted)",
                maxWidth: 480,
                margin: "0 0 36px",
              }}
            >
              Professional websites for coaching centers, clinics, CA firms and
              service businesses across Andhra Pradesh.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#packages" className="btn btn-primary">
                View Packages →
              </a>
              <a
                href={waLink("Hi! I'm interested in getting a website built.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div
              style={{
                display: "flex",
                gap: 28,
                marginTop: 46,
                flexWrap: "wrap",
              }}
            >
              {[
                ["100%", "Client Satisfaction"],
                ["7 Days", "Avg. Delivery"],
                ["4.9★", "Client Rating"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      fontSize: 22,
                      color: "var(--white)",
                    }}
                  >
                    {n}
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="bd-hero-mock">
          <MockBrowser />
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #top .container { grid-template-columns: 1fr !important; }
          .bd-hero-mock { order: -1; margin-bottom: 8px; }
        }
      `}</style>
    </section>
  );
}


const SERVICES = [
  {
    icon: "🖥️",
    title: "Web Development",
    desc: "Custom-built websites from scratch — fast, clean, and tailored to how your business actually works.",
  },
  {
    icon: "📱",
    title: "Mobile Responsive Design",
    desc: "Every site looks and works perfectly on phones, tablets, and desktops — where most of your visitors are.",
  },
  {
    icon: "🔍",
    title: "SEO & Google Console Setup",
    desc: "On-page SEO basics and Google Search Console setup so your business is actually discoverable.",
  },
  {
    icon: "🛠️",
    title: "Website Maintenance & Support",
    desc: "Updates, fixes, and content changes after launch — your site stays current without the hassle.",
  },
];

function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal as="div" className="section-head">
          <span className="eyebrow">✨ Our Services</span>
          <h2 className="section-title">Everything your website needs</h2>
          <p className="section-sub">
            From the first line of code to long-term support — we handle the full journey.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 22,
          }}
          className="bd-grid-4"
        >
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="glass-card" style={{ padding: "30px 26px", height: "100%" }}>
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 12,
                    background: "rgba(37,99,235,0.12)",
                    border: "1px solid var(--border-strong)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    marginBottom: 20,
                  }}
                >
                  {s.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 18.5,
                    color: "var(--white)",
                    margin: "0 0 10px",
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ fontSize: 14.5, color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) { .bd-grid-4 { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .bd-grid-4 { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}


const PACKAGES = [
  {
    name: "Starter",
    price: "8,000",
    desc: "A clean, professional online presence to get found.",
    features: [
      "3 Pages: Home, About, Contact",
      "Mobile Responsive Design",
      "WhatsApp Button",
      "Google Map Location",
      "Enquiry Form",
      "Free Hosting Setup",
      "15 Free Support",
    ],
    cta: "Choose Starter",
    recommended: false,
  },
  {
    name: "Standard",
    price: "12,000",
    desc: "The most popular choice for coaching centers & clinics.",
    features: [
      "5 Pages: Home, About, Courses, Gallery, Contact",
      "Mobile Responsive Design",
      "WhatsApp + Call Buttons",
      "Google Map Location",
      "Enquiry Form",
      "Basic Google SEO Setup",
      "Google Search Console Setup",
      "Free Hosting Setup",
      "Domain Included (1st Year Free)",
      "30 days Free Support",
    ],
    cta: "Choose Standard",
    recommended: true,
  },
  {
    name: "Premium",
    price: "18,000",
    desc: "For businesses that want to stand out and convert more.",
    features: [
      "6+ Pages: Home, About, Courses, Gallery, Results, Admissions, Contact",
      "Mobile Responsive Design",
      "WhatsApp + Call Buttons",
      "Google Map Location",
      "Enquiry Form",
      "Results / Achievements Section",
      "Better Design & Animations",
      "Better SEO + Meta Tags",
      "Google Search Console Setup",
      "Google Analytics Setup",
      "Free Hosting Setup",
      "Domain Included (1st Year Free)",
      "45 days Free Support",
    ],
    cta: "Choose Premium",
    recommended: false,
  },
];

function PackageCard({ pkg, delay }) {
  return (
    <Reveal delay={delay} style={{ height: "100%" }}>
      <div
        className="glass-card"
        style={{
          padding: "32px 26px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          ...(pkg.recommended
            ? {
              border: "1px solid rgba(59,130,246,0.55)",
              background:
                "linear-gradient(160deg, rgba(37,99,235,0.16), rgba(13,27,42,0.85))",
            }
            : {}),
        }}
      >
        {pkg.recommended && (
          <span
            style={{
              position: "absolute",
              top: -13,
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(135deg, var(--accent-light), var(--accent))",
              color: "#fff",
              fontSize: 11.5,
              fontWeight: 700,
              padding: "5px 16px",
              borderRadius: 100,
              letterSpacing: "0.03em",
              boxShadow: "0 6px 18px -4px rgba(37,99,235,0.6)",
            }}
          >
            ⭐ RECOMMENDED
          </span>
        )}

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 21,
            color: "var(--white)",
            margin: "8px 0 6px",
          }}
        >
          {pkg.name}
        </h3>
        <p style={{ fontSize: 13.5, color: "var(--text-muted)", margin: "0 0 18px", minHeight: 38 }}>
          {pkg.desc}
        </p>

        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              fontSize: 34,
              color: "var(--white)",
            }}
          >
            ₹{pkg.price}
          </span>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>one-time</span>
        </div>

        <ul style={{ listStyle: "none", margin: 0, padding: 0, flex: 1 }}>
          {pkg.features.map((f) => (
            <li
              key={f}
              style={{
                display: "flex",
                gap: 10,
                fontSize: 13.8,
                color: "var(--text)",
                padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                lineHeight: 1.4,
              }}
            >
              <span style={{ color: "var(--accent-light)", flexShrink: 0, marginTop: 1 }}>✓</span>
              {f}
            </li>
          ))}
        </ul>

        <a
          href={waLink(`Hi! I'm interested in the ${pkg.name} package (₹${pkg.price}).`)}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn ${pkg.recommended ? "btn-primary" : "btn-ghost"}`}
          style={{ marginTop: 26, width: "100%" }}
        >
          {pkg.cta}
        </a>
      </div>
    </Reveal>
  );
}

function Packages() {
  return (
    <section id="packages" className="section" style={{ background: "var(--panel)" }}>
      <div className="container">
        <Reveal as="div" className="section-head">
          <span className="eyebrow">📦 Packages</span>
          <h2 className="section-title">Simple, transparent pricing</h2>
          <p className="section-sub">
            Choose a package that fits your business. No hidden costs, no surprises.
          </p>
        </Reveal>

        <div
          className="bd-pkg-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 22,
            alignItems: "stretch",
          }}
        >
          {PACKAGES.map((p, i) => (
            <PackageCard key={p.name} pkg={p} delay={i * 90} />
          ))}
        </div>

        {/* Custom package — full width below */}
        <Reveal delay={270} style={{ marginTop: 22 }}>
          <div
            className="glass-card"
            style={{
              padding: "30px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 20,
                  color: "var(--white)",
                  margin: "0 0 6px",
                }}
              >
                Custom — Based on Requirements
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-muted)", margin: 0, maxWidth: 520 }}>
                Need something bigger — an e-commerce store, booking system, or multi-branch
                site? Price and features depend on project scope.
              </p>
            </div>
            <a
              href={waLink("Hi! I have a custom website requirement I'd like to discuss.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ flexShrink: 0 }}
            >
              Let's Talk →
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div
            style={{
              marginTop: 30,
              padding: "18px 22px",
              borderRadius: 12,
              background: "rgba(37,99,235,0.06)",
              border: "1px solid var(--border)",
              fontSize: 13.5,
              color: "var(--text-muted)",
              lineHeight: 1.7,
            }}
          >
            <strong style={{ color: "var(--text)" }}>Please note:</strong> Domain is extra for Starter,
            included free for 1st year in Standard & Premium (renewal from year 2 onward) · Work starts
            after advance payment · After the free support period, maintenance charges apply.
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 980px) { .bd-pkg-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { .bd-pkg-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}


const PROJECTS = [
  {
    name: "Sntuitions",
    desc: "A results-driven MERN stack site for a coaching institute — admissions form, faculty profiles, and a results showcase that builds instant trust with parents.",
    tag: "Coaching Institute",
    accent: "#3b82f6",
    url: "https://sntuitions.vercel.app/",
  },
  {
    name: "LearningPoint",
    desc: "A full MERN stack build for a coaching institute — course listings, gallery, and an enquiry flow designed to convert visiting parents into admissions.",
    tag: "Coaching Institute",
    accent: "#22c55e",
    url: "https://learningpoint1729.vercel.app/",
  },
  {
    name: "CA Firm Demo",
    desc: "A sharp, credible demo site built for chartered accountancy firms — service breakdowns, client testimonials, and a simple enquiry flow for tax and audit leads.",
    tag: "Professional CA Firm Website",
    accent: "#f59e0b",
    url: "https://ca-demo-website.vercel.app",
  },
];

function WorkCard({ p, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="glass-card" style={{ overflow: "hidden", height: "100%" }}>
        <div
          style={{
            height: 150,
            background: `linear-gradient(135deg, rgba(13,27,42,0.4), ${p.accent}22)`,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${p.accent}55`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            🌐
          </div>
          <span
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              color: p.accent,
              background: "rgba(10,22,40,0.6)",
              border: `1px solid ${p.accent}55`,
              padding: "4px 10px",
              borderRadius: 100,
            }}
          >
            {p.tag}
          </span>
        </div>
        <div style={{ padding: "24px 24px 26px" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 18,
              color: "var(--white)",
              margin: "0 0 10px",
            }}
          >
            {p.name}
          </h3>
          <p style={{ fontSize: 13.8, color: "var(--text-muted)", lineHeight: 1.6, margin: "0 0 18px" }}>
            {p.desc}
          </p>
          <a
            href={
              p.url
                ? p.url
                : waLink(`Hi! I'd like to see a live demo similar to your "${p.name}" project.`)
            }
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 13.5,
              fontWeight: 600,
              color: "var(--accent-light)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Live Site →
          </a>
        </div>
      </div>
    </Reveal>
  );
}

function Work() {
  return (
    <section id="work" className="section">
      <div className="container">
        <Reveal as="div" className="section-head">
          <span className="eyebrow">🗂️ Our Work</span>
          <h2 className="section-title">A few projects we're proud of</h2>
          <p className="section-sub">
            Real-style builds across the industries we specialize in.
          </p>
        </Reveal>

        <div
          className="bd-grid-3"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}
        >
          {PROJECTS.map((p, i) => (
            <WorkCard key={p.name} p={p} delay={i * 90} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .bd-grid-3 { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}


const WHY = [
  { icon: "📍", title: "Local Business", desc: "Based in India — we understand your customers and your market." },
  { icon: "⚡", title: "Fast Delivery", desc: "Most websites delivered within 7 days of starting the project." },
  { icon: "💰", title: "Affordable Pricing", desc: "Packages built for Indian SMB budgets — no inflated agency pricing." },
  { icon: "🤝", title: "Post-Delivery Support", desc: "Free support after launch, with simple ongoing maintenance after." },
];

function WhyChooseUs() {
  return (
    <section className="section" style={{ background: "var(--panel)" }}>
      <div className="container">
        <Reveal as="div" className="section-head">
          <span className="eyebrow">🏆 Why Choose Us</span>
          <h2 className="section-title">Built for Indian SMBs, not big agencies</h2>
          <p className="section-sub">We focus on what actually matters for small businesses.</p>
        </Reveal>

        <div
          className="bd-grid-4"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}
        >
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <div style={{ textAlign: "center", padding: "10px 14px" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    margin: "0 auto 18px",
                    borderRadius: "50%",
                    background: "rgba(37,99,235,0.1)",
                    border: "1px solid var(--border-strong)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                  }}
                >
                  {w.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 16.5,
                    color: "var(--white)",
                    margin: "0 0 8px",
                  }}
                >
                  {w.title}
                </h3>
                <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
                  {w.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) { .bd-grid-4 { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .bd-grid-4 { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}


const TESTIMONIALS = [
  {
    name: "Founder, Sntuitions",
    role: "Tuition Center, Andhra Pradesh",
    quote:
      "Our website looks professional and the enquiries have improved a lot. The WhatsApp button makes it easy for parents to reach us directly.",
  },
  {
    name: "Mr.Vamsi, LearningPoint",
    role: "Tuition Center, Andhra Pradesh",
    quote:
      "Very smooth process from start to finish. The site was delivered on time and exactly the way we wanted it to look.",
  },
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 14 }} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: "#3b82f6", fontSize: 15 }}>★</span>
      ))}
    </div>
  );
}

function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <Reveal as="div" className="section-head">
          <span className="eyebrow">💬 Client Stories</span>
          <h2 className="section-title">What our clients say</h2>
          <p className="section-sub">Trusted by businesses across Andhra Pradesh.</p>
        </Reveal>

        <div
          className="bd-grid-3"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}
        >
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <div className="glass-card" style={{ padding: "28px 26px", height: "100%" }}>
                <Stars />
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.7,
                    color: "var(--text)",
                    margin: "0 0 22px",
                    fontStyle: "italic",
                  }}
                >
                  "{t.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--accent-light), var(--accent))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      color: "#fff",
                      fontSize: 15,
                      flexShrink: 0,
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--white)" }}>{t.name}</div>
                    <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .bd-grid-3 { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}


function ContactCTA() {
  return (
    <section id="contact" className="section" style={{ position: "relative", overflow: "hidden" }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(37,99,235,0.18), transparent 70%)",
        }}
      />
      <div className="container" style={{ position: "relative", textAlign: "center" }}>
        <Reveal>
          <span className="eyebrow">🚀 Let's Get Started</span>
        </Reveal>
        <Reveal delay={80}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(28px, 4.5vw, 44px)",
              color: "var(--white)",
              margin: "0 0 16px",
              lineHeight: 1.15,
            }}
          >
            Ready to get your website?
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p
            style={{
              fontSize: 16.5,
              color: "var(--text-muted)",
              maxWidth: 520,
              margin: "0 auto 36px",
              lineHeight: 1.6,
            }}
          >
            Message us on WhatsApp for a free quote — most projects start within 24 hours of
            confirming a package.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={waLink("Hi! I'd like to get a website built for my business.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ fontSize: 16, padding: "16px 32px" }}
            >
              💬 Chat on WhatsApp
            </a>
            <a href="tel:+917093461337" className="btn btn-ghost" style={{ fontSize: 16, padding: "16px 32px" }}>
              📞 +91 7093461337
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


function Footer() {
  const links = [
    { label: "Services", href: "#services" },
    { label: "Packages", href: "#packages" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--panel)" }}>
      <div
        className="container"
        style={{
          padding: "50px 24px 30px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 32,
        }}
      >
        <div style={{ maxWidth: 280 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
            <span
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "linear-gradient(135deg, var(--accent-light), var(--accent))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                fontSize: 13,
                color: "#fff",
              }}
            >
              {"</>"}
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "var(--white)" }}>
              build<span style={{ color: "var(--accent-light)" }}>.dev</span>
            </span>
          </div>
          <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
            Websites for coaching centers, clinics, CA firms and service businesses across
            Andhra Pradesh.
          </p>
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--white)", marginBottom: 14 }}>
            Quick Links
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {links.map((l) => (
              <a key={l.label} href={l.href} style={{ fontSize: 13.5, color: "var(--text-muted)" }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--white)", marginBottom: 14 }}>
            Connect
          </div>
          <a
            href="https://instagram.com/build.dev_"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13.5, color: "var(--text-muted)", display: "block", marginBottom: 10 }}
          >
            📷 @build.dev_
          </a>
          <a
            href={waLink("Hi! I found you through your website.")}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13.5, color: "var(--text-muted)", display: "block" }}
          >
            💬 WhatsApp
          </a>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "20px 24px",
          textAlign: "center",
          fontSize: 12.5,
          color: "var(--text-muted)",
        }}
      >
        © {new Date().getFullYear()} build.dev — All rights reserved.
      </div>
    </footer>
  );
}


function FloatingWhatsApp() {
  return (
    <a
      href={waLink("Hi! I'd like to know more about your website packages.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 200,
        width: 58,
        height: 58,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 30px -8px rgba(37,211,102,0.6)",
        fontSize: 28,
        animation: "bd-wa-pulse 2.4s infinite",
      }}
    >
      <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff">
        <path d="M16.04 2.667c-7.36 0-13.33 5.97-13.33 13.33 0 2.353.62 4.56 1.7 6.47L2.67 29.33l7.05-1.7a13.27 13.27 0 0 0 6.32 1.6h.01c7.36 0 13.33-5.97 13.33-13.33s-5.97-13.27-13.33-13.27Zm0 24.32c-2.1 0-4.06-.58-5.74-1.6l-.41-.24-4.18 1.01 1.05-4.07-.27-.42a10.97 10.97 0 0 1-1.7-5.86c0-6.1 4.97-11.06 11.06-11.06 2.96 0 5.73 1.15 7.82 3.24a10.97 10.97 0 0 1 3.24 7.82c0 6.1-4.97 11.18-10.81 11.18Zm6.06-8.27c-.33-.17-1.96-.97-2.26-1.08-.3-.11-.52-.17-.74.17-.22.33-.85 1.08-1.04 1.3-.19.22-.38.25-.71.08-.33-.16-1.38-.51-2.63-1.62-.97-.86-1.62-1.93-1.81-2.26-.19-.33-.02-.5.16-.68.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.06-.62-.12-.16-.66-1.58-.9-2.16-.24-.57-.49-.49-.68-.5h-.58c-.19 0-.5.07-.77.36-.27.28-1.03 1.01-1.03 2.46s1.06 2.86 1.21 3.06c.15.19 2.08 3.18 5.06 4.32 2.97 1.15 2.97.76 3.5.71.54-.05 1.72-.7 1.97-1.38.24-.67.24-1.24.17-1.36-.07-.12-.27-.19-.6-.36Z" />
      </svg>
      <style>{`
        @keyframes bd-wa-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          70% { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          a[aria-label="Chat on WhatsApp"] { animation: none !important; }
        }
      `}</style>
    </a>
  );
}


export default function App() {
  return (
    <div className="bd-root">
      <FontLoader />
      <GlobalStyle />
      <Navbar />
      <Hero />
      <Services />
      <Packages />
      <Work />
      <WhyChooseUs />
      <Testimonials />
      <ContactCTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}