// ============================================
// NOVA STUDIO - MAIN JAVASCRIPT
// Xử lý: Navigation, Services, Portfolio, Testimonials, Contact Form, Theme
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // Khởi tạo tất cả animations
  NovaAnimations.initPreloader();
  NovaAnimations.initScrollReveal();
  NovaAnimations.initCursor();
  NovaAnimations.initParticles();
  NovaAnimations.initStatsCounter();

  // Khởi tạo các chức năng chính
  initNavbar();
  initTheme();
  initMobileMenu();
  initScrollSpy();
  initBackToTop();
  renderServices();
  renderPortfolio();
  initPortfolioFilter();
  renderTestimonials();
  initTestimonialSlider();
  initContactForm();
  initNewsletterForm();
  initSmoothScroll();
});

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// ===== THEME TOGGLE (DARK/LIGHT) =====
function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");

  // Lấy theme từ localStorage
  const savedTheme = localStorage.getItem("nova-theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("nova-theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === "dark") {
      themeIcon.className = "fas fa-sun";
    } else {
      themeIcon.className = "fas fa-moon";
    }
  }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("open");
  });

  // Đóng menu khi click vào link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("open");
    });
  });

  // Đóng menu khi click ra ngoài
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("open");
    }
  });
}

// ===== SCROLL SPY (Active nav link) =====
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ===== RENDER SERVICES =====
function renderServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;

  grid.innerHTML = servicesData
    .map(
      (service) => `
        <div class="service-card reveal">
            <div class="service-icon">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <a href="${service.link}" class="service-link">
                Tìm hiểu thêm
                <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `,
    )
    .join("");

  // Re-init scroll reveal cho các phần tử mới
  setTimeout(() => NovaAnimations.initScrollReveal(), 100);
}

// ===== RENDER PORTFOLIO =====
function renderPortfolio(filter = "all") {
  const grid = document.getElementById("portfolioGrid");
  if (!grid) return;

  const filteredData =
    filter === "all"
      ? portfolioData
      : portfolioData.filter((item) => item.category === filter);

  grid.innerHTML = filteredData
    .map(
      (item) => `
        <div class="portfolio-item reveal" data-category="${item.category}">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="portfolio-overlay">
                <span class="category">${item.categoryLabel}</span>
                <h3>${item.title}</h3>
            </div>
        </div>
    `,
    )
    .join("");

  // Re-init scroll reveal cho các phần tử mới
  setTimeout(() => NovaAnimations.initScrollReveal(), 100);
}

// ===== PORTFOLIO FILTER =====
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      renderPortfolio(filter);
    });
  });
}

// ===== RENDER TESTIMONIALS =====
function renderTestimonials() {
  const slider = document.getElementById("testimonialsSlider");
  const dots = document.getElementById("sliderDots");
  if (!slider || !dots) return;

  slider.innerHTML = testimonialsData
    .map(
      (testimonial, index) => `
        <div class="testimonial-card ${index === 0 ? "active" : ""}">
            <div class="testimonial-quote">
                <i class="fas fa-quote-left"></i>
            </div>
            <p class="testimonial-text">${testimonial.text}</p>
            <div class="testimonial-author">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar" loading="lazy">
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.position}</p>
                </div>
            </div>
        </div>
    `,
    )
    .join("");

  dots.innerHTML = testimonialsData
    .map(
      (_, index) => `
        <span class="slider-dot ${index === 0 ? "active" : ""}" data-index="${index}"></span>
    `,
    )
    .join("");
}

// ===== TESTIMONIAL SLIDER =====
function initTestimonialSlider() {
  const slider = document.getElementById("testimonialsSlider");
  const cards = () => slider.querySelectorAll(".testimonial-card");
  const dots = document
    .getElementById("sliderDots")
    .querySelectorAll(".slider-dot");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");

  let currentIndex = 0;

  function goToSlide(index) {
    const cardsList = cards();
    const totalSlides = cardsList.length;

    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    cardsList.forEach((card, i) => {
      card.classList.remove("active", "prev");
      if (i === index) {
        card.classList.add("active");
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    currentIndex = index;
  }

  prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goToSlide(parseInt(dot.dataset.index));
    });
  });

  // Auto slide mỗi 5 giây
  let autoSlide = setInterval(() => goToSlide(currentIndex + 1), 5000);

  // Dừng auto slide khi hover
  slider.addEventListener("mouseenter", () => clearInterval(autoSlide));
  slider.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => goToSlide(currentIndex + 1), 5000);
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate form
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      showToast("Vui lòng điền đầy đủ các trường bắt buộc!", "error");
      return;
    }

    // Kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Email không hợp lệ!", "error");
      return;
    }

    // Giả lập gửi form
    const submitBtn = form.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Đã gửi!';
      showToast("Tin nhắn đã được gửi thành công!", "success");
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }, 1500);
  });
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
  const form = document.getElementById("newsletterForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!email) {
      showToast("Vui lòng nhập email!", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Email không hợp lệ!", "error");
      return;
    }

    showToast("Đăng ký thành công! Cảm ơn bạn đã quan tâm.", "success");
    emailInput.value = "";
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  // Đã có scroll-behavior: smooth trong CSS
  // Thêm hiệu ứng cho các link nội bộ
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===== TOAST NOTIFICATION =====
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const toastIcon = toast.querySelector(".toast-icon i");
  const toastMessage = toast.querySelector(".toast-message");

  if (type === "success") {
    toastIcon.className = "fas fa-check-circle";
    toastIcon.style.color = "var(--success)";
  } else if (type === "error") {
    toastIcon.className = "fas fa-exclamation-circle";
    toastIcon.style.color = "var(--error)";
  }

  toastMessage.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ===== TOAST CLOSE =====
document.addEventListener("click", (e) => {
  if (e.target.id === "toastClose" || e.target.closest("#toastClose")) {
    document.getElementById("toast").classList.remove("show");
  }
});
