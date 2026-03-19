/* ============================================================
   KreaTown — Shared Utilities
   Tüm sayfalara ekle: <script src="kt-utils.js"></script>
   ============================================================ */

/* ── 1. PWA INSTALL ── */
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  // Show install button if exists
  const btn = document.getElementById('pwaInstallBtn');
  if (btn) btn.style.display = 'flex';
});

function installPWA() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(() => { deferredPrompt = null; });
}

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

/* ── 2. SOUND NOTIFICATIONS ── */
const KT_SOUNDS = {
  message:      { freq: 880, duration: 0.12, type: 'sine',    vol: 0.3  },
  notification: { freq: 660, duration: 0.18, type: 'sine',    vol: 0.4  },
  join:         { freq: 520, duration: 0.25, type: 'triangle',vol: 0.35 },
  error:        { freq: 220, duration: 0.3,  type: 'sawtooth',vol: 0.2  },
  success:      { freq: 760, duration: 0.2,  type: 'sine',    vol: 0.35 },
};

let audioCtx = null;
let soundEnabled = localStorage.getItem('kt_sound') !== 'false';

function playSound(type = 'message') {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const s = KT_SOUNDS[type] || KT_SOUNDS.message;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.connect(g);
    g.connect(audioCtx.destination);
    o.type      = s.type;
    o.frequency.value = s.freq;
    g.gain.setValueAtTime(s.vol, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + s.duration);
    o.start(audioCtx.currentTime);
    o.stop(audioCtx.currentTime + s.duration);
  } catch (e) {}
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  localStorage.setItem('kt_sound', soundEnabled ? 'true' : 'false');
  playSound(soundEnabled ? 'success' : 'error');
  return soundEnabled;
}

/* ── 3. TURKISH / ENGLISH i18n ── */
const KT_LANG = {
  en: {
    /* NAV */
    'nav.feed':        'Community Feed',
    'nav.rooms':       'Rooms',
    'nav.town':        "Topraq's Town",
    'nav.dashboard':   'Dashboard',
    'nav.profile':     'My Profile',
    'nav.settings':    'Settings',
    'nav.logout':      'Log out',
    /* FEED */
    'feed.title':      'Community Feed',
    'feed.post':       '✍️ Post',
    'feed.share':      'Share with community',
    'feed.title_ph':   'Give your post a title…',
    'feed.content_ph': 'Write your post…',
    'feed.publish':    '🚀 Share with community',
    'feed.everyone':   '🌱 Everyone',
    'feed.loading':    'Loading…',
    'feed.empty':      'No posts yet — be the first!',
    /* ROOMS */
    'rooms.back':      '← Back',
    'rooms.online':    'online',
    'rooms.send':      'Send',
    'rooms.msg_ph':    'Say something…',
    'rooms.locked':    'This room requires',
    'rooms.upgrade':   'Upgrade to unlock',
    /* MEMBER DASH */
    'dash.welcome':    'Welcome back',
    'dash.my_tier':    'My tier',
    'dash.online':     'Members online',
    'dash.rooms':      'Active rooms',
    'dash.posts':      'Community posts',
    'dash.quick':      'Quick access',
    'dash.upgrade':    '🔓 Unlock more of KreaTown',
    /* SETTINGS */
    'settings.save':   'Save changes',
    'settings.photo':  'Upload photo',
    'settings.remove': 'Remove',
    /* GENERAL */
    'btn.join':        'Join',
    'btn.cancel':      'Cancel',
    'btn.close':       'Close',
    'tier.free':       '🌱 Free',
    'tier.silver':     '⭐ Silver',
    'tier.gold':       '👑 Gold',
    'tier.palace':     '🏯 Palace',
  },
  tr: {
    /* NAV */
    'nav.feed':        'Topluluk Akışı',
    'nav.rooms':       'Odalar',
    'nav.town':        "Topraq'ın Kasabası",
    'nav.dashboard':   'Panel',
    'nav.profile':     'Profilim',
    'nav.settings':    'Ayarlar',
    'nav.logout':      'Çıkış yap',
    /* FEED */
    'feed.title':      'Topluluk Akışı',
    'feed.post':       '✍️ Paylaş',
    'feed.share':      'Toplulukla paylaş',
    'feed.title_ph':   'Gönderi başlığı…',
    'feed.content_ph': 'Yazını buraya yaz…',
    'feed.publish':    '🚀 Toplulukla paylaş',
    'feed.everyone':   '🌱 Herkes',
    'feed.loading':    'Yükleniyor…',
    'feed.empty':      'Henüz gönderi yok — ilk sen ol!',
    /* ROOMS */
    'rooms.back':      '← Geri',
    'rooms.online':    'çevrimiçi',
    'rooms.send':      'Gönder',
    'rooms.msg_ph':    'Bir şeyler yaz…',
    'rooms.locked':    'Bu oda şunu gerektiriyor:',
    'rooms.upgrade':   'Yükselt ve aç',
    /* MEMBER DASH */
    'dash.welcome':    'Hoş geldin',
    'dash.my_tier':    'Üyeliğim',
    'dash.online':     'Çevrimiçi üye',
    'dash.rooms':      'Aktif odalar',
    'dash.posts':      'Topluluk gönderileri',
    'dash.quick':      'Hızlı erişim',
    'dash.upgrade':    '🔓 KreaTown\'da daha fazlasını aç',
    /* SETTINGS */
    'settings.save':   'Değişiklikleri kaydet',
    'settings.photo':  'Fotoğraf yükle',
    'settings.remove': 'Kaldır',
    /* GENERAL */
    'btn.join':        'Katıl',
    'btn.cancel':      'İptal',
    'btn.close':       'Kapat',
    'tier.free':       '🌱 Ücretsiz',
    'tier.silver':     '⭐ Gümüş',
    'tier.gold':       '👑 Altın',
    'tier.palace':     '🏯 Saray',
  }
};

let currentLang = localStorage.getItem('kt_lang') || 'en';

function t(key) {
  return KT_LANG[currentLang]?.[key] || KT_LANG['en']?.[key] || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('kt_lang', lang);
  applyLang();
}

function applyLang() {
  // Apply translations to elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = t(key);
    } else {
      el.textContent = t(key);
    }
  });
  // Update html lang
  document.documentElement.lang = currentLang;
  // Update language toggle buttons
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
  });
}

// Apply on load
document.addEventListener('DOMContentLoaded', applyLang);

/* ── 4. LANGUAGE TOGGLE WIDGET ── */
function createLangToggle(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `
    <div style="display:flex;align-items:center;gap:0.35rem;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:100px;padding:0.2rem 0.3rem">
      <button data-lang="en" onclick="setLang('en')" style="padding:0.2rem 0.6rem;border-radius:100px;border:none;background:transparent;color:rgba(255,255,255,0.6);font-size:0.72rem;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s" class="${currentLang==='en'?'active':''}">🇬🇧 EN</button>
      <button data-lang="tr" onclick="setLang('tr')" style="padding:0.2rem 0.6rem;border-radius:100px;border:none;background:transparent;color:rgba(255,255,255,0.6);font-size:0.72rem;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s" class="${currentLang==='tr'?'active':''}">🇹🇷 TR</button>
    </div>
  `;
  // Style active button
  container.querySelectorAll('button').forEach(btn => {
    btn.style.background = btn.getAttribute('data-lang') === currentLang ? 'rgba(244,115,42,0.25)' : 'transparent';
    btn.style.color = btn.getAttribute('data-lang') === currentLang ? '#f4732a' : 'rgba(255,255,255,0.5)';
  });
}

/* ── 5. ADMIN NOTIFICATION — new member joined ── */
const SB_URL_U = 'https://pkhoyabazudqmfczkhax.supabase.co';
const SB_KEY_U = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBraG95YWJhenVkcW1mY3praGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NzM0OTksImV4cCI6MjA4ODQ0OTQ5OX0.sedlDlDNWHoNXz4yczYyDzwrZRRqNWozAT-TV7-pOS8';

async function notifyAdminNewMember(memberName, memberEmail) {
  try {
    // Find admin profile
    const res = await fetch(SB_URL_U + '/rest/v1/profiles?is_admin=eq.true&select=id', {
      headers: { 'apikey': SB_KEY_U, 'Authorization': 'Bearer ' + SB_KEY_U }
    });
    const admins = await res.json();
    if (!admins.length) return;

    // Send notification to each admin
    const notifs = admins.map(admin => ({
      user_id: admin.id,
      title:   '🎉 New member joined!',
      body:    memberName + ' (' + memberEmail + ') just joined KreaTown',
      type:    'new_member'
    }));

    await fetch(SB_URL_U + '/rest/v1/notifications', {
      method:  'POST',
      headers: {
        'apikey':       SB_KEY_U,
        'Authorization':'Bearer ' + SB_KEY_U,
        'Content-Type': 'application/json',
        'Prefer':       'return=minimal'
      },
      body: JSON.stringify(notifs)
    });
  } catch(e) {}
}

/* ── 6. NOTIFICATION BADGE ── */
async function loadNotificationCount() {
  const session = JSON.parse(localStorage.getItem('kt_session') || '{}');
  if (!session.access_token) return;
  const uid = session.user_id || session.id;

  try {
    const res = await fetch(
      SB_URL_U + '/rest/v1/notifications?user_id=eq.' + uid + '&is_read=eq.false&select=id',
      { headers: { 'apikey': SB_KEY_U, 'Authorization': 'Bearer ' + session.access_token } }
    );
    const data = await res.json();
    const count = data.length;

    // Update all notification badges
    document.querySelectorAll('.notif-badge, #notifBadge, .nav-notif-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });

    // Play sound for new notifications
    if (count > 0) {
      const prev = parseInt(sessionStorage.getItem('kt_notif_count') || '0');
      if (count > prev) playSound('notification');
      sessionStorage.setItem('kt_notif_count', count);
    }
  } catch(e) {}
}

/* ── 7. MESSAGE SOUND ── */
// Call this when a new message arrives in rooms
function onNewMessage(isOwn = false) {
  if (!isOwn) playSound('message');
}

// Check notifications every 30s
setInterval(loadNotificationCount, 30000);
document.addEventListener('DOMContentLoaded', loadNotificationCount);

/* ── 8. PWA INSTALL PROMPT ── */
window.addEventListener('appinstalled', () => {
  const btn = document.getElementById('pwaInstallBtn');
  if (btn) btn.style.display = 'none';
  playSound('success');
});
