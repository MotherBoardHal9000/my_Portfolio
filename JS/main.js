
//
//시작 메인 타이포그래피 애니메이션

const duration = 0.5;
const numberOfTargets = gsap.utils.toArray('.utill > div').length
const pause = 1.2;
const stagger = duration + pause;
const delay = stagger * (numberOfTargets - 1) + pause;
const tl = gsap.timeline();

gsap.set('.utill > div',{transformOrigin:'100% 50% -50'})

tl.from('.utill > div',{
  rotationX:90,
  opacity:0,
  duration:duration,
  stagger:{
    each:stagger,
    repeatDelay:delay
  }
})

//
//
//
  let x = 0;
      let targetX = 0;
      const speed = 0.010;

      const section01 = document.querySelectorAll(".section01 img");
      const img00 = section01[0];
      const img01 = section01[1];
      const img02 = section01[2];
      const img03 = section01[3];
      const img04 = section01[4];
      const img05 = section01[5];
      const img06 = section01[6];
      const img07 = section01[7];

      window.addEventListener("mousemove", (event) => {
        x = event.pageX - window.innerWidth / 2;
      });

      const loop = () => {
        targetX += (x - targetX) * speed;

        img00.style.transform = `translateX(${targetX / 10}px)`;
        img01.style.transform = `translateX(${targetX / 18}px)`;
        img02.style.transform = `translateX(${targetX / 13}px)`;
        img03.style.transform = `translateX(${targetX / 17}px)`;
        img04.style.transform = `translateX(${targetX / 12}px)`;
        img05.style.transform = `translateX(${targetX / 14}px)`;
        img06.style.transform = `translateX(${targetX / 17}px)`;
         img07.style.transform = `translateX(${targetX / 9}px)`;
        window.requestAnimationFrame(loop);
      };
      loop();


      // Small, purposeful JS only.
// 1) Scroll reveal (respects reduced motion)
// 2) Contact form preview (no network request)

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupReveal(){
  const targets = document.querySelectorAll('.section, .card, .tile, .mini, .art, .intro');
  targets.forEach(el => el.classList.add('reveal'));

  if (prefersReduced){
    targets.forEach(el => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('is-in');
    });
  }, { threshold: 0.12 });

  targets.forEach(el => io.observe(el));
}

function setupForm(){
  const form = document.getElementById('contactForm');
  const hint = document.getElementById('formHint');
  if (!form || !hint) return;

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const msg = String(data.get('msg') || '').trim();

    if (!name || !msg){
      hint.textContent = '이름과 메시지를 채워주세요.';
      return;
    }
    hint.textContent = `미리보기: “${name}”님, 메시지 길이 ${msg.length}자`;
  });
}

function setupHeroParallax(){
  if (prefersReduced) return;
  const shapes = document.querySelectorAll('.shape, .checker');
  if (!shapes.length) return;

  let raf = null;
  window.addEventListener('pointermove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      shapes.forEach((el, i) => {
        const k = (i + 1) * 6;
        el.style.transform = `${el.dataset.base || ''} translate(${x * k}px, ${y * k}px)`;
      });
    });
  }, { passive: true });

  // save each element's base transform (defined by CSS)
  shapes.forEach(el => {
    const t = getComputedStyle(el).transform;
    // Keep rotate(...) from CSS if any, by storing in dataset as a string approximation
    // If computed matrix exists, we don't want to recompose; use a simple pattern:
    // Set a CSS variable instead for robustness.
    el.style.setProperty('--dx', '0px');
    el.style.setProperty('--dy', '0px');
  });
}

// Init
setupReveal();
setupForm();
setupHeroParallax();
