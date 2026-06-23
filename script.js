/* ============================
   DHRUVA KHARE - CYBERSECURITY PORTFOLIO
   Premium Interactive JavaScript
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
    runLoader(() => {
        initMatrixRain();
        initParticles();
        initSpotlight();
        initNavigation();
        initTypingEffect();
        initTerminalAnimation();
        initScrollAnimations();
        initSkillBars();
        initCounters();
        initContributionGraph();
        initContactForm();
    });
});

/* ============================
   SYSTEM SECURE BOOT LOADER
   ============================ */
function runLoader(callback) {
    const overlay = document.getElementById('loader-overlay');
    const progressBar = document.getElementById('loader-progress-bar');
    const percentageText = document.getElementById('loader-percentage');
    const terminal = document.getElementById('loader-terminal');
    
    if (!overlay || !progressBar || !percentageText || !terminal) {
        document.body.classList.remove('loading');
        if (callback) callback();
        return;
    }
    
    const messages = [
        { text: 'SECURE LINK INITIALIZED...', delay: 150 },
        { text: 'LOADING SECURITY INTEGRITY MODULES... [SUCCESS]', delay: 600 },
        { text: 'DECRYPTING INTERFACE ARCHITECTURE...', delay: 1100 },
        { text: 'BYPASS COMPLETE. ACCESS GRANTED.', delay: 1550, success: true }
    ];
    
    // Log messages sequentially
    messages.forEach(msg => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = `loader-line${msg.success ? ' success' : ''}`;
            line.textContent = `> ${msg.text}`;
            terminal.appendChild(line);
            terminal.scrollTop = terminal.scrollHeight;
        }, msg.delay);
    });
    
    // Animate progress bar
    const start = performance.now();
    const duration = 1800; // 1.8 seconds loading simulation
    
    function updateProgress(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const percent = Math.floor(progress * 100);
        
        progressBar.style.width = `${percent}%`;
        percentageText.textContent = `${percent}%`;
        
        if (progress < 1) {
            requestAnimationFrame(updateProgress);
        } else {
            // Complete
            setTimeout(() => {
                overlay.classList.add('fade-out');
                document.body.classList.remove('loading');
                
                // Trigger callback after fade-out transition completes
                setTimeout(() => {
                    if (callback) callback();
                }, 600); // matches --transition-slow / 0.6s
            }, 300);
        }
    }
    
    requestAnimationFrame(updateProgress);
}

/* ============================
   MATRIX RAIN EFFECT
   ============================ */
function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(3, 7, 18, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00f0ff';
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            ctx.globalAlpha = Math.random() * 0.5 + 0.1;
            ctx.fillText(char, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }
    draw();
}

/* ============================
   PARTICLE SYSTEM
   ============================ */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
    let mouse = { x: null, y: null };

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse interaction
            if (mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    this.x -= (dx / dist) * force * 0.5;
                    this.y -= (dy / dist) * force * 0.5;
                }
            }

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 240, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();
}

/* ============================
   MOUSE SPOTLIGHT
   ============================ */
function initSpotlight() {
    const spotlight = document.getElementById('spotlight');
    if (!spotlight) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function update() {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;
        spotlight.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`;
        requestAnimationFrame(update);
    }
    update();
}

/* ============================
   NAVIGATION
   ============================ */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
    });

    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
    }

    // Close on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Active link on scroll
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }
}

/* ============================
   TYPING EFFECT
   ============================ */
function initTypingEffect() {
    const roles = [
        'Cybersecurity Expert',
        'Penetration Tester',
        'Bug Bounty Hunter',
        'Security Researcher',
        'Ethical Hacker'
    ];

    const element = document.getElementById('hero-role');
    if (!element) return;

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            element.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            element.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 300;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

/* ============================
   TERMINAL ANIMATION
   ============================ */
function initTerminalAnimation() {
    const terminalBody = document.getElementById('terminal-body');
    if (!terminalBody) return;

    const lines = [
        { text: 'Initializing Security Operations...', delay: 500 },
        { text: 'Threat Intelligence Active...', delay: 1200 },
        { text: 'Vulnerability Assessment Running...', delay: 2000 },
        { text: 'System Status: Secure', delay: 2800, class: 'status-secure' }
    ];

    lines.forEach((line, index) => {
        setTimeout(() => {
            const lineEl = document.createElement('div');
            lineEl.className = 'terminal-line';
            lineEl.style.animationDelay = `${index * 0.1}s`;

            const prompt = document.createElement('span');
            prompt.className = 'terminal-prompt';
            prompt.textContent = '>';

            const text = document.createElement('span');
            text.className = `terminal-text ${line.class || ''}`;
            text.textContent = line.text;

            lineEl.appendChild(prompt);
            lineEl.appendChild(text);
            terminalBody.appendChild(lineEl);

            // Auto restart loop
            if (index === lines.length - 1) {
                setTimeout(() => {
                    terminalBody.innerHTML = '';
                    initTerminalAnimation();
                }, 4000);
            }
        }, line.delay); // Starts typing immediately when initialized
    });
}

/* ============================
   SCROLL ANIMATIONS
   ============================ */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll(
        '.section-header, .about-grid, .skill-card, .tool-card, .project-card, ' +
        '.cert-card, .achievement-card, .github-profile-card, .github-stat-card, ' +
        '.contribution-graph, .languages-card, .blog-card, .contact-card, .contact-form'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* ============================
   SKILL PROGRESS BARS
   ============================ */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = `${width}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

/* ============================
   ANIMATED COUNTERS
   ============================ */
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.floor(eased * target);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(update);
    }
}

/* ============================
   CONTRIBUTION GRAPH
   ============================ */
function initContributionGraph() {
    const grid = document.getElementById('contribution-grid');
    if (!grid) return;

    // Generate 7 rows x 52 columns = 364 cells
    const rows = 7;
    const cols = 52;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.className = 'contribution-cell';

            // Random contribution level
            const rand = Math.random();
            if (rand > 0.7) cell.classList.add('level-1');
            if (rand > 0.82) cell.classList.add('level-2');
            if (rand > 0.9) cell.classList.add('level-3');
            if (rand > 0.96) cell.classList.add('level-4');

            grid.appendChild(cell);
        }
    }

    // Make grid display properly
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    grid.style.gridAutoFlow = 'column';
}

/* ============================
   CONTACT FORM
   ============================ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('.btn-primary');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<span class="btn-icon">✓</span> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            form.reset();
        }, 3000);
    });
}

/* ============================
   SMOOTH SCROLL ENHANCEMENT
   ============================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
