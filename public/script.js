let projects = [];

const checkColorThreshold = (color) => {
  const [r, g, b] = color;
  const threshold = [48, 48, 48];
  const [thresholdR, thresholdG, thresholdB] = threshold;

  return r <= thresholdR && g <= thresholdG && b <= thresholdB;
};

const getAllProjects = async () => {
  const baseURL = 'http://localhost:3000';
  const url = `${baseURL}/projects.json`;
  try {
    const response = await fetch(url);
    const projectData = await response.json();
    projects = projectData;

    console.log('Status: 200');
  } catch (error) {
    console.error('Error:', error);
  }
};

const projectsContainer = document.querySelector('#project-container');
const modal = document.querySelector('.modal');
let modalTitle = modal.querySelector('.project-title');
let modalShape = modal.querySelector('.project-shape');
let modalRole = modal.querySelector('.project-role');
let modalDescription = modal.querySelector('.project-description');
let modalWebsite = modal.querySelector('.project-website');
let modalGithub = modal.querySelector('.project-github');

const onClick = (e) => {
  const projectId = e.target.id;
  const project = projects.find((project) => project.id === parseInt(projectId));

  if (project) {
    modal.style.display = 'flex';
    const projectBtn = projectsContainer.querySelectorAll('.project');

    projectBtn.forEach((btn) => (btn.style.display = 'none'));

    modalTitle.textContent = project.name;

    // Update shape depending on if it is a square, triangle or circle.
    if (project.shape.toLowerCase() === 'triangle') {
      modalShape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
    } else if (project.shape.toLowerCase() === 'square') {
      modalShape.style.clipPath = 'circle(100%)';
    } else {
      modalShape.style.clipPath = 'circle(50%)';
    }

    // Make color lighter if a certain threshold is met
    const toDark = checkColorThreshold(project.color);
    let rgbColor; // the rgb color of the project
    if (toDark) {
      const opacity = 0.5;
      rgbColor = `rgb(${project.color.join(',')}, ${opacity})`;
    } else {
      rgbColor = `rgb(${project.color})`;
    }
    modalShape.style.backgroundColor = rgbColor;

    modalRole.textContent = project.role;
    modalDescription.textContent = project.description;

    // Check if website exists
    if (project.website === '#') {
      modalWebsite.style.display = 'none';
    } else {
      modalWebsite.href = project.website;
      modalWebsite.style.display = 'block';
    }

    if (project.github == '#') {
      modalGithub.style.display = 'none';
    } else {
      modalGithub.href = project.github;
      modalGithub.style.display = 'block';
    }
  }
};

getAllProjects().then(() => {
  projects.forEach((project) => {
    const newProject = document.createElement('h3');
    newProject.textContent = project.name;
    newProject.style.color = `rgb(${project.color})`;
    newProject.classList.add('project');
    newProject.id = project.id;
    newProject.addEventListener('click', onClick);
    projectsContainer.appendChild(newProject);
  });
});

const closeBtn = modal.querySelector('.btn-close');

const closeModal = () => {
  modal.style.display = 'none';
  const projectBtn = projectsContainer.querySelectorAll('.project');

  projectBtn.forEach((btn) => (btn.style.display = 'block'));
};

closeBtn.addEventListener('click', closeModal);
