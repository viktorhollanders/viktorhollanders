let projects = [];

const getAllProjects = async () => {
  const url = 'http://localhost:3000/projects.json';
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
console.log(projectsContainer);

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
    console.log(project);
    modalTitle.textContent = project.name;
    modalShape.style.backgroundColor = `rgb(${project.color})`;
    modalRole.textContent = project.role;
    modalDescription.textContent = project.description;
    modalWebsite.href = project.website;
    modalGithub.href = project.github;
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
