// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initHeroAnimations();
  initThreeJS();
  initScrollAnimations();
  initTestimonialSlider();
  initFAQ();
  initCTAButtons();
  initSmoothScroll();
});

// Hero Section Animations
function initHeroAnimations() {
  // Animate hero elements on load
  anime
    .timeline({
      easing: "easeOutExpo",
      duration: 1000,
    })
    .add({
      targets: ".hero-title",
      opacity: [0, 1],
      translateY: [50, 0],
      delay: 500,
    })
    .add(
      {
        targets: ".hero-subtitle",
        opacity: [0, 1],
        translateY: [30, 0],
        delay: 200,
      },
      "-=800"
    )
    .add(
      {
        targets: ".cta-button.primary",
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.8, 1],
        delay: 300,
      },
      "-=600"
    );
}

// Three.js 3D Scene
function initThreeJS() {
  const container = document.getElementById("hero3d");
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(300, 300);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Create floating question mark
  const geometry = new THREE.BoxGeometry(1, 1, 0.2);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.8,
  });

  // Create multiple cubes to form a question mark shape
  const cubes = [];
  const positions = [
    [0, 1, 0],
    [0, 0.5, 0],
    [0, 0, 0],
    [0, -0.5, 0],
    [0.5, 1, 0],
    [0.5, 0.5, 0],
    [0, -1.5, 0],
  ];

  positions.forEach((pos) => {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(pos[0], pos[1], pos[2]);
    scene.add(cube);
    cubes.push(cube);
  });

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  camera.position.z = 5;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotate cubes
    cubes.forEach((cube, index) => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
    });

    renderer.render(scene, camera);
  }

  animate();

  // Handle resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      renderer.setSize(300, 300);
    }
  });
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;

        if (target.classList.contains("problem-card")) {
          animateProblemCard(target);
        } else if (target.classList.contains("benefit-item")) {
          animateBenefitItem(target);
        } else if (target.classList.contains("step")) {
          animateStep(target);
        } else if (target.classList.contains("mentor-content")) {
          animateMentorSection(target);
        }
      }
    });
  }, observerOptions);

  // Observe elements
  document
    .querySelectorAll(".problem-card, .benefit-item, .step, .mentor-content")
    .forEach((el) => {
      observer.observe(el);
    });
}

function animateProblemCard(card) {
  anime({
    targets: card,
    opacity: [0, 1],
    translateY: [50, 0],
    scale: [0.8, 1],
    duration: 800,
    easing: "easeOutElastic(1, .8)",
    delay: parseInt(card.dataset.problem) * 200,
  });
}

function animateBenefitItem(item) {
  anime({
    targets: item,
    opacity: [0, 1],
    translateX: [-50, 0],
    duration: 800,
    easing: "easeOutExpo",
    delay: parseInt(item.dataset.benefit) * 300,
  });
}

function animateStep(step) {
  anime({
    targets: step,
    opacity: [0, 1],
    translateY: [50, 0],
    scale: [0.8, 1],
    duration: 800,
    easing: "easeOutBack",
    delay: parseInt(step.dataset.step) * 400,
  });
}

function animateMentorSection(section) {
  anime
    .timeline({
      easing: "easeOutExpo",
    })
    .add({
      targets: ".mentor-image",
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 1000,
    })
    .add(
      {
        targets: ".mentor-name",
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 800,
      },
      "-=800"
    )
    .add(
      {
        targets: ".mentor-bio",
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 800,
      },
      "-=600"
    )
    .add(
      {
        targets: ".mentor-stats .stat",
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: anime.stagger(200),
      },
      "-=400"
    );
}

// Testimonial Slider
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;

  function showSlide(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  // Auto-advance slides
  setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
  }, 4000);

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
}

// FAQ Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active", !isActive);

      // Animate with anime.js
      if (!isActive) {
        anime({
          targets: answer,
          maxHeight: [0, answer.scrollHeight + "px"],
          duration: 400,
          easing: "easeOutQuart",
        });
      }
    });
  });
}

// CTA Button Actions
function initCTAButtons() {
  const ctaButtons = document.querySelectorAll(".cta-button");

  ctaButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Add click animation
      anime({
        targets: button,
        scale: [1, 0.95, 1],
        duration: 200,
        easing: "easeInOutQuad",
      });

      // Simulate booking action (replace with actual booking logic)
      setTimeout(() => {
        alert(
          "Redirecting to booking form... (This would integrate with your payment system)"
        );
      }, 300);
    });

    // Hover effects
    button.addEventListener("mouseenter", () => {
      anime({
        targets: button,
        scale: 1.05,
        duration: 200,
        easing: "easeOutQuad",
      });
    });

    button.addEventListener("mouseleave", () => {
      anime({
        targets: button,
        scale: 1,
        duration: 200,
        easing: "easeOutQuad",
      });
    });
  });
}

// Smooth Scroll for Navigation
function initSmoothScroll() {
  // Add smooth scrolling to any anchor links if needed
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Parallax Effect for Hero Background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector(".hero-section");
  const heroBackground = document.querySelector(".hero-bg");

  if (heroSection && heroBackground) {
    const rate = scrolled * -0.5;
    heroBackground.style.transform = `translateY(${rate}px)`;
  }
});

// Add loading animation
window.addEventListener("load", () => {
  // Hide loading screen if you have one
  document.body.classList.add("loaded");

  // Start hero animations
  setTimeout(() => {
    initHeroAnimations();
  }, 100);
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector(".hero-section");
  const heroBackground = document.querySelector(".hero-bg");

  if (heroSection && heroBackground) {
    const rate = scrolled * -0.5;
    heroBackground.style.transform = `translateY(${rate}px)`;
  }
}, 16); // ~60fps

window.addEventListener("scroll", throttledScrollHandler);
