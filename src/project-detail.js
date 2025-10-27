import { projects } from './data/projects.js';

function loadProjectDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    window.location.href = 'index.html#projects';
    return;
  }
  
  // Update page title
  document.getElementById('project-title').textContent = project.title;
  document.title = `${project.title} - Mohammed Godil`;
  
  // Update project details
//   document.getElementById('detail-title').innerHTML = project.title;
//   document.getElementById('detail-focus').textContent = project.focus;
//   document.getElementById('detail-year').textContent = project.year;
//   document.getElementById('detail-software').textContent = project.software;
//   document.getElementById('detail-description').textContent = project.description;


// Update project details
document.getElementById('detail-title').innerHTML = project.title;
document.getElementById('detail-focus').textContent = project.focus;
document.getElementById('detail-year').textContent = project.year;
document.getElementById('detail-description').textContent = project.description;

// Update software/technologies label AND value based on category
const techLabel = document.getElementById('tech-label');
if (project.category === 'design') {
  techLabel.textContent = 'Software';
  document.getElementById('detail-software').textContent = project.software;
} else if (project.category === 'coding') {
  techLabel.textContent = 'Technologies';
  document.getElementById('detail-software').textContent = project.technologies;
}

// Show "See the project" button if liveUrl exists
const liveButton = document.getElementById('live-project-button');
if (project.liveUrl) {
  liveButton.href = project.liveUrl;
  liveButton.style.display = 'inline-block';
} else {
  liveButton.style.display = 'none';
}

   
  

// Populate image gallery with <img> tags OR <video> tags
const galleryGrid = document.getElementById('gallery-grid');
project.images.forEach((mediaSrc, index) => {
  const container = document.createElement('div');
  container.className = 'gallery-image-container';
  

// Check if it's a video file
if (mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.webm') || mediaSrc.endsWith('.mov')) {
  const video = document.createElement('video');
  video.src = mediaSrc;
  video.className = 'gallery-image';
  video.controls = true;  // ← Add controls
  video.loop = true;
  video.muted = false;    // ← Allow sound
  video.playsInline = true;
  
  container.appendChild(video);
}
  else {
    const img = document.createElement('img');
    img.src = mediaSrc;
    img.alt = `${project.title} - Image ${index + 1}`;
    img.className = 'gallery-image';
    img.loading = 'lazy';
    
    container.appendChild(img);
  }
  
  galleryGrid.appendChild(container);
});


}


loadProjectDetails();





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