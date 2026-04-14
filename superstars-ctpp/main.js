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
      pts: 'pts', vit: 'V', der: 'D', pos: 'Pos', jog: 'Jogador',
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
      pts: 'pts', vit: 'W', der: 'L', pos: 'Pos', jog: 'Player',
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


  // ── LIVE POLLING STATE ──────────────────────────────────────────────
  var _liveTimer = null;
  var _liveSHAs = {};
  var _liveLastUpdate = null;
  var _liveActive = false;
  var LIVE_INTERVAL_FAST = 20000;
  var LIVE_INTERVAL_SLOW = 60000;

  var REPO_OWNER = 'Volvara';
  var REPO_NAME  = 'volvara.pt';
  var API_BASE   = 'https://api.github.com/repos/'+REPO_OWNER+'/'+REPO_NAME+'/contents/superstars-ctpp/data/';
  var CACHE_KEY  = 'superstars_cache';
  var CACHE_TTL  = 5 * 60 * 1000;

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
    c.innerHTML = '<div class="rank-scroll-wrap"><table class="rank-table rank-fixed"><thead><tr><th class="col-fix col-pos">'+ t('pos') +'</th><th class="col-fix col-nom">'+ t('jog') +'</th><th class="col-stat">Pts</th><th class="col-stat">V</th><th class="col-stat">D</th><th class="col-stat">±J</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
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
      // Use raw.githubusercontent.com — no auth required, no rate limits
      var rawBase = API_BASE.replace('https://api.github.com/repos/','https://raw.githubusercontent.com/').replace('/contents/','/main/');
      var ts = '?t='+Date.now();
      var [jogRes, etaRes, torRes] = await Promise.all([
        fetch(rawBase+'jogadores.json'+ts),
        fetch(rawBase+'etapas.json'+ts),
        fetch(rawBase+'torneios.json'+ts),
      ]);
      if(jogRes.ok && etaRes.ok && torRes.ok) {
        var jog = JSON.parse(await jogRes.text());
        var eta = JSON.parse(await etaRes.text());
        var tor = JSON.parse(await torRes.text());
        var d = { jogadores: jog.jogadores||[], etapas: eta.etapas||[], torneios: tor.torneios||[] };
        applyData(d);
        saveCache(d);
      } else { throw new Error('raw fetch failed: '+[jogRes.status, etaRes.status, torRes.status].join(',')); }
    } catch(err) {
      var cached = loadCache();
      if(cached) { applyData(cached); }
      else { useFallback(); }
    }
    renderProxima();
    renderRankingSection(rankEtapaActual);
    renderCalendario();
    renderResultadosSection();
    // Start live polling — uses raw.githubusercontent.com (no rate limits)
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
        '<div class="hero-card-sub">'+(getLang()==='en'?(T.en.dias_map[proxima.dia]||proxima.dia):proxima.dia)+' '+dayNum+' '+(getLang()==='en'?(T.en.meses_map[proxima.mes]||proxima.mes):proxima.mes)+'</div>'+
        (cd?'<div class="countdown">'+
          '<div class="countdown-unit"><span class="countdown-num" id="cd-d">'+cd.d+'</span><span class="countdown-label">dias</span></div>'+
          '<span class="countdown-sep">:</span>'+
          '<div class="countdown-unit"><span class="countdown-num" id="cd-h">'+String(cd.h).padStart(2,"0")+'</span><span class="countdown-label">horas</span></div>'+
          '<span class="countdown-sep">:</span>'+
          '<div class="countdown-unit"><span class="countdown-num" id="cd-m">'+String(cd.m).padStart(2,"0")+'</span><span class="countdown-label">min</span></div>'+
        '</div>':'')+
      '</div>'+
      '<div class="hero-card">'+
        '<div class="hero-card-label">'+t('temporadaLabel')+'</div>'+
        '<div class="hero-card-title">2026</div>'+
        '<div class="hero-card-sub">6 etapas</div>'+
      '</div>';

    var pe = document.getElementById("proxima-etapa-container");
    if(pe) pe.innerHTML =
      '<div class="next-etapa fade-in">'+
        '<div class="ne-date edb-senior">'+
          '<div class="ne-day">'+dayNum+'</div><div class="ne-month">'+(getLang()==='en'?(T.en.meses_map[proxima.mes]||proxima.mes):proxima.mes)+'</div>'+
        '</div>'+
        '<div class="ne-info">'+
          '<span class="ne-badge">Super Stars</span>'+
          '<div class="ne-title">'+proxima.n+(getLang()==='en'?' Round Super Stars':'ª Etapa Super Stars')+'</div>'+
          '<div class="ne-detail">'+ t('domingo') +' · '+proxima.hora+' — 11h · '+(proxima.limite||15)+' '+t('vagasLabel')+' · 5€</div>'+
          (proxima.estado==="aberta"?'<div class="etapa-badge eb-open" style="margin-top:10px"><span class="eb-dot\"></span> '+t('aberta')+'</div>':'')+
        '</div>'+
        '<div class="ne-action">'+
          '<a href="'+WA_URL+'" class="hero-cta" style="font-size:13px;padding:11px 20px">'+
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.855L.057 23.082a.75.75 0 00.92.921l5.227-1.473A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.685-.52-5.21-1.426l-.374-.223-3.104.875.876-3.104-.223-.374A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>'+
            'Entrar no grupo</a>'+
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
      return TORNEIOS.some(function(t){return t.etapaId===e.id && t.classificacaoFinal && t.classificacaoFinal.length;});
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
        var melhor = melhorPos!=='—' ? melhorPos+'º' : '—';
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
          '<span class="modal-etapa-pts">'+(medals[e.pos-1]||e.pos+'º')+' — '+e.pts+' pts</span>'+
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
            (rankPos>0?'<div class="modal-rank-badge">'+rankMedal+' '+rankPos+'º lugar</div>':'')+
          '</div>'+
        '</div>'+
        '<div class="modal-stats">'+
          '<div class="modal-stat"><span class="modal-stat-n">'+totalPts+'</span><span class="modal-stat-l">Pontos</span></div>'+
          '<div class="modal-stat"><span class="modal-stat-n">'+etapasJogadas.length+'</span><span class="modal-stat-l">'+ t('etapasCol') +'</span></div>'+
          '<div class="modal-stat"><span class="modal-stat-n">'+melhorPos+'º</span><span class="modal-stat-l">Melhor pos.</span></div>'+
        '</div>'+
        (etapasHtml?'<div class="modal-section-title">Resultados por etapa</div><div class="modal-etapas">'+etapasHtml+'</div>':'')+
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
          '<div class="edb-day">'+dayNum+'</div><div class="edb-month">'+(getLang()==='en'?(T.en.meses_map[e.mes]||e.mes):e.mes)+'</div>'+
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
      return TORNEIOS.some(function(t){ return t.etapaId===e.id; });
    });

    if(!etapasComT.length) {
      wrapEl.innerHTML = '';
      contEl.innerHTML = '<div class="res-empty">'+t('nenhumaEtapa')+'</div>';
      return;
    }

    // Selector pills
    var currentId = window._resEtapaActual || etapasComT[etapasComT.length-1].id;
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

    var gruposComJogadores = torneio.grupos.filter(function(g){ return g.jogadores && g.jogadores.length > 0; });
    if(!gruposComJogadores.length) {
      html += '<div class="res-empty">'+t('sorteioNaoRealizado')+'</div>';
    }
    gruposComJogadores.forEach(function(g, gi) {
      var gi_real = torneio.grupos.indexOf(g);
      // Classificação
      var classif = g.classificacaoEditada ? g.classificacao : calcGrupoClassif(g);
      html += '<div class="res-grupo-card">';
      html += '<div class="res-grupo-header">'+(getLang()==='en'?'Group':'Grupo')+' '+(gi_real+1)+'</div>';

      // Standings table
      html += '<table class="res-grupo-table">';
      html += '<thead><tr><th>'+t('pos')+'</th><th>'+t('jog')+'</th><th>'+t('vit')+'</th><th>'+t('der')+'</th><th>±J</th><th>Pts</th></tr></thead>';
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
        html += '<div class="res-classif-row">'+
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

    function pubMatch(j) {
      if(!j) return '<div class="pub-match pub-match-empty"><div class="pub-player"><span class="pub-pname">—</span></div><div class="pub-player"><span class="pub-pname">—</span></div></div>';
      var nA=pNome(j.jogA), nB=pNome(j.jogB);
      var done=j.vencedor!=null;
      var winA=done&&j.vencedor===j.jogA, winB=done&&j.vencedor===j.jogB;
      function pl(name,win,bye,score) {
        return '<div class="pub-player'+(win?' pub-winner':'')+(bye?' pub-bye':'')+'">'+
          '<span class="pub-pname">'+name+'</span>'+
          (score!==null&&score!==undefined&&done?'<span class="pub-score'+(win?' pub-score-w':'')+'">'+score+'</span>':'')+
        '</div>';
      }
      return '<div class="pub-match">'+pl(nA,winA,!j.jogA,j.score_a)+pl(nB,winB,!j.jogB,j.score_b)+'</div>';
    }

    function pubCol(title, matches) {
      return '<div class="pub-bracket-col"><div class="pub-ronda-title">'+title+'</div>'+matches.join('')+'</div>';
    }

    function singleBlock(label, jogo) {
      if(!jogo) return '';
      return '<div class="pub-place-block">'+
        '<div class="pub-place-label">'+label+'</div>'+
        pubMatch(jogo)+
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
      if(r1) html+=pubCol(t('oitavos'),r1.jogos.map(pubMatch));
      if(r2) html+=pubCol(t('quartos'),r2.jogos.map(pubMatch));
      if(r3) html+=pubCol(t('meias'),r3.jogos.map(pubMatch));
      html+=pubCol(t('final12'),[pubMatch(fJogo)]);
      html+='</div></div></div>';
    }

    // ── QB main draw ──────────────────────────────────────────────────
    var qb = torneio.quadroB;
    if(qb && qb.rondas && qb.rondas.length) {
      var r1qb=qb.rondas.find(function(r){return r.id==='r1';}),
          r2qb=qb.rondas.find(function(r){return r.id==='r2';}),
          r3qb=qb.rondas.find(function(r){return r.id==='r3';});
      var finalB=r3qb?r3qb.jogos.find(function(j){return j.id==='qb_final';}):null;
      html+='<div class="pub-bracket-wrap"><div class="pub-bracket-label">'+ t('quadroB') +'</div>';
      html+='<div class="pub-bracket-scroll"><div class="pub-bracket-inner">';
      if(r1qb) html+=pubCol(t('quartos'),r1qb.jogos.map(pubMatch));
      if(r2qb) html+=pubCol(t('meias'),r2qb.jogos.map(pubMatch));
      html+=pubCol(t('finalQB'),[pubMatch(finalB)]);
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
      var t1314=r3qb2?r3qb2.jogos.find(function(j){return j.id==='qb_1314';}):null;

      html+='<div class="pub-places-wrap"><div class="pub-bracket-label">'+ t('posicoesLugar') +'</div>';
      html+='<div class="pub-places-grid">';

      // 3/4 — simples
      html+=singleBlock(t('lugar3_4'),t34);

      // 5/6 — bracket: SF1+SF2 → Final 5/6
      if(sfp1||sfp2||t56) {
        html+='<div class="pub-place-bracket">'+
          '<div class="pub-place-label">'+ t('lugar5_6') +'</div>'+
          '<div class="pub-bracket-scroll"><div class="pub-bracket-inner">'+
            pubCol(t('meias56'),[pubMatch(sfp1),pubMatch(sfp2)])+
            pubCol(t('lugar5_6s'),[pubMatch(t56)])+
          '</div></div></div>';
      }

      // 7/8 — simples (perdedores das meias)
      html+=singleBlock(t('lugar7_8'),t78);

      // 9/10 — simples
      html+=singleBlock(t('lugar9_10'),t910);

      // 13/14 — simples
      html+=singleBlock(t('lugar13_14'),t1314);

      // 15º+
      if(r1qb2) {
        var posExtra=15;
        r1qb2.jogos.forEach(function(qfj){
          var isReal=qfj.jogA&&qfj.jogB&&!qfj.bye;
          if(isReal&&qfj.vencedor){
            var perd=qfj.jogA===qfj.vencedor?qfj.jogB:qfj.jogA;
            if(perd){
              html+='<div class="pub-place-block"><div class="pub-place-label">'+posExtra+'º Lugar</div>'+
                '<div class="pub-match"><div class="pub-player pub-winner"><span class="pub-pname">'+pNome(perd)+'</span></div></div></div>';
              posExtra++;
            }
          }
        });
      }

      html+='</div></div>';
    }

    html+='</div>';
    return html;
  }


  // ── LIVE POLLING ──────────────────────────────────────────────────
  async function livePoll() {
    try {
      // Build raw URL from API_BASE (strip api.github.com/repos/ prefix, swap for raw)
      var rawBase = API_BASE.replace('https://api.github.com/repos/','https://raw.githubusercontent.com/').replace('/contents/','/main/');
      var ts = '?t='+Date.now();

      // Fetch torneios.json directly — no auth, no rate limit, bypass CDN cache
      var torRes = await fetch(rawBase+'torneios.json'+ts);
      if(!torRes.ok) return;
      var torText = await torRes.text();

      // Compare with last seen content hash (simple length+last-modified check)
      var newHash = torText.length + '_' + torText.slice(-32);
      if(_liveSHAs.torneios && _liveSHAs.torneios === newHash) {
        updateLiveTimestamp(false);
        return;
      }
      _liveSHAs.torneios = newHash;

      // Content changed — parse and fetch the other files
      var tor = JSON.parse(torText);

      var [etaRes, jogRes] = await Promise.all([
        fetch(rawBase+'etapas.json'+ts),
        fetch(rawBase+'jogadores.json'+ts),
      ]);
      if(!etaRes.ok || !jogRes.ok) return;

      var eta = JSON.parse(await etaRes.text());
      var jog = JSON.parse(await jogRes.text());

      TORNEIOS   = tor.torneios   || [];
      ETAPAS_RAW = eta.etapas     || [];
      JOGADORES  = jog.jogadores  || [];

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
    if(tsEl) tsEl.textContent = 'Actualizado às '+timeStr;
    if(rerender) renderResultadosSection();
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
