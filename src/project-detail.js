// import { projects } from './data/projects.js';

// function loadProjectDetails() {
//   // Get project ID from URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const projectId = urlParams.get('id');
  
//   // Find project
//   const project = projects.find(p => p.id === projectId);
  
//   if (!project) {
//     window.location.href = 'index.html#projects';
//     return;
//   }
  
//   // Update page title
//   document.getElementById('project-title').textContent = project.title;
//   document.title = `${project.title} - Mohammed Godil`;
  
//   // Update project details
//   document.getElementById('detail-title').textContent = project.title;
//   document.getElementById('detail-focus').textContent = project.focus;
//   document.getElementById('detail-year').textContent = project.year;
//   document.getElementById('detail-software').textContent = project.software;
//   document.getElementById('detail-description').textContent = project.description;
  
//   // Populate image gallery
//   const galleryGrid = document.getElementById('gallery-grid');
//   project.images.forEach(imageSrc => {
//     const imgDiv = document.createElement('div');
//     imgDiv.className = 'gallery-image';
//     imgDiv.style.backgroundImage = `url('${imageSrc}')`;
//     galleryGrid.appendChild(imgDiv);
//   });
// }

// // document.addEventListener('DOMContentLoaded', loadProjectDetails);


// loadProjectDetails();



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
  document.getElementById('detail-title').innerHTML = project.title;
  document.getElementById('detail-focus').textContent = project.focus;
  document.getElementById('detail-year').textContent = project.year;
  document.getElementById('detail-software').textContent = project.software;
  document.getElementById('detail-description').textContent = project.description;
  
  // Populate image gallery with <img> tags
  const galleryGrid = document.getElementById('gallery-grid');
  project.images.forEach((imageSrc, index) => {
    const container = document.createElement('div');
    container.className = 'gallery-image-container';
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = `${project.title} - Image ${index + 1}`;
    img.className = 'gallery-image';
    img.loading = 'lazy'; // Lazy load for performance
    
    container.appendChild(img);
    galleryGrid.appendChild(container);
  });
}

document.addEventListener('DOMContentLoaded', loadProjectDetails);






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