'use strict';
// Создаем генератор ошибок и сообщаем разработчику или пользователю об ошибке
const data = [
    {
        id: 'box',
        tag: 'div'
    },
    {
        id: '',
        tag: 'nav'
    },
    {
        id: 'circle',
        tag: ''
    }
]

/* data.forEach((blockObj, i) => {
    const block = document.createElement(blockObj.tag);

    // Если у blockObj.id нет своего id выведу (`В данных под номером ${i + 1} нет id`);
   // if(!blockObj.id) throw new Error(`В данных под номером ${i + 1} нет id`);
    

    block.setAttribute('id', blockObj.id);
    document.body.append(block);
});

const err = new  Error('bddfdf'); // удобно ошибкам давать свой err.name SyntaxError - например
console.log(err.name, err.message, err.stack); 
//Error bddfdf Error: bddfdf
//    at http://127.0.0.1:5500/lesons106/script.js:29:13
// Error - это err.name,  err.message, - 'bddfdf', at http://127.0.0.1:5500/lesons106/script.js:29:13 - err.stack */


// ПРИМЕР с TRY CATCH

/* try {
  data.forEach((blockObj, i) => {
    const block = document.createElement(blockObj.tag);

    // Если у blockObj.id нет своего id выведу (`В данных под номером ${i + 1} нет id`);
    if(!blockObj.id) throw new SyntaxError(`В данных под номером ${i + 1} нет id`);
    
    block.setAttribute('id', blockObj.id);
    document.body.append(block);
});
} catch(e) { // ошибка которая не выполнилась в try прихожит в catch в виде объекта 'e'по этому тут эта буква
  console.error(e.name); // console.error(e.name); будет подсвечено красным цветом
  console.log(e.name);
  console.log(e.message);
  console.log(e.stack);
  // SyntaxError: В данных под номером 2 нет id
  //  at script.js:43:28
  //  at Array.forEach (<anonymous>)
  //  at script.js:39:8
}

//const err = new  SyntaxError('bddfdf'); // хоть и в try будет ошибка, но JS не перестанет выполнятся т.к. использую конструкцию try catch
//console.log(err.name, err.message, err.stack); */

// ПРИМЕР когда ошибки действительно критичны таку, что не предвидели допустим у const data в не указано какой-то ствойство, напирмер у последнего объекта нет в tag 'span' 
try {
  data.forEach((blockObj, i) => {
    const block = document.createElement(blockObj.tag);

    // Если у blockObj.id нет своего id выведу (`В данных под номером ${i + 1} нет id`);
    if(!blockObj.id) throw new SyntaxError(`В данных под номером ${i + 1} нет id`);
    
    block.setAttribute('id', blockObj.id);
    document.body.append(block);
});
} catch(e) { // ошибка которая не выполнилась в try прихожит в catch в виде объекта 'e'по этому тут эта буква 
  
  // Если сработала моя предвиденная ошибка 
  if(e.name === 'SyntaxError') {
    console.log(e.message);
  } else { // если, что-то не предвиденное тогда выбрасываю её из блока catch(e), тогда JS полностьью остановится и выдаст класическую ошибку в консоли и перестанет вообще, что-либо делать
    throw new e;
  }
}