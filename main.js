
(function(){
var d=document,root=d.documentElement,RM=root.classList.contains('rm');
var $=function(s,c){return (c||d).querySelector(s)},$$=function(s,c){return [].slice.call((c||d).querySelectorAll(s))};

/* menu */
var burger=$('#burger'),nav=$('#nav');
function setMenu(o){nav.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu');d.body.style.overflow=o?'hidden':'';}
burger.addEventListener('click',function(){setMenu(!nav.classList.contains('open'))});

/* whatsapp form */
$('#ctForm').addEventListener('submit',function(e){e.preventDefault();var f=e.target;
 var msg='Hello Sahn Atelier, my name is '+f.name.value.trim()+'. I would like to talk about a '+f.type.value.toLowerCase()+(f.area.value.trim()?' in '+f.area.value.trim():'')+'.';
 window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank','noopener');});

/* words */
var words=$('#words');
if(words){var html='';words.childNodes.forEach(function(n){if(n.nodeType===3){html+=n.textContent.split(/(\s+)/).map(function(t){return /\S/.test(t)?'<span class="w">'+t+'</span>':t}).join('')}else{html+='<span class="w">'+n.outerHTML+'</span>'}});words.innerHTML=html;}

var hdr=$('.hdr');
if(!window.gsap||!window.ScrollTrigger){root.classList.remove('js');var ib=$('.intro');if(ib)ib.remove();return;}
gsap.registerPlugin(ScrollTrigger);

/* header */
var lastY=0;
ScrollTrigger.create({start:0,end:'max',onUpdate:function(s){var y=s.scroll();hdr.classList.toggle('solid',y>60);hdr.classList.toggle('hide',y>lastY&&y>400&&!nav.classList.contains('open'));lastY=y;}});

if(RM){ $$('.big-words .w').forEach(function(w){w.style.opacity=1}); return; }

/* smooth scroll */
var lenis=null;
if(window.Lenis){lenis=new Lenis({duration:1.15,smoothWheel:true,syncTouch:false});
 lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0);}
$$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var id=a.getAttribute('href');var t=id.length>1?$(id):null;if(id==='#top')t=0;if(t===null)return;e.preventDefault();setMenu(false);if(lenis)lenis.scrollTo(t===0?0:t,{duration:1.6});else if(t===0)window.scrollTo(0,0);else t.scrollIntoView();});});

/* intro */
var tl=gsap.timeline();
tl.to('.intro-bar',{scaleX:1,duration:.9,ease:'power2.inOut'})
  .to('.intro-in',{yPercent:-30,opacity:0,duration:.5,ease:'power2.in'},'-=.1')
  .to('.intro',{yPercent:-100,duration:.9,ease:'power4.inOut'},'-=.15')
  .set('.intro',{display:'none'})
  .from('.hero-media',{scale:1.35,duration:2.4,ease:'power3.out'},'-=.85')
  .from('.hero-h .ln>span',{yPercent:110,duration:1.2,stagger:.11,ease:'power4.out'},'-=2.1')
  .from('.kicker,.hero-foot',{y:24,opacity:0,duration:1,stagger:.12,ease:'power3.out'},'-=.9')
  .from('.hdr',{yPercent:-100,duration:.9,ease:'power3.out'},'-=1.2');

/* hero scrub */
gsap.to('.hero-media',{scale:1.22,yPercent:12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.hero-txt',{y:-140,opacity:0,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'70% top',scrub:true}});

/* manifesto */
gsap.to('.big-words .w',{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:'#words',start:'top 80%',end:'bottom 45%',scrub:true}});

/* reveals */
gsap.utils.toArray('.sec-h,.eyebrow,.lead,.ct-h,.ct-form,.ct-info').forEach(function(el){
 gsap.from(el,{y:50,opacity:0,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}});});
gsap.utils.toArray('.step').forEach(function(el){
 gsap.from(el,{y:60,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}});
 gsap.from(el.querySelector('.sn'),{yPercent:60,opacity:0,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%'}});});

/* scene stack */
var scenes=$$('.scene');
scenes.forEach(function(sc,i){
 var img=sc.querySelector('.scene-media img'),txt=sc.querySelector('.scene-txt');
 gsap.fromTo(img,{yPercent:-12},{yPercent:0,ease:'none',scrollTrigger:{trigger:sc,start:'top bottom',end:'top top',scrub:true}});
 gsap.from(txt.children,{y:70,opacity:0,stagger:.08,ease:'power3.out',scrollTrigger:{trigger:sc,start:'top 35%',end:'top top',scrub:1}});
 var nx=scenes[i+1];
 if(nx){gsap.to(sc,{scale:.88,borderRadius:18,filter:'brightness(.5)',ease:'none',scrollTrigger:{trigger:nx,start:'top bottom',end:'top top',scrub:true}});}
});

/* spotlight */
var fr=$('#spotFrame');
if(fr){var st={r:0,x:50,y:45},fine=matchMedia('(pointer:fine)').matches;
 var apply=function(){var dia=Math.hypot(fr.offsetWidth,fr.offsetHeight);fr.style.setProperty('--r',(st.r*dia/100).toFixed(1)+'px');fr.style.setProperty('--x',st.x+'%');fr.style.setProperty('--y',st.y+'%');};
 gsap.to(st,{r:fine?22:75,ease:'none',onUpdate:apply,scrollTrigger:{trigger:fr,start:'top 85%',end:fine?'center 55%':'bottom 70%',scrub:true}});
 gsap.from(fr,{clipPath:'inset(12% 12% 12% 12%)',ease:'none',scrollTrigger:{trigger:fr,start:'top bottom',end:'top 30%',scrub:true}});
 if(fine){var big=false;
  fr.addEventListener('mousemove',function(e){var b=fr.getBoundingClientRect();gsap.to(st,{x:(e.clientX-b.left)/b.width*100,y:(e.clientY-b.top)/b.height*100,duration:.6,ease:'power3.out',onUpdate:apply});});
  fr.addEventListener('mouseenter',function(){gsap.to(st,{r:'+=10',duration:.6,onUpdate:apply})});
  fr.addEventListener('mouseleave',function(){gsap.to(st,{r:'-=10',duration:.6,onUpdate:apply})});}
 apply();}

/* approach image parallax */
gsap.fromTo('.ap-img img',{yPercent:-16},{yPercent:0,ease:'none',scrollTrigger:{trigger:'.ap-img',start:'top bottom',end:'bottom top',scrub:true}});
gsap.fromTo('.ct-media img',{scale:1.2},{scale:1,ease:'none',scrollTrigger:{trigger:'.contact',start:'top bottom',end:'bottom bottom',scrub:true}});
gsap.from('.foot-big',{yPercent:40,opacity:0,ease:'none',scrollTrigger:{trigger:'.foot',start:'top bottom',end:'bottom bottom',scrub:true}});

/* gallery: horizontal pin on wide screens */
var mm=gsap.matchMedia();
mm.add('(min-width:900px)',function(){
 var tr=$('#galTrack');
 var dist=function(){return Math.max(0,tr.scrollWidth-window.innerWidth)};
 gsap.to(tr,{x:function(){return -dist()},ease:'none',scrollTrigger:{trigger:'.gal-pin',start:'top top',end:function(){return '+='+dist()},pin:true,scrub:1,invalidateOnRefresh:true,anticipatePin:1}});
 gsap.utils.toArray('.gi img').forEach(function(im){gsap.fromTo(im,{scale:1.15},{scale:1,ease:'none',scrollTrigger:{trigger:'.gal-pin',start:'top bottom',end:'bottom top',scrub:true}})});
});
mm.add('(max-width:899px)',function(){
 gsap.utils.toArray('.gi').forEach(function(g){gsap.from(g,{x:60,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:'#galTrack',start:'top 85%'}})});
});

/* cursor */
var cur=$('.cursor');
if(cur&&matchMedia('(pointer:fine)').matches){var qx=gsap.quickTo(cur,'x',{duration:.35,ease:'power3'}),qy=gsap.quickTo(cur,'y',{duration:.35,ease:'power3'});
 window.addEventListener('mousemove',function(e){cur.classList.add('on');qx(e.clientX);qy(e.clientY)});
 $$('a,button,.spot-frame,select,input').forEach(function(el){el.addEventListener('mouseenter',function(){cur.classList.add('big')});el.addEventListener('mouseleave',function(){cur.classList.remove('big')})});}

window.addEventListener('load',function(){ScrollTrigger.refresh()});
})();
