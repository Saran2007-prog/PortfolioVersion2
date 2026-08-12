import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Terminal, 
  Briefcase, 
  GraduationCap, 
  ExternalLink, 
  Mail, 
  Phone, 
  ChevronRight, 
  Sparkles, 
  Check, 
  Copy, 
  Menu, 
  X, 
  Trophy, 
  Flame, 
  Layers, 
  Send,
  Wrench,
  Globe,
  Cpu,
  ArrowUp,
  Compass
} from 'lucide-react';
import './App.css';

// SVG Brand Icons for maximum reliability
const GithubIcon = ({ size = 22, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 22, ...props }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [overlayNavOpen, setOverlayNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [toastMessage, setToastMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Custom Cursor Follower Coordinates
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });

  // Dynamic Typing Effect State
  const roles = ["Full Stack Web Developer", "Competitive Programmer", "GCE Salem CSE Scholar"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Kinetic Hero Text Reveal State
  const [titleRevealed, setTitleRevealed] = useState(false);

  useEffect(() => {
    // Kinetic reveal trigger after mount
    const timer = setTimeout(() => setTitleRevealed(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // Cursor move listener & hover states
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .skill-tag, .project-card, .contact-card, .overlay-nav-link')) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Smooth lerp for cursor follower
  useEffect(() => {
    let animationFrameId;

    const followCursor = () => {
      setFollowerPos((prev) => ({
        x: prev.x + (cursorPos.x - prev.x) * 0.18,
        y: prev.y + (cursorPos.y - prev.y) * 0.18
      }));
      animationFrameId = requestAnimationFrame(followCursor);
    };

    animationFrameId = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animationFrameId);
  }, [cursorPos]);

  // Typing Effect Hook
  useEffect(() => {
    const targetText = roles[currentRoleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && currentText === targetText) {
      typingSpeed = 2200;
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      typingSpeed = 400;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && currentText !== targetText) {
        setCurrentText(targetText.substring(0, currentText.length + 1));
      } else if (isDeleting && currentText !== '') {
        setCurrentText(targetText.substring(0, currentText.length - 1));
      } else if (!isDeleting && currentText === targetText) {
        setIsDeleting(true);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  // Scroll progress & section active tracking hook
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollPos / totalHeight) * 100 : 0;
      
      setScrollProgress(progress);
      setIsScrolled(scrollPos > 40);
      setShowBackToTop(scrollPos > 350);

      const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'contact'];
      const scrollCheck = scrollPos + 220;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollCheck >= top && scrollCheck < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard escape listener to close full screen overlay
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && overlayNavOpen) {
        setOverlayNavOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [overlayNavOpen]);

  // Intersection Observer for scroll reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    const revealElements = document.querySelectorAll('.reveal-init, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    triggerToast(`Copied ${label} to clipboard!`);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    triggerToast('Thank you! Your message has been sent successfully.');
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  // Skills Data
  const frontendSkills = [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 
    'Angular', 'Bootstrap', 'jQuery', 'React'
  ];

  const backendToolsSkills = [
    'Node.js', 'MongoDB', 'Vercel', 'GitHub', 'REST APIs'
  ];

  // Projects Data
  const projects = [
    {
      id: 'meal-finder',
      title: 'Meal Finder',
      description: 'Interactive web application integrating REST APIs for recipe searches, ingredient filters, and detailed cooking instructions.',
      status: 'live',
      liveUrl: 'https://saran2007-prog.github.io/MealFinderAPP/',
      tags: ['HTML', 'CSS', 'JavaScript', 'REST APIs'],
    },
    {
      id: 'construction-pm',
      title: 'Construction Project Management',
      description: 'Comprehensive web-based management tool designed to track procurement, milestones, notifications, and construction site progress.',
      status: 'dev',
      liveUrl: null,
      tags: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
    },
    {
      id: 'markdown-previewer',
      title: 'Markdown Previewer',
      description: 'Live interactive markdown rendering application built with React, providing real-time formatting preview for technical documentation.',
      status: 'live',
      liveUrl: 'https://markdown-previewer-seven-xi.vercel.app/',
      tags: ['React', 'JavaScript', 'CSS3'],
    },
    {
      id: 'drum-machine',
      title: 'Drum Machine',
      description: 'Interactive soundboard & drum kit application with keyboard trigger bindings, dynamic audio synthesis, and velocity controls.',
      status: 'live',
      liveUrl: 'https://drum-machine-murex.vercel.app/',
      tags: ['React', 'Audio Web API', 'JavaScript'],
    },
    {
      id: 'random-quote',
      title: 'Random Quote Generator',
      description: 'Web application that dynamically fetches and displays random quotes with seamless smooth animation transitions and one-click social sharing.',
      status: 'live',
      liveUrl: 'https://random-quote-machine-lime-two.vercel.app/',
      tags: ['React', 'REST API', 'JavaScript'],
    }
  ];

  // Experience Data
  const experiences = [
    {
      role: 'Technical Intern',
      company: 'Infosys',
      period: 'Internship',
      type: 'exp-icon-infosys',
      icon: Briefcase,
      description: 'Focused on comprehensive technical skill development and modern application lifecycles utilizing specialized platforms such as Infosys Springboard.',
      badge: 'Infosys Springboard'
    },
    {
      role: 'Event Coordinator',
      company: 'PromptFury',
      period: 'Cyberpunk Sprint',
      type: 'exp-icon-cyberpunk',
      icon: Flame,
      description: 'Served as Event Coordinator for a high-intensity 40-minute Cyberpunk coding sprint, designing competitive algorithmic challenges and managing real-time participant evaluation.',
      badge: '40-Min Coding Sprint'
    },
    {
      role: 'Competitive Programmer',
      company: 'LeetCode & Algorithmic Platforms',
      period: 'Active Participant',
      type: 'exp-icon-cp',
      icon: Trophy,
      description: 'Active participant in algorithmic challenges and problem solving on platforms like LeetCode, continuously sharpening data structures, dynamic programming, and optimization techniques.',
      badge: 'Data Structures & Algorithms'
    }
  ];

  return (
    <div className="portfolio-container">
      {/* Top Scroll Progress Indicator */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* Custom Cursor Follower */}
      <div 
        className="custom-cursor" 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      ></div>
      <div 
        className="custom-cursor-follower" 
        style={{ left: `${followerPos.x}px`, top: `${followerPos.y}px` }}
      ></div>

      {/* Background Ambient Orbs */}
      <div className="bg-orb bg-orb-1"></div>
      <div className="bg-orb bg-orb-2"></div>

      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#hero" className="nav-logo">
            <div className="logo-badge">SS</div>
            <span className="logo-text">Saranstalin<span className="gradient-text">.S</span></span>
          </a>

          <ul className="nav-links">
            <li><a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</a></li>
            <li><a href="#experience" className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}>Experience</a></li>
            <li><a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}>Skills</a></li>
            <li><a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a></li>
            <li><a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a></li>
          </ul>

          <button 
            className="overlay-trigger-btn"
            onClick={() => setOverlayNavOpen(true)}
            aria-label="Open Fullscreen Navigation Overlay"
          >
            <Compass size={18} /> Menu
          </button>
        </div>
      </nav>

      {/* Full-Screen Glass Overlay Navigation (Reference Site Inspired) */}
      <div className={`fullscreen-overlay ${overlayNavOpen ? 'open' : ''}`}>
        <button 
          className="overlay-close-btn"
          onClick={() => setOverlayNavOpen(false)}
          aria-label="Close Overlay Menu"
        >
          <X size={26} />
        </button>

        <ul className="overlay-nav-list">
          <li className="overlay-nav-item">
            <a 
              href="#hero" 
              className="overlay-nav-link"
              onClick={() => setOverlayNavOpen(false)}
            >
              <span className="overlay-nav-num">01</span> Home
            </a>
          </li>
          <li className="overlay-nav-item">
            <a 
              href="#about" 
              className="overlay-nav-link"
              onClick={() => setOverlayNavOpen(false)}
            >
              <span className="overlay-nav-num">02</span> About
            </a>
          </li>
          <li className="overlay-nav-item">
            <a 
              href="#experience" 
              className="overlay-nav-link"
              onClick={() => setOverlayNavOpen(false)}
            >
              <span className="overlay-nav-num">03</span> Experience
            </a>
          </li>
          <li className="overlay-nav-item">
            <a 
              href="#skills" 
              className="overlay-nav-link"
              onClick={() => setOverlayNavOpen(false)}
            >
              <span className="overlay-nav-num">04</span> Skills
            </a>
          </li>
          <li className="overlay-nav-item">
            <a 
              href="#projects" 
              className="overlay-nav-link"
              onClick={() => setOverlayNavOpen(false)}
            >
              <span className="overlay-nav-num">05</span> Projects
            </a>
          </li>
          <li className="overlay-nav-item">
            <a 
              href="#contact" 
              className="overlay-nav-link"
              onClick={() => setOverlayNavOpen(false)}
            >
              <span className="overlay-nav-num">06</span> Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left reveal-left">
              <div className="hero-badge">
                <span className="status-dot"></span>
                <span>Available for Tech Opportunities</span>
              </div>
              <h1 className="hero-title">
                <span className="text-mask-wrapper">
                  <span className={`text-mask-item ${titleRevealed ? 'revealed' : ''}`}>Hi, I'm</span>
                </span>{' '}
                <span className="text-mask-wrapper">
                  <span className={`text-mask-item gradient-text ${titleRevealed ? 'revealed' : ''}`} style={{ transitionDelay: '120ms' }}>Saranstalin S</span>
                </span>,<br />
                <span className="gradient-text-alt">{currentText}</span>
                <span className="typing-cursor"></span>
              </h1>
              <p className="hero-subtitle">
                B.Tech Computer Science & Engineering student at the <strong>Government College of Engineering, Salem</strong>. Crafting responsive web applications & solving complex algorithmic problems.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn-primary">
                  View My Work <ChevronRight size={18} />
                </a>
                <a href="#contact" className="btn-secondary">
                  Contact Me <Mail size={18} />
                </a>
              </div>
            </div>

            <div className="hero-right reveal-right">
              <div className="hero-code-wrapper animate-float">
                <div className="glass-card hero-code-card">
                  <div className="code-header">
                    <div className="code-dots">
                      <span className="dot dot-red"></span>
                      <span className="dot dot-yellow"></span>
                      <span className="dot dot-green"></span>
                    </div>
                    <span className="code-title">developer_profile.js</span>
                  </div>
                  <div className="code-body">
                    <div className="code-line">
                      <span className="line-num">1</span>
                      <span><span className="code-kw">const</span> <span className="code-var">developer</span> = &#123;</span>
                    </div>
                    <div className="code-line">
                      <span className="line-num">2</span>
                      <span>&nbsp;&nbsp;name: <span className="code-str">'Saranstalin S'</span>,</span>
                    </div>
                    <div className="code-line">
                      <span className="line-num">3</span>
                      <span>&nbsp;&nbsp;role: <span className="code-str">'Full Stack Web Developer'</span>,</span>
                    </div>
                    <div className="code-line">
                      <span className="line-num">4</span>
                      <span>&nbsp;&nbsp;college: <span className="code-str">'GCE Salem'</span>,</span>
                    </div>
                    <div className="code-line">
                      <span className="line-num">5</span>
                      <span>&nbsp;&nbsp;focus: [<span className="code-str">'Full-Stack'</span>, <span className="code-str">'Competitive Programming'</span>],</span>
                    </div>
                    <div className="code-line">
                      <span className="line-num">6</span>
                      <span>&nbsp;&nbsp;internship: <span className="code-str">'Infosys'</span>,</span>
                    </div>
                    <div className="code-line">
                      <span className="line-num">7</span>
                      <span>&nbsp;&nbsp;solveProblems: <span className="code-kw">function</span>() &#123; <span className="code-kw">return</span> <span className="code-str">'Optimized ⚡'</span>; &#125;</span>
                    </div>
                    <div className="code-line">
                      <span className="line-num">8</span>
                      <span>&#125;;</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header reveal-init">
            <span className="section-tag">&lt;About Me /&gt;</span>
            <h2 className="section-title">Passionate Developer & Algorithmic Problem Solver</h2>
          </div>

          <div className="about-grid">
            <div className="glass-card about-text-card reveal-left">
              <p className="about-p">
                I am a B.Tech CSE student blending full-stack development skills with a strong foundation in competitive programming. I enjoy building robust applications and tackling complex algorithmic challenges.
              </p>
              <p className="about-p" style={{ color: 'var(--text-muted)' }}>
                Pursuing my degree at the <strong>Government College of Engineering, Salem</strong>, I actively bridge theoretical computer science concepts with modern web technologies, crafting accessible, high-performance web applications.
              </p>

              <div className="about-highlights">
                <span className="about-chip"><GraduationCap size={16} color="var(--primary)" /> B.Tech CSE at GCE Salem</span>
                <span className="about-chip"><Code2 size={16} color="var(--accent-emerald)" /> Full-Stack Architecture</span>
                <span className="about-chip"><Trophy size={16} color="var(--accent-amber)" /> LeetCode Competitive Programmer</span>
                <span className="about-chip"><Sparkles size={16} color="var(--secondary)" /> Infosys Technical Intern</span>
              </div>
            </div>

            <div className="stats-grid reveal-right">
              <div className="glass-card stat-card">
                <div className="stat-number gradient-text">5+</div>
                <div className="stat-label">Web Projects Built</div>
              </div>
              <div className="glass-card stat-card">
                <div className="stat-number gradient-text-alt">13+</div>
                <div className="stat-label">Tech Stack Tools</div>
              </div>
              <div className="glass-card stat-card">
                <div className="stat-number gradient-text">100%</div>
                <div className="stat-label">Commitment to Quality</div>
              </div>
              <div className="glass-card stat-card">
                <div className="stat-number gradient-text-alt">GCE</div>
                <div className="stat-label">Salem CSE Scholar</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience-section">
        <div className="container">
          <div className="section-header reveal-init">
            <span className="section-tag">&lt;Experience /&gt;</span>
            <h2 className="section-title">Internships & Technical Leadership</h2>
            <p className="section-desc">Practical industry training, competitive coding event coordination, and algorithmic mastery.</p>
          </div>

          <div className="experience-timeline">
            {experiences.map((exp, idx) => {
              const IconComp = exp.icon;
              return (
                <div 
                  key={idx} 
                  className="glass-card experience-card reveal-init"
                  style={{ transitionDelay: `${idx * 120}ms` }}
                >
                  <div className={`exp-icon-box ${exp.type}`}>
                    <IconComp size={24} />
                  </div>
                  <div className="exp-content">
                    <div className="exp-header">
                      <div>
                        <h3 className="exp-role">{exp.role}</h3>
                        <div className="exp-company">{exp.company}</div>
                      </div>
                      <span className="exp-tag">{exp.badge}</span>
                    </div>
                    <p className="exp-desc">{exp.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="container">
          <div className="section-header reveal-init">
            <span className="section-tag">&lt;Technical Skills /&gt;</span>
            <h2 className="section-title">My Tech Stack & Tools</h2>
            <p className="section-desc">An interactive grid of frontend technologies, backend frameworks, and development tools.</p>
          </div>

          <div className="skills-wrapper">
            {/* Frontend Category */}
            <div className="glass-card skill-category-card reveal-init">
              <h3 className="category-title gradient-text">
                <Layers size={22} color="var(--primary)" /> Frontend Technologies
              </h3>
              <div className="skills-grid">
                {frontendSkills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="skill-tag reveal-scale"
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    <Code2 className="skill-icon" size={22} />
                    <span className="skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Backend & Tools Category */}
            <div className="glass-card skill-category-card reveal-init">
              <h3 className="category-title gradient-text-alt">
                <Cpu size={22} color="var(--secondary)" /> Backend & Tools
              </h3>
              <div className="skills-grid">
                {backendToolsSkills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="skill-tag reveal-scale"
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    <Terminal className="skill-icon" size={22} style={{ color: 'var(--secondary)' }} />
                    <span className="skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header reveal-init">
            <span className="section-tag">&lt;Featured Work /&gt;</span>
            <h2 className="section-title">Projects & Applications</h2>
            <p className="section-desc">Selected web applications demonstrating full-stack API integration, UI interactivity, and clean code.</p>
          </div>

          <div className="projects-grid">
            {projects.map((proj, idx) => (
              <div 
                key={proj.id} 
                className="glass-card project-card reveal-scale"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="project-top">
                  <div className="project-header">
                    <h3 className="project-title">{proj.title}</h3>
                    {proj.status === 'live' ? (
                      <span className="status-badge status-live">
                        <span className="status-dot animate-sonar"></span> Live
                      </span>
                    ) : (
                      <span className="status-badge status-dev">
                        <Wrench size={12} /> In Development
                      </span>
                    )}
                  </div>
                  <p className="project-desc">{proj.description}</p>
                </div>

                <div>
                  <div className="project-tags">
                    {proj.tags.map((tag, i) => (
                      <span key={i} className="mini-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="project-footer">
                    {proj.status === 'live' ? (
                      <a 
                        href={proj.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-btn project-btn-live"
                      >
                        Live Demo <ExternalLink size={16} />
                      </a>
                    ) : (
                      <span className="project-btn project-btn-disabled">
                        In Progress <Wrench size={14} />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header reveal-init">
            <span className="section-tag">&lt;Get In Touch /&gt;</span>
            <h2 className="section-title">Let's Connect & Collaborate</h2>
            <p className="section-desc">Feel free to reach out for project inquiries, tech discussions, or software development opportunities.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info-cards reveal-left">
              <div 
                className="glass-card contact-card"
                onClick={() => copyToClipboard('stalinsaran2020@gmail.com', 'Email')}
              >
                <div className="contact-icon">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="contact-detail-label">Email Address</div>
                  <div className="contact-detail-val">stalinsaran2020@gmail.com</div>
                </div>
                <Copy size={16} style={{ marginLeft: 'auto', color: 'var(--text-dim)' }} />
              </div>

              <div 
                className="glass-card contact-card"
                onClick={() => copyToClipboard('9360320773', 'Phone number')}
              >
                <div className="contact-icon" style={{ background: 'rgba(6, 182, 212, 0.14)', color: 'var(--secondary)' }}>
                  <Phone size={22} />
                </div>
                <div>
                  <div className="contact-detail-label">Phone Number</div>
                  <div className="contact-detail-val">9360320773</div>
                </div>
                <Copy size={16} style={{ marginLeft: 'auto', color: 'var(--text-dim)' }} />
              </div>

              <div className="glass-card contact-card" style={{ cursor: 'default' }}>
                <div className="contact-icon" style={{ background: 'rgba(163, 230, 53, 0.14)', color: 'var(--accent-purple)' }}>
                  <GraduationCap size={22} />
                </div>
                <div>
                  <div className="contact-detail-label">Institution</div>
                  <div className="contact-detail-val">Government College of Engineering, Salem</div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <form className="glass-card contact-form reveal-right" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input type="text" required placeholder="John Doe" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Your Email</label>
                <input type="email" required placeholder="john@example.com" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea rows="4" required placeholder="Hi Saranstalin, I'd like to talk about..." className="form-textarea"></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {formSubmitted ? <><Check size={18} /> Message Sent!</> : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          </div>

          <div className="footer-bottom">
            <div>
              © 2026 <strong>Saranstalin S</strong>. Crafted with React & Antigravity design.
            </div>

            <div className="social-links">
              <a 
                href="https://github.com/Saran2007-prog" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link" 
                aria-label="GitHub"
              >
                <GithubIcon size={22} />
              </a>
              <a 
                href="https://www.linkedin.com/in/stalinsaran-sarveswaran/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link" 
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={22} />
              </a>
              <a 
                href="mailto:stalinsaran2020@gmail.com" 
                className="social-link" 
                aria-label="Email"
              >
                <Mail size={22} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Back to Top Button */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll back to top"
      >
        <ArrowUp size={22} />
      </button>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-container">
          <Sparkles size={18} color="var(--primary)" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default App;