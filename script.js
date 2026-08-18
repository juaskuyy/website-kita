const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

document.title=`Untuk ${CONFIG.partnerName} ♡`;
$$('[data-name="partner"]').forEach(e=>e.textContent=CONFIG.partnerName);
$$('[data-start="date"]').forEach(e=>e.textContent=CONFIG.startDate);
$$('[data-year]').forEach(e=>e.textContent=CONFIG.year);
$$('[data-from]').forEach(e=>e.textContent=CONFIG.from);
$$('[data-message="1"]').forEach(e=>e.textContent=CONFIG.messages[0]);
$$('[data-message="2"]').forEach(e=>e.textContent=CONFIG.messages[1]);
CONFIG.events.forEach((x,i)=>{
  const n=i+1;
  const d=$(`[data-event-date="${n}"]`), t=$(`[data-event-text="${n}"]`), h=d?.parentElement?.querySelector("h3");
  if(d)d.textContent=x.date;
  if(t)t.textContent=x.text;
  if(h)h.textContent=x.title;
});
$("#songTitle").textContent=CONFIG.song.title;
$("#artist").textContent=CONFIG.song.artist;
$("#secret").textContent=CONFIG.secret;

$$("[data-go]").forEach(b=>b.addEventListener("click",()=>$(b.dataset.go)?.scrollIntoView({behavior:"smooth"})));

const obs=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.12});
$$(".reveal").forEach(e=>obs.observe(e));

const stars=$("#stars");
for(let i=0;i<70;i++){
  const s=document.createElement("i");s.className="star";
  s.style.left=Math.random()*100+"%";s.style.top=Math.random()*100+"%";
  s.style.animationDelay=(-Math.random()*4)+"s";
  s.style.opacity=.15+Math.random()*.55; stars.appendChild(s);
}

const audio=$("#audio"), play=$("#play"), sound=$("#soundBtn"), progress=$("#progress"), cur=$("#current"), dur=$("#duration");
let playing=false;
function time(t){if(!isFinite(t))return"0:00";return Math.floor(t/60)+":"+String(Math.floor(t%60)).padStart(2,"0")}
play.onclick=async()=>{
  try{
    if(audio.paused){await audio.play();play.textContent="Ⅱ";sound.textContent="Ⅱ";playing=true}
    else{audio.pause();play.textContent="▶";sound.textContent="♫";playing=false}
  }catch(e){alert("Tambahkan assets/music/lagu.mp3 terlebih dahulu.")}
};
sound.onclick=()=>play.click();
audio.addEventListener("loadedmetadata",()=>dur.textContent=time(audio.duration));
audio.addEventListener("timeupdate",()=>{
  cur.textContent=time(audio.currentTime);
  progress.style.width=(audio.duration?audio.currentTime/audio.duration*100:0)+"%";
});
audio.addEventListener("ended",()=>{play.textContent="▶";sound.textContent="♫";playing=false});

$("#secretBtn").onclick=()=>{$("#secret").classList.toggle("show")};
