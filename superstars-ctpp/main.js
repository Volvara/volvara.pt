(function(){

  var REPO_OWNER = 'Volvara';
  var REPO_NAME  = 'volvara.pt';
  var API_BASE   = 'https://api.github.com/repos/'+REPO_OWNER+'/'+REPO_NAME+'/contents/superstars-ctpp/data/';
  var CACHE_KEY  = 'superstars_cache';
  var CACHE_TTL  = 5 * 60 * 1000; // 5 min

  var WA_NUMBER = "351965553436";
  var WA_MSG = encodeURIComponent("Olá! Vi o site do Super Stars CTPP e gostaria de participar. O meu nome é [Nome] e sou sócio do clube. Podem adicionar-me ao grupo?");
  var WA_URL = "https://wa.me/" + WA_NUMBER + "?text=" + WA_MSG;

  // ── ESTADO ──────────────────────────────────────────────────────────────
  var ETAPAS_SENIOR = [];
  var ETAPAS_JUNIOR = [];
  var JOGADORES     = [];
  var JOGOS         = [];
  var ETAPAS_RAW    = [];
  var rankCatActual   = 'senior';
  var rankEtapaActual = 'todas';

  var ETAPAS_SENIOR_FB = [
    {n:1,data:"2026-04-12",dia:"Dom",mes:"Abr",hora:"8h30",estado:"aberta"},
    {n:2,data:"2026-04-19",dia:"Dom",mes:"Abr",hora:"8h30",estado:"pendente"},
    {n:3,data:"2026-05-10",dia:"Dom",mes:"Mai",hora:"8h30",estado:"pendente"},
    {n:4,data:"2026-05-17",dia:"Dom",mes:"Mai",hora:"8h30",estado:"pendente"},
    {n:5,data:"2026-06-07",dia:"Dom",mes:"Jun",hora:"8h30",estado:"pendente"},
    {n:6,data:"2026-06-28",dia:"Dom",mes:"Jun",hora:"8h30",estado:"pendente"}
  ];
  var ETAPAS_JUNIOR_FB = [
    {n:1,data:"2026-04-18",dia:"Sáb",mes:"Abr",hora:"14h/15h/16h30",escaloes:"Verm · Verde · Laranja",estado:"pendente"},
    {n:2,data:"2026-05-09",dia:"Sáb",mes:"Mai",hora:"14h/15h/16h30",escaloes:"Verm · Verde · Laranja",estado:"pendente"},
    {n:3,data:"2026-05-30",dia:"Sáb",mes:"Mai",hora:"14h/15h/16h30",escaloes:"Verm · Verde · Laranja",estado:"pendente"},
    {n:4,data:"2026-06-06",dia:"Sáb",mes:"Jun",hora:"14h/15h/16h30",escaloes:"Verm · Verde · Laranja",estado:"pendente"},
    {n:5,data:"2026-06-27",dia:"Sáb",mes:"Jun",hora:"14h/15h/16h30",escaloes:"Verm · Verde · Laranja",estado:"pendente"},
    {n:6,data:"2026-07-04",dia:"Sáb",mes:"Jul",hora:"14h/15h/16h30",escaloes:"Verm · Verde · Laranja",estado:"pendente"}
  ];

  // ── WA LINKS ────────────────────────────────────────────────────────────
  [document.getElementById("hero-wa-btn"),document.getElementById("wa-btn-reg")].forEach(function(el){
    if(el) el.href = WA_URL;
  });

  // ── CACHE (localStorage) ────────────────────────────────────────────────
  function saveCache(data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ts: Date.now(), data: data}));
    } catch(e) {}
  }
  function loadCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if(!raw) return null;
      var obj = JSON.parse(raw);
      if(Date.now() - obj.ts > CACHE_TTL) return null; // expired
      return obj.data;
    } catch(e) { return null; }
  }
  function applyData(d) {
    JOGADORES  = d.jogadores || [];
    ETAPAS_RAW = d.etapas   || [];
    JOGOS      = d.jogos    || [];
    var meses = {'01':'Jan','02':'Fev','03':'Mar','04':'Abr','05':'Mai','06':'Jun','07':'Jul','08':'Ago','09':'Set','10':'Out','11':'Nov','12':'Dez'};
    ETAPAS_SENIOR = ETAPAS_RAW.filter(function(e){return e.tipo==='senior';}).map(function(e){return mapEtapa(e,meses);});
    ETAPAS_JUNIOR = ETAPAS_RAW.filter(function(e){return e.tipo==='junior';}).map(function(e){return mapEtapa(e,meses);});
  }

  // ── SKELETON ────────────────────────────────────────────────────────────
  function showRankingSkeleton() {
    var c = document.getElementById("ranking-table-container");
    if(!c) return;
    var rows = '';
    for(var i=0;i<5;i++) rows += '<tr class="skel-row"><td><span class="skel skel-pos"></span></td><td><span class="skel skel-name"></span></td><td><span class="skel skel-num"></span></td><td><span class="skel skel-num"></span></td><td><span class="skel skel-num"></span></td><td><span class="skel skel-num"></span></td><td><span class="skel skel-num"></span></td><td><span class="skel skel-num"></span></td><td><span class="skel skel-num"></span></td></tr>';
    c.innerHTML = '<div class="rank-scroll-wrap"><table class="rank-table rank-fixed"><thead><tr><th class="col-fix col-pos">Pos</th><th class="col-fix col-nom">Jogador</th><th class="col-stat">Pts</th><th class="col-stat">V</th><th class="col-stat">D</th><th class="col-stat">±Enc</th><th class="col-stat">JG</th><th class="col-stat">JP</th><th class="col-stat">±J</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
  }

  // ── FETCH ────────────────────────────────────────────────────────────────
  function ghDecode(apiJson) {
    try {
      if(apiJson.encoding === 'base64' || apiJson.content) {
        var b64 = apiJson.content.replace(/\n/g,'');
        return JSON.parse(decodeURIComponent(escape(atob(b64))));
      }
      return JSON.parse(apiJson.content || '{}');
    } catch(e) {
      throw new Error('ghDecode falhou: '+e.message);
    }
  }

  async function loadData() {
    try {
      var headers = { Accept:'application/vnd.github.v3+json' };
      var ts = '?t='+Date.now();
      var jogRes = await fetch(API_BASE+'jogadores.json'+ts, {headers:headers});
      var etaRes = await fetch(API_BASE+'etapas.json'+ts, {headers:headers});
      var resRes = await fetch(API_BASE+'resultados.json'+ts, {headers:headers});
      if(jogRes.ok && etaRes.ok && resRes.ok) {
        var jog = ghDecode(await jogRes.json());
        var eta = ghDecode(await etaRes.json());
        var res = ghDecode(await resRes.json());
        var d = { jogadores: jog.jogadores||[], etapas: eta.etapas||[], jogos: res.jogos||[] };
        applyData(d);
        saveCache(d);
      } else { throw new Error('fetch failed'); }
    } catch(err) {
      // Try cache first
      var cached = loadCache();
      if(cached) { applyData(cached); }
      else { useFallback(); }
    }
    renderProxima();
    renderRankingSection(rankCatActual, rankEtapaActual);
    renderCalendario("todos");
  }

  function mapEtapa(e, meses) {
    var p = e.data ? e.data.split('-') : [];
    return { n:e.numero, data:e.data, dia:e.tipo==='senior'?'Dom':'Sáb',
      mes:meses[p[1]]||'', hora:e.hora||'8h30', estado:e.estado||'pendente',
      escaloes:e.escalao?'Bola '+e.escalao.charAt(0).toUpperCase()+e.escalao.slice(1):null,
      escalao:e.escalao, tipo:e.tipo, id:e.id };
  }
  function useFallback() { ETAPAS_SENIOR=ETAPAS_SENIOR_FB; ETAPAS_JUNIOR=ETAPAS_JUNIOR_FB; }

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
    var todas = ETAPAS_SENIOR.map(function(e){return Object.assign({},e,{tipo:"senior"});})
      .concat(ETAPAS_JUNIOR.map(function(e){return Object.assign({},e,{tipo:"junior"});}))
      .sort(function(a,b){return new Date(a.data)-new Date(b.data);});
    var proxima = null;
    for(var i=0;i<todas.length;i++){if(new Date(todas[i].data)>=now){proxima=todas[i];break;}}
    if(!proxima) return;
    var cd = countdown(proxima.data, proxima.hora);
    var isSen = proxima.tipo==="senior";
    var dayNum = proxima.data.split("-")[2].replace(/^0/,"");
    var details = isSen?"Domingo · "+proxima.hora+" — 11h · 15 vagas · 5€":"Sábado · "+proxima.hora+" · "+(proxima.escaloes||"");
    var hc = document.getElementById("hero-cards");
    if(hc) hc.innerHTML =
      '<div class="hero-card">'+
        '<div class="hero-card-label">Próxima Etapa</div>'+
        '<div class="hero-card-title">'+proxima.n+'ª Etapa '+(isSen?"Senior":"Junior")+'</div>'+
        '<div class="hero-card-sub">'+proxima.dia+' '+dayNum+' '+proxima.mes+'</div>'+
        (cd?'<div class="countdown">'+
          '<div class="countdown-unit"><span class="countdown-num" id="cd-d">'+cd.d+'</span><span class="countdown-label">dias</span></div>'+
          '<span class="countdown-sep">:</span>'+
          '<div class="countdown-unit"><span class="countdown-num" id="cd-h">'+String(cd.h).padStart(2,"0")+'</span><span class="countdown-label">horas</span></div>'+
          '<span class="countdown-sep">:</span>'+
          '<div class="countdown-unit"><span class="countdown-num" id="cd-m">'+String(cd.m).padStart(2,"0")+'</span><span class="countdown-label">min</span></div>'+
        '</div>':'')+
      '</div>'+
      '<div class="hero-card">'+
        '<div class="hero-card-label">Temporada</div>'+
        '<div class="hero-card-title">2026</div>'+
        '<div class="hero-card-sub">6 etapas Senior · 6 etapas Junior</div>'+
      '</div>';
    var pe = document.getElementById("proxima-etapa-container");
    if(pe) pe.innerHTML =
      '<div class="next-etapa fade-in">'+
        '<div class="ne-date edb-'+(isSen?"senior":"junior")+'">'+
          '<div class="ne-day">'+dayNum+'</div><div class="ne-month">'+proxima.mes+'</div>'+
        '</div>'+
        '<div class="ne-info">'+
          '<span class="ne-badge'+(isSen?"":" clay")+'">'+(isSen?"Senior · Bola Dura":"Junior Stars")+'</span>'+
          '<div class="ne-title">'+proxima.n+'ª Etapa '+(isSen?"· Bola Dura":"Junior Stars")+'</div>'+
          '<div class="ne-detail">'+details+'</div>'+
          (proxima.estado==="aberta"?'<div class="etapa-badge eb-open" style="margin-top:10px"><span class="eb-dot"></span> Inscrições abertas</div>':'')+
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

  // ── CALC RANKING ─────────────────────────────────────────────────────────
  function calcRanking(cat, etapaId) {
    var jogs = JOGADORES.filter(function(j){
      return cat==='senior'?j.tipo==='senior':j.tipo==='junior'&&j.escalao===cat;
    });
    var s = {};
    jogs.forEach(function(j){
      s[j.id]={nome:j.nome,pts:0,enc:0,vitorias:0,derrotas:0,games_g:0,games_p:0};
    });
    var jogosFiltrados = etapaId && etapaId!=='todas'
      ? JOGOS.filter(function(g){return g.etapa===etapaId;})
      : JOGOS;
    jogosFiltrados.forEach(function(g){
      if(!s[g.ja]||!s[g.jb]) return;
      var sa=parseInt(g.score_a)||0, sb=parseInt(g.score_b)||0;
      s[g.ja].enc++; s[g.jb].enc++;
      s[g.ja].games_g+=sa; s[g.ja].games_p+=sb;
      s[g.jb].games_g+=sb; s[g.jb].games_p+=sa;
      if(g.vencedor===g.ja){ s[g.ja].pts+=3; s[g.ja].vitorias++; s[g.jb].pts+=1; s[g.jb].derrotas++; }
      else { s[g.jb].pts+=3; s[g.jb].vitorias++; s[g.ja].pts+=1; s[g.ja].derrotas++; }
    });
    return Object.values(s).map(function(r){
      r.dif_enc=r.vitorias-r.derrotas; r.dif_games=r.games_g-r.games_p; return r;
    }).sort(function(a,b){ return (b.pts-a.pts)||(b.dif_games-a.dif_games)||(b.dif_enc-a.dif_enc); });
  }

  // ── ETAPAS COM JOGOS ─────────────────────────────────────────────────────
  function etapasComJogos(cat) {
    var etapasRaw = cat==='senior'
      ? ETAPAS_RAW.filter(function(e){return e.tipo==='senior';})
      : ETAPAS_RAW.filter(function(e){return e.tipo==='junior'&&e.escalao===cat;});
    return etapasRaw.filter(function(e){
      return JOGOS.some(function(g){return g.etapa===e.id;});
    });
  }

  // ── MVP DA ETAPA ─────────────────────────────────────────────────────────
  function mvpEtapa(cat, etapaId) {
    if(!etapaId||etapaId==='todas') return null;
    var rows = calcRanking(cat, etapaId);
    if(!rows.length||rows[0].pts===0) return null;
    return rows[0];
  }

  // ── #6 RESULTADOS POR ETAPA ──────────────────────────────────────────────
  function renderResultadosEtapa(etapaId) {
    var c = document.getElementById("resultados-etapa-container");
    if(!c) return;
    if(!etapaId || etapaId==='todas') { c.innerHTML=''; return; }
    var jogos = JOGOS.filter(function(g){return g.etapa===etapaId;});
    if(!jogos.length) { c.innerHTML='<div class="res-etapa-empty">Sem resultados registados nesta etapa.</div>'; return; }
    var html = '<div class="res-etapa-list">';
    jogos.forEach(function(g){
      var nA = (JOGADORES.find(function(j){return j.id===g.ja;})||{}).nome || g.ja;
      var nB = (JOGADORES.find(function(j){return j.id===g.jb;})||{}).nome || g.jb;
      var vA = g.vencedor===g.ja;
      html += '<div class="res-etapa-row">'+
        '<span class="res-player '+(vA?'res-winner':'')+'">'+nA+'</span>'+
        '<span class="res-score">'+g.score_a+' — '+g.score_b+'</span>'+
        '<span class="res-player '+(!vA?'res-winner':'')+'">'+nB+'</span>'+
      '</div>';
    });
    html += '</div>';
    c.innerHTML = html;
  }

  // ── RENDER RANKING SECTION ───────────────────────────────────────────────
  function renderRankingSection(cat, etapaId) {
    var container = document.getElementById("ranking-table-container");
    if(!container) return;

    var etapas = etapasComJogos(cat);
    var selectorHtml = '';
    if(etapas.length > 0) {
      var opts = '<option value="todas"'+(etapaId==='todas'?' selected':'')+'>Todas as etapas</option>';
      opts += etapas.map(function(e){
        var lbl = e.numero+'ª Etapa · '+e.data.split('-')[2].replace(/^0/,'')+'/'+e.data.split('-')[1];
        return '<option value="'+e.id+'"'+(etapaId===e.id?' selected':'')+'>'+lbl+'</option>';
      }).join('');
      selectorHtml = '<div class="rank-filter">'+
        '<label class="rank-filter-label">Filtrar por etapa</label>'+
        '<select class="rank-filter-sel" id="rank-etapa-sel">'+opts+'</select>'+
      '</div>';
    }

    var mvp = mvpEtapa(cat, etapaId);
    var mvpHtml = mvp ? '<div class="rank-mvp">'+
      '<span class="rank-mvp-star">★</span>'+
      '<span class="rank-mvp-label">MVP desta etapa</span>'+
      '<span class="rank-mvp-nome">'+mvp.nome+'</span>'+
      '<span class="rank-mvp-pts">'+mvp.pts+' pts · '+mvp.vitorias+'V–'+mvp.derrotas+'D</span>'+
    '</div>' : '';

    var rows = calcRanking(cat, etapaId);
    var temRes = rows.some(function(r){return r.pts>0||r.enc>0;});
    var tabelaHtml;
    if(!temRes) {
      tabelaHtml = '<div class="rank-empty">'+
        '<div style="font-size:2.5rem;margin-bottom:14px">🎾</div>'+
        '<div style="font-size:15px;font-weight:600;color:var(--cr);margin-bottom:6px">Temporada 2026 a começar</div>'+
        '<div>O ranking actualiza após cada etapa.</div></div>';
    } else {
      var thead = '<thead><tr>'+
        '<th class="col-fix col-pos">Pos</th>'+
        '<th class="col-fix col-nom">Jogador</th>'+
        '<th class="col-stat">Pts</th>'+
        '<th class="col-stat">V</th>'+
        '<th class="col-stat">D</th>'+
        '<th class="col-stat">±Enc</th>'+
        '<th class="col-stat">JG</th>'+
        '<th class="col-stat">JP</th>'+
        '<th class="col-stat">±J</th>'+
      '</tr></thead>';
      var tbody = rows.map(function(r,i){
        var pc = i===0?"pos-1":i===1?"pos-2":i===2?"pos-3":"pos-n";
        var difEnc  = (r.dif_enc>=0?'+':'')+r.dif_enc;
        var difG    = (r.dif_games>=0?'+':'')+r.dif_games;
        var difEncCls = r.dif_enc>0?'stat-pos':r.dif_enc<0?'stat-neg':'stat-neu';
        var difGCls   = r.dif_games>0?'stat-pos':r.dif_games<0?'stat-neg':'stat-neu';
        return '<tr class="rank-row" data-id="'+r.id+'" style="cursor:pointer">'+
          '<td class="col-fix col-pos"><span class="rank-pos '+pc+'">'+(i+1)+'</span></td>'+
          '<td class="col-fix col-nom"><div class="rank-name">'+r.nome+'</div></td>'+
          '<td class="col-stat"><span class="rank-pts">'+r.pts+'</span></td>'+
          '<td class="col-stat stat-mu">'+r.vitorias+'</td>'+
          '<td class="col-stat stat-mu">'+r.derrotas+'</td>'+
          '<td class="col-stat '+difEncCls+'">'+difEnc+'</td>'+
          '<td class="col-stat stat-mu">'+r.games_g+'</td>'+
          '<td class="col-stat stat-mu">'+r.games_p+'</td>'+
          '<td class="col-stat '+difGCls+'">'+difG+'</td>'+
        '</tr>';
      }).join('');
      tabelaHtml = '<div class="rank-scroll-wrap"><table class="rank-table rank-fixed">'+thead+'<tbody>'+tbody+'</tbody></table></div>';
    }

    // #10 Share button
    var shareHtml = temRes ? '<div class="rank-share">'+
      '<button class="rank-share-btn" onclick="shareRanking()">'+
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.855L.057 23.082a.75.75 0 00.92.921l5.227-1.473A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.685-.52-5.21-1.426l-.374-.223-3.104.875.876-3.104-.223-.374A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>'+
        'Partilhar Ranking'+
      '</button>'+
    '</div>' : '';

    container.innerHTML = selectorHtml + mvpHtml + tabelaHtml + shareHtml;

    // Bind selector
    var sel = document.getElementById('rank-etapa-sel');
    if(sel) sel.addEventListener('change', function(){
      rankEtapaActual = this.value;
      renderRankingSection(rankCatActual, rankEtapaActual);
      renderResultadosEtapa(rankEtapaActual);
    });

    // Bind row clicks for player modal
    container.querySelectorAll('.rank-row[data-id]').forEach(function(row){
      row.addEventListener('click', function(){
        openPlayerModal(this.getAttribute('data-id'));
      });
    });

    // Render resultados for current etapa
    renderResultadosEtapa(etapaId);
  }

  window.switchRankTab = function(el, cat){
    document.querySelectorAll(".rank-tab").forEach(function(t){t.classList.remove("active");});
    el.classList.add("active");
    rankCatActual  = cat;
    rankEtapaActual = 'todas';
    renderRankingSection(cat, 'todas');
  };

  // ── #10 SHARE RANKING ────────────────────────────────────────────────────
  window.shareRanking = function() {
    var rows = calcRanking(rankCatActual, rankEtapaActual);
    var catLabel = rankCatActual==='senior'?'Senior Bola Dura':'Junior '+rankCatActual.charAt(0).toUpperCase()+rankCatActual.slice(1);
    var etapaLabel = rankEtapaActual==='todas'?'(Geral)':'';
    if(rankEtapaActual!=='todas') {
      var et = ETAPAS_RAW.find(function(e){return e.id===rankEtapaActual;});
      if(et) etapaLabel='('+et.numero+'ª Etapa)';
    }
    var txt = '🎾 *Super Stars CTPP — Ranking '+catLabel+' '+etapaLabel+'*\n\n';
    rows.slice(0,10).forEach(function(r,i){
      var medal = i===0?'🥇':i===1?'🥈':i===2?'🥉':'  '+(i+1)+'.';
      txt += medal+' '+r.nome+' — '+r.pts+'pts ('+r.vitorias+'V/'+r.derrotas+'D)\n';
    });
    txt += '\n🔗 '+window.location.href;
    var url = 'https://wa.me/?text='+encodeURIComponent(txt);
    window.open(url, '_blank');
  };

  // ── PLAYER MODAL (prep for Fase 2) ──────────────────────────────────────
  // Opens modal with player stats — implemented in Fase 2
  window.openPlayerModal = function(playerId) {
    var jogador = JOGADORES.find(function(j){return j.id===playerId;});
    if(!jogador) return;
    var cat = jogador.tipo==='senior'?'senior':jogador.escalao;
    var todosJogos = JOGOS.filter(function(g){return g.ja===playerId||g.jb===playerId;});
    if(!todosJogos.length) return;

    // ── Total stats ────────────────────────────────────────────────────
    var ranking = calcRanking(cat,'todas');
    var totalStats = ranking.find(function(r){return r.id===playerId;})
      || {pts:0,vitorias:0,derrotas:0,dif_games:0,enc:0};
    var rankPos = ranking.findIndex(function(r){return r.id===playerId;}) + 1;
    var winRate = totalStats.enc > 0
      ? Math.round((totalStats.vitorias / totalStats.enc) * 100) : 0;

    // ── Stats per etapa ─────────────────────────────────────────────────
    var etapasJogadas = {};
    todosJogos.forEach(function(g){
      if(!etapasJogadas[g.etapa]) etapasJogadas[g.etapa]={v:0,d:0,pts:0,jogos:[]};
      var won = g.vencedor===playerId;
      if(won){ etapasJogadas[g.etapa].pts+=3; etapasJogadas[g.etapa].v++; }
      else    { etapasJogadas[g.etapa].pts+=1; etapasJogadas[g.etapa].d++; }
      etapasJogadas[g.etapa].jogos.push(g);
    });

    // ── #9 Head-to-head: group by opponent ─────────────────────────────
    var h2h = {};
    todosJogos.forEach(function(g){
      var opp = g.ja===playerId ? g.jb : g.ja;
      if(!h2h[opp]) h2h[opp]={v:0,d:0};
      if(g.vencedor===playerId) h2h[opp].v++;
      else h2h[opp].d++;
    });
    var h2hKeys = Object.keys(h2h);

    // ── Win rate bar ───────────────────────────────────────────────────
    var winBarHtml =
      '<div class="modal-winrate">'+
        '<div class="modal-winrate-hdr">'+
          '<span class="modal-winrate-label">Taxa de vitória</span>'+
          '<span class="modal-winrate-val">'+winRate+'%</span>'+
        '</div>'+
        '<div class="modal-winrate-bar">'+
          '<div class="modal-winrate-fill" style="width:'+winRate+'%"></div>'+
        '</div>'+
      '</div>';

    // ── Head-to-head section ───────────────────────────────────────────
    var h2hHtml = '';
    if(h2hKeys.length > 0) {
      var h2hRows = h2hKeys.map(function(oppId){
        var oppName = (JOGADORES.find(function(j){return j.id===oppId;})||{}).nome||oppId;
        var s = h2h[oppId];
        var total = s.v+s.d;
        var w = Math.round((s.v/total)*100);
        var favors = s.v>s.d?'h2h-favor':s.v<s.d?'h2h-against':'h2h-even';
        return '<div class="h2h-row '+favors+'">'+
          '<span class="h2h-opp">'+oppName+'</span>'+
          '<span class="h2h-rec">'+s.v+'V / '+s.d+'D</span>'+
          '<span class="h2h-bar-wrap"><span class="h2h-bar-fill" style="width:'+w+'%"></span></span>'+
        '</div>';
      }).join('');
      h2hHtml =
        '<div class="modal-section-title">Head-to-Head</div>'+
        '<div class="h2h-list">'+h2hRows+'</div>';
    }

    // ── Etapas + jogos ─────────────────────────────────────────────────
    var etapasHtml = Object.keys(etapasJogadas).map(function(eid){
      var et = ETAPAS_RAW.find(function(e){return e.id===eid;});
      var lbl = et ? et.numero+'ª Etapa' : eid;
      var s = etapasJogadas[eid];
      var jogosHtml = s.jogos.map(function(g){
        var opp = g.ja===playerId ? g.jb : g.ja;
        var oppName = (JOGADORES.find(function(j){return j.id===opp;})||{}).nome||opp;
        var won = g.vencedor===playerId;
        var scoreA = g.ja===playerId?g.score_a:g.score_b;
        var scoreB = g.ja===playerId?g.score_b:g.score_a;
        return '<div class="modal-game">'+
          '<span class="modal-game-opp">vs '+oppName+'</span>'+
          '<span class="modal-game-score">'+scoreA+' – '+scoreB+'</span>'+
          '<span class="modal-game-result '+(won?'win-badge':'loss-badge')+'">'+(won?'V':'D')+'</span>'+
        '</div>';
      }).join('');
      return '<div class="modal-etapa">'+
        '<div class="modal-etapa-hdr">'+
          '<span class="modal-etapa-lbl">'+lbl+'</span>'+
          '<span class="modal-etapa-pts">'+s.pts+' pts · '+s.v+'V–'+s.d+'D</span>'+
        '</div>'+
        jogosHtml+
      '</div>';
    }).join('');

    // ── Rank badge ─────────────────────────────────────────────────────
    var rankMedal = rankPos===1?'🥇':rankPos===2?'🥈':rankPos===3?'🥉':'';
    var rankBadge = rankPos > 0
      ? '<div class="modal-rank-badge">'+rankMedal+' '+rankPos+'º lugar</div>'
      : '';

    var difG = (totalStats.dif_games>=0?'+':'')+totalStats.dif_games;
    var catLabel = cat==='senior'?'Senior · Bola Dura':'Junior · Bola '+cat.charAt(0).toUpperCase()+cat.slice(1);

    var modal = document.getElementById('player-modal');
    modal.innerHTML =
      '<div class="modal-backdrop" onclick="closePlayerModal()"></div>'+
      '<div class="modal-box">'+
        '<button class="modal-close" onclick="closePlayerModal()">✕</button>'+

        '<div class="modal-header">'+
          '<div class="modal-avatar">'+jogador.nome.charAt(0).toUpperCase()+'</div>'+
          '<div class="modal-header-info">'+
            '<div class="modal-name">'+jogador.nome+'</div>'+
            '<div class="modal-cat">'+catLabel+'</div>'+
            rankBadge+
          '</div>'+
        '</div>'+

        '<div class="modal-stats">'+
          '<div class="modal-stat"><span class="modal-stat-n">'+totalStats.pts+'</span><span class="modal-stat-l">Pontos</span></div>'+
          '<div class="modal-stat"><span class="modal-stat-n">'+totalStats.vitorias+'</span><span class="modal-stat-l">Vitórias</span></div>'+
          '<div class="modal-stat"><span class="modal-stat-n">'+totalStats.derrotas+'</span><span class="modal-stat-l">Derrotas</span></div>'+
          '<div class="modal-stat"><span class="modal-stat-n">'+difG+'</span><span class="modal-stat-l">±Jogos</span></div>'+
        '</div>'+

        winBarHtml+

        (h2hHtml ? h2hHtml : '')+

        (etapasHtml
          ? '<div class="modal-section-title">Histórico por etapa</div>'+
            '<div class="modal-etapas">'+etapasHtml+'</div>'
          : '')+
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
  function renderCalendario(filter){
    var container = document.getElementById("calendario-container");
    if(!container) return;
    var todas = [];
    if(filter!=="junior") ETAPAS_SENIOR.forEach(function(e){todas.push(Object.assign({},e,{tipo:"senior"}));});
    if(filter!=="senior") ETAPAS_JUNIOR.forEach(function(e){todas.push(Object.assign({},e,{tipo:"junior"}));});
    todas.sort(function(a,b){return new Date(a.data)-new Date(b.data);});
    var now = new Date(); var html="";
    todas.forEach(function(e){
      var past = new Date(e.data)<now;
      var dayNum = e.data.split("-")[2].replace(/^0/,"");
      var isSen = e.tipo==="senior";
      var badge = e.estado==="aberta"
        ?'<span class="etapa-badge eb-open"><span class="eb-dot"></span> Inscrições abertas</span>'
        :e.estado==="concluida"
        ?'<span class="etapa-badge eb-done">Concluída</span>'
        :'<span class="etapa-badge eb-pending"><span class="eb-dot"></span> Em breve</span>';
      html+='<div class="etapa-card'+(past?" done":"")+'">'+
        '<div class="etapa-date-box '+(isSen?"edb-senior":"edb-junior")+'">'+
          '<div class="edb-day">'+dayNum+'</div><div class="edb-month">'+e.mes+'</div>'+
        '</div>'+
        '<div class="etapa-info">'+
          '<div class="etapa-num">'+(isSen?"Senior":"Junior")+' · '+e.n+'ª Etapa</div>'+
          '<div class="etapa-title">'+e.n+'ª Etapa '+(isSen?"Bola Dura":e.escaloes||"Junior Stars")+'</div>'+
          '<div class="etapa-details">'+e.dia+' · '+e.hora+(isSen?" — 11h · 15 vagas · 5€":"")+'</div>'+
          badge+
        '</div></div>';
    });
    container.innerHTML=html||'<div class="rank-empty">Sem etapas.</div>';
  }

  window.switchCalTab = function(el,filter){
    document.querySelectorAll(".cal-tab").forEach(function(t){t.classList.remove("active");});
    el.classList.add("active");
    renderCalendario(filter);
  };

  // ── REGULAMENTO ───────────────────────────────────────────────────────────
  window.switchRegTab = function(el,reg){
    document.querySelectorAll(".reg-tab").forEach(function(t){t.classList.remove("active");});
    document.querySelectorAll(".reg-content").forEach(function(c){c.classList.remove("active");});
    el.classList.add("active");
    document.getElementById("reg-"+reg).classList.add("active");
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
        var anchor=secs[i]==="inicio"?"#inicio":"#"+secs[i];
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
  showRankingSkeleton(); // #2 show skeleton immediately
  renderCalendario("todos");

  // Try cache first for instant render
  var cached = loadCache();
  if(cached) {
    applyData(cached);
    renderProxima();
    renderRankingSection('senior','todas');
  }

  // Then fetch fresh data
  loadData();

})();
