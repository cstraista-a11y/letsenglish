/* Let's English — asistent pentru întrebări simple (răspunsuri automate, fără AI) */
(function () {
  var U = 'https://fyumutgpvkhsprldcygp.supabase.co/rest/v1/';
  var K = 'sb_publishable_EH0zGQo_TIc7j0bclqNYSA_lePIlXQi';
  var WA = 'https://wa.me/37369438143?text=';
  var onHome = location.pathname === '/' || location.pathname === '/index.html';
  var L = function (hash) { return onHome ? hash : '/' + hash; };

  var BTN = {
    proba: { t: 'Rezervă lecția gratuită', href: L('#contact') },
    test: { t: 'Fă testul de nivel', href: L('#test') },
    wa: { t: 'Scrie-i Tatianei pe WhatsApp', href: WA + encodeURIComponent('Bună ziua! Am o întrebare despre cursurile de engleză.'), ext: true }
  };
  var opening = new Date() < new Date('2026-11-29T00:00:00+02:00');

  var KB = [
    { id: 'pret', q: 'Cât costă?', kw: ['pret', 'costa', 'cost', 'tarif', 'bani', 'lei', 'euro', 'eur', 'achit', 'plata', 'abonament', 'reducere', 'цена', 'стоимость', 'сколько'],
      a: 'Prețul depinde de format (online, offline, în grupă sau individual) și de numărul de lecții. Tatiana îți trimite oferta exactă după lecția de probă, care e gratuită.', b: ['proba', 'wa'] },
    { id: 'proba', q: 'Cum e lecția de probă?', kw: ['proba', 'gratuit', 'gratis', 'incerc', 'prima lectie', 'trial', 'пробн'],
      a: 'Prima lecție e de probă, gratuită și fără niciun angajament. Afli ce nivel ai, vorbim despre scopul tău și vezi cum arată o lecție la noi.', b: ['proba'] },
    { id: 'nivel', q: 'Ce niveluri aveți?', kw: ['nivel', 'incepator', 'avansat', 'a1', 'a2', 'b1', 'b2', 'c1', 'zero', 'de la zero', 'test', 'уровень'],
      a: 'Lucrăm cu toate nivelurile, de la A1 (începător) la C1 (avansat). Dacă nu știi ce nivel ai, fă testul gratuit de pe site: 10 întrebări, 3 minute.', b: ['test', 'proba'] },
    { id: 'format', q: 'Online sau offline?', kw: ['online', 'offline', 'zoom', 'distanta', 'acasa', 'sala', 'unde', 'adresa', 'chisinau', 'locatie', 'онлайн'],
      a: 'Poți învăța online, de oriunde, sau offline, în Chișinău. Din decembrie avem și grupe offline în Băcioi.', b: ['proba'] },
    { id: 'bacioi', q: 'Grupele din Băcioi', kw: ['bacioi', 'braila', 'frumusica', 'straisteni', 'sat', 'filiala'],
      a: 'Din decembrie deschidem grupe offline în Băcioi: pentru copii de 6–9, 10–13 și 14–17 ani și pentru adulți, de cel mult 10 oameni.' + (opening ? ' Sâmbătă, 28 noiembrie, de la ora 10:00, e lecția deschisă gratuită.' : ' Scrie-ne ca să afli dacă mai sunt locuri.'), b: ['wa', 'proba'] },
    { id: 'copii', q: 'Aveți cursuri pentru copii?', kw: ['copil', 'copii', 'fiul', 'fiica', 'baiat', 'fetita', 'elev', 'scoala', 'clasa', 'adolescent', 'ani', 'ребен', 'дет'],
      a: 'Da. Avem grupe mici pentru copii și adolescenți, cu materiale adaptate programei școlare și conversație de la prima lecție. Cursul are 32 de lecții în 3 luni.', b: ['proba', 'test'] },
    { id: 'cambridge', q: 'Pregătiți pentru Cambridge?', kw: ['cambridge', 'certificat', 'examen', 'ielts', 'toefl', 'ket', 'pet', 'fce', 'bac', 'diploma', 'admitere'],
      a: 'Da, pregătim elevii pentru certificatele internaționale Cambridge, potrivite vârstei și nivelului. Examenul în sine se susține la un centru autorizat.', b: ['proba', 'wa'] },
    { id: 'profesori', q: 'Cine sunt profesorii?', kw: ['profesor', 'profesoara', 'tatiana', 'tefl', 'experienta', 'calificat', 'acreditat', 'cine preda'],
      a: 'Predau profesori cu certificare internațională TEFL. Școala o conduce Tatiana Străistă, care predă din 2017.', b: ['proba'] },
    { id: 'orar', q: 'Care e programul?', kw: ['orar', 'program', 'ora', 'ore', 'cand', 'zile', 'seara', 'dimineata', 'weekend', 'sambata', 'durata', 'cat dureaza', 'saptamana', 'lectii', 'расписание'],
      a: 'Lucrăm luni–vineri 8:00–20:30 și sâmbătă 9:00–16:00, iar ora exactă o stabilim împreună. Cursul general pentru adulți are 24 de lecții în 8 săptămâni, câte 3 pe săptămână.', b: ['proba'] },
    { id: 'companii', q: 'Engleză pentru companii', kw: ['companie', 'firma', 'echipa', 'angajati', 'corporate', 'b2b', 'business', 'birou', 'factura'],
      a: 'Facem cursuri de engleză de business pentru echipe: ședințe, e-mailuri, prezentări și negocieri. Începem cu o evaluare a nivelului echipei.', b: ['wa'] },
    { id: 'contact', q: 'Vreau să vorbesc cu cineva', kw: ['contact', 'telefon', 'suna', 'numar', 'whatsapp', 'viber', 'vorbesc', 'om', 'operator', 'email', 'mail'],
      a: 'Scrie-i Tatianei pe WhatsApp la +373 69 438 143 sau lasă-ți datele în formular și te contactăm în cel mult 24 de ore.', b: ['wa', 'proba'] },
    { id: 'salut', q: null, kw: ['salut', 'buna', 'buna ziua', 'hello', 'hi', 'hei', 'privet', 'привет', 'здравств'],
      a: 'Bună! Cu ce te pot ajuta? Alege o întrebare de mai jos sau scrie-o pe a ta.', b: [] },
    { id: 'multumesc', q: null, kw: ['multumesc', 'mersi', 'merci', 'thanks', 'thank you', 'спасибо'],
      a: 'Cu plăcere! Dacă mai ai întrebări, sunt aici.', b: [] }
  ];
  var QUICK = ['pret', 'proba', 'nivel', 'format', 'copii', 'cambridge', 'orar', 'contact'];

  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9Ѐ-ӿ ]+/g, ' ').replace(/\s+/g, ' ').trim(); }
  function find(text) {
    var t = ' ' + norm(text) + ' ', best = null, bestScore = 0;
    KB.forEach(function (e) {
      var sc = 0;
      e.kw.forEach(function (k) { var nk = norm(k); if (!nk) return; if (nk.length <= 3 ? t.indexOf(' ' + nk + ' ') >= 0 : t.indexOf(nk) >= 0) sc += nk.length > 4 ? 2 : 1; });
      if (e.id === 'salut' || e.id === 'multumesc') sc = sc * 0.3;
      if (sc > bestScore) { bestScore = sc; best = e; }
    });
    return best;
  }
  function log(text, id) {
    try {
      fetch(U + 'chat_intrebari', {
        method: 'POST',
        headers: { apikey: K, Authorization: 'Bearer ' + K, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({ vid: (window.__leVid || null), text: String(text).slice(0, 500), raspuns: id, path: location.pathname.slice(0, 300) })
      }).catch(function () {});
    } catch (e) {}
    try { if (window.gtag) gtag('event', 'chat_question', { event_category: 'Chat', event_label: id }); } catch (e) {}
  }

  var css = '' +
    '.lec-fab{position:fixed;right:20px;bottom:20px;z-index:900;width:58px;height:58px;border-radius:50%;border:2px solid #fff;background:#E8A714;color:#0D1B3E;box-shadow:0 6px 20px rgba(13,27,62,.35);cursor:pointer;display:flex;align-items:center;justify-content:center}' +
    '.lec-fab:focus-visible{outline:3px solid #E8A714;outline-offset:3px}' +
    '.lec-panel{position:fixed;right:20px;bottom:90px;z-index:901;width:360px;max-width:calc(100vw - 32px);height:520px;max-height:calc(100vh - 120px);background:#fff;border-radius:16px;box-shadow:0 16px 48px rgba(13,27,62,.28);display:none;flex-direction:column;overflow:hidden;font-family:Inter,system-ui,sans-serif;color:#0D1B3E}' +
    '.lec-panel.open{display:flex}' +
    '.lec-head{background:#0D1B3E;color:#fff;padding:14px 16px;display:flex;align-items:center;gap:10px}' +
    '.lec-head b{font-size:15px;display:block}.lec-head span{font-size:12px;color:rgba(255,255,255,.7)}' +
    '.lec-x{margin-left:auto;background:none;border:none;color:#fff;font-size:22px;line-height:1;cursor:pointer;width:36px;height:36px;border-radius:8px}' +
    '.lec-x:hover{background:rgba(255,255,255,.1)}' +
    '.lec-body{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:#F7F8FC}' +
    '.lec-msg{max-width:85%;padding:10px 12px;border-radius:14px;font-size:14px;line-height:1.45;white-space:pre-line}' +
    '.lec-bot{background:#fff;border:1px solid #E2E7F0;align-self:flex-start;border-bottom-left-radius:4px}' +
    '.lec-me{background:#0D1B3E;color:#fff;align-self:flex-end;border-bottom-right-radius:4px}' +
    '.lec-acts{display:flex;flex-direction:column;gap:6px;align-self:flex-start;max-width:85%}' +
    '.lec-act{display:block;text-decoration:none;text-align:center;background:#E8A714;color:#0D1B3E;font-weight:700;font-size:13px;padding:9px 12px;border-radius:10px}' +
    '.lec-act.ghost{background:#fff;border:1.5px solid #0D1B3E}' +
    '.lec-chips{display:flex;flex-wrap:wrap;gap:6px}' +
    '.lec-chip{border:1.5px solid #C9D1E3;background:#fff;color:#0D1B3E;border-radius:999px;padding:7px 11px;font-size:13px;cursor:pointer;font-family:inherit}' +
    '.lec-chip:hover{border-color:#0D1B3E}' +
    '.lec-form{display:flex;gap:8px;padding:10px;border-top:1px solid #E2E7F0;background:#fff}' +
    '.lec-form input{flex:1;min-width:0;border:1.5px solid #E2E7F0;border-radius:10px;padding:10px 12px;font-size:15px;font-family:inherit;outline:none;color:#0D1B3E}' +
    '.lec-form input:focus{border-color:#0D1B3E}' +
    '.lec-send{border:none;background:#0D1B3E;color:#fff;border-radius:10px;padding:0 14px;font-weight:700;cursor:pointer;font-family:inherit}' +
    '.lec-note{font-size:11.5px;color:#5B6785;text-align:center;padding:0 10px 8px;background:#fff}' +
    '@media(max-width:480px){.lec-panel{right:0;left:0;bottom:0;width:100%;max-width:100%;height:85vh;max-height:85vh;border-radius:16px 16px 0 0}.lec-fab{right:16px;bottom:16px}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var fab = document.createElement('button');
  fab.className = 'lec-fab'; fab.type = 'button'; fab.setAttribute('aria-label', 'Întrebări? Deschide asistentul'); fab.setAttribute('aria-expanded', 'false');
  fab.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>';
  var panel = document.createElement('div');
  panel.className = 'lec-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', "Asistent Let's English");
  panel.innerHTML = '<div class="lec-head"><div><b>Let’s English</b><span>Răspunsuri rapide</span></div><button class="lec-x" type="button" aria-label="Închide">×</button></div>' +
    '<div class="lec-body" aria-live="polite"></div>' +
    '<form class="lec-form"><input type="text" maxlength="300" placeholder="Scrie întrebarea ta..." aria-label="Întrebarea ta"><button class="lec-send" type="submit">Trimite</button></form>' +
    '<div class="lec-note">Răspunsuri automate. Nu scrie aici date personale.</div>';
  document.body.appendChild(panel); document.body.appendChild(fab);
  var body = panel.querySelector('.lec-body'), form = panel.querySelector('form'), input = form.querySelector('input');

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function scroll() { body.scrollTop = body.scrollHeight; }
  function say(text, who) { var d = document.createElement('div'); d.className = 'lec-msg ' + (who === 'me' ? 'lec-me' : 'lec-bot'); d.textContent = text; body.appendChild(d); scroll(); }
  function actions(keys) {
    if (!keys || !keys.length) return;
    var d = document.createElement('div'); d.className = 'lec-acts';
    d.innerHTML = keys.map(function (k, i) { var b = BTN[k]; return '<a class="lec-act' + (i ? ' ghost' : '') + '" href="' + esc(b.href) + '"' + (b.ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(b.t) + '</a>'; }).join('');
    d.addEventListener('click', function (e) { var a = e.target.closest('a'); if (a && !a.target) close(); });
    body.appendChild(d); scroll();
  }
  function chips(except) {
    var d = document.createElement('div'); d.className = 'lec-chips';
    QUICK.filter(function (id) { return id !== except; }).forEach(function (id) {
      var e = KB.filter(function (x) { return x.id === id; })[0];
      var c = document.createElement('button'); c.type = 'button'; c.className = 'lec-chip'; c.textContent = e.q;
      c.addEventListener('click', function () { d.remove(); ask(e.q, e); });
      d.appendChild(c);
    });
    body.appendChild(d); scroll();
  }
  function ask(text, entry) {
    say(text, 'me');
    var e = entry || find(text);
    log(text, e ? e.id : 'necunoscut');
    setTimeout(function () {
      if (e) { say(e.a); actions(e.b); }
      else { say('Nu sunt sigur că am înțeles. Tatiana îți răspunde personal, de obicei în aceeași zi.'); actions(['wa', 'proba']); }
      chips(e && e.id);
    }, 350);
  }
  var started = false;
  function open() {
    panel.classList.add('open'); fab.setAttribute('aria-expanded', 'true');
    if (!started) { started = true; say('Bună! Sunt asistentul Let’s English. Alege o întrebare sau scrie-o pe a ta.'); chips(); }
    setTimeout(function () { input.focus(); }, 50);
    try { if (window.gtag) gtag('event', 'chat_open', { event_category: 'Chat' }); } catch (e) {}
  }
  function close() { panel.classList.remove('open'); fab.setAttribute('aria-expanded', 'false'); }
  fab.addEventListener('click', function () { panel.classList.contains('open') ? close() : open(); });
  panel.querySelector('.lec-x').addEventListener('click', function () { close(); fab.focus(); });
  panel.addEventListener('keydown', function (e) { if (e.key === 'Escape') { close(); fab.focus(); } });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value.trim(); if (!v) return;
    input.value = '';
    var old = body.querySelector('.lec-chips:last-of-type'); if (old) old.remove();
    ask(v);
  });
})();
