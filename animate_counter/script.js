const startAddonNumber = (elements)=> {
  const time = 2000;  // Общее время анимации в миллисекундах

   /*  elements.forEach(item => {
      
      let n = 0; // Начальное значение счётчик
      let num = parseInt(item.dataset.addonNum) || 0; // значение в атрибуте 
      let stepTime = Math.round(time / num); // Вычисляем интервал обновления числа

      let interval = setInterval(() => {
        item.textContent = ++n; // Обновляю текст в элементе

        if (n >= num) { //Остановка, когда достигнем нужного числа
          clearInterval(interval)
        } 
      }, stepTime);
      
    }); */
    
    elements.forEach(item => {
        let startTime;
        let num = parseInt(item.dataset.addonNum) || 0;

        const updateNumber = (timestamp) => {
            if (!startTime) startTime = timestamp;
            let progress = Math.min((timestamp - startTime) / time, 1);
            item.textContent = Math.floor(progress * num);

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };

        requestAnimationFrame(updateNumber);
    });
}
const addonElement = document.querySelector('.addon');
  if (addonElement) {
    const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const elements = document.querySelectorAll('.addon__number');
            startAddonNumber(elements);
            observer.disconnect(); // Отключаем после первого срабатывания
        }
    });
    
    }, { threshold: 0.25 });

    observer.observe(addonElement); // Слежу за нужным или любым другим элементом в конце страницы
  }