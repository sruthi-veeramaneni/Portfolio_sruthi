/**
 * Project: Premium B.Tech Student Portfolio
 * Script: script.js
 * Functionality: Dynamic UI interactivity, animations, theme toggles, filters.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LIGHT/DARK THEME TOGGLE
    // ==========================================
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;

    // Check system preferences and storage
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme) {
        htmlElement.setAttribute("data-theme", storedTheme);
    } else {
        const defaultTheme = systemPrefersDark ? "dark" : "light";
        htmlElement.setAttribute("data-theme", defaultTheme);
    }

    themeToggle.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        
        // Minor rotation effect on click
        const icon = themeToggle.querySelector(".theme-icon");
        if (icon) {
            icon.style.transform = "rotate(360deg)";
            setTimeout(() => {
                icon.style.transform = "";
            }, 500);
        }
    });

    // ==========================================
    // 2. MOBILE MENU NAVIGATION
    // ==========================================
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        // Animate hamburger to close icon
        mobileToggle.classList.toggle("active");
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            mobileToggle.classList.remove("active");
        });
    });

    // Close menu when clicking outside of navbar
    document.addEventListener("click", (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains("open")) {
            navMenu.classList.remove("open");
            mobileToggle.classList.remove("active");
        }
    });

    // ==========================================
    // 3. SCROLL-SPY & HEADER SHRINK
    // ==========================================
    const navbar = document.getElementById("navbar");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        // Shrink header on scroll
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Active link highlighting based on viewport
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // ==========================================
    // 4. TYPEWRITER EFFECT
    // ==========================================
    const typewriterElement = document.getElementById("typewriter");
    const roles = ["Software Engineer.", "Full Stack Developer.", "AI & ML Enthusiast.", "Problem Solver."];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Delete faster
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Normal typing speed
        }

        // Typing finished a word
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Hold word on screen for 2s
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Tiny pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    if (typewriterElement) {
        type();
    }

    // ==========================================
    // 5. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================
    const revealElements = document.querySelectorAll(".reveal");
    const progressBars = document.querySelectorAll(".skill-progress-bar");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                
                // If the skills section is revealed, animate its progress bars
                if (entry.target.id === "skills") {
                    animateSkills();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    function animateSkills() {
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute("data-progress");
            bar.style.width = targetWidth;
        });
    }

    // ==========================================
    // 6. PROJECTS CATEGORY FILTERING
    // ==========================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class from all filter buttons
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                
                // Reset card displays using grid item animations
                card.style.opacity = "0";
                card.style.transform = "scale(0.85)";
                
                setTimeout(() => {
                    if (filterValue === "all" || category === filterValue) {
                        card.style.display = "flex";
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "scale(1)";
                        }, 50);
                    } else {
                        card.style.display = "none";
                    }
                }, 300);
            });
        });
    });

    // ==========================================
    // 7. CONTACT FORM VALIDATION & FEEDBACK
    // ==========================================
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.innerHTML;

            // Simple client-side validation check
            if (!name || !email || !subject || !message) {
                showStatus("Please fill in all details.", "error");
                return;
            }

            // Simulate loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                Sending... 
                <svg class="loading-spinner" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><line x1="12" x2="12" y1="2" y2="6"/><line x1="12" x2="12" y1="18" y2="22"/><line x1="4.93" x2="7.76" y1="4.93" y2="7.76"/><line x1="16.24" x2="19.07" y1="16.24" y2="19.07"/><line x1="2" x2="6" y1="12" y2="12"/><line x1="18" x2="22" y1="12" y2="12"/><line x1="4.93" x2="7.76" y1="19.07" y2="16.24"/><line x1="16.24" x2="19.07" y1="7.76" y2="4.93"/></svg>
            `;

            // Style rule injection for loading animation spin
            if (!document.getElementById("spinner-style")) {
                const style = document.createElement("style");
                style.id = "spinner-style";
                style.innerHTML = "@keyframes spin { 100% { transform: rotate(360deg); } }";
                document.head.appendChild(style);
            }

            // Simulate Network delay (1.5s)
            setTimeout(() => {
                showStatus("Thank you! Your message was sent successfully.", "success");
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 1500);
        });
    }

    function showStatus(msg, type) {
        formStatus.textContent = msg;
        formStatus.className = `form-status ${type}`;
        
        // Auto scroll to view the status message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Auto remove success message after 5 seconds
        if (type === "success") {
            setTimeout(() => {
                formStatus.style.opacity = "0";
                setTimeout(() => {
                    formStatus.style.display = "none";
                    formStatus.style.opacity = "1";
                }, 300);
            }, 5000);
        }
    }

    // ==========================================
    // 8. INTERACTIVE RESUME PHOTO MODAL
    // ==========================================
    const resumeModal = document.getElementById("resume-modal");
    const viewResumeBtn = document.getElementById("view-resume-btn");
    const resumeModalClose = document.getElementById("resume-modal-close");
    const resumeModalCloseBtn = document.getElementById("resume-modal-close-btn");
    const resumeImg = document.getElementById("resume-img");

    if (viewResumeBtn && resumeModal) {
        // Open Modal
        viewResumeBtn.addEventListener("click", () => {
            // Try to load resume.pdf first, then fallback to resume.jpg
            const pdfContainer = document.getElementById("pdf-container");
            const resumePdf = document.getElementById("resume-pdf");
            const resumeImg = document.getElementById("resume-img");
            const resumeFallback = document.getElementById("resume-fallback");
            const downloadBtn = document.getElementById("resume-download-btn");

            // Default hide all viewers
            if (pdfContainer) pdfContainer.style.display = "none";
            if (resumeImg) resumeImg.style.display = "none";
            if (resumeFallback) resumeFallback.style.display = "none";

            fetch('resume.pdf', { method: 'HEAD' }).then(res => {
                if (res.ok) {
                    // Show PDF
                    if (resumePdf) resumePdf.src = 'resume.pdf';
                    if (pdfContainer) pdfContainer.style.display = 'block';
                    if (downloadBtn) { downloadBtn.href = 'resume.pdf'; downloadBtn.style.display = ''; }
                } else {
                    // Try image fallback
                    if (resumeImg) {
                        resumeImg.style.display = 'block';
                        resumeImg.onerror = () => {
                            if (resumeImg) resumeImg.style.display = 'none';
                            if (resumeFallback) resumeFallback.style.display = 'block';
                            if (downloadBtn) downloadBtn.style.display = 'none';
                        };
                        // Set download to PDF by default; if image present, browser download link will get the image file
                        if (downloadBtn) { downloadBtn.href = 'resume.jpg'; }
                    } else {
                        if (resumeFallback) resumeFallback.style.display = 'block';
                        if (downloadBtn) downloadBtn.style.display = 'none';
                    }
                }
            }).catch(() => {
                // Network error or file missing, show image or fallback
                if (resumeImg) {
                    resumeImg.style.display = 'block';
                }
                if (resumeFallback) resumeFallback.style.display = 'block';
                if (downloadBtn) downloadBtn.style.display = 'none';
            }).finally(() => {
                resumeModal.classList.add("active");
                document.body.style.overflow = "hidden"; // Disable background scrolling
            });
        });

        // Close Modal via click handlers
        const closeModal = () => {
            resumeModal.classList.remove("active");
            document.body.style.overflow = ""; // Enable background scrolling
        };

        resumeModalClose.addEventListener("click", closeModal);
        resumeModalCloseBtn.addEventListener("click", closeModal);

        // Close modal when clicking outside contents
        resumeModal.addEventListener("click", (e) => {
            if (e.target === resumeModal) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && resumeModal.classList.contains("active")) {
                closeModal();
            }
        });
    }

    // Set up error fallbacks if resume.jpg is not found
    if (resumeImg) {
        resumeImg.addEventListener("error", () => {
            resumeImg.classList.add("error");
            // Hide the download button if image is missing
            const downloadBtn = document.getElementById("resume-download-btn");
            if (downloadBtn) {
                downloadBtn.style.display = "none";
            }
        });
    }
});
