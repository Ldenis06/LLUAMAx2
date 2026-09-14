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
