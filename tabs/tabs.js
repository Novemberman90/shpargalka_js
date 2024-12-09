 
 
 const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

         function hideTabContent(params) {
            tabsContent.forEach(item => {
              item.classList.add('hide');
              item.classList.remove('show', 'fade');
              /* toggle - тут не прокатит т.к. будет каша */
            });

            tabs.forEach(item => {
              item.classList.remove('tabheader__item_active');
            });
         } 
         
         function showTabcontent(i = 0) { /* i - это номер элемента. Этот есть в цикле с tabs. В ЕС-6 можна записывать в арументы i = 0; Это дает возможность автоматически начинать с первого элемента не внося его в параметры функции. */
          tabsContent[i].classList.add('show', 'fade');
          tabsContent[i].classList.remove('hide');
          tabs[i].classList.add('tabheader__item_active');
         }
    hideTabContent();
    showTabcontent();

    tabsParent.addEventListener('click', (event) => {
      const target = event.target;

      if(target && target.classList.contains('tabheader__item')) {
         /* item - сам элемент на который мы клинкули, а і - это его номер оп пордяку */
        tabs.forEach((item, i) => {
          if (target == item) {
                hideTabContent();
                showTabcontent(i);
          }
        });
      }
    });