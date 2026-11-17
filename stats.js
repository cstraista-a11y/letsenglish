/* Let's English — statistici anonime de vizite (fără date personale) */
(function () {
  if (navigator.webdriver || /bot|crawl|spider|lighthouse/i.test(navigator.userAgent)) return;
  var U = 'https://fyumutgpvkhsprldcygp.supabase.co/rest/v1/';
  var K = 'sb_publishable_EH0zGQo_TIc7j0bclqNYSA_lePIlXQi';
  function rid() {
    var r = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : (Date.now().toString(36) + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2));
    return r.replace(/-/g, '').slice(0, 24);
  }
  var vid = null, nou = false, sid = null;
  try { vid = localStorage.getItem('le_vid'); } catch (e) {}
  if (!vid) { vid = rid(); nou = true; try { localStorage.setItem('le_vid', vid); } catch (e) {} }
  try { sid = sessionStorage.getItem('le_sid'); if (!sid) { sid = rid(); sessionStorage.setItem('le_sid', sid); } } catch (e) { sid = rid(); }
  var p = new URLSearchParams(location.search);
  var ref = null;
  try { if (document.referrer) { var h = new URL(document.referrer).hostname; if (h && h !== location.hostname) ref = h.slice(0, 200); } } catch (e) {}
  function cut(v, n) { v = (v || '').trim(); return v ? v.slice(0, n) : null; }
  var base = {
    vid: vid, sid: sid, path: (location.pathname || '/').slice(0, 300), ref: ref,
    utm_source: cut(p.get('utm_source'), 100), utm_medium: cut(p.get('utm_medium'), 100), utm_campaign: cut(p.get('utm_campaign'), 150),
    device: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'mobil' : 'desktop'
  };
  function send(row, keep) {
    try {
      fetch(U + 'vizite', {
        method: 'POST', keepalive: !!keep,
        headers: { apikey: K, Authorization: 'Bearer ' + K, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify(row)
      }).catch(function () {});
    } catch (e) {}
  }
  var row = {}; for (var k in base) row[k] = base[k];
  row.tip = 'view'; row.nou = nou;
  send(row);

  // timp activ pe pagină: se trimite în bucăți, de fiecare dată când pagina e ascunsă sau închisă
  var active = 0, last = Date.now(), visible = !document.hidden;
  function flush() {
    if (visible) active += Date.now() - last;
    last = Date.now();
    var s = Math.round(active / 1000);
    if (s >= 1) {
      var r = {}; for (var k in base) r[k] = base[k];
      r.tip = 'leave'; r.durata = Math.min(s, 86400);
      send(r, true);
    }
    active = 0;
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { flush(); visible = false; }
    else { visible = true; last = Date.now(); }
  });
  window.addEventListener('pagehide', function () { if (visible) { flush(); visible = false; } });
  window.__leVid = vid;
})();
