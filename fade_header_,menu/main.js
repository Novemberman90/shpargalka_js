  $(document).ready(function () {
    $(".menu a, .header__link, .logo").on("click", function (event) {
      event.preventDefault();
      var id = $(this).attr('href'),
        top = $(id).offset().top;
      $('body,html').animate({ scrollTop: top }, 1300);
    });
  });



const content = document.querySelector('.menu')
window.addEventListener('scroll', function () {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  if (scrollPosition >= 300) {
    content.classList.add('active')
  } 
  else {
    content.classList.remove('active')
  }
})