const projectsContainer = document.getElementById('project-container');

const baseURL = 'http://localhost:3000/';

const fetchData = async (filename) => {
  try {
    const response = await fetch(`${baseURL}${filename}.json`);
    if (!response) {
      throw new Error(`${filename} not available`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was an error:', error);
  }
};

let projects = await fetchData('projects');

const generateShape = (projectShape) => {
  const shape = projectShape.toLowerCase();
  if (shape === 'triangle') {
    return 'polygon(50% 0%, 0% 100%, 100% 100%)';
  } else if (shape === 'square') {
    return 'circle(100%)';
  } else {
    return 'circle(50%)';
  }
};

const formatShapeColor = (color) => {
  const [r, g, b] = color;
  const isDark = r <= 48 && g <= 48 && b <= 48;

  return isDark ? `rgba(${color.join(',')}, 0.5)` : `rgb(${color.join(',')})`;
};

const generateModalHtml = (project) => {
  let clipPathValue = generateShape(project.shape);
  return `
   <div class="modal">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
        <p>X</p>
      </button>
      <div class="modal-header">
        <div class="shape-title">
          <div class="project-shape" style="clip-path: ${clipPathValue}"></div>
          <h4 class="project-title">${project.name}</h4>
        </div>
      </div>
      <div class="modal-body">
        <p class="project-role">${project.role}</p>
        <p class="project-description copy">
          ${project.description}
        </p>
        <div class="project-links">
          <a class="link project-website" href="${project.website}" target="_blank" rel="noreferrer"
            >Website</a
          >
          <a class="link project-github" href="${project.github}" target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
    </div>
  `;
};

const onClick = (e) => {
  const projectId = e.target.id;
  const project = projects.find((p) => p.id === parseInt(projectId));

  projectsContainer.insertAdjacentHTML('beforeend', generateModalHtml(project));

  const modal = document.querySelector('.modal');

  const projectShape = modal.querySelector('.project-shape');
  projectShape.style.backgroundColor = formatShapeColor(project.color);

  const closeBtn = modal.querySelector('.btn-close');
  closeBtn.addEventListener('click', closeModal);

  if (project) {
    modal.style.display = 'flex';
    const projectBtn = projectsContainer.querySelectorAll('.project');

    projectBtn.forEach((btn) => (btn.style.display = 'none'));
  }
};

const closeModal = () => {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
  const projectBtn = projectsContainer.querySelectorAll('.project');
  projectBtn.forEach((btn) => (btn.style.display = 'block'));
};

projects.forEach((project) => {
  const newProject = document.createElement('h3');
  newProject.textContent = project.name;
  newProject.style.color = `rgb(${project.color})`;
  newProject.classList.add('project');
  newProject.id = project.id;
  newProject.addEventListener('click', onClick);
  projectsContainer.appendChild(newProject);
});
