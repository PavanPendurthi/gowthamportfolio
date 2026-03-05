// ── Sprocket holes ──
function buildSprockets(){
  ['sprL','sprR'].forEach(id=>{
    const el=document.getElementById(id);
    const n=Math.ceil(window.innerHeight/28);
    for(let i=0;i<n;i++){const h=document.createElement('div');h.className='sprocket-hole';el.appendChild(h);}
  });
}
buildSprockets();

// ── Cursor ──
const cdot=document.getElementById('cdot'),cring=document.getElementById('cring'),cch=document.getElementById('cch'),ccv=document.getElementById('ccv');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
(function a(){cdot.style.left=mx+'px';cdot.style.top=my+'px';
cch.style.left=mx+'px';cch.style.top=my+'px';
ccv.style.left=mx+'px';ccv.style.top=my+'px';
rx+=(mx-rx)*.1;ry+=(my-ry)*.1;
cring.style.left=rx+'px';cring.style.top=ry+'px';
requestAnimationFrame(a);})();

// ── Timecode ──
function fmtTc(f){const fps=24,s=Math.floor(f/fps),m=Math.floor(s/60),h=Math.floor(m/60);const p=n=>String(n).padStart(2,'0');return `${p(h)}:${p(m%60)}:${p(s%60)}:${p(f%fps)}`;}
let frame=0;
setInterval(()=>{frame++;const t=fmtTc(frame);document.getElementById('timecode').textContent=t;document.getElementById('footerTc').textContent=t;},1000/24);

// ── Reel divider ──
const track=document.getElementById('reelTrack');
const labels=['INT','EXT','DAY','NIGHT','GM','CUT','TAKE','ROLL','24FPS','4K','SCENE','ACTION','SLATE','PRINT'];
let html='';
for(let i=0;i<2;i++){for(let j=0;j<60;j++){const l=labels[j%labels.length];const accent=j%5===0;html+=`<div class="reel-frame${accent?' accent':''}">${accent?`<span>${l}</span>`:j+1}</div>`;}}
track.innerHTML=html;

// ── Scroll reveal ──
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('visible'),60);obs.unobserve(e.target);}});},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // Counter animation
  function animateCounter(el){
    const target=parseInt(el.dataset.target);
    const suffix=el.dataset.suffix||'';
    const duration=1400;
    const steps=60;
    const increment=target/steps;
    let current=0;
    const timer=setInterval(()=>{
      current+=increment;
      if(current>=target){current=target;clearInterval(timer);}
      el.textContent=Math.floor(current)+suffix;
    },duration/steps);
  }
  const counterObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        animateCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  },{threshold:.5});
  document.querySelectorAll('.counter').forEach(el=>counterObs.observe(el));

  // Smooth scroll with fixed header offset
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      if(id==='#')return;
      const target=document.querySelector(id);
      if(target){e.preventDefault();const top=target.getBoundingClientRect().top+window.scrollY-110;window.scrollTo({top,behavior:'smooth'});}
    });
  });

// ── Skill bars animate on reveal ──
const barObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.skill-bar-fill').forEach(b=>{b.style.width=b.dataset.w;});
      barObs.unobserve(e.target);
    }
  });
},{threshold:.3});
document.querySelectorAll('.skill-card').forEach(c=>barObs.observe(c));

// ── Video lightbox ──
function openVideo(url){document.getElementById('videoFrame').src=url+'?autoplay=1';document.getElementById('videoLb').classList.add('open');document.body.style.overflow='hidden';}
function closeVideo(){document.getElementById('videoFrame').src='';document.getElementById('videoLb').classList.remove('open');document.body.style.overflow='';}
document.getElementById('videoLb').addEventListener('click',function(e){if(e.target===this)closeVideo();});

// ── Photo lightbox ──
function openPhoto(el){document.getElementById('photoLbImg').src=el.querySelector('img').src;document.getElementById('photoLb').classList.add('open');document.body.style.overflow='hidden';}
function closePhoto(){document.getElementById('photoLb').classList.remove('open');document.body.style.overflow='';}
document.getElementById('photoLb').addEventListener('click',function(e){if(e.target===this)closePhoto();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeVideo();closePhoto();}});