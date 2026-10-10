document.addEventListener("DOMContentLoaded", () => {
    // =========================================================
    // Reveal on scroll
    // =========================================================
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    // =========================================================
    // Mobile menu
    // =========================================================
    
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
        }
    });
}



    
    // =========================================================
    // Controles do vídeo de apresentação
    // =========================================================
    document.querySelectorAll(".video-wrapper").forEach((wrapper) => {
        const video = wrapper.querySelector("video");
        const overlay = wrapper.querySelector(".video-overlay");

        if (!video || !overlay) return;

        // Clicar no botão inicia a reprodução
        overlay.addEventListener("click", () => {
            video.play().catch((error) => {
                console.error("Não foi possível reproduzir o vídeo:", error);
            });
        });

        // Oculta o botão quando o vídeo começa a tocar
        video.addEventListener("play", () => {
            overlay.classList.add("hidden");
        });

        // Reexibe o botão quando o vídeo é pausado
        video.addEventListener("pause", () => {
            overlay.classList.remove("hidden");
        });

        // Reexibe o botão ao terminar
        video.addEventListener("ended", () => {
            overlay.classList.remove("hidden");
        });
    });


    // =========================================================
    // Active navigation based on current section
    // =========================================================
    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navItems.forEach((item) => {
                    item.classList.toggle(
                        "active",
                        item.getAttribute("href") === `#${entry.target.id}`
                    );
                });
            });
        },
        {
            threshold: 0.35,
            rootMargin: "-20% 0px -55% 0px"
        }
    );


    sections.forEach((section) => sectionObserver.observe(section));

    // =========================================================
    // Footer year
    // =========================================================
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // =========================================================
    // Particles.js
    // =========================================================
    if (typeof particlesJS !== "undefined") {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },

                color: {
                    value: "#ffffff"
                },

                shape: {
                    type: "circle"
                },

                opacity: {
                    value: 0.5,
                    random: false
                },

                size: {
                    value: 3,
                    random: true
                },

                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out"
                }
            },

            interactivity: {
                detect_on: "canvas",

                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },

                    onclick: {
                        enable: true,
                        mode: "push"
                    }
                },

                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },

                    push: {
                        particles_nb: 4
                    }
                }
            },

            retina_detect: true
        });
    }
});
