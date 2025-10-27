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





// Projects Gallery and Expandable Functionality
// const initProjectsInteraction = () => {
//   const expandableProjects = document.querySelectorAll(".expandable-item");
//   const projectsGallery = document.getElementById('projects-gallery');
//   const projectsGalleryImages = document.getElementById('projects-gallery-images');
//   const projectsList = document.querySelector('.projects-list');
//   const imageHeight = 320;

//   // Check if desktop
//   const isDesktop = () => window.innerWidth >= 1024;

//   // Mobile: Expand functionality
//   expandableProjects.forEach((project) => {
//     const projectBoxes = project.querySelector(".project-boxes");

//     project.addEventListener("click", function () {
//       if (!isDesktop()) {
//         this.classList.toggle("expanded");
//         projectBoxes.classList.toggle("expanded");
//       }
//     });

//     project.addEventListener("keydown", function (e) {
//       if ((e.key === "Enter" || e.key === " ") && !isDesktop()) {
//         e.preventDefault();
//         this.click();
//       }
//     });

//     project.setAttribute("tabindex", "0");
//   });

//   // Desktop: Hover gallery functionality
//   if (isDesktop() && projectsGallery && projectsGalleryImages) {
//     // Hide gallery initially
//     gsap.set(projectsGallery, { autoAlpha: 0 });

//     // Show/hide gallery
//     projectsList.addEventListener('mouseenter', () => {
//       if (isDesktop()) {
//         gsap.to(projectsGallery, {
//           autoAlpha: 1,
//           duration: 0.3,
//           ease: 'power2.out'
//         });
//       }
//     });

//     projectsList.addEventListener('mouseleave', () => {
//       gsap.to(projectsGallery, {
//         autoAlpha: 0,
//         duration: 0.3,
//         ease: 'power2.in'
//       });
//     });

//     // Move gallery with cursor
//     window.addEventListener('mousemove', (e) => {
//       if (isDesktop()) {
//         gsap.to(projectsGallery, {
//           top: e.clientY,
//           left: e.clientX,
//           xPercent: -20,
//           yPercent: -50,
//           duration: 0.4,
//           ease: 'power2.out'
//         });
//       }
//     });

//     // Change image on project hover
//     expandableProjects.forEach((project) => {
//       project.addEventListener('mouseenter', () => {
//         if (isDesktop()) {
//           const index = parseInt(project.dataset.index);
          
//           gsap.to(projectsGalleryImages, {
//             y: -imageHeight * index,
//             duration: 0.6,
//             ease: 'power3.out'
//           });
//         }
//       });
//     });
//   }
// };

// // Initialize
// initProjectsInteraction();







// Import project data
import { projects } from './data/projects.js';

const initProjectsInteraction = () => {
  const expandableProjects = document.querySelectorAll(".expandable-item");
  const projectsGallery = document.getElementById('projects-gallery');
  const projectsGalleryImages = document.getElementById('projects-gallery-images');
  const projectsList = document.querySelector('.projects-list');
  const imageHeight = 320;

  // Check if desktop
  const isDesktop = () => window.innerWidth >= 1024;

  // Handle project clicks - navigate to detail page
  expandableProjects.forEach((project) => {
    const projectBoxes = project.querySelector(".project-boxes");
    
    // Get project ID from data attribute
    const projectIndex = parseInt(project.dataset.index);
    const projectData = projects[projectIndex];
    
    if (!projectData) return;

    // Click handler for navigation
    // project.addEventListener("click", function (e) {
    //   // Navigate to project detail page
    //   window.location.href = `project-template.html?id=${projectData.id}`;
    // });


    // Map data-index to project IDs
    const projectMap = {
      0: 'mixbox',
      1: 'menu-design',
      2: 'flower-workshop',
      3: 'kickstarter',
      4: 'webrtc-smoothie-maker',
      5: 'generative-poster-tool',
      6: 'photo-booth-app'
    };

    // Add click handlers to all projects
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((project) => {
      project.addEventListener('click', function() {
        const index = this.getAttribute('data-index');
        const projectId = projectMap[index];
        
        if (projectId) {
          window.location.href = `project-template.html?id=${projectId}`;
        }
      });
    });



    // Keyboard accessibility
    project.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.location.href = `project-template.html?id=${projectData.id}`;
      }
    });

    project.setAttribute("tabindex", "0");
  });

  // Desktop: Hover gallery functionality
  if (isDesktop() && projectsGallery && projectsGalleryImages) {
    // Hide gallery initially
    gsap.set(projectsGallery, { autoAlpha: 0 });

    // Show/hide gallery
    projectsList.addEventListener('mouseenter', () => {
      if (isDesktop()) {
        gsap.to(projectsGallery, {
          autoAlpha: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });

    projectsList.addEventListener('mouseleave', () => {
      gsap.to(projectsGallery, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    });

    // Move gallery with cursor
    window.addEventListener('mousemove', (e) => {
      if (isDesktop()) {
        gsap.to(projectsGallery, {
          top: e.clientY,
          left: e.clientX,
          xPercent: -20,
          yPercent: -50,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });

    // Change image on project hover
    expandableProjects.forEach((project) => {
      project.addEventListener('mouseenter', () => {
        if (isDesktop()) {
          const index = parseInt(project.dataset.index);
          
          gsap.to(projectsGalleryImages, {
            y: -imageHeight * index,
            duration: 0.6,
            ease: 'power3.out'
          });
        }
      });
    });
  }
};

// Initialize
initProjectsInteraction();










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






// function initExpertiseAnimation() {
//   if (window.innerWidth < 900) return;

//   const expertiseSection = document.querySelector('.expertise');
//   const expertiseCards = gsap.utils.toArray('.expertise-card');

//   ScrollTrigger.getAll().forEach(trigger => {
//     if (trigger.vars && trigger.vars.trigger === expertiseSection) {
//       trigger.kill();
//     }
//   });


//   ScrollTrigger.create({
//     trigger: expertiseSection,
//     start: 'top top', // Pin when section reaches top
//     end: `+=${window.innerHeight * 2}`, // Pin for 2 viewport heights
//     pin: true, // PIN THE SECTION
//     scrub: 1,
//     onUpdate: (self) => {
//       const progress = self.progress; // 0 to 1

//       expertiseCards.forEach((card, index) => {
//         const slideInStagger = 0.075;
//         const xRotationDuration = 0.4;
//         const xRotationStart = index * slideInStagger;
//         const xRotationEnd = xRotationStart + xRotationDuration;

//         if (progress >= xRotationStart && progress <= xRotationEnd) {
//           // Card is animating
//           const cardProgress = (progress - xRotationStart) / xRotationDuration;
//           const cardInitialX = 300 - (index * 100);
//           const cardTargetX = 0;
//           const cardSlideInX = cardInitialX + (cardProgress * (cardTargetX - cardInitialX));
//           const cardSlideInRotation = 20 - (cardProgress * 20);
          
//           gsap.set(card, {
//             x: `${cardSlideInX}%`,
//             rotation: cardSlideInRotation,
//             scale: 0.75 + (cardProgress * 0.25)
//           });
//         } else if (progress > xRotationEnd) {
//           // Card finished animating - at final position
//           gsap.set(card, {
//             x: '0%',
//             rotation: 0,
//             scale: 1
//           });
//         } else {
//           // Card hasn't started yet - at initial position
//           const cardInitialX = 300 - (index * 100);
//           gsap.set(card, {
//             x: `${cardInitialX}%`,
//             rotation: 20,
//             scale: 0.75
//           });
//         }
//       });
//     }
//   });
// }



// initExpertiseAnimation();


// let resizeTimeout;
// window.addEventListener('resize', () => {
//   clearTimeout(resizeTimeout);
//   resizeTimeout = setTimeout(() => {
//     initExpertiseAnimation();
//   }, 300);
// });









// Rolling character animation for PROJECTS title
const initProjectsTitleAnimation = () => {
  function splitTextIntoCharsRolling(element) {
    const text = element.textContent.trim();
    element.innerHTML = '';
    
    const chars = [];
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charContainer = document.createElement('div');
      charContainer.style.display = 'inline-block';
      charContainer.style.overflow = 'hidden';
      charContainer.style.position = 'relative';
      charContainer.style.height = '1em';
      charContainer.style.verticalAlign = 'top';
      
      const txt = char === ' ' ? '\u00A0' : char;
      
      const wrapper = document.createElement('div');
      wrapper.className = 'char-wrapper';
      
      for (let j = 0; j < 3; j++) {
        const charItem = document.createElement('div');
        charItem.className = 'char-item';
        charItem.textContent = txt;
        wrapper.appendChild(charItem);
      }
      
      charContainer.appendChild(wrapper);
      element.appendChild(charContainer);
      
      chars.push({ container: charContainer, wrapper: wrapper });
    }
    
    return chars;
  }

  const projectsTitle = document.querySelector('#projects-title');
  if (!projectsTitle) return;
  
  const chars = splitTextIntoCharsRolling(projectsTitle);

  chars.forEach((charObj, i) => {
    if (i % 2 !== 0) return;
    const { wrapper } = charObj;
    
    // Alternate direction
    const direction = i % 2 === 0 ? 1 : -1;
    
    // Start at middle position
    gsap.set(wrapper, {
      yPercent: -33.333
    });

    
    ScrollTrigger.create({
      trigger: '.projects-title-stage',
      start: 'center center',
      end: 'center center',
      // markers: true,
      onEnter: () => {
        gsap.fromTo(wrapper, 
          { yPercent: direction === 1 ? -66.666 : 0 },
          {
            yPercent: -33.333,
            duration: 0.5,
            delay: i * 0.025,
            ease: 'power2.out'
          }
        );
      },
      onEnterBack: () => {
        gsap.fromTo(wrapper, 
          { yPercent: direction === 1 ? 0 : -66.666 },
          {
            yPercent: -33.333,
            duration: 0.5,
            delay: i * 0.025,
            ease: 'power2.out'
          }
        );
      }
    });
  });
}

initProjectsTitleAnimation();









// ===== SMOOTH SCROLLING SETUP =====
const initSmoothScrolling = () => {
  const lenis = new Lenis({ 
    lerp: 0.15,
    smoothWheel: true
  });
  
  // Sync ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);
  
  // Sync GSAP ticker with Lenis
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  
  // Turn off GSAP's lag smoothing
  gsap.ticker.lagSmoothing(0);
};

// ===== EXPERTISE SECTION ANIMATION =====
const animateExpertiseSection = () => {
  const section = document.querySelector('[data-grid-expertise]');
  
  // Exit if section doesn't exist
  if (!section) return;
  
  const cards = section.querySelectorAll('.expertise__item');
  const title = section.querySelector('.expertise__title');
  const middleIndex = Math.floor(cards.length / 2);

  // Create animation timeline
  gsap.timeline({
    defaults: {
      ease: 'power3'
    },
    scrollTrigger: {
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      scrub: 0.5,
    }
  })
  // Animate title
  .from(title, {
    yPercent: 50,
    autoAlpha: 0,
    duration: 0.3
  })
  // Animate cards from center with rotation
  .from(cards, {
    stagger: {
      amount: 0.3,
      from: 'center'
    },
    y: window.innerHeight * 0.5,
    transformOrigin: '50% 0%',
    rotation: (pos) => {
      const distanceFromCenter = Math.abs(pos - middleIndex);
      return pos < middleIndex ? distanceFromCenter * 3 : distanceFromCenter * -3;
    },
    autoAlpha: 0
  }, 0.2);
};

// ===== INITIALIZE ANIMATIONS =====
const initGSAPAnimations = () => {
  initSmoothScrolling();
  animateExpertiseSection();
};

// Initialize on page load
window.addEventListener('load', initGSAPAnimations);