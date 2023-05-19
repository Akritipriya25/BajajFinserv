fetch('./data.json')
.then(response => response.json())
.then(data => {
  data = data.employees;
  const developerList = document.getElementById('developerList');
  const searchNameInput = document.getElementById('searchName');
  const filterDesignationSelect = document.getElementById('filterDesignation');
  const filterSkillsSelect = document.getElementById('filterSkills');

  renderDevelopers(data);

  searchNameInput.addEventListener('input', handleSearch);
  filterDesignationSelect.addEventListener('change', handleFilter);
  filterSkillsSelect.addEventListener('change', handleFilter);

  function renderDevelopers(developers) {
    developerList.innerHTML = '';

    developers.forEach(developer => {
      const li = document.createElement('li');
      const h3 = document.createElement('h3');
      const pDesignation = document.createElement('p');
      const pSkills = document.createElement('p');

      h3.textContent = developer.name;
      pDesignation.textContent = 'Designation: ' + developer.designation;
      pSkills.textContent = 'Skills: ' + developer.skills.join(', ');

      li.appendChild(h3);
      li.appendChild(pDesignation);
      li.appendChild(pSkills);

      developerList.appendChild(li);
    });
  }

  function handleSearch() {
    const searchName = searchNameInput.value.toLowerCase();

    const filteredDevelopers = [data.find(developer =>
      developer.name.toLowerCase() === searchName
    )];

    renderDevelopers(filteredDevelopers);
  }

  function handleFilter() {
    const selectedDesignation = filterDesignationSelect.value;
    const selectedSkills = Array.from(filterSkillsSelect.selectedOptions, option => option.value);

    const filteredDevelopers = data.filter(developer => {
      const designationMatch = selectedDesignation ? developer.designation === selectedDesignation : true;
      const skillsMatch = selectedSkills.length === 0 ? true : developer.skills.some(skill => selectedSkills.includes(skill));

      return designationMatch && skillsMatch;
    });

    renderDevelopers(filteredDevelopers);
  }
})
.catch(error => {
  console.error('Error fetching data:', error);
})


