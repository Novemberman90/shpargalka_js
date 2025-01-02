// Как я выводил список навыков, выполеных работ контактов и т.д. используя массив данных. 
// Список генерируется ul и выводится информация в li


const data = {
  "phone": ['+380638286820', '+38 (063) 82 86 820'],
  "email":'alexledovit@gmail.com',
  "telegram":'https://t.me/@NovemberMan90',
  "linkedIn":'https://www.linkedin.com/in/alexey-ivashchenko-45b668a1',
  "github":'https://github.com/Novemberman90',
  "skills": [
    "HTML5",
    "Bootstrap",
    "CSS3",
    "SCSS",
    "JavaScript",
    "jQuery",
    "GULP",
    "WebPack",
    "Git",
    "Figma",
    "PhotoShop",
  ],
  "softSkills": [
    "Teamwork",
    "Responsibility",
  ]
};

const projectsData = [
    {
      "link": "https://novemberman90.github.io/lavuri_desing/",
      "name": "Lavuri desing",
      "tech": "HTML5, SCSS, JS",
    },
  
    {
      "link": "https://novemberman90.github.io/flowers_valley/dist/index.html",
      "name": "Flowers Valley",
      "tech": "HTML5, SCSS, jQuery, GULP",
    },
  
  {
    "link": "https://novemberman90.github.io/food_house_v2/",
    "name": "Food House",
    "tech": "HTML, SCSS, JS",
  },

  {
    "link":  "https://novemberman90.github.io/euphoria/dist/index.html",
    "name":  "Euphoria",
    "tech":  "HTML5, SCSS, jQuery, GULP",
  },
  
  {
    "link":  "https://stellular-mochi-dc666e.netlify.app/",
    "name":  "Weather App",
    "tech":  "HTML5, CSS, Bootstrap, weathers API, JS",
  },
];



  /* skills */

  const teckSkillsList = document.querySelector('.tech__list'),
        softSkillsList = document.querySelector('.soft__list'),
        projectsList = document.querySelector('.projects__list');
  
  const renderList = (element,data,itemCallback) => {
    if (!element || !data ) return;
    element.innerHTML = data.map(itemCallback).join('');
    // вот эта конструкция заменяет проверку и обработку всех видов списка поскольку принцип проверки и вывода одинаковый, то могу сократить всё до такой записи
   // Упрощает процесс рендеринга любого списка. Она принимает:
   // element — HTML-элемент, куда вставляются данные.
   // data — массив данных для рендеринга.
   // itemCallback — колбэк для генерации разметки каждого элемента списка.

  } 
  function renderItemList() {
  /* через map() тоже самое
    if (teckSkillsList) {
       let skillsData ='';
       data.skills.forEach(item => {
      skillsData += `<li class="tech__item">${item}</li>`;
      });
      teckSkillsList.innerHTML = skillsData;
    };
    
    Пример с map()
    if (teckSkillsList) {
       const skillsData = data.skills
       .map(item => `<li class="tech__item">${item}</li>`).join('');
      teckSkillsList.innerHTML = skillsData;
    };
    
    но всю эту конструкцию заменяет const renderList() там уже есть и проверка и вывод на страницу
    */
    renderList(
    teckSkillsList,
    data.skills,
    (item) => `<li class="tech__item">${item}</li>`
    );

 /* skills */
    renderList(
      softSkillsList,
      data.softSkills,
      (item) =>  `<li class="soft__item">${item}</li>`
    );

    /* projects */
    //   if (projectsList) {
    //   const projectItem = projectsData.map(item=> `<li class="projects__item"><a class="projects__link" href="${item.link}" target="_blank">${item.name}</a><span class="projects__separator"></span><div class="projects__tech">${item.tech}</div></li>`).join('');
    //   
    //   projectsList.innerHTML = projectItem;
    // } 
    renderList(
      projectsList,
      projectsData,
      (item) =>`<li class="projects__item"><a class="projects__link" href="${item.link}" target="_blank">${item.name}</a><span class="projects__separator"></span><div class="projects__tech">${item.tech}</div></li>`
    );


  }
  renderItemList();