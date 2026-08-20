// ============================================
// NOVA STUDIO - ANIMATIONS
// Xử lý: Preloader, Scroll Reveal, Cursor, Particles, Stats Counter
// ============================================

// ===== PRELOADER =====
function initPreloader() {
  const preloader = document.getElementById("preloader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 600);
  });

  // Fallback nếu load quá lâu
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 3000);
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Thêm delay cho các phần tử liên tiếp
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealElements.forEach((el, index) => {
    // Tự động gán delay nếu không có
    if (!el.dataset.delay && index % 3 === 1) {
      el.dataset.delay = 100;
    } else if (!el.dataset.delay && index % 3 === 2) {
      el.dataset.delay = 200;
    }
    observer.observe(el);
  });
}

// ===== CUSTOM CURSOR =====
function initCursor() {
  const cursorDot = document.getElementById("cursorDot");
  const cursorOutline = document.getElementById("cursorOutline");

  if (window.matchMedia("(max-width: 768px)").matches) return;

  let mouseX = 0,
    mouseY = 0;
  let outlineX = 0,
    outlineY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Cursor dot di chuyển ngay lập tức
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  });

  // Cursor outline di chuyển mượt mà
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorOutline.style.left = outlineX + "px";
    cursorOutline.style.top = outlineY + "px";

    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Hover effects
  const hoverElements = document.querySelectorAll(
    "a, button, input, textarea, select, .portfolio-item, .service-card",
  );

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorOutline.classList.add("hover");
      cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)";
    });

    el.addEventListener("mouseleave", () => {
      cursorOutline.classList.remove("hover");
      cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
    });
  });
}

// ===== HERO PARTICLES =====
function initParticles() {
  const container = document.getElementById("heroParticles");
  if (!container) return;

  const { count, minSize, maxSize, minOpacity, maxOpacity } = particlesConfig;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * (maxSize - minSize) + minSize;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;
    const duration = Math.random() * 3 + 3;
    const delay = Math.random() * 3;

    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = x + "%";
    particle.style.top = y + "%";
    particle.style.opacity = opacity;
    particle.style.animationDuration = duration + "s";
    particle.style.animationDelay = delay + "s";

    container.appendChild(particle);
  }
}

// ===== STATS COUNTER =====
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target);
          const duration = 2000;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);

            entry.target.textContent = value;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              entry.target.textContent = target + "+";
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  statNumbers.forEach((num) => observer.observe(num));
}

// ===== EXPORT =====
window.NovaAnimations = {
  initPreloader,
  initScrollReveal,
  initCursor,
  initParticles,
  initStatsCounter,
};
