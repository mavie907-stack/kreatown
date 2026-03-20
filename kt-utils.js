/* ============================================================
   KreaTown — Shared Utilities v2 (clean)
   ============================================================ */

/* ── 1. LANGUAGE SYSTEM ── */
const KT_TR = {
  'Community Feed':'Topluluk Akışı','My Profile':'Profilim',
  'My Profile & Posts':'Profilim & Yazılarım','Dashboard':'Panel',
  'Settings':'Ayarlar','Settings & Profile':'Ayarlar & Profil',
  'Log out':'Çıkış yap','All Members':'Tüm Üyeler','Earnings':'Kazanç',
  'Messages':'Mesajlar','Admin Panel':'Yönetim Paneli','Town Map':'Kasaba Haritası',
  'Enter Rooms':'Odalara Gir',"Topraq's Town":"Topraq'ın Kasabası",
  '← Back to dashboard':'← Panele Dön','← My Dashboard':'← Panelim','← Dashboard':'← Panel',
  'Back to dashboard':'Panele Dön',
  'Hotel Lobby':'Otel Lobisi','The Restaurant':'Restoran',
  'Superior Room':'Superior Oda','Resting Lounge':'Dinlenme Salonu',
  'Thermal Pool':'Termal Havuz','3D Radio Room':'3D Radyo Odası',
  'Cinema TV Room':'Sinema TV Odası','Rooms':'Odalar','ROOMS':'ODALAR',
  'Silver Members Only':'Yalnızca Gümüş Üyeler',
  'Gold Suite Access':'Altın Süit Erişimi','Palace Access Only':'Yalnızca Saray Erişimi',
  '✨ All':'✨ Tümü','📝 Posts':'📝 Yazılar','📸 Photos':'📸 Fotoğraflar',
  '🎙️ Podcasts':'🎙️ Podcastler','All Posts':'Tüm Yazılar','Free':'Ücretsiz',
  '🌱 Everyone':'🌱 Herkes','⭐ Silver+':'⭐ Gümüş+','👑 Gold+':'👑 Altın+',
  '🏯 Palace only':'🏯 Yalnızca Saray','✍️ Post':'✍️ Paylaş',
  '🚀 Share with community':'🚀 Toplulukla paylaş',
  'Share with community':'Toplulukla paylaş','Who can see this?':'Kimler görebilir?',
  'Latest from the community':'Topluluktan son yazılar',
  '🌱 Free':'🌱 Ücretsiz','⭐ Silver':'⭐ Gümüş','👑 Gold':'👑 Altın','🏯 Palace':'🏯 Saray',
  'Silver':'Gümüş','Gold':'Altın','Palace':'Saray',
  'My tier':'Üyeliğim','Community posts':'Topluluk yazıları',
  'Members online':'Çevrimiçi üye','Active rooms':'Aktif odalar',
  'Quick access':'Hızlı erişim','Welcome back to KreaTown':"KreaTown'a hoş geldin",
  '🔓 Unlock more of KreaTown':"🔓 KreaTown'da daha fazlasını aç",
  'Save changes':'Değişiklikleri kaydet','Upload photo':'Fotoğraf yükle',
  'Remove':'Kaldır','Cancel':'İptal','Send':'Gönder','See all':'Tümünü gör',
  'View profile':'Profili gör','online':'çevrimiçi','just now':'şimdi',
  'Platform Overview':'Platform Genel Bakış','Live Activity':'Canlı Aktivite',
  'Banned Members':'Yasaklı Üyeler','Frozen Accounts':'Dondurulmuş Hesaplar',
  'Gift Membership':'Hediye Üyelik','Room Control':'Oda Kontrolü',
  'Broadcast':'Yayın','Platform Control':'Platform Kontrolü','Audit Log':'Denetim Kaydı',
};

function getLang(){ return localStorage.getItem('kt_lang')||'en'; }
function t(k){ return getLang()==='tr'?(KT_TR[k]||k):k; }

function applyLang(){
  const lang=getLang();
  /* Style toggle buttons */
  document.querySelectorAll('[data-lang]').forEach(btn=>{
    const on=btn.getAttribute('data-lang')===lang;
    btn.style.background=on?'rgba(244,115,42,0.3)':'transparent';
    btn.style.color=on?'#f4732a':'';
    btn.style.fontWeight=on?'600':'400';
  });
  /* Explicit elements */
  document.querySelectorAll('[data-i18n-tr]').forEach(el=>{
    el.textContent=lang==='tr'?el.getAttribute('data-i18n-tr'):(el.getAttribute('data-i18n-en')||el.textContent);
  });
  /* Safe leaf-node translation */
  if(lang==='tr'){
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{
      acceptNode(n){
        const p=n.parentElement;
        if(!p)return NodeFilter.FILTER_REJECT;
        if(['SCRIPT','STYLE','INPUT','TEXTAREA','SELECT'].includes(p.tagName))return NodeFilter.FILTER_REJECT;
        if(p.isContentEditable||p.hasAttribute('data-no-translate'))return NodeFilter.FILTER_REJECT;
        if(p.children.length>0)return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes=[];let n;
    while((n=walker.nextNode()))nodes.push(n);
    nodes.forEach(node=>{
      const txt=node.textContent.trim();
      if(txt.length<2)return;
      const tr=KT_TR[txt];
      if(!tr)return;
      if(!node.parentElement.hasAttribute('data-orig'))node.parentElement.setAttribute('data-orig',txt);
      node.textContent=tr;
    });
  } else {
    document.querySelectorAll('[data-orig]').forEach(el=>{
      if(el.children.length===0)el.textContent=el.getAttribute('data-orig');
    });
  }
  document.documentElement.lang=lang;
}

function setLang(lang){
  localStorage.setItem('kt_lang',lang);
  applyLang();
  if(typeof renderRooms!=='undefined')renderRooms();
  if(typeof renderFeed!=='undefined')setTimeout(renderFeed,50);
}

document.addEventListener('DOMContentLoaded',()=>setTimeout(applyLang,200));

/* ── 2. SOUNDS ── */
let _actx=null;
let soundEnabled=localStorage.getItem('kt_sound')!=='false';
function playSound(type){
  if(!soundEnabled)return;
  try{
    if(!_actx)_actx=new(window.AudioContext||window.webkitAudioContext)();
    const S={message:{f:880,d:0.12,w:'sine',v:0.3},notification:{f:660,d:0.18,w:'sine',v:0.4},success:{f:760,d:0.2,w:'sine',v:0.35},error:{f:220,d:0.3,w:'sawtooth',v:0.2}};
    const s=S[type]||S.message;
    const o=_actx.createOscillator(),g=_actx.createGain();
    o.connect(g);g.connect(_actx.destination);
    o.type=s.w;o.frequency.value=s.f;
    g.gain.setValueAtTime(s.v,_actx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,_actx.currentTime+s.d);
    o.start();o.stop(_actx.currentTime+s.d);
  }catch(e){}
}
function toggleSound(){soundEnabled=!soundEnabled;localStorage.setItem('kt_sound',soundEnabled);playSound(soundEnabled?'success':'error');return soundEnabled;}

/* ── 3. SESSION REFRESH ── */
const _KT_SB='https://pkhoyabazudqmfczkhax.supabase.co';
const _KT_AK='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBraG95YWJhenVkcW1mY3praGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NzM0OTksImV4cCI6MjA4ODQ0OTQ5OX0.sedlDlDNWHoNXz4yczYyDzwrZRRqNWozAT-TV7-pOS8';
async function refreshSession(){
  try{
    const s=JSON.parse(localStorage.getItem('kt_session')||'{}');
    if(!s.refresh_token)return null;
    const now=Math.floor(Date.now()/1000);
    if(s.expires_at&&s.expires_at>now+300)return s;
    const res=await fetch(_KT_SB+'/auth/v1/token?grant_type=refresh_token',{
      method:'POST',headers:{'apikey':_KT_AK,'Content-Type':'application/json'},
      body:JSON.stringify({refresh_token:s.refresh_token})
    });
    if(!res.ok){
      const pub=['login','register','index','topraq-hub','forgot'].some(p=>window.location.pathname.includes(p));
      if(!pub){localStorage.removeItem('kt_session');localStorage.removeItem('kt_profile');window.location.href='login.html?reason=expired';}
      return null;
    }
    const d=await res.json();
    const fresh={access_token:d.access_token,refresh_token:d.refresh_token,user_id:d.user?.id||s.user_id,email:d.user?.email||s.email,expires_at:Math.floor(Date.now()/1000)+(d.expires_in||3600)};
    localStorage.setItem('kt_session',JSON.stringify(fresh));
    return fresh;
  }catch(e){return null;}
}
setInterval(refreshSession,10*60*1000);
document.addEventListener('DOMContentLoaded',refreshSession);

/* ── 4. TV/RADIO — stop when hidden ── */
document.addEventListener('visibilitychange',()=>{
  if(!document.hidden)return;
  document.querySelectorAll('audio,video').forEach(e=>e.pause());
  document.querySelectorAll('iframe[src*="youtube"],iframe[src*="spotify"],iframe[src*="soundcloud"]').forEach(e=>{e._src=e.src;e.src='';});
});

/* ── 5. PWA ── */
let _dp=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();_dp=e;const b=document.getElementById('pwaInstallBtn');if(b)b.style.display='flex';});
function installPWA(){if(!_dp)return;_dp.prompt();_dp.userChoice.then(()=>_dp=null);}
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));

/* ── 6. NOTIFICATION COUNT ── */
async function loadNotificationCount(){
  try{
    const s=JSON.parse(localStorage.getItem('kt_session')||'{}');
    if(!s.access_token)return;
    const res=await fetch(_KT_SB+'/rest/v1/notifications?user_id=eq.'+(s.user_id||s.id)+'&is_read=eq.false&select=id',{headers:{'apikey':_KT_AK,'Authorization':'Bearer '+s.access_token}});
    if(!res.ok)return;
    const data=await res.json();
    const count=data.length;
    document.querySelectorAll('.notif-badge,#notifBadge').forEach(el=>{el.textContent=count;el.style.display=count>0?'flex':'none';});
    const prev=parseInt(sessionStorage.getItem('kt_nc')||'0');
    if(count>prev)playSound('notification');
    sessionStorage.setItem('kt_nc',count);
  }catch(e){}
}
setInterval(loadNotificationCount,30000);
document.addEventListener('DOMContentLoaded',loadNotificationCount);
