window.addEventListener('DOMContentLoaded', ()=>{


  // modal
  const button =  document.querySelectorAll('[data-modal]');
  const modalWindow = document.querySelector('.modal');

  function openModal(params) {
    modalWindow.classList.add('modal--active');
    document.body.style.overflow = 'hidden';
    closeMenu();
    clearInterval(modalTimerId);
  }

  function closeModal(params) {
    modalWindow.classList.remove('modal--active');
    document.body.style.overflow = '';
  }

  // открываю модалку 
  button.forEach(btn => {
    btn.addEventListener('click', openModal);
  });
  
  modalWindow.addEventListener('click', (e)=>{
    if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  // открыавю модальное окно при пролистывании до конца
   function showModalByScroll(params) {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 10 ) {

        openModal();
        window.removeEventListener('scroll',showModalByScroll);
        }
      }
      window.addEventListener('scroll',showModalByScroll);

      //чтобы срабатывало закрытие при нажатии кнопки на клаве ескейп
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modalWindow.classList.contains('modal--active')) {
        closeModal();
      }
    });
    //вызову модальное окно через некоторе время 
    const modalTimerId = setTimeout(openModal, 3000);


    const form = document.querySelectorAll('form');

    const message = {
      loading: './images/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
    }

    form.forEach(item => {
      bindPostData(item);
    });

    const postData = async (url, data) => {
      //сюда передаю адресс сервера и data данные, что будут постится POST

      const res = await fetch(url, { // url это куда шлем запрос т.е. где сервер 
        method: "POST", // это каким образом 
        headers: { // это тоже каким образом
        'Content-type': 'application/json'
        },
        body: data, // это что именно посылаю
      });

      return await res.json(); // это сам Промис, который я возвращаю для обработки через цепочку
    };

      // отправка формы
    function bindPostData(form) {
      form.addEventListener('submit', (e)=>{
        e.preventDefault();

        // создаю спинер ожидания
        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;

        // вставляю в конец формы
        form.insertAdjacentElement('afterend', statusMessage);

        // Данные с формы превращаю в JSON объект для отправки на сервер
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        //'http://mail-test.archiviz.biz/mail.php' - на почту
        // 'https://mail-test.archiviz.biz/telegram.php' - на телеграм
        postData('http://localhost:3000/requests', json)
        .then(data =>{
          console.log(data); // тут request.response - это data
           if (data.message.includes("успешно")) {
             showThanksModal(message.success);// буду использовать для выовда статуса в качестве спинера 
           }
          statusMessage.remove();
        })
        .catch(()=>{
          showThanksModal(message.failure);
        })
        .finally(()=>{
          form.reset();// ощищаю форму
        });

      });

    };



     // Создаю дополнительное окно типа благорадности за отправку формы 

    function showThanksModal(message) { 
      const prevModalDialog = document.querySelector('.modal__dialog');

   /* Прячу текущее Modal */
      prevModalDialog.classList.add('hide'); 
      openModal();

      /* Создаю новое и присваеваю ему класс  modal__dialog */
      const thanksModal = document.createElement('div'); 
      thanksModal.classList.add('modal__dialog');

      /* Тперь надо сформировать вёрстку */
      thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close></div>
        <div class="modal__title">${message}</div>
      </div> `;

      // и указываю куда его добавляю
      document.querySelector('.modal').append(thanksModal);

      setTimeout(() => {
        thanksModal.remove(); // этот шаг нужен, чтобы не скапливались эти окна
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
      }, 4000);
    };

    // функция получения данных с сервера 

    const getResource = async (url) => {
      const res = await fetch(url);
      if(!res.ok) { // если НЕ ок
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
      return await res.json();
    };

    /* Работа с базой данных */
  /*   fetch('http://localhost:3000/requests')
    .then(data => data.json()).then(data => console.log(data))
    .then(res => console.log(res));
 */
});
    

