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

/* ── 3. LANGUAGE SYSTEM ── */
const KT_TRANSLATIONS = {
  tr: {
    /* Navigation */
    'Community Feed': 'Topluluk Akışı',
    'My Profile': 'Profilim',
    'Dashboard': 'Panel',
    'Settings': 'Ayarlar',
    'Log out': 'Çıkış yap',
    'All Members': 'Tüm Üyeler',
    'Earnings': 'Kazanç',
    'Messages': 'Mesajlar',
    'Members': 'Üyeler',
    'Admin Panel': 'Yönetim Paneli',
    'Town Map': 'Kasaba Haritası',
    /* Rooms */
    'Hotel Lobby': 'Otel Lobisi',
    'The Restaurant': 'Restoran',
    'Superior Room': 'Superior Oda',
    'Resting Lounge': 'Dinlenme Salonu',
    'Thermal Pool': 'Termal Havuz',
    '3D Radio Room': '3D Radyo Odası',
    'Cinema TV Room': 'Sinema TV Odası',
    'Back': 'Geri',
    '← Back': '← Geri',
    'online': 'çevrimiçi',
    'Silver Members Only': 'Yalnızca Gümüş Üyeler',
    'Gold Suite Access': 'Altın Süit Erişimi',
    'Palace Access Only': 'Yalnızca Saray Erişimi',
    /* Feed */
    '✨ All': '✨ Tümü',
    '📝 Posts': '📝 Yazılar',
    '📸 Photos': '📸 Fotoğraflar',
    '🎙️ Podcasts': '🎙️ Podcastler',
    'All Posts': 'Tüm Yazılar',
    '🌱 Everyone': '🌱 Herkes',
    '⭐ Silver+': '⭐ Gümüş+',
    '👑 Gold+': '👑 Altın+',
    '🏯 Palace only': '🏯 Yalnızca Saray',
    '🚀 Share with community': '🚀 Toplulukla paylaş',
    'Share with community': 'Toplulukla paylaş',
    '✍️ Post': '✍️ Paylaş',
    'Latest from the community': 'Topluluktan son yazılar',
    'Quick access': 'Hızlı erişim',
    'Active rooms': 'Aktif odalar',
    /* Tiers */
    '🌱 Free': '🌱 Ücretsiz',
    '⭐ Silver': '⭐ Gümüş',
    '👑 Gold': '👑 Altın',
    '🏯 Palace': '🏯 Saray',
    'Free': 'Ücretsiz',
    'Silver': 'Gümüş',
    'Gold': 'Altın',
    'Palace': 'Saray',
    /* Member dash */
    'My tier': 'Üyeliğim',
    'Community posts': 'Topluluk yazıları',
    'Members online': 'Çevrimiçi üye',
    'Welcome back to KreaTown': 'KreaTown'a hoş geldin',
    'Enter Rooms': 'Odalara gir',
    "Topraq's Town": 'Topraq'ın Kasabası',
    'My Profile & Posts': 'Profilim & Yazılarım',
    'Settings & Profile': 'Ayarlar & Profil',
    '🔓 Unlock more of KreaTown': '🔓 KreaTown'da daha fazlasını aç',
    /* Buttons */
    'Save changes': 'Değişiklikleri kaydet',
    'Upload photo': 'Fotoğraf yükle',
    'Cancel': 'İptal',
    'Send': 'Gönder',
    'See all': 'Tümünü gör',
    'No posts yet': 'Henüz gönderi yok',
    'Platform Overview': 'Platform Genel Bakış',
  }
};

function getLang() {
  return localStorage.getItem('kt_lang') || 'en';
}

function t(key) {
  const lang = getLang();
  if (lang === 'en') return key;
  return KT_TRANSLATIONS.tr[key] || key;
}

function setLang(lang) {
  localStorage.setItem('kt_lang', lang);
  /* Update toggle button styles */
  document.querySelectorAll('[data-lang]').forEach(btn => {
    const active = btn.getAttribute('data-lang') === lang;
    btn.style.background = active ? 'rgba(244,115,42,0.3)' : 'transparent';
    btn.style.color      = active ? '#f4732a' : '';
    btn.style.fontWeight = active ? '600' : '400';
  });
  /* Apply translations */
  applyTranslations(lang);
  /* Re-render dynamic content */
  if (typeof renderRooms  !== 'undefined') renderRooms();
  if (typeof renderFeed   !== 'undefined') setTimeout(renderFeed, 50);
  if (typeof renderM      !== 'undefined') renderM();
}

function applyTranslations(lang) {
  if (!lang) lang = getLang();
  /* Update html lang only - safe translation */
  document.documentElement.lang = lang;
  /* Only translate elements with explicit data-i18n-tr attribute */
  document.querySelectorAll('[data-i18n-tr]').forEach(el => {
    el.textContent = lang === 'tr'
      ? el.getAttribute('data-i18n-tr')
      : (el.getAttribute('data-i18n-en') || el.getAttribute('data-i18n-tr'));
  });
}

/* Apply on every page load */
function initLang(){
  const lang = getLang();
  document.querySelectorAll('[data-lang]').forEach(btn => {
    const active = btn.getAttribute('data-lang') === lang;
    btn.style.background = active ? 'rgba(244,115,42,0.3)' : 'transparent';
    btn.style.color      = active ? '#f4732a' : '';
    btn.style.fontWeight = active ? '600' : '400';
  });
  if(lang === 'tr') applyTranslations('tr');
}
document.addEventListener('DOMContentLoaded', ()=>{ setTimeout(initLang, 100); });
/* Also run after any dynamic render */
window.addEventListener('load', ()=>{ setTimeout(initLang, 300); });

/* ── 4. LANGUAGE TOGGLE WIDGET ── */
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

/* ── TV/RADIO BACKGROUND STOP ── */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    /* Stop all audio/video when tab is hidden */
    document.querySelectorAll('audio, video').forEach(el => {
      if (!el.paused) {
        el._wasPlaying = true;
        el.pause();
      }
    });
    /* Stop iframe embeds (YouTube etc) */
    document.querySelectorAll('iframe').forEach(iframe => {
      try {
        const src = iframe.src;
        if (src && (src.includes('youtube') || src.includes('spotify') || src.includes('soundcloud'))) {
          iframe._origSrc = src;
          iframe.src = '';
        }
      } catch(e) {}
    });
  }
});

window.addEventListener('pagehide', () => {
  document.querySelectorAll('audio, video').forEach(el => el.pause());
  document.querySelectorAll('iframe[src*="youtube"], iframe[src*="spotify"]').forEach(el => {
    el.src = '';
  });
});
