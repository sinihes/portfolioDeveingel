/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
 const header = document.getElementById('header')
 // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
 if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services__modal')
const modalBtns = document.querySelectorAll('.services__button')
const modalClose = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
 modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((mb,i) =>{
 mb.addEventListener('click', ()=>{
  modal(i)
 })
})

modalClose.forEach((mc) =>{
 mc.addEventListener('click', ()=>{
  modalViews.forEach((mv)=>{
   mv.classList.remove('active-modal')
  })
 })
})
/*=============== MIXITUP FILTER PORTFOLIO ===============*/

let mixerPortfolio = mixitup('.work__container',{
 selectors:{
  target: '.work__card'
 },
 animation:{
  duration:300
 }
});

/* Link active work */ 
const linkWork = document.querySelectorAll('.work__item')

function activeWork(){
 linkWork.forEach(l=> l.classList.remove('active-work'))
 this.classList.add('active-work')
}

linkWork.forEach(l=> l.addEventListener('click', activeWork))
/*=============== SWIPER TESTIMONIAL ===============*/

let swiperTestimonial = new Swiper(".testimonial__container",{
 spaceBetween: 24,
 loop:true,
 grabCursor: true,
 pagination:{
  el: ".swiper-pagination",
  clickable: true,
 },
 breakpoints: {
  "@0.576": {
    slidesPerView: 2,
  },
  "@0.768": {
    slidesPerView: 2,
    spaceBetween: 48,
  }
},
})

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


const sections = document.querySelectorAll('.sectionzone');
const navLi = document.querySelectorAll('.nav__menu a');


window.addEventListener('scroll',()=>{
  let current = ''

  sections.forEach(section =>{
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if(scrollY>=(sectionTop - sectionHeight/3)){
      current = section.getAttribute('id')
    }
  })

  navLi.forEach(li =>{
    li.classList.remove('active-link')
    if(li.classList.contains(current)){
      li.classList.add('active-link')
    }
  })

})
 

/*=============== LIGHT DARK THEME ===============*/ 

const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

//Previusly selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

//we obtain the current theme that the interface has by validating the light-theme class

const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

//We validate if the user previusly chone a topic
if(selectedTheme){
 //if the validation is fulfilled , we ask what the issue was to know if we activated or desactivated the light

 document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
 themeButton.classList[selectedIcon === 'bx bx-monn' ? 'add' : 'remove'](iconTheme)
}

//Activate / desactivate the theme manually whith the buttton
themeButton.addEventListener('click', ()=>{
 //Add or remove the light / icon theme 
 document.body.classList.toggle(lightTheme)
 themeButton.classList.toggle(iconTheme)
 //We save the theme and currrent icon that the user chose
 localStorage.setItem('selected-the', getCurrentTheme())
 localStorage.setItem('selected-icon', getCurrentIcon())
})



/*=============== SCROLL REVEAL ANIMATION ===============*/

const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
  //reset: true,
})

sr.reveal(`.home__data`)
sr.reveal(`.home__handle`, {delay:700} )
sr.reveal(`.home__social, .home__scroll`, {delay:900, origin:'bottom'} )

/* Cursor animado */

const b1 = document.getElementById("blob1");
const b2 = document.getElementById("blob2");
const b3 = document.getElementById("blob3");
const footer = document.querySelector('#footer');
const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const altura = footer ? footer.getBoundingClientRect().height : 0;

let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
let p1 = { ...mouse }, p2 = { ...mouse }, p3 = { ...mouse };
let v3 = { x: 0, y: 0 };  // velocidad del blob3
let last2 = { ...mouse };

document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});



function animate() {
  // Blob 1: sigue el ratón
  p1.x += (mouse.x - p1.x) * 0.25;
  p1.y += (mouse.y - p1.y) * 0.25;
  b1.style.left = p1.x + "px";
  b1.style.top = p1.y + "px";

  // Blob 2: sigue al primero más lento
  p2.x += (p1.x - p2.x) * 0.1;
  p2.y += (p1.y - p2.y) * 0.1;
  b2.style.left = p2.x + "px";
  b2.style.top = p2.y + "px";

  // calcular velocidad del segundo blob
  const vx = p2.x - last2.x;
  const vy = p2.y - last2.y;
  last2.x = p2.x;
  last2.y = p2.y;

  // target extendido hacia adelante
  const targetX = p2.x + vx * 10;
  const targetY = p2.y + vy * 10;

  // movimiento tipo resorte (elasticidad real)
  const spring = 0.01;      // fuerza del resorte
  const damping = 0.88;     // amortiguación

  const fx = (targetX - p3.x) * spring;
  const fy = (targetY - p3.y) * spring;

  v3.x = (v3.x + fx) * damping;
  v3.y = (v3.y + fy) * damping;

  p3.x += v3.x;
  p3.y += v3.y;

  b3.style.left = `${p3.x}px`;
  b3.style.top = `${p3.y}px`;



if (isMobile) {
     if (mouse.y > altura ) {
    b1.style.backgroundColor = "hsl(207,90%,36%)"
    b2.style.backgroundColor = "hsl(207,90%,36%)"
    b3.style.backgroundColor = "hsl(207,90%,36%)"   
  } else {
     b1.style.backgroundColor = "rgb(53, 190, 253)"   
     b2.style.backgroundColor = "rgb(53, 190, 253)"   
     b3.style.backgroundColor = "rgb(53, 190, 253)"   
  }
}




	requestAnimationFrame(animate);
}

animate();