import "../src/css/style.css";

const openNavigation = ($navButton, $navList) => {
  $navButton.setAttribute("aria-expanded", "true");
  $navList.classList.add("abc");
};

const closeNavigation = ($navButton, $navList) => {
  $navButton.setAttribute("aria-expanded", "false");
  $navList.classList.remove("abc");
};

const toggleNavigation = ($navButton, $navList) => {
  const open = $navButton.getAttribute("aria-expanded");
  open === "false"
    ? openNavigation($navButton, $navList)
    : closeNavigation($navButton, $navList);
};

const navigation = () => {
  const $navButton = document.querySelector(".nav__button");
  const $navList = document.querySelector(".nav__list");
  const listItems = $navList.querySelectorAll("li a");
  const closingButton = document.querySelector(".closing__button");

  $navButton.addEventListener("click", () =>
    toggleNavigation($navButton, $navList)
  );

  closingButton.addEventListener("click", () =>
    closeNavigation($navButton, $navList)
  );

  listItems.forEach((link) => {
    link.addEventListener("click", () => closeNavigation($navButton, $navList));
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      $navButton.focus();
      closeNavigation($navButton, $navList);
    }
  });
};

navigation();

const expandableProjects = document.querySelectorAll(".expandable-item");

expandableProjects.forEach((project, index) => {
  const projectBoxes = project.querySelector(".project-boxes");

  project.addEventListener("click", function () {
    this.classList.toggle("expanded");
    projectBoxes.classList.toggle("expanded");
  });

  project.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  });

  project.setAttribute("tabindex", "0");
});

function initDraggableNotes(
  containerSelector = ".stack",
  noteSelector = ".note"
) {
  const container = document.querySelector(containerSelector);
  const notes = container.querySelectorAll(noteSelector);

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  notes.forEach((note) => {
    let start = { x: 0, y: 0 };
    let pos = {
      x: parseFloat(note.style.getPropertyValue("--x")) || 50,
      y: parseFloat(note.style.getPropertyValue("--y")) || 50,
    };

    note.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      note.setPointerCapture(e.pointerId);

      const rect = container.getBoundingClientRect();
      start.x = ((e.clientX - rect.left) / rect.width) * 100 - pos.x;
      start.y = ((e.clientY - rect.top) / rect.height) * 100 - pos.y;

      const move = (ev) => {
        const r = container.getBoundingClientRect();
        const x = ((ev.clientX - r.left) / r.width) * 100 - start.x;
        const y = ((ev.clientY - r.top) / r.height) * 100 - start.y;

        pos.x = clamp(x, 5, 95);
        pos.y = clamp(y, 5, 95);

        note.style.setProperty("--x", pos.x + "%");
        note.style.setProperty("--y", pos.y + "%");
      };

      const up = (ev) => {
        note.releasePointerCapture(ev.pointerId);
        note.removeEventListener("pointermove", move);
        note.removeEventListener("pointerup", up);
        note.removeEventListener("pointercancel", up);
      };

      note.addEventListener("pointermove", move);
      note.addEventListener("pointerup", up);
      note.addEventListener("pointercancel", up);
    });
  });
}

initDraggableNotes();





gsap.registerPlugin(ScrollTrigger);

    // Request animation frame loop
    const raf = (time) => {
        requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Split text into individual character spans
    const splitTextIntoChars = (element) => {
        const text = element.textContent;
        element.innerHTML = '';
        
        const chars = [];
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            element.appendChild(span);
            chars.push(span);
        }
        
        return chars;
    };

    // Debounce utility function
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    // Main animation class
    class ClassicSmooth {
        constructor(textSelector, mainSelector, textConSelector) {
            this.textRef = document.querySelector(textSelector);
            this.mainRef = document.querySelector(mainSelector);
            this.textConRef = document.querySelector(textConSelector);
            this.scrollTween = null;
            this.characters = [];
            this.isMobile = window.innerWidth < 768;
            
            this.init();
        }

        init() {
            if (!this.textRef || !this.mainRef || !this.textConRef) {
                console.error('[ClassicSmooth] Required elements not found');
                return;
            }

            // Only run animation on desktop
            if (!this.isMobile) {
                this.initAnimation();
            }
            
            this.setupResize();
        }

        initAnimation() {
            this.characters = splitTextIntoChars(this.textRef);
            const scrub = 0.5;

            // Set initial position - text starts off-screen to the right
            gsap.set(this.textConRef, { 
                x: window.innerWidth * 1.1,
                willChange: 'transform' 
            });

            // Calculate the full width of text
            const textWidth = this.textConRef.offsetWidth;
            
            // Calculate the total distance text needs to travel
            // From right edge of screen to completely off the left edge
            const totalDistance = window.innerWidth + textWidth;
            
            // Main horizontal scroll animation with PIN enabled
            this.scrollTween = gsap.to(this.textConRef, {
                x: -textWidth - 200, // Extra padding to ensure complete scroll
                ease: 'none',
                scrollTrigger: {
                    trigger: this.mainRef,
                    pin: true, // PIN THE SECTION - keeps it locked while animating
                    start: 'top top',
                    end: () => `+=${totalDistance * 1}`, // Scroll distance needed
                    scrub: scrub,
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                }
            });

            // Animate each character individually
            this.characters.forEach((char, index) => {
                // Set initial character state - rotated and positioned above
                gsap.set(char, { 
                    rotate: 45,
                    y: -180,
                    willChange: 'transform' 
                });

                // Create timeline for each character animation
                const tl = gsap.timeline({
                    defaults: { ease: 'none' },
                    scrollTrigger: {
                        trigger: char,
                        start: 'left 85%',
                        end: 'left 25%',
                        containerAnimation: this.scrollTween,
                        scrub: 0.3,
                        invalidateOnRefresh: true,
                    }
                });

                // Animate character to final position
                tl.to(char, {
                    rotate: 0,
                    y: 0,
                    duration: 1
                });
            });

            console.log('[ClassicSmooth] Animation initialized with', this.characters.length, 'characters');
            console.log('[ClassicSmooth] Text width:', textWidth, 'Total distance:', totalDistance);
        }

        setupResize() {
            const handleResize = debounce(() => {
                const wasMobile = this.isMobile;
                this.isMobile = window.innerWidth < 768;
                
                // Reload if switching between mobile/desktop
                if (wasMobile !== this.isMobile) {
                    window.location.reload();
                } else {
                    console.log('[ClassicSmooth] Refreshing ScrollTrigger on resize');
                    ScrollTrigger.refresh();
                }
            }, 600);

            window.addEventListener('resize', handleResize);
        }
    }

  
    new ClassicSmooth('#scroll-text', '#scroll-main', '#text-container');