/* ============================================================
   VAELLO — interactions
   ============================================================ */
(function(){
  'use strict';

  /* ---------- Language ES / EN ---------- */
  var STORE_KEY = 'vaello-lang';
  function applyLang(lang){
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-es]').forEach(function(el){
      var val = el.getAttribute('data-' + lang);
      if(val !== null) el.textContent = val;
    });
    document.querySelectorAll('[data-es-aria]').forEach(function(el){
      var val = el.getAttribute('data-' + lang + '-aria');
      if(val !== null) el.setAttribute('aria-label', val);
    });
    document.querySelectorAll('.lang button').forEach(function(b){
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    try{ localStorage.setItem(STORE_KEY, lang); }catch(e){}
  }
  var savedLang = 'es';
  try{ savedLang = localStorage.getItem(STORE_KEY) || 'es'; }catch(e){}
  applyLang(savedLang);
  document.addEventListener('click', function(e){
    var btn = e.target.closest('.lang button');
    if(!btn) return;
    applyLang(btn.dataset.lang);
  });

  /* ---------- Header solid on scroll ---------- */
  var header = document.querySelector('.site-header');
  var hero = document.querySelector('.hero');
  function onScroll(){
    var threshold = (hero ? hero.getBoundingClientRect().height : 400) - 90;
    if(window.scrollY > Math.max(60, threshold)) header.classList.add('solid');
    else header.classList.remove('solid');
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if(toggle){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function(e){
      if(e.target.closest('a')){
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded','false');
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }
})();
