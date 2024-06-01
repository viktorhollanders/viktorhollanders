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

const projectsContainer = document.querySelector('#project_container');
console.log(projectsContainer);

getAllProjects().then(() => {
  projects.forEach((project) => {
    const newProject = document.createElement('h3');
    newProject.textContent = project.name;
    newProject.style.color = project.color;
    newProject.classList.add('project');
    projectsContainer.appendChild(newProject);
    console.log(project);
  });
});
