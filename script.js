const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
const vote=document.querySelector('#vote-button');
const note=document.querySelector('#vote-note');

addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>24),{passive:true});
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú')});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
vote.addEventListener('click',()=>{vote.textContent='¡VOTO FICTICIO REGISTRADO! ×2';note.textContent='Gracias por participar en este proyecto escolar.';vote.disabled=true;vote.style.opacity='.88'});

document.querySelectorAll('[data-scroll-top]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();
  window.scrollTo({top:0,behavior:'smooth'});
  history.replaceState(null,'','#top');
}));

const use3D=matchMedia('(hover: hover) and (min-width: 761px) and (prefers-reduced-motion: no-preference)').matches;
const tilt=(element,x,y,limit=7)=>{
  const rect=element.getBoundingClientRect();
  const rotateY=((x-rect.left)/rect.width-.5)*limit*2;
  const rotateX=((y-rect.top)/rect.height-.5)*-limit*2;
  element.style.setProperty('--card-rotate-x',`${rotateX.toFixed(2)}deg`);
  element.style.setProperty('--card-rotate-y',`${rotateY.toFixed(2)}deg`);
};

if(use3D){
  const heroArt=document.querySelector('.hero-art');
  heroArt.addEventListener('pointermove',event=>{
    const rect=heroArt.getBoundingClientRect();
    heroArt.style.setProperty('--hero-rotate-y',`${(((event.clientX-rect.left)/rect.width-.5)*7).toFixed(2)}deg`);
    heroArt.style.setProperty('--hero-rotate-x',`${(((event.clientY-rect.top)/rect.height-.5)*-7).toFixed(2)}deg`);
  });
  heroArt.addEventListener('pointerleave',()=>{heroArt.style.setProperty('--hero-rotate-x','0deg');heroArt.style.setProperty('--hero-rotate-y','0deg')});
  document.querySelectorAll('.area-card,.fun-card').forEach(card=>{
    card.addEventListener('pointermove',event=>tilt(card,event.clientX,event.clientY));
    card.addEventListener('pointerleave',()=>{card.style.setProperty('--card-rotate-x','0deg');card.style.setProperty('--card-rotate-y','0deg')});
  });
}
