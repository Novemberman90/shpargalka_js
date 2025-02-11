const menuBtn = document.querySelector('.menu__btn');
const menu = document.querySelector('.menu__list');

menuBtn.addEventListener('click', ()=>{
  menu.classList.toggle('menu__list--open')
});

// Создаем IntersectionObserver, который будет следить за элементами на странице
const observer = new IntersectionObserver((entries)=> {
  entries.forEach(entry => {

     // Проверяем, пересек ли элемент 50% своей высоты в зоне видимости
    if(entry.isIntersecting){
      // Получаем id элемента, который сейчас виден
       const activeId = entry.target.id;
       
       // Удаляем класс активности у всех элементов списка навигации
       document.querySelectorAll('.site-list__item').forEach(item => {
        item.classList.remove('site-list__item--active')
       });

       // Находим ссылку, которая ведет к активному элементу
       const adctivLink = document.querySelector(`.site-list__link[href="#${activeId}"]`);

       // Если такая ссылка существует, добавляем активный класс ее родителю (элементу списка)
       if(adctivLink) {
        adctivLink.closest('.site-list__item').classList.add('site-list__item--active');
       }
    }
  });
}, {threshold: 0.5} ); // Observer срабатывает, когда 50% элемента в зоне видимости

// Находим все элементы, за которыми будем следить, и подключаем их к Observer'у
document.querySelectorAll('#slide-0, #slide-1, #slide-2, #slide-3').forEach(element => {
  observer.observe(element)
});