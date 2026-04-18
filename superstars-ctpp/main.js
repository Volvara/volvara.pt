(function(){

  // ── i18n HELPER ─────────────────────────────────────────────────────────
  function getLang() { return window._lang || 'pt'; }
  var T = {
    pt: {
      proximaEtapa: 'Próxima Etapa',
      proxDia: 'dias', proxHora: 'horas', proxMin: 'min',
      aberta: 'Inscrições abertas', pendente: 'Em breve', concluida: 'Concluída',
      inscritos: 'inscritos', limite: 'limite', hora: 'h',
      etapa: 'ª Etapa',
      gruposFase: 'Fase de Grupos',
      quadros: 'Quadros',
      classificacaoFinal: 'Classificação Final',
      torneioNaoEncontrado: 'Torneio não encontrado para esta etapa.',
      nenhumaEtapa: 'Nenhuma etapa com torneio disponível.',
      sorteioNaoRealizado: 'Sorteio ainda não realizado.',
      resultadosEtapa: 'Resultados por Etapa',
      temporada: 'Temporada',
      pts: 'pts', vit: 'V', der: 'D', difJ: '\u00b1J', pos: 'Pos', jog: 'Jogador',
      actualizadoAs: 'Actualizado às',
      aoVivo: 'AO VIVO',
      actualizar: '↻ Actualizar',
      domingo: 'Dom', sabado: 'Sáb',
      meses: {'01':'Jan','02':'Fev','03':'Mar','04':'Abr','05':'Mai','06':'Jun',
               '07':'Jul','08':'Ago','09':'Set','10':'Out','11':'Nov','12':'Dez'},
      partilharRanking: 'Partilhar via WhatsApp',
      semDados: 'Sem dados disponíveis.',
      // Hero
      proximaEtapaLabel: 'Próxima Etapa',
      entrarWA: 'Entrar no grupo WhatsApp',
      pedirEntrar: 'Pedir para entrar no grupo',
      entrarGrupo: 'Entrar no grupo',
      pontos: 'Pontos',
      melhorPos: 'Melhor pos.',
      resultadosPorEtapa: 'Resultados por etapa',
      lugar: 'lugar',
      temporadaLabel: 'Temporada',
      etapasLabel: 'etapas',
      vagasLabel: 'vagas',
      // Hero card detail
      domingo: 'Domingo',
      // Ranking
      filtrarEtapa: 'Filtrar por etapa',
      todasEtapas: 'Temporada (todas as etapas)',
      etapasCol: 'Etapas',
      melhorCol: 'Melhor',
      partilharBtn: 'Partilhar Ranking',
      // Brackets
      quadroPrincipal: 'Quadro Principal',
      oitavos: 'Oitavos',
      quartos: 'Quartos',
      meias: 'Meias',
      posicoesLugar: 'Posições por Lugar',
      quadroB: 'Quadro B',
      meias56: 'Meias 5/6',
      lugar3_4: '3º / 4º Lugar',
      lugar5_6: '5º / 6º Lugar',
      lugar5_6s: '5º / 6º',
      lugar7_8: '7º / 8º Lugar',
      lugar9_10: '9º / 10º Lugar',
      lugar13_14: '13º / 14º Lugar',
      lugar15: '15º Lugar',
      final12: 'Final 1º/2º',
      finalQB: 'Final 11º/12º',
      meias58: 'Meias 5º-8º',
    },
    en: {
      proximaEtapa: 'Next Round',
      proxDia: 'days', proxHora: 'hours', proxMin: 'min',
      aberta: 'Registration open', pendente: 'Coming soon', concluida: 'Completed',
      inscritos: 'registered', limite: 'max', hora: 'h',
      etapa: ' Round',
      gruposFase: 'Group Stage',
      quadros: 'Brackets',
      classificacaoFinal: 'Final Standings',
      torneioNaoEncontrado: 'Tournament not found for this round.',
      nenhumaEtapa: 'No rounds with results available.',
      sorteioNaoRealizado: 'Draw not yet completed.',
      resultadosEtapa: 'Round Results',
      temporada: 'Season',
      pts: 'pts', vit: 'W', der: 'L', difJ: '\u00b1G', pos: 'Pos', jog: 'Player',
      actualizadoAs: 'Updated at',
      aoVivo: 'LIVE',
      actualizar: '↻ Refresh',
      domingo: 'Sun', sabado: 'Sat',
      meses: {'01':'Jan','02':'Feb','03':'Mar','04':'Apr','05':'May','06':'Jun',
               '07':'Jul','08':'Aug','09':'Sep','10':'Oct','11':'Nov','12':'Dec'},
      partilharRanking: 'Share via WhatsApp',
      semDados: 'No data available.',
      // Hero
      proximaEtapaLabel: 'Next Round',
      entrarWA: 'Join WhatsApp group',
      pedirEntrar: 'Request to join',
      entrarGrupo: 'Join the group',
      pontos: 'Points',
      melhorPos: 'Best pos.',
      resultadosPorEtapa: 'Results by round',
      lugar: 'place',
      temporadaLabel: 'Season',
      etapasLabel: 'rounds',
      vagasLabel: 'spots',
      // Hero card detail
      domingo: 'Sunday',
      // Ranking
      filtrarEtapa: 'Filter by round',
      todasEtapas: 'Season (all rounds)',
      etapasCol: 'Rounds',
      melhorCol: 'Best',
      partilharBtn: 'Share Ranking',
      // Brackets
      quadroPrincipal: 'Main Bracket',
      oitavos: 'Round of 16',
      quartos: 'Quarter-finals',
      meias: 'Semi-finals',
      posicoesLugar: 'Positions',
      quadroB: 'Bracket B',
      meias56: 'Semi-finals 5/6',
      lugar3_4: '3rd / 4th Place',
      lugar5_6: '5th / 6th Place',
      lugar5_6s: '5th / 6th',
      lugar7_8: '7th / 8th Place',
      lugar9_10: '9th / 10th Place',
      lugar13_14: '13th / 14th Place',
      lugar15: '15th Place',
      final12: 'Final 1st/2nd',
      finalQB: 'Final 11th/12th',
      meias58: 'Semi-finals 5th-8th',
      dias_map: {'Dom':'Sun','Sáb':'Sat','Sex':'Fri','Qui':'Thu','Qua':'Wed','Ter':'Tue','Seg':'Mon'},
      meses_map: {'Jan':'Jan','Fev':'Feb','Mar':'Mar','Abr':'Apr','Mai':'May','Jun':'Jun','Jul':'Jul','Ago':'Aug','Set':'Sep','Out':'Oct','Nov':'Nov','Dez':'Dec'},
    }
  };
  function t(key) { return (T[getLang()] || T.pt)[key] || T.pt[key] || key; }
  function ordinal(n) {
    if(getLang() !== 'en') return n+'º';
    var s = ['th','st','nd','rd'], v = n%100;
    return n + (s[(v-20)%10] || s[v] || s[0]);
  }

  // Re-render all dynamic sections when lang changes
  window._ssRenderAll = function() {
    renderProxima();
    renderRankingSection(rankEtapaActual);
    renderCalendario();
    renderResultadosSection();
  };
  // Expose day/month translation helpers (used in renders called from setLang)
  window._trDia  = function(d) { return (T.en.dias_map  && T.en.dias_map[d])   || d; };
  window._trMes  = function(m) { return (T.en.meses_map && T.en.meses_map[m])  || m; };


  // ── LIVE POLLING STATE ──────────────────────────────────────────────
  var _liveTimer = null;
  var _liveSHAs = {};
  var _liveLastUpdate = null;
  var _liveActive = false;
  var LIVE_INTERVAL_FAST = 10000;   // 10s when torneio active
  var LIVE_INTERVAL_SLOW = 30000;   // 30s otherwise
  // Read-only PAT for GitHub Contents API (bypasses CDN cache)
  // Scope: contents:read on volvara.pt repo only
  // If empty, falls back to raw.githubusercontent.com
  var LIVE_READ_PAT = ''; // Set new PAT via Claude Code

  var REPO_OWNER = 'Volvara';
  var REPO_NAME  = 'volvara.pt';
  var API_BASE   = 'https://api.github.com/repos/'+REPO_OWNER+'/'+REPO_NAME+'/contents/superstars-ctpp/data/';
  // Cloudflare Worker URL — serves data with no CDN cache, PAT in Worker secrets
  // Set WORKER_BASE = '' to fall back to raw.githubusercontent.com
  var WORKER_BASE = 'https://volvara.pt/api/superstars/prod/';
  var CACHE_KEY  = 'superstars_cache';
  var CACHE_TTL  = 30 * 1000;  // 30s — refresh quickly with live polling

  var WA_NUMBER = "351965553436";
  var WA_MSG = encodeURIComponent("Olá! Vi o site do Super Stars CTPP e gostaria de participar. O meu nome é [Nome] e sou sócio do clube. Podem adicionar-me ao grupo?");
  var WA_URL = "https://wa.me/" + WA_NUMBER + "?text=" + WA_MSG;

  // ── ESTADO ──────────────────────────────────────────────────────────────
  var ETAPAS     = [];
  var JOGADORES  = [];
  var TORNEIOS   = [];
  var ETAPAS_RAW = [];
  var rankEtapaActual = 'todas';

  var ETAPAS_FB = [
    {n:1,data:"2026-04-12",dia:"Dom",mes:"Abr",hora:"8h30",estado:"aberta"},
    {n:2,data:"2026-04-19",dia:"Dom",mes:"Abr",hora:"8h30",estado:"pendente"},
    {n:3,data:"2026-05-10",dia:"Dom",mes:"Mai",hora:"8h30",estado:"pendente"},
    {n:4,data:"2026-05-17",dia:"Dom",mes:"Mai",hora:"8h30",estado:"pendente"},
    {n:5,data:"2026-06-07",dia:"Dom",mes:"Jun",hora:"8h30",estado:"pendente"},
    {n:6,data:"2026-06-28",dia:"Dom",mes:"Jun",hora:"8h30",estado:"pendente"}
  ];

  // ── WA LINKS ────────────────────────────────────────────────────────────
  [document.getElementById("hero-wa-btn"),document.getElementById("wa-btn-reg")].forEach(function(el){
    if(el) el.href = WA_URL;
  });

  // ── CACHE ────────────────────────────────────────────────────────────────
  function saveCache(data) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ts: Date.now(), data: data})); } catch(e) {}
  }
  function loadCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if(!raw) return null;
      var obj = JSON.parse(raw);
      if(Date.now() - obj.ts > CACHE_TTL) return null;
      return obj.data;
    } catch(e) { return null; }
  }
  // ── GITHUB FETCH HELPER ─────────────────────────────────────────────────
  // Uses Contents API with PAT (bypasses Cloudflare CDN cache, ~1s latency)
  // Falls back to raw.githubusercontent.com if no PAT configured
  var _etags = {};
  async function ghFetchJSON(filename) {
    // Priority 1: Cloudflare Worker (PAT in server secret, no CDN cache, ~1s)
    if(WORKER_BASE) {
      var res = await fetch(WORKER_BASE + filename + '?t=' + Date.now(), {cache: 'no-store'});
      if(res.ok) return await res.json();
      // Worker failed — fall through to raw
      console.warn('[SuperStars] Worker fetch failed (' + res.status + '), falling back to raw');
    }
    // Priority 2: raw.githubusercontent.com (CDN cache ~5min, no auth needed)
    var rawBase = API_BASE
      .replace('https://api.github.com/repos/','https://raw.githubusercontent.com/')
      .replace('/contents/','/main/');
    var res2 = await fetch(rawBase + filename + '?t=' + Date.now());
    if(!res2.ok) throw new Error('raw fetch ' + res2.status);
    return await res2.json();
  }

  // ── POLL HASH helper — detect changes without full parse ─────────────────
  var _pollHashes = {};
  async function ghPollChanged(filename) {
    // Use Worker if available — compare hash to detect changes
    var source = WORKER_BASE ? WORKER_BASE : null;
    if(!source) {
      source = API_BASE
        .replace('https://api.github.com/repos/','https://raw.githubusercontent.com/')
        .replace('/contents/','/main/');
    }
    var res = await fetch(source + filename + '?t=' + Date.now(), {cache: 'no-store'});
    if(!res.ok) return false;
    var text = await res.text();
    var hash = text.length + '_' + text.slice(-32);
    if(_pollHashes[filename] === hash) return false;
    _pollHashes[filename] = hash;
    return text;
  }

  function applyData(d) {
    JOGADORES  = d.jogadores || [];
    ETAPAS_RAW = d.etapas   || [];
    TORNEIOS   = d.torneios || [];
    var meses = {'01':'Jan','02':'Fev','03':'Mar','04':'Abr','05':'Mai','06':'Jun','07':'Jul','08':'Ago','09':'Set','10':'Out','11':'Nov','12':'Dez'};
    ETAPAS = ETAPAS_RAW.map(function(e){ return mapEtapa(e,meses); });
  }
  function mapEtapa(e, meses) {
    var p = e.data ? e.data.split('-') : [];
    return {n:e.numero, data:e.data, dia:'Dom', mes:meses[p[1]]||'', hora:e.hora||'8h30', estado:e.estado||'pendente', id:e.id};
  }
  function useFallback() { ETAPAS = ETAPAS_FB; }

  // ── SKELETON ─────────────────────────────────────────────────────────────
  function showRankingSkeleton() {
    var c = document.getElementById("ranking-table-container");
    if(!c) return;
    var rows = '';
    for(var i=0;i<5;i++) rows += '<tr class="skel-row"><td><span class="skel skel-pos"></span></td><td><span class="skel skel-name"></span></td><td><span class="skel skel-num"></span></td><td><span class="skel skel-num"></span></td><td><span class="skel skel-num"></span></td><td><span class="skel skel-num"></span></td></tr>';
    c.innerHTML = '<div class="rank-scroll-wrap"><table class="rank-table rank-fixed"><thead><tr><th class="col-fix col-pos">'+ t('pos') +'</th><th class="col-fix col-nom">'+ t('jog') +'</th><th class="col-stat">Pts</th><th class="col-stat">V</th><th class="col-stat">D</th><th class="col-stat">'+ t('difJ') +'</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
  }

  // ── FETCH ─────────────────────────────────────────────────────────────────
  function ghDecode(apiJson) {
    try {
      var b64 = apiJson.content.replace(/\n/g,'');
      return JSON.parse(decodeURIComponent(escape(atob(b64))));
    } catch(e) { throw new Error('ghDecode: '+e.message); }
  }

  async function loadData() {
    try {
      // Load from cache first for instant render — validate it's not stale/corrupt
      var cached = loadCache();
      var cacheValid = cached && cached.torneios && cached.torneios.every(function(t){
        return !t.grupos || Array.isArray(t.grupos);
      });
      // Also clear cache if it's very fresh — always fetch live data
      if(cacheValid) { applyData(cached); renderProxima(); renderRankingSection(rankEtapaActual); renderCalendario(); }
      else { localStorage.removeItem('superstars_cache'); }

      // Fetch all three files in parallel via ghFetchJSON (PAT → Contents API, else raw)
      var [jog, eta, tor] = await Promise.all([
        ghFetchJSON('jogadores.json'),
        ghFetchJSON('etapas.json'),
        ghFetchJSON('torneios.json'),
      ]);
      var d = { jogadores: jog.jogadores||[], etapas: eta.etapas||[], torneios: tor.torneios||[] };
      applyData(d);
      saveCache(d);
    } catch(err) {
      var cached2 = loadCache();
      if(cached2) { applyData(cached2); }
      else { useFallback(); }
    }
    // On fresh load: prefer active (aberta) etapa in results section
    var activeE = ETAPAS_RAW.find(function(e){ return e.estado==='aberta'; });
    if(activeE) window._resEtapaActual = activeE.id;
    renderProxima();
    renderRankingSection(rankEtapaActual);
    renderCalendario();
    renderResultadosSection();
    startLivePolling();
  }

  // ── COUNTDOWN ────────────────────────────────────────────────────────────
  function countdown(targetDate, hora){
    var now = new Date();
    var hm = (hora||'8h30').replace('h',':').split(':');
    var target = new Date(targetDate);
    target.setHours(parseInt(hm[0])||8, parseInt(hm[1])||30, 0, 0);
    var diff = target - now;
    if(diff<=0) return null;
    return {d:Math.floor(diff/86400000),h:Math.floor((diff%86400000)/3600000),m:Math.floor((diff%3600000)/60000)};
  }

  // ── PRÓXIMA ETAPA ─────────────────────────────────────────────────────────
  function renderProxima(){
    var now = new Date();
    var sorted = ETAPAS.slice().sort(function(a,b){return new Date(a.data)-new Date(b.data);});
    var proxima = null;
    for(var i=0;i<sorted.length;i++){if(new Date(sorted[i].data)>=now){proxima=sorted[i];break;}}
    if(!proxima) return;
    var cd = countdown(proxima.data, proxima.hora);
    var dayNum = proxima.data.split("-")[2].replace(/^0/,"");

    var hc = document.getElementById("hero-cards");
    if(hc) hc.innerHTML =
      '<div class="hero-card">'+
        '<div class="hero-card-label">'+t('proximaEtapaLabel')+'</div>'+
        '<div class="hero-card-title">'+(getLang()==='en'?ordinal(proxima.n)+' Round':proxima.n+t('etapa'))+'</div>'+
        '<div class="hero-card-sub">'+(getLang()==='en'?window._trDia(proxima.dia):proxima.dia)+' '+dayNum+' '+(getLang()==='en'?window._trMes(proxima.mes):proxima.mes)+'</div>'+
        (cd?'<div class="countdown">'+
          '<div class="countdown-unit"><span class="countdown-num" id="cd-d">'+cd.d+'</span><span class="countdown-label">'+t('proxDia')+'</span></div>'+
          '<span class="countdown-sep">:</span>'+
          '<div class="countdown-unit"><span class="countdown-num" id="cd-h">'+String(cd.h).padStart(2,"0")+'</span><span class="countdown-label">'+t('proxHora')+'</span></div>'+
          '<span class="countdown-sep">:</span>'+
          '<div class="countdown-unit"><span class="countdown-num" id="cd-m">'+String(cd.m).padStart(2,"0")+'</span><span class="countdown-label">'+t('proxMin')+'</span></div>'+
        '</div>':'')+
      '</div>'+
      '<div class="hero-card">'+
        '<div class="hero-card-label">'+t('temporadaLabel')+' · 2026</div>'+
        '<div class="hero-season-chips">'+
          ETAPAS.slice().sort(function(a,b){return new Date(a.data)-new Date(b.data);}).map(function(e){
            var day = e.data ? e.data.split('-')[2].replace(/^0/,'') : '';
            var monKey = e.data ? e.data.split('-')[1] : '';
            var mon = (t('meses')[monKey]||monKey).slice(0,3);
            var done  = e.estado==='concluida';
            var open  = e.estado==='aberta';
            return '<div class="season-chip'+(done?' chip-done':(open?' chip-open':''))+'">'+
              '<span class="chip-day">'+day+'</span>'+
              '<span class="chip-mon">'+mon+'</span>'+
            '</div>';
          }).join('')+
        '</div>'+
      '</div>';

    var pe = document.getElementById("proxima-etapa-container");
    if(pe) pe.innerHTML =
      '<div class="next-etapa fade-in">'+
        '<div class="ne-date edb-senior">'+
          '<div class="ne-day">'+dayNum+'</div><div class="ne-month">'+(getLang()==='en'?window._trMes(proxima.mes):proxima.mes)+'</div>'+
        '</div>'+
        '<div class="ne-info">'+
          '<span class="ne-badge">Super Stars</span>'+
          '<div class="ne-title">'+(getLang()==='en'?ordinal(proxima.n)+' Round Super Stars':proxima.n+'ª Etapa Super Stars')+'</div>'+
          '<div class="ne-detail">'+ t('domingo') +' · '+proxima.hora+' — 11h · '+(proxima.limite||15)+' '+t('vagasLabel')+' · 5€</div>'+
          (proxima.estado==="aberta"?'<div class="etapa-badge eb-open" style="margin-top:10px"><span class="eb-dot\"></span> '+t('aberta')+'</div>':'')+
        '</div>'+
        '<div class="ne-action">'+
          '<a href="'+WA_URL+'" class="hero-cta" style="font-size:13px;padding:11px 20px">'+
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.855L.057 23.082a.75.75 0 00.92.921l5.227-1.473A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.685-.52-5.21-1.426l-.374-.223-3.104.875.876-3.104-.223-.374A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>'+
            t('entrarGrupo')+'</a>'+
        '</div>'+
      '</div>';

    if(cd){
      setInterval(function(){
        var c=countdown(proxima.data,proxima.hora); if(!c) return;
        var dd=document.getElementById("cd-d"),dh=document.getElementById("cd-h"),dm=document.getElementById("cd-m");
        if(dd)dd.textContent=c.d; if(dh)dh.textContent=String(c.h).padStart(2,"0"); if(dm)dm.textContent=String(c.m).padStart(2,"0");
      },30000);
    }
  }

  // ── CALC RANKING (V/D temporada) ──────────────────────────────────────────
  // Nota: Fase B vai substituir por pontos de torneio acumulados
  function calcRanking(etapaId) {
    var jogs = JOGADORES.filter(function(j){ return j.tipo==='senior'; });
    var s = {};
    jogs.forEach(function(j){
      s[j.id]={id:j.id,nome:j.nome,pts:0,enc:0,vitorias:0,derrotas:0,games_g:0,games_p:0};
    });

    // Ranking a partir de torneios concluídos
    var PONTUACAO = [18,16,14,13,12,11,10,9,8,7,6,5,4,3,2];
    var torneiosFiltrados = etapaId && etapaId!=='todas'
      ? TORNEIOS.filter(function(t){return t.etapaId===etapaId;})
      : TORNEIOS;

    torneiosFiltrados.forEach(function(t){
      if(!t.classificacaoFinal||!t.classificacaoFinal.length) return;
      t.classificacaoFinal.forEach(function(c){
        if(!s[c.jogId]) return;
        s[c.jogId].pts += c.pts||0;
        // Track position for display
        if(!s[c.jogId].etapas) s[c.jogId].etapas = [];
        s[c.jogId].etapas.push({etapaId:t.etapaId, pos:c.pos, pts:c.pts});
      });
    });

    return Object.values(s).map(function(r){
      r.dif_games = r.games_g - r.games_p;
      return r;
    }).sort(function(a,b){ return b.pts - a.pts; });
  }

  // ── ETAPAS COM TORNEIOS CONCLUÍDOS ────────────────────────────────────────
  function etapasComTorneio() {
    return ETAPAS_RAW.filter(function(e){
      // Include etapas with: completed torneio OR active torneio (grupos/quadros)
      return TORNEIOS.some(function(t){
        if(t.etapaId !== e.id) return false;
        // Completed: has classificacaoFinal
        if(t.classificacaoFinal && t.classificacaoFinal.length) return true;
        // Active: has grupos with players (sorteio done)
        if(Array.isArray(t.grupos) && t.grupos.some(function(g){return g.jogadores && g.jogadores.length > 0;})) return true;
        return false;
      });
    });
  }

  // ── RENDER RANKING ────────────────────────────────────────────────────────
  function renderResultadosEtapa(etapaId) {
    var c = document.getElementById("resultados-etapa-container");
    if(!c) return;
    if(!etapaId || etapaId==='todas') { c.innerHTML=''; return; }
    var torneio = TORNEIOS.find(function(t){return t.etapaId===etapaId;});
    if(!torneio||!torneio.classificacaoFinal||!torneio.classificacaoFinal.length) {
      c.innerHTML='<div class="res-etapa-empty">Torneio ainda em curso ou sem resultados.</div>';
      return;
    }
    var medals=['🥇','🥈','🥉'];
    var html = '<div class="res-etapa-list">';
    torneio.classificacaoFinal.forEach(function(c2){
      var nome=(JOGADORES.find(function(j){return j.id===c2.jogId;})||{}).nome||c2.jogId;
      html+='<div class="res-etapa-row">'+
        '<span class="res-player res-winner">'+(medals[c2.pos-1]||ordinal(c2.pos))+' '+nome+'</span>'+
        '<span class="res-score">'+c2.pts+' pts</span>'+
      '</div>';
    });
    html+='</div>';
    c.innerHTML=html;
  }

  function renderRankingSection(etapaId) {
    var container = document.getElementById("ranking-table-container");
    if(!container) return;

    var etapas = etapasComTorneio();
    var selectorHtml = '';
    if(etapas.length > 0) {
      var opts = '<option value="todas"'+(etapaId==='todas'?' selected':'')+'>'+ t('todasEtapas') +'</option>';
      opts += etapas.map(function(e){
        var lbl = (function(){
          var day = e.data.split('-')[2].replace(/^0/,'');
          var mMap = t('meses');
          var monKey = e.data.split('-')[1];
          if(getLang()==='en'){
            var mon = mMap[monKey]||monKey;
            return ordinal(e.numero)+' · '+day+' '+mon;
          } else {
            return (e.numero||'')+t('etapa')+' · '+day+'/'+(mMap[monKey]||monKey);
          }
        })();
        return '<option value="'+e.id+'"'+(etapaId===e.id?' selected':'')+'>'+lbl+'</option>';
      }).join('');
      selectorHtml = '<div class="rank-filter">'+
        '<label class="rank-filter-label">'+ t('filtrarEtapa') +'</label>'+
        '<select class="rank-filter-sel" id="rank-etapa-sel">'+opts+'</select>'+
      '</div>';
    }

    var rows = calcRanking(etapaId);
    var temDados = rows.some(function(r){return r.pts>0;});

    var tabelaHtml;
    if(!temDados) {
      tabelaHtml = '<div class="rank-empty">'+
        '<div style="font-size:2.5rem;margin-bottom:14px">🎾</div>'+
        '<div style="font-size:15px;font-weight:600;color:var(--cr);margin-bottom:6px">'+t('temporadaLabel')+' 2026 a começar</div>'+
        '<div>O ranking actualiza após cada torneio.</div></div>';
    } else {
      var thead = '<thead><tr>'+
        '<th class="col-fix col-pos">'+t('pos')+'</th>'+
        '<th class="col-fix col-nom">'+t('jog')+'</th>'+
        '<th class="col-stat">Pts</th>'+
        '<th class="col-stat">'+t('etapasCol')+'</th>'+
        '<th class="col-stat">'+t('melhorCol')+'</th>'+
      '</tr></thead>';
      var tbody = rows.map(function(r,i){
        var pc = i===0?"pos-1":i===1?"pos-2":i===2?"pos-3":"pos-n";
        var etapasCount = r.etapas ? r.etapas.length : 0;
        var melhorPos = r.etapas && r.etapas.length ? Math.min.apply(null, r.etapas.map(function(e){return e.pos;})) : '—';
        var melhor = melhorPos!=='—' ? ordinal(melhorPos) : '—';
        return '<tr class="rank-row" data-id="'+r.id+'" style="cursor:pointer">'+
          '<td class="col-fix col-pos"><span class="rank-pos '+pc+'">'+(i+1)+'</span></td>'+
          '<td class="col-fix col-nom"><div class="rank-name">'+r.nome+'</div></td>'+
          '<td class="col-stat"><span class="rank-pts">'+r.pts+'</span></td>'+
          '<td class="col-stat stat-mu">'+etapasCount+'</td>'+
          '<td class="col-stat stat-mu">'+melhor+'</td>'+
        '</tr>';
      }).join('');
      tabelaHtml = '<div class="rank-scroll-wrap"><table class="rank-table rank-fixed">'+thead+'<tbody>'+tbody+'</tbody></table></div>';
    }

    var shareHtml = temDados ? '<div class="rank-share">'+
      '<button class="rank-share-btn" onclick="shareRanking()">'+
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.855L.057 23.082a.75.75 0 00.92.921l5.227-1.473A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.685-.52-5.21-1.426l-.374-.223-3.104.875.876-3.104-.223-.374A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>'+
        t('partilharBtn')+
      '</button>'+
    '</div>' : '';

    container.innerHTML = selectorHtml + tabelaHtml + shareHtml;

    var sel = document.getElementById('rank-etapa-sel');
    if(sel) sel.addEventListener('change', function(){
      rankEtapaActual = this.value;
      renderRankingSection(rankEtapaActual);
      renderResultadosEtapa(rankEtapaActual);
    });

    container.querySelectorAll('.rank-row[data-id]').forEach(function(row){
      row.addEventListener('click', function(){
        openPlayerModal(this.getAttribute('data-id'));
      });
    });

    renderResultadosEtapa(etapaId);
  }

  // ── SHARE RANKING ─────────────────────────────────────────────────────────
  window.shareRanking = function() {
    var rows = calcRanking(rankEtapaActual);
    var etapaLabel = rankEtapaActual==='todas'?'(Temporada)':'';
    if(rankEtapaActual!=='todas') {
      var et = ETAPAS_RAW.find(function(e){return e.id===rankEtapaActual;});
      if(et) etapaLabel='('+et.numero+'ª Etapa)';
    }
    var txt = '🎾 *Super Stars CTPP — Ranking '+etapaLabel+'*\n\n';
    rows.slice(0,10).forEach(function(r,i){
      var medal = i===0?'🥇':i===1?'🥈':i===2?'🥉':'  '+(i+1)+'.';
      txt += medal+' '+r.nome+' — '+r.pts+' pts\n';
    });
    txt += '\n🔗 '+window.location.href;
    window.open('https://wa.me/?text='+encodeURIComponent(txt), '_blank');
  };

  // ── PLAYER MODAL ──────────────────────────────────────────────────────────
  window.openPlayerModal = function(playerId) {
    var jogador = JOGADORES.find(function(j){return j.id===playerId;});
    if(!jogador) return;

    // Stats from torneios
    var etapasJogadas = [];
    TORNEIOS.forEach(function(t){
      if(!t.classificacaoFinal) return;
      var entry = t.classificacaoFinal.find(function(c){return c.jogId===playerId;});
      if(!entry) return;
      var eta = ETAPAS_RAW.find(function(e){return e.id===t.etapaId;});
      etapasJogadas.push({etapa:eta, pos:entry.pos, pts:entry.pts});
    });

    if(!etapasJogadas.length) return;

    var totalPts = etapasJogadas.reduce(function(s,e){return s+e.pts;},0);
    var melhorPos = Math.min.apply(null, etapasJogadas.map(function(e){return e.pos;}));
    var rankRows = calcRanking('todas');
    var rankPos = rankRows.findIndex(function(r){return r.id===playerId;})+1;
    var rankMedal = rankPos===1?'🥇':rankPos===2?'🥈':rankPos===3?'🥉':'';

    var etapasHtml = etapasJogadas.map(function(e){
      var lbl = e.etapa ? (getLang()==='en'?ordinal(e.etapa.numero)+' Round':e.etapa.numero+'ª Etapa') : '—';
      var medals=['🥇','🥈','🥉'];
      return '<div class="modal-etapa">'+
        '<div class="modal-etapa-hdr">'+
          '<span class="modal-etapa-lbl">'+lbl+'</span>'+
          '<span class="modal-etapa-pts">'+(medals[e.pos-1]||ordinal(e.pos))+' — '+e.pts+' pts</span>'+
        '</div>'+
      '</div>';
    }).join('');

    var modal = document.getElementById('player-modal');
    modal.innerHTML =
      '<div class="modal-backdrop" onclick="closePlayerModal()"></div>'+
      '<div class="modal-box">'+
        '<button class="modal-close" onclick="closePlayerModal()">✕</button>'+
        '<div class="modal-header">'+
          '<div class="modal-avatar">'+jogador.nome.charAt(0).toUpperCase()+'</div>'+
          '<div class="modal-header-info">'+
            '<div class="modal-name">'+jogador.nome+'</div>'+
            '<div class="modal-cat">Super Stars Senior</div>'+
            (rankPos>0?'<div class="modal-rank-badge">'+rankMedal+' '+ordinal(rankPos)+' '+t('lugar')+'</div>':'')+
          '</div>'+
        '</div>'+
        '<div class="modal-stats">'+
          '<div class="modal-stat"><span class="modal-stat-n">'+totalPts+'</span><span class="modal-stat-l">'+t('pontos')+'</span></div>'+
          '<div class="modal-stat"><span class="modal-stat-n">'+etapasJogadas.length+'</span><span class="modal-stat-l">'+ t('etapasCol') +'</span></div>'+
          '<div class="modal-stat"><span class="modal-stat-n">'+ordinal(melhorPos)+'</span><span class="modal-stat-l">'+t('melhorPos')+'</span></div>'+
        '</div>'+
        (etapasHtml?'<div class="modal-section-title">'+t('resultadosPorEtapa')+'</div><div class="modal-etapas">'+etapasHtml+'</div>':'')+
      '</div>';

    modal.classList.add('open');
    document.body.style.overflow='hidden';
  };

  window.closePlayerModal = function() {
    var m = document.getElementById('player-modal');
    if(m){ m.classList.remove('open'); document.body.style.overflow=''; }
  };
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape') window.closePlayerModal();
  });

  // ── CALENDÁRIO ────────────────────────────────────────────────────────────
  function renderCalendario(){
    var container = document.getElementById("calendario-container");
    if(!container) return;
    var todas = ETAPAS.slice().sort(function(a,b){return new Date(a.data)-new Date(b.data);});
    var now = new Date(); var html="";
    todas.forEach(function(e){
      var past = new Date(e.data)<now;
      var dayNum = e.data.split("-")[2].replace(/^0/,"");
      var badge = e.estado==="aberta"
        ?'<span class="etapa-badge eb-open"><span class="eb-dot"></span> '+t('aberta')+'</span>'
        :e.estado==="concluida"
        ?'<span class="etapa-badge eb-done">'+t('concluida')+'</span>'
        :'<span class="etapa-badge eb-pending"><span class="eb-dot\"></span> '+t('pendente')+'</span>';
      html+='<div class="etapa-card'+(past?" done":"")+'">'+
        '<div class="etapa-date-box edb-senior">'+
          '<div class="edb-day">'+dayNum+'</div><div class="edb-month">'+(getLang()==='en'?window._trMes(e.mes):e.mes)+'</div>'+
        '</div>'+
        '<div class="etapa-info">'+
          '<div class="etapa-num">Super Stars · '+e.n+(getLang()==='en'?' Round':t('etapa'))+'</div>'+
          '<div class="etapa-title">'+(getLang()==='en'?ordinal(e.n)+' Round Super Stars':e.n+'ª Etapa Super Stars')+'</div>'+
          '<div class="etapa-details">'+ t('domingo') +' · '+e.hora+' — 11h · '+(proxima.limite||15)+' '+t('vagasLabel')+' · 5€</div>'+
          badge+
        '</div></div>';
    });
    container.innerHTML=html||'<div class="rank-empty">Sem etapas.</div>';
  }

  // ── REGULAMENTO ───────────────────────────────────────────────────────────
  window.switchRegTab = function(el,reg){
    document.querySelectorAll(".reg-tab").forEach(function(t){t.classList.remove("active");});
    document.querySelectorAll(".reg-content").forEach(function(c){c.classList.remove("active");});
    el.classList.add("active");
    var rc = document.getElementById("reg-"+reg);
    if(rc) rc.classList.add("active");
  };

  // ── NAV ───────────────────────────────────────────────────────────────────
  window.setNav = function(el){
    document.querySelectorAll(".nav-links .nav-link").forEach(function(l){l.classList.remove("active");});
    el.classList.add("active");
  };
  window.mobileNav = function(el,href){
    document.querySelectorAll(".nav-mobile .nav-link").forEach(function(l){l.classList.remove("active");});
    el.classList.add("active");
    document.querySelectorAll(".nav-links .nav-link").forEach(function(l){
      l.classList.toggle("active",l.getAttribute("href")===href);
    });
    document.getElementById("nav-mobile").classList.remove("open");
    document.getElementById("burger-icon").innerHTML='<line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="11" x2="19" y2="11"/><line x1="3" y1="16" x2="19" y2="16"/>';
  };
  window.toggleMenu = function(){
    var mob=document.getElementById("nav-mobile");
    var icon=document.getElementById("burger-icon");
    var open=mob.classList.toggle("open");
    icon.innerHTML=open
      ?'<line x1="4" y1="4" x2="18" y2="18"/><line x1="18" y1="4" x2="4" y2="18"/>'
      :'<line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="11" x2="19" y2="11"/><line x1="3" y1="16" x2="19" y2="16"/>';
  };
  document.addEventListener("click",function(e){
    var mob=document.getElementById("nav-mobile");
    var burger=document.getElementById("nav-burger");
    if(mob&&mob.classList.contains("open")&&!mob.contains(e.target)&&burger&&!burger.contains(e.target)){
      mob.classList.remove("open");
      document.getElementById("burger-icon").innerHTML='<line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="11" x2="19" y2="11"/><line x1="3" y1="16" x2="19" y2="16"/>';
    }
  },{passive:true});
  window.addEventListener("scroll",function(){
    var secs=["inicio","proxima","ranking","calendario","regulamento"];
    var sy=window.scrollY+80;
    for(var i=secs.length-1;i>=0;i--){
      var el=document.getElementById(secs[i]);
      if(el&&el.offsetTop<=sy){
        var anchor="#"+secs[i];
        document.querySelectorAll(".nav-links .nav-link,.nav-mobile .nav-link").forEach(function(l){
          l.classList.toggle("active",l.getAttribute("href")===anchor);
        });
        break;
      }
    }
  },{passive:true});

  // ── INIT ─────────────────────────────────────────────────────────────────
  useFallback();
  renderProxima();
  showRankingSkeleton();
  renderCalendario();

  var cached = loadCache();
  if(cached) { applyData(cached); renderProxima(); renderRankingSection('todas'); }

  loadData();

// ══════════════════════════════════════════════════════════════════════
// RESULTADOS SECTION — grupos + bracket por etapa (estilo site de ténis)
// ══════════════════════════════════════════════════════════════════════

  function renderResultadosSection() {
    var wrapEl  = document.getElementById('res-etapa-wrap');
    var contEl  = document.getElementById('res-conteudo');
    if(!wrapEl || !contEl) return;

    // Resultados: só etapas abertas (em curso) ou concluidas com torneio
    var etapasComT = ETAPAS_RAW.filter(function(e) {
      if(e.estado !== 'aberta' && e.estado !== 'concluida') return false;
      // Include if torneio exists with grupos assigned (even before results)
      return TORNEIOS.some(function(t){
        if(t.etapaId !== e.id) return false;
        if(t.classificacaoFinal && t.classificacaoFinal.length) return true;
        if(Array.isArray(t.grupos) && t.grupos.some(function(g){return g.jogadores && g.jogadores.length > 0;})) return true;
        return false;
      });
    });

    if(!etapasComT.length) {
      wrapEl.innerHTML = '';
      contEl.innerHTML = '<div class="res-empty">'+t('nenhumaEtapa')+'</div>';
      return;
    }

    // Selector pills — prefer active (aberta) etapa, else last
    var activeEtapaDefault = etapasComT.find(function(e){ return e.estado==='aberta'; });
    var currentId = window._resEtapaActual || (activeEtapaDefault && activeEtapaDefault.id) || etapasComT[etapasComT.length-1].id;
    // Make sure it's valid
    if(!etapasComT.find(function(e){return e.id===currentId;})) {
      currentId = etapasComT[etapasComT.length-1].id;
    }
    window._resEtapaActual = currentId;

    var pills = etapasComT.map(function(e) {
      var active = e.id===currentId;
      var dayNum = e.data ? e.data.split('-')[2].replace(/^0/,'') : '';
      var meses = t('meses');
      var mes = e.data ? (meses[e.data.split('-')[1]]||'') : '';
      return '<button class="res-etapa-pill'+(active?' active':'')+
        '" onclick="selectResEtapa(\''+e.id+'\')">'+
        (getLang()==='en'?ordinal(e.numero)+' Round':(e.numero||'')+t('etapa'))+' · '+dayNum+' '+mes+
      '</button>';
    }).join('');

    // Live badge: show if there's an active (non-concluded) torneio
    // AO VIVO: só activa quando há torneio activo com etapa aberta
    var hasLive = TORNEIOS.some(function(t){
      if(t.estado==='concluido' || t.estado==='sorteio') return false;
      var etapa = ETAPAS_RAW.find(function(e){ return e.id===t.etapaId; });
      return etapa && etapa.estado==='aberta';
    });
    // Show/hide live dot in nav
    var navDot = document.getElementById('nav-live-dot');
    if(navDot) navDot.style.display = hasLive ? 'inline-block' : 'none';
    var liveBadge = hasLive
      ? '<span class="live-badge">'+t('aoVivo')+'</span>'
      : '';
    var liveBar = '<div class="live-bar">'+
      liveBadge+
      '<div class="live-bar-right">'+
        '<span id="live-timestamp" class="live-ts">'+
          (_liveLastUpdate
            ? t('actualizadoAs')+' '+_liveLastUpdate.toLocaleTimeString('pt-PT',{hour:'2-digit',minute:'2-digit',second:'2-digit'})
            : '')+
        '</span>'+
        '<button id="live-refresh-btn" class="live-refresh-btn" onclick="liveRefreshNow()">'+t('actualizar')+'</button>'+
      '</div>'+
    '</div>';
    wrapEl.innerHTML = liveBar + '<div class="res-pills">'+pills+'</div>';
    renderResEtapaContent(currentId);
  }

  window.selectResEtapa = function(etapaId) {
    window._resEtapaActual = etapaId;
    renderResultadosSection();
  };

  function renderResEtapaContent(etapaId) {
    var contEl = document.getElementById('res-conteudo');
    if(!contEl) return;

    var torneio = TORNEIOS.find(function(t){ return t.etapaId===etapaId; });
    if(!torneio) {
      contEl.innerHTML = '<div class="res-empty">'+t('torneioNaoEncontrado')+'</div>';
      return;
    }

    var html = '';

    // ── GRUPOS ─────────────────────────────────────────────────────────────
    html += '<div class="res-grupos-wrap">';
    html += '<h3 class="res-section-title">'+t('gruposFase')+'</h3>';
    html += '<div class="res-grupos-grid">';

    // Guard: grupos must be an array (could be absent or a count in old data)
    var gruposArr = Array.isArray(torneio.grupos) ? torneio.grupos : [];
    var gruposComJogadores = gruposArr.filter(function(g){ return g.jogadores && g.jogadores.length > 0; });
    if(!gruposComJogadores.length) {
      html += '<div class="res-empty">'+t('sorteioNaoRealizado')+'</div>';
    }
    gruposComJogadores.forEach(function(g, gi) {
      var gi_real = gruposArr.indexOf(g);
      // Classificação
      var classif;
      if(g.classificacaoEditada && g.classificacao && g.classificacao.length) {
        // Manual order: enrich with calculated stats from jogos
        var statsCalc = {};
        calcGrupoClassif(g).forEach(function(s){ statsCalc[s.jogId] = s; });
        classif = g.classificacao.map(function(c){
          return statsCalc[c.jogId] || {jogId:c.jogId, pts:0, vitorias:0, derrotas:0, jogos:0, sg:0, jg:0, jp:0};
        });
      } else {
        classif = calcGrupoClassif(g);
      }
      html += '<div class="res-grupo-card">';
      html += '<div class="res-grupo-header">'+(getLang()==='en'?'Group':'Grupo')+' '+(gi_real+1)+'</div>';

      // Standings table
      html += '<table class="res-grupo-table">';
      html += '<thead><tr><th>'+t('pos')+'</th><th>'+t('jog')+'</th><th>'+t('vit')+'</th><th>'+t('der')+'</th><th>'+ t('difJ') +'</th><th>Pts</th></tr></thead>';
      html += '<tbody>';
      classif.forEach(function(c, ci) {
        var nome = (JOGADORES.find(function(j){return j.id===c.jogId;})||{}).nome||c.jogId;
        var advance = ci < 2; // Top 2 advance
        html += '<tr class="'+(advance?'res-advance':'res-out')+'">';
        html += '<td class="res-pos">'+(ci+1)+'</td>';
        html += '<td class="res-nome">'+(nome||'—')+'</td>';
        html += '<td>'+c.vitorias+'</td>';
        html += '<td>'+c.derrotas+'</td>';
        html += '<td>'+(c.jg-c.jp>=0?'+':'')+(c.jg-c.jp)+'</td>';
        html += '<td class="res-pts">'+c.pts+'</td>';
        html += '</tr>';
      });
      html += '</tbody></table>';

      // Jogos do grupo
      if(g.jogos && g.jogos.length) {
        html += '<div class="res-grupo-jogos">';
        g.jogos.forEach(function(j) {
          var nA = (JOGADORES.find(function(p){return p.id===j.ja;})||{}).nome||j.ja;
          var nB = (JOGADORES.find(function(p){return p.id===j.jb;})||{}).nome||j.jb;
          var winA = j.vencedor===j.ja;
          html += '<div class="res-jogo-row">'+
            '<span class="res-jogo-player'+(winA?' res-w':'')+'">'+nA+'</span>'+
            '<span class="res-jogo-score">'+j.score_a+' — '+j.score_b+'</span>'+
            '<span class="res-jogo-player'+(!winA?' res-w':'')+'">'+nB+'</span>'+
          '</div>';
        });
        html += '</div>';
      }

      html += '</div>'; // res-grupo-card
    });

    html += '</div></div>'; // res-grupos-grid, res-grupos-wrap

    // ── QUADROS ────────────────────────────────────────────────────────────
    if(torneio.quadroPrincipal && torneio.quadroPrincipal.rondas && torneio.quadroPrincipal.rondas.length) {
      html += '<div class="res-brackets-wrap">';
      html += '<h3 class="res-section-title">'+t('quadros')+'</h3>';
      html += renderPublicBracket(torneio);
      html += '</div>';
    }

    // ── CLASSIFICAÇÃO FINAL ───────────────────────────────────────────────
    if(torneio.classificacaoFinal && torneio.classificacaoFinal.length) {
      html += '<div class="res-classif-wrap">';
      html += '<h3 class="res-section-title">'+t('classificacaoFinal')+'</h3>';
      html += '<div class="res-classif-grid">';
      var medals = ['🥇','🥈','🥉'];
      torneio.classificacaoFinal.forEach(function(c) {
        var nome = (JOGADORES.find(function(j){return j.id===c.jogId;})||{}).nome||c.jogId;
        html += '<div class="res-classif-row" data-pos="'+(c.pos)+'">'+
          '<span class="res-classif-pos">'+(medals[c.pos-1]||c.pos+'º')+'</span>'+
          '<span class="res-classif-nome">'+nome+'</span>'+
          '<span class="res-classif-pts">'+c.pts+' pts</span>'+
        '</div>';
      });
      html += '</div></div>';
    }

    contEl.innerHTML = html || '<div class="res-empty">Torneio ainda sem dados.</div>';
  }

  // ── Calc classificação do grupo para display ───────────────────────────
  function calcGrupoClassif(g) {
    var stats = {};
    (g.jogadores||[]).forEach(function(id) {
      stats[id] = {jogId:id, pts:0, vitorias:0, derrotas:0, jogos:0, sg:0, jg:0, jp:0};
    });
    (g.jogos||[]).forEach(function(j) {
      if(!stats[j.ja]||!stats[j.jb]) return;
      stats[j.ja].jogos++; stats[j.jb].jogos++;
      var sa=parseInt(j.score_a)||0, sb=parseInt(j.score_b)||0;
      stats[j.ja].sg += sa-sb; stats[j.ja].jg += sa; stats[j.ja].jp += sb;
      stats[j.jb].sg += sb-sa; stats[j.jb].jg += sb; stats[j.jb].jp += sa;
      if(j.vencedor===j.ja){ stats[j.ja].pts+=3; stats[j.ja].vitorias++; stats[j.jb].pts+=1; stats[j.jb].derrotas++; }
      else { stats[j.jb].pts+=3; stats[j.jb].vitorias++; stats[j.ja].pts+=1; stats[j.ja].derrotas++; }
    });
    return Object.values(stats).sort(function(a,b){
      return (b.pts-a.pts)||(b.vitorias-a.vitorias)||(b.sg-a.sg);
    });
  }

  // ── Render public bracket (tennis-style) ──────────────────────────────
  function renderPublicBracket(torneio) {
    function pNome(id) {
      if(!id) return 'BYE';
      return (JOGADORES.find(function(j){return j.id===id;})||{}).nome||id;
    }

    // ── Position origin maps — MUST match admin QP_POSICOES & QB_POSICOES ──
    var QP_POS_MAP = {
      5: [{g:0,c:0,pos:1},{g:1,c:0,pos:16},{g:2,c:0,pos:5},{g:3,c:0,pos:12},{g:4,c:0,pos:8},
          {g:0,c:1,pos:9},{g:1,c:1,pos:3},{g:2,c:1,pos:13},{g:3,c:1,pos:4},{g:4,c:1,pos:10}],
      4: [{g:0,c:0,pos:1},{g:3,c:1,pos:2},{g:2,c:0,pos:3},{g:1,c:1,pos:4},
          {g:0,c:1,pos:5},{g:3,c:0,pos:6},{g:2,c:1,pos:7},{g:1,c:0,pos:8}]
    };
    var QB_POS_MAP = {
      15:[{g:0,pos:1},{g:3,pos:3},{g:4,pos:4},{g:2,pos:6},{g:1,pos:8}],
      14:[{g:0,pos:1},{g:3,pos:2},{g:2,pos:3},{g:1,pos:4}],
      13:[{g:0,pos:1},{g:2,pos:3},{g:1,pos:4}],
      12:[{g:0,pos:1},{g:3,pos:2},{g:2,pos:3},{g:1,pos:4}],
      11:[{g:0,pos:1},{g:2,pos:3},{g:1,pos:4}],
      10:[{g:0,pos:1},{g:1,pos:2}],
      9: [{g:0,pos:1}],
      8: []
    };

    // Returns {name, isPlaceholder} for a match slot
    // If jogId is real → real player name
    // If jogId null + pos has origin mapping → "1ºG1" placeholder
    // If jogId null + no mapping → "BYE"
    function pNomePos(jogId, pos, quadroTipo) {
      if(jogId) return {name: pNome(jogId), isPlaceholder: false};
      var nI = torneio.numInscritos || (torneio.grupos||[]).reduce(function(s,g){return s+(g.jogadores||[]).length;},0);
      var numGrupos = (torneio.grupos||[]).length;
      var map;
      if(quadroTipo === 'qp') {
        map = QP_POS_MAP[numGrupos];
      } else {
        map = QB_POS_MAP[nI];
      }
      if(!map || !pos) return {name: 'BYE', isPlaceholder: false};
      var origem = map.find(function(m){return m.pos === pos;});
      if(!origem) return {name: 'BYE', isPlaceholder: false};
      // QP: has c (0=1º, 1=2º). QB: no c (always 3º)
      var posLetra = (quadroTipo==='qp') ? (origem.c===0 ? '1º' : '2º') : '3º';
      return {name: posLetra+'G'+(origem.g+1), isPlaceholder: true};
    }

    function pubMatch(j, quadroTipo) {
      if(!j) return '<div class="pub-match pub-match-empty"><div class="pub-player"><span class="pub-pname">—</span></div><div class="pub-player"><span class="pub-pname">—</span></div></div>';
      var quadroTipo = quadroTipo || 'qp';
      var a = pNomePos(j.jogA, j.posA, quadroTipo);
      var b = pNomePos(j.jogB, j.posB, quadroTipo);
      var done=j.vencedor!=null;
      var winA=done&&j.vencedor===j.jogA, winB=done&&j.vencedor===j.jogB;
      function pl(slot,win,bye,score) {
        var clsName = slot.isPlaceholder ? ' pub-pname-placeholder' : '';
        return '<div class="pub-player'+(win?' pub-winner':'')+(bye?' pub-bye':'')+'">'+
          '<span class="pub-pname'+clsName+'">'+slot.name+'</span>'+
          (score!==null&&score!==undefined&&done?'<span class="pub-score'+(win?' pub-score-w':'')+'">'+score+'</span>':'')+
        '</div>';
      }
      return '<div class="pub-match">'+pl(a,winA,!j.jogA,j.score_a)+pl(b,winB,!j.jogB,j.score_b)+'</div>';
    }

    // pubFinal: match + winner step forward with medal/place label
    function pubFinalLabeled(j, medal, placeLabel) {
      // placeLabel passed to pubFinal for champion cell (non-medal finals like QB)
      return pubFinal(j, medal, placeLabel);
    }

    function pubFinal(j, medal, placeLabel) {
      if(!j) return pubMatch(j);
      var done = j.vencedor != null;
      var winnerNome = done ? pNome(j.vencedor) : '—';
      var isTop3 = medal && (medal==='🥇'||medal==='🥈'||medal==='🥉');
      var medalSize = medal==='🥇'?'2rem':medal==='🥈'?'1.7rem':medal==='🥉'?'1.5rem':'1.2rem';
      var nameSize  = medal==='🥇'?'15px':medal==='🥈'?'14px':'13px';
      // Match: show scores
      var winA = done && j.vencedor === j.jogA;
      var matchHtml = '<div class="pub-match pub-match-final">'+
        '<div class="pub-player'+(winA&&done?' pub-winner':'')+'">'+
          '<span class="pub-pname">'+pNome(j.jogA)+'</span>'+
          (j.score_a!=null?'<span class="pub-score'+(winA?' pub-score-w':'')+'">'+j.score_a+'</span>':'')+'</div>'+
        '<div class="pub-player'+(!winA&&done?' pub-winner':'')+'">'+
          '<span class="pub-pname">'+pNome(j.jogB)+'</span>'+
          (j.score_b!=null?'<span class="pub-score'+((!winA)?' pub-score-w':'')+'">'+j.score_b+'</span>':'')+'</div>'+
      '</div>';
      // Champion cell: medal + name only (no redundant place label when medal present)
      var showPlace = placeLabel && !medal; // only show place text if no medal
      var champCell = done ? '<div class="pub-champion-cell">'+
        (medal ? '<span class="pub-champion-medal" style="font-size:'+medalSize+'">'+medal+'</span>' : '')+
        '<div class="pub-player pub-winner pub-champion" style="'+(isTop3?'padding:9px 14px;':'')+' font-size:'+nameSize+'">'+
          '<span class="pub-pname" style="'+(medal==='🥇'?'color:#fff;font-weight:700;':medal==='🥈'?'font-weight:700;':'')+'">' +winnerNome+'</span>'+
          (showPlace?'<span class="pub-champion-place">'+placeLabel+'</span>':'')+
        '</div>'+
      '</div>' : '';
      return '<div class="pub-final-wrap">'+matchHtml+champCell+'</div>';
    }

    function pubCol(title, matches, roundIndex) {
      // Tennis draw: first match margin-top + extra gap between subsequent matches
      var pow2 = Math.pow(2, roundIndex||0);
      var mt   = Math.round(84 * (pow2 - 1) / 2);   // margin-top of first match
      var extraGap = Math.round(84 * (pow2 - 1));     // extra gap beyond GAP_MIN between matches
      // Apply margin-top to first match, extraGap to rest
      var html = matches.map(function(m, i) {
        var topStyle = (i === 0 && mt > 0) ? ' style="margin-top:'+mt+'px"' :
                       (i > 0 && extraGap > 0) ? ' style="margin-top:'+extraGap+'px"' : '';
        return topStyle ? m.replace(/^<div class="pub-match"/, '<div class="pub-match"'+topStyle) : m;
      }).join('');
      return '<div class="pub-bracket-col">'+
        '<div class="pub-ronda-title">'+title+'</div>'+
        html+
        '</div>';
    }

    function singleBlock(label, jogo, place) {
      if(!jogo) return '';
      return '<div class="pub-place-block">'+
        '<div class="pub-place-label">'+label+'</div>'+
        pubFinal(jogo, place||null, null)+
      '</div>';
    }

    var html = '<div class="pub-brackets">';

    // ── QP main draw ──────────────────────────────────────────────────
    var qp = torneio.quadroPrincipal;
    if(qp && qp.rondas && qp.rondas.length) {
      var r1=qp.rondas.find(function(r){return r.id==='r1';}),
          r2=qp.rondas.find(function(r){return r.id==='r2';}),
          r3=qp.rondas.find(function(r){return r.id==='r3';}),
          r4=qp.rondas.find(function(r){return r.id==='r4';});
      var fJogo=r4?r4.jogos.find(function(j){return j.id==='qp_final';}):null;
      html+='<div class="pub-bracket-wrap"><div class="pub-bracket-label">'+ t('quadroPrincipal') +'</div>';
      html+='<div class="pub-bracket-scroll"><div class="pub-bracket-inner">';
      if(r1) html+=pubCol(t('oitavos'),r1.jogos.map(pubMatch),0);   // QP16 only
      if(r2) html+=pubCol(t('quartos'),r2.jogos.map(pubMatch),r1?1:0);   // QP16 + QP8
      if(r3) html+=pubCol(t('meias'),r3.jogos.map(pubMatch),r1?2:1);
      if(fJogo) html+='<div class="pub-bracket-col pub-col-final">'+
        '<div class="pub-ronda-title">'+t('final12')+'</div>'+
        pubFinal(fJogo,'🥇',null)+
      '</div>';
      html+='</div></div></div>';
    }

    // ── QB main draw ──────────────────────────────────────────────────
    var qb = torneio.quadroB;
    if(qb && qb.rondas && qb.rondas.length) {
      var r1qb=qb.rondas.find(function(r){return r.id==='r1';}),
          r2qb=qb.rondas.find(function(r){return r.id==='r2';}),
          r3qb=qb.rondas.find(function(r){return r.id==='r3';});
      var finalB=r3qb?r3qb.jogos.find(function(j){return j.id==='qb_final';}):null;
      var t3lqb=r3qb?r3qb.jogos.find(function(j){return j.id==='qb_3lugar';}):null;
      var n = (torneio.classificacaoFinal && torneio.classificacaoFinal.length > 0) ? torneio.classificacaoFinal.length :
              (torneio.numInscritos || (torneio.grupos||[]).reduce(function(s,g){return s+(g.jogadores||[]).length;},0));
      var qbLabel = n >= 11 ? t('quadroB') :
                    n === 10 ? (getLang()==='en'?'9th/10th':'9º/10º') : t('quadroB');
      var qbFinalPos = n >= 13 ? (getLang()==='en'?'11th':'11º') :
                       n >= 11 ? (getLang()==='en'?'9th':'9º') : (getLang()==='en'?'9th':'9º');
      var qbThirdPos = n >= 13 ? (getLang()==='en'?'13th':'13º') : (getLang()==='en'?'11th':'11º');
      html+='<div class="pub-bracket-wrap"><div class="pub-bracket-label">'+qbLabel+'</div>';
      html+='<div class="pub-bracket-scroll"><div class="pub-bracket-inner">';
      if(r1qb) html+=pubCol(t('quartos'),r1qb.jogos.map(function(j){return pubMatch(j,'qb');}),0);
      if(r2qb) html+=pubCol(t('meias'),r2qb.jogos.map(function(j){return pubMatch(j,'qb');}),r1qb?1:0);
      // Final + 3º lugar side by side in one column (both are place-match finals)
      if(finalB) {
        html += '<div class="pub-bracket-col pub-col-final">'+
          '<div class="pub-ronda-title">'+(n<=10?(getLang()==='en'?'9th/10th':'9º/10º'):(getLang()==='en'?'Final '+qbFinalPos:'Final '+qbFinalPos))+'</div>'+
          pubFinalLabeled(finalB, null, qbFinalPos)+
        '</div>';
      }
      html+='</div></div></div>';
    }

    // ── Placement matches ─────────────────────────────────────────────
    if(qp && qp.rondas && qp.rondas.length) {
      var r3p =qp.rondas.find(function(r){return r.id==='r3p';}),
          r4c =qp.rondas.find(function(r){return r.id==='r4';}),
          r3qb2=qb&&qb.rondas?qb.rondas.find(function(r){return r.id==='r3';}):null,
          r1qb2=qb&&qb.rondas?qb.rondas.find(function(r){return r.id==='r1';}):null;

      var t34  =r4c ?r4c.jogos.find(function(j){return j.id==='qp_3lugar';}):null;
      var sfp1 =r3p ?r3p.jogos[0]:null;   // SF1 (perdedores QF 1+2)
      var sfp2 =r3p ?r3p.jogos[1]:null;   // SF2 (perdedores QF 3+4)
      var t56  =r4c ?r4c.jogos.find(function(j){return j.id==='qp_56';}):null;   // Final 5/6
      var t78  =r4c ?r4c.jogos.find(function(j){return j.id==='qp_78';}):null;   // Jogo 7/8 (L sf1 vs L sf2)
      var t910 =r4c ?r4c.jogos.find(function(j){return j.id==='qp_910';}):null;
      var finalQB=r3qb2?r3qb2.jogos.find(function(j){return j.id==='qb_final';}):null;
      var t1314=r3qb2?r3qb2.jogos.find(function(j){return j.id==='qb_3lugar';}):null;

      // ── Posições por Lugar — clean ordered list ──────────────────────────
      function placeCard(label, jogo, winPos, losePos) {
        if(!jogo) return '';
        var done = jogo.vencedor != null;
        var lbl = '<div class="pub-place-lbl">'+label+'</div>';
        var winA = done && jogo.vencedor===jogo.jogA;
        // score_a always belongs to jogA, score_b always to jogB
        function playerRow(id, isJogA, isWinner) {
          if(!id) return '';
          var pos = isWinner ? winPos : losePos;
          var score = isJogA ? jogo.score_a : jogo.score_b;
          var scoreHtml = score!=null ? '<span class="pub-score'+(isWinner&&done?' pub-score-w':'')+'">'+score+'</span>' : '';
          var badgeHtml = done && pos ? '<span class="pub-place-badge">'+pos+'</span>' : '';
          return '<div class="pub-player'+(isWinner&&done?' pub-winner':'')+'">'+
            '<span class="pub-pname">'+pNome(id)+'</span>'+
            '<span class="pub-place-row-right">'+scoreHtml+badgeHtml+'</span>'+
          '</div>';
        }
        return '<div class="pub-place-card">'+lbl+
          '<div class="pub-match">'+
            playerRow(jogo.jogA, true,  winA)+
            playerRow(jogo.jogB, false, !winA)+
          '</div>'+
        '</div>';
      }

      // 5/6 needs SF context first
      function place56Block() {
      if(!sfp1 && !sfp2 && !t56) return '';
      var en = getLang()==='en';
      // SF col: sfp1 + sfp2 (both matches, space-around centres them)
      var sfCol = pubCol(en?'Semis 5/6':'Meias 5/6', [pubMatch(sfp1),pubMatch(sfp2)], 0);
      // Final col: single match, align-self:center centres it between the two SFs
      var finalCol = '<div class="pub-bracket-col pub-col-final">'+
        '<div class="pub-ronda-title">'+(en?'5th / 6th':'5º / 6º')+'</div>'+
        pubFinal(t56, null, en?'5th':'5º')+
      '</div>';
      return '<div class="pub-bracket-wrap pub-bracket-56">'+
        '<div class="pub-bracket-label">'+(en?'5th / 6th Place':'5º / 6º Lugar')+'</div>'+
        '<div class="pub-bracket-scroll"><div class="pub-bracket-inner">'+sfCol+finalCol+'</div></div>'+
      '</div>';
    }

      html+='<div class="pub-places-wrap"><div class="pub-bracket-label">'+ t('posicoesLugar') +'</div>';
      html+='<div class="pub-places-s1">';
      html+=placeCard(t('lugar3_4'), t34, '🥉', getLang()==='en'?'4th':'4º');
      html+='</div>';
      // ── Section 2: 5/6 draw ──────────────────────────────────────
      html+='<div class="pub-places-s2">';
      html+=place56Block();
      html+='</div>';
      // ── Section 3: jogos simples compactos ───────────────────────
      html+='<div class="pub-places-s3">';
      html+=placeCard(t('lugar7_8'), t78, getLang()==='en'?'7th':'7º', getLang()==='en'?'8th':'8º');
      html+=placeCard(t('lugar9_10'), t910, getLang()==='en'?'9th':'9º', getLang()==='en'?'10th':'10º');
      // 11/12 — QB final (if present)
      if(finalQB && n >= 13) html+=placeCard(getLang()==='en'?'11th / 12th Place':'11º / 12º Lugar', finalQB, getLang()==='en'?'11th':'11º', getLang()==='en'?'12th':'12º');
      // 13/14 — QB 3rd place
      html+=placeCard(t('lugar13_14'), t1314, getLang()==='en'?'13th':'13º', getLang()==='en'?'14th':'14º');
      if(r1qb2) {
        var posExtra=15;
        r1qb2.jogos.forEach(function(qfj){
          var isReal=qfj.jogA&&qfj.jogB&&!qfj.bye;
          if(isReal&&qfj.vencedor){
            var perd=qfj.jogA===qfj.vencedor?qfj.jogB:qfj.jogA;
            if(perd){
              html+='<div class="pub-place-card"><div class="pub-place-lbl">'+ordinal(posExtra)+'</div>'+
                '<div class="pub-match"><div class="pub-player pub-winner">'+
                '<span class="pub-pname">'+pNome(perd)+'</span>'+
                '<span class="pub-place-badge">'+ordinal(posExtra)+'</span>'+
                '</div></div></div>';
              posExtra++;
            }
          }
        });
      }
      html+='</div>';  // close s3
      html+='</div></div>';
    }

    html+='</div>';
    return html;
  }


  // ── LIVE POLLING ──────────────────────────────────────────────────
  async function livePoll() {
    try {
      // Check if torneios.json changed (ETag with PAT, or hash without)
      var torChanged = await ghPollChanged('torneios.json');
      if(torChanged === false) {
        // No change detected
        updateLiveTimestamp(false);
        return;
      }

      // torneios changed (or first poll without ETag) — fetch all three
      var torData = typeof torChanged === 'string'
        ? JSON.parse(torChanged)          // raw text from fallback path
        : await ghFetchJSON('torneios.json'); // PAT path already parsed above

      // Fetch etapas + jogadores in parallel
      var [eta, jog] = await Promise.all([
        ghFetchJSON('etapas.json'),
        ghFetchJSON('jogadores.json'),
      ]);

      TORNEIOS   = torData.torneios  || [];
      ETAPAS_RAW = eta.etapas        || [];
      JOGADORES  = jog.jogadores     || [];

      // Re-apply to refresh ETAPAS derived data
      var meses = {'01':'Jan','02':'Fev','03':'Mar','04':'Abr','05':'Mai','06':'Jun','07':'Jul','08':'Ago','09':'Set','10':'Out','11':'Nov','12':'Dez'};
      ETAPAS = ETAPAS_RAW.map(function(e){ return mapEtapa(e,meses); });

      _liveLastUpdate = new Date();
      updateLiveTimestamp(true);
    } catch(e) {
      // Silent fail — retry next interval
    }
  }

  function updateLiveTimestamp(rerender) {
    var ts = _liveLastUpdate;
    var timeStr = ts ? ts.toLocaleTimeString('pt-PT', {hour:'2-digit',minute:'2-digit',second:'2-digit'}) : '—';
    var tsEl = document.getElementById('live-timestamp');
    if(tsEl) tsEl.textContent = t('actualizadoAs')+' '+timeStr;
    if(rerender) {
      // On live update: prefer the active (aberta) etapa if available
      var activeEtapa = ETAPAS_RAW.find(function(e){ return e.estado==='aberta'; });
      if(activeEtapa) window._resEtapaActual = activeEtapa.id;
      renderResultadosSection();
      renderRankingSection(rankEtapaActual);
      renderProxima();
      renderCalendario();
    }
  }

  function startLivePolling() {
    if(_liveActive) return;
    _liveActive = true;
    // First poll immediately
    livePoll();
    // Schedule recurring polls
    function scheduleNext() {
      var hasActiveTorneio = TORNEIOS.some(function(t){
        return t.estado !== 'concluido';
      });
      var interval = hasActiveTorneio ? LIVE_INTERVAL_FAST : LIVE_INTERVAL_SLOW;
      _liveTimer = setTimeout(function(){
        livePoll().then(function(){ if(_liveActive) scheduleNext(); });
      }, interval);
    }
    scheduleNext();
  }

  function stopLivePolling() {
    _liveActive = false;
    if(_liveTimer) { clearTimeout(_liveTimer); _liveTimer = null; }
  }

  // Start polling when page becomes visible, stop when hidden
  document.addEventListener('visibilitychange', function() {
    if(document.hidden) stopLivePolling();
    else startLivePolling();
  });

  // Manual refresh button
  window.liveRefreshNow = function() {
    var btn = document.getElementById('live-refresh-btn');
    if(btn) { btn.disabled=true; btn.textContent='↻'; }
    livePoll().then(function(){
      if(btn) { btn.disabled=false; btn.textContent='↻ Actualizar'; }
    });
  };

})();
