    //timer 
    const deadLine = '2024-07-29'; // эту перменную можем получать из разных источников

    function getTimeRemaining(endtime) {
      let days, hours, minutes, seconds;
      // тут получаю разницу между планируемым временем и текущим, разнице между датами
      const t = Date.parse(endtime) - Date.parse(new Date()); // если таймер исчечет занчение будет отрцательное и чтобы если значение будет отрицательное (таймер просрочен), то буду показывать нули или что-то другое
  
      if( t <= 0 ) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
      } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24 )), // 1000 * 60 = милисек в минуте * 60 в часе * сутках
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),// % делим то что в скобках на 24 и получаем остаток от деления в итоге получим количество целых суток
        minutes = Math.floor((t / 1000 / 60) % 60), // полученные секунды делим на минуты
        seconds = Math.floor((t / 1000) % 60); // получим количество милисекунд в секунде
      }


          return { // возвращаю в нормальном виде
            'total' : t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
          };
    }

    function getZero(num) { // эта функция будет добавлять нолик если время, дата, месяц меньше цифры 10, чтобы было 09,02,15
      if ( num >= 0 && num < 10) { // проверяю, что наше число больше или равно нулю и выполним когда чилос будет меньше 10. Если меньше 10 то добавим в строку нолик
        return `0${num}`;
      } else { // если чило больше 10. Допустим 10,20,30, то возвращаем его, как есть
        return num; 
      }
    }

    function setClock(selector, endtime) { // устанавливаю таймер на страничку
      const timer = document.querySelector(selector), // в селектор кладу таймер
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000); // запускаем функцию через каждую секунду

            updateClock(); // вызываю принудительно для того, чтобы не было мигания на случай если таймер находится на первой странице. Функция с самого начал один раз обновит таймер и всё дальше будет работать как надо

        function updateClock() { // обновляю часы
          const t = getTimeRemaining(endtime); // расчет времени которое осталось. Сюда получу то что в ретурне getTimeRemaining

          // когда функция запуститься она расчитает наше время и щапишет их на страничку
          days.innerHTML = getZero(t.days);// Передаем дни на проверку и т.д.
          hours.innerHTML = getZero(t.hours);
          minutes.innerHTML = getZero(t.minutes);
          seconds.innerHTML = getZero(t.seconds);

          // чтобы таймер когданибуть остановился
          // Таймер остановится когда время будет раное нулю или с отрицательным значением
          if (t.total <= 0) {
            clearInterval(timeInterval);
          }
        }
    }

    setClock('.timer', deadLine);