import { projects } from './data/projects.js';

function loadProjectDetails() {
  // Get project ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  
  // Find project
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    window.location.href = 'index.html#projects';
    return;
  }
  
  // Update page title
  document.getElementById('project-title').textContent = project.title;
  document.title = `${project.title} - Mohammed Godil`;
  
  // Update project details
  document.getElementById('detail-title').textContent = project.title;
  document.getElementById('detail-focus').textContent = project.focus;
  document.getElementById('detail-year').textContent = project.year;
  document.getElementById('detail-software').textContent = project.software;
  document.getElementById('detail-description').textContent = project.description;
  
  // Populate image gallery
  const galleryGrid = document.getElementById('gallery-grid');
  project.images.forEach(imageSrc => {
    const imgDiv = document.createElement('div');
    imgDiv.className = 'gallery-image';
    imgDiv.style.backgroundImage = `url('${imageSrc}')`;
    galleryGrid.appendChild(imgDiv);
  });
}

document.addEventListener('DOMContentLoaded', loadProjectDetails);