import { projects } from './data/projects.js';

/**
 * Highly optimized Intersection Observer system for autoplaying muted videos
 * on-screen and auto-pausing them when they scroll off-screen.
 */
const createVideoObserver = () => {
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        // Attempt unmuted audio playback first (permissible due to prior user click/navigation gesture)
        video.muted = false;
        video.play().catch(err => {
          console.log('Unmuted autoplay blocked by browser, falling back to muted:', err);
          // Fallback to muted playback if browser blocks unmuted audio autoplay
          video.muted = true;
          video.play().catch(e => console.log('Muted autoplay blocked:', e));
        });
      } else {
        video.pause();
      }
    });
  }, {
    threshold: 0.15 // Play/pause when 15% of the video is visible
  });
};

/**
 * Loads project metadata, copies information to the DOM,
 * and builds the media gallery dynamically with full performance optimization.
 */
const loadProjectDetails = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    window.location.href = 'index.html#projects';
    return;
  }
  
  // Set window titles
  document.getElementById('project-title').textContent = project.title;
  document.title = `${project.title} - Mohammed Godil`;
  
  // Set project text values
  document.getElementById('detail-title').innerHTML = project.title;
  document.getElementById('detail-focus').textContent = project.focus;
  document.getElementById('detail-year').textContent = project.year;
  document.getElementById('detail-description').textContent = project.description;
  
  // Update technology/software label and value based on category
  const techLabel = document.getElementById('tech-label');
  const softwareElement = document.getElementById('detail-software');
  
  if (project.category === 'design') {
    techLabel.textContent = 'Software';
    softwareElement.textContent = project.software;
  } else if (project.category === 'coding' || project.category === 'design-coding') {
    techLabel.textContent = 'Technologies';
    softwareElement.textContent = project.technologies;
  }
  
  // Control visibility of the live project button
  const liveButton = document.getElementById('live-project-button');
  if (project.liveUrl) {
    liveButton.href = project.liveUrl;
    liveButton.style.display = 'inline-block';
    liveButton.textContent = project.liveText || 'View Project';
  } else {
    liveButton.style.display = 'none';
  }
  
  // Populate the media grid
  const galleryGrid = document.getElementById('gallery-grid');
  if (project.id === 'digiphy-interactive-experience' || project.id === 'the-invisible-pulse') {
    galleryGrid.classList.add('project-gallery__grid--full-width');
  }
  
  const videoObserver = createVideoObserver();
  
  project.images.forEach((mediaSrc, index) => {
    const container = document.createElement('div');
    container.className = 'gallery-image-container';
    
    const isVideo = mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.webm') || mediaSrc.endsWith('.mov');
    
    if (isVideo) {
      const video = document.createElement('video');
      video.src = mediaSrc;
      video.className = 'gallery-image';
      video.controls = true;      // Native controls for unmuting and scrubbing
      video.loop = true;
      video.muted = true;         // Required for browser autoplay policies
      video.playsInline = true;
      video.preload = 'metadata'; // Performance: only load video headers initially
      
      container.appendChild(video);
      videoObserver.observe(video);
    } else {
      const img = document.createElement('img');
      img.src = mediaSrc;
      img.alt = `${project.title} - Image ${index + 1}`;
      img.className = 'gallery-image';
      img.loading = 'lazy';       // Native lazy loading for images
      
      container.appendChild(img);
    }
    
    galleryGrid.appendChild(container);
  });
};

loadProjectDetails();

/**
 * Mobile Navigation Drawer Interactions
 */
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

const initNavigationSystem = () => {
  const $navButton = document.querySelector(".nav__button");
  const $navList = document.querySelector(".nav__list");
  const listItems = $navList.querySelectorAll("li a");
  const closingButton = document.querySelector(".closing__button");

  $navButton.addEventListener("click", () => toggleNavigation($navButton, $navList));
  closingButton.addEventListener("click", () => closeNavigation($navButton, $navList));
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

initNavigationSystem();