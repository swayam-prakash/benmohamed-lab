(function(){
  document.documentElement.classList.add('js');

  // Nav: solid on scroll + mobile toggle
  var nav=document.getElementById('nav'), toggle=document.getElementById('navToggle'), links=document.getElementById('navLinks');
  function onScroll(){ nav.classList.toggle('is-solid', window.scrollY>40); }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  toggle.addEventListener('click', function(){
    var open=links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open?'Close menu':'Open menu');
  });
  links.addEventListener('click', function(e){
    if(e.target.tagName==='A'){ links.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); }
  });

  // Publications
  var pubs=[
    ['2026','hsv','A tissue-targeted vaccine protects against recurrent ocular herpes infection and disease, and alleviates the associated cognitive, behavioral, and social deficits in a \'humanized\' HLA transgenic mouse model of UVB-induced reactivation','Research Square (preprint)'],
    ['2026','cov','Multi-antigen coronavirus vaccine induces potent and durable cross-protection against multiple SARS-CoV-2 variants','npj Vaccines'],
    ['2026','cov','High frequencies of senescent and exhausted natural killer cells and SARS-CoV-2-specific memory CD8+ T cells distinguish critically ill from asymptomatic unvaccinated COVID-19 patients','Viruses'],
    ['2026','hsv','Tissue-resident and effector-memory lymphocyte recruitment to the ocular mucosa requires CCL28/CCR10 signaling during recurrent HSV-1 infection','bioRxiv (preprint)'],
    ['2026','cov','From bench to bedside: reframing the CXCL13/CXCR5 axis as a non-redundant organizer of protective pulmonary immunity in COVID-19','Journal of Clinical and Cellular Immunology'],
    ['2026','hsv','CCL25 chemokine promotes antiviral tissue resident CD4+ and CD8+ effector memory TRM cells associated with a reduction of ocular herpes infection and disease: a potential gut-eye axis in herpes immunity','Frontiers in Immunology'],
    ['2026','hsv','NF-\u03baB/OCT-1 mediated upregulation of CXCL14 chemokine mobilizes mucosal effector memory CD4+ and CD8+ TEM cells, and NK cells associated with protection against genital herpes','Pathogens and Immunity'],
    ['2026','cov','CXCL13/CXCR5 chemokine axis promotes antiviral CXCR5+CD19+ B cells and follicular/effector CXCR5+CD4+ T cells in the lungs associated with protection from severe and fatal COVID-19','Journal of Immunology'],
    ['2026','hsv','Role of mucosal chemokines in the development of tissue-resident CD4+ and CD8+ TRM cells to fend off herpes simplex infections','Frontiers in Immunology'],
    ['2025','ai','Artificial intelligence-, organoid-, and organ-on-chip-powered models to improve pre-clinical animal testing of vaccines and immunotherapeutics: potential, progress, and challenges','Frontiers in Artificial Intelligence'],
    ['2025','cov','Insights into persistent SARS-CoV-2 reservoirs in chronic Long COVID','Viruses'],
    ['2025','hsv','The path towards effective long-lasting tissue-targeted prime/pull/keep herpes simplex therapeutic vaccines','Vaccines'],
    ['2025','ai','Artificial intelligence and machine learning in the development of vaccines and immunotherapeutics: yesterday, today, and tomorrow','Frontiers in Artificial Intelligence'],
    ['2025','cov','A pan-beta-coronavirus vaccine bearing conserved and asymptomatic B- and T-cell epitopes protects against highly pathogenic Delta and highly transmissible Omicron SARS-CoV-2 variants','Human Vaccines and Immunotherapeutics'],
    ['2025','hsv','Dysfunctional senescent herpes simplex virus-specific CD57+CD8+ T cells are associated with symptomatic recurrent ocular herpes in humans','Viruses'],
    ['2025','hsv','A tissue-targeted prime/pull/keep therapeutic herpes simplex virus vaccine protects against recurrent ocular herpes infection and disease in HLA-A*0201 transgenic rabbits','Journal of Virology'],
    ['2025','hsv','Therapeutic mucosal vaccination of herpes simplex virus type 2 infected guinea pigs with an adenovirus-based vaccine expressing the ribonucleotide reductase 2 and glycoprotein D induces local tissue-resident CD4+ and CD8+ TRM cells','Frontiers in Immunology'],
    ['2025','cov','Dynamics of spike-specific neutralizing antibodies across five-year emerging SARS-CoV-2 variants of concern reveal conserved epitopes that protect against severe COVID-19','Frontiers in Immunology'],
    ['2025','cov','A spike-based mRNA vaccine encapsulated in phospholipid DOPE-containing lipid nanoparticles induced potent B- and T-cell responses associated with protection against SARS-CoV-2 infection and COVID-19-like symptoms in hamsters','Vaccines'],
    ['2024','cov','Antigen delivery platforms for next-generation coronavirus vaccines','Vaccines'],
    ['2024','hsv','Therapeutic prime/pull vaccination of HSV-2-infected guinea pigs with the ribonucleotide reductase 2 (RR2) protein and CXCL11 chemokine boosts antiviral local tissue-resident and effector memory CD4+ and CD8+ T cells and protects against recurrent genital herpes','Journal of Virology']
  ];
  var labels={hsv:'Herpes',cov:'Coronavirus',ai:'AI and models'};
  var list=document.getElementById('pubs');
  list.innerHTML=pubs.map(function(p){
    var q=encodeURIComponent(p[2].slice(0,120));
    return '<li class="pub" data-t="'+p[1]+'"><span class="pub__yr">'+p[0]+'</span><div><a class="pub__t" target="_blank" rel="noopener" href="https://pubmed.ncbi.nlm.nih.gov/?term='+q+'">'+p[2]+'</a><span class="pub__j">'+p[3]+'</span></div><span class="pub__tag">'+labels[p[1]]+'</span></li>';
  }).join('');
  var btns=document.querySelectorAll('#publications .filters button');
  btns.forEach(function(b){
    b.addEventListener('click', function(){
      btns.forEach(function(x){x.setAttribute('aria-pressed', x===b);});
      var f=b.dataset.f;
      list.querySelectorAll('.pub').forEach(function(li){ li.hidden = !(f==='all' || li.dataset.t===f); });
    });
  });

  // Trainee inquiry form: composes an email (no data stored)
  var form=document.getElementById('joinForm');
  if(form){
    var err=document.getElementById('formError'), status=document.getElementById('formStatus');
    function compose(){
      var d=new FormData(form), g=function(k){return (d.get(k)||'').toString().trim();};
      var ints=d.getAll('interest');
      var lines=['Dear Prof. BenMohamed,','',
        'I am writing to inquire about a '+g('position').toLowerCase()+' position in your laboratory.','',
        'Name: '+g('name'),'Email: '+g('email')];
      if(g('institution')) lines.push('Current institution: '+g('institution'));
      if(g('degree')) lines.push('Highest degree: '+g('degree'));
      if(g('start')) lines.push('Earliest start: '+g('start'));
      if(ints.length) lines.push('Research interests: '+ints.join(', '));
      if(g('funding')) lines.push('Funding status: '+g('funding'));
      if(g('cv')) lines.push('LinkedIn / GitHub / webpage: '+g('cv'));
      var cvf=form.querySelector('#f-cvfile');
      if(cvf && cvf.files && cvf.files[0]) lines.push('Attached CV: '+cvf.files[0].name);
      lines.push('','Research experience and goals:',g('message'),'','Thank you for your consideration.','',g('name'));
      return {subject:'Prospective trainee inquiry: '+g('position')+' - '+g('name'), body:lines.join('\n')};
    }
    function validate(){
      var bad=[];
      form.querySelectorAll('[required]').forEach(function(el){
        var ok=el.value.trim()!=='' && el.checkValidity();
        el.setAttribute('aria-invalid', !ok);
        if(!ok) bad.push(el);
      });
      var cv=form.querySelector('#f-cv');
      if(cv.value && !cv.checkValidity()){ cv.setAttribute('aria-invalid',true); bad.push(cv);} else cv.removeAttribute('aria-invalid');
      var cvf=form.querySelector('#f-cvfile');
      if(cvf && cvf.files && cvf.files[0] && !/\.(pdf|docx?)$/i.test(cvf.files[0].name)){ cvf.setAttribute('aria-invalid',true); bad.push(cvf);} else if(cvf) cvf.removeAttribute('aria-invalid');
      if(bad.length){ err.textContent='Please complete the required fields marked with an asterisk and check that the email and CV link are valid.'; err.hidden=false; bad[0].focus(); return false; }
      err.hidden=true; return true;
    }
    form.addEventListener('input', function(e){ if(e.target.getAttribute('aria-invalid')==='true' && e.target.checkValidity() && e.target.value.trim()) e.target.setAttribute('aria-invalid',false); });
    form.addEventListener('submit', function(e){
      e.preventDefault(); if(!validate()) return;
      var m=compose();
      window.location.href='mailto:lbenmoha@uci.edu?subject='+encodeURIComponent(m.subject)+'&body='+encodeURIComponent(m.body);
      status.textContent='Your mail app should open with the drafted message. Attach your CV file before sending. If nothing opened, use "Copy message instead" and email lbenmoha@uci.edu.';
    });
    var cvIn=form.querySelector('#f-cvfile'), cvHint=document.getElementById('cvHint');
    if(cvIn) cvIn.addEventListener('change', function(){
      if(cvIn.files && cvIn.files[0]){
        var f=cvIn.files[0], kb=Math.max(1,Math.round(f.size/1024));
        cvHint.textContent='Selected: '+f.name+' ('+kb+' KB). Attach this file to the email in your mail app before sending.';
      } else cvHint.textContent='Pick your CV here. Your mail app opens with the drafted message; attach this file before sending and it reaches Prof. BenMohamed with your email.';
    });
    document.getElementById('copyBtn').addEventListener('click', function(){
      if(!validate()) return;
      var m=compose(), txt='To: lbenmoha@uci.edu\nSubject: '+m.subject+'\n\n'+m.body;
      var done=function(){ status.textContent='Message copied. Paste it into an email to lbenmoha@uci.edu and attach your CV.'; };
      if(navigator.clipboard && window.isSecureContext){ navigator.clipboard.writeText(txt).then(done,function(){ status.textContent='Copy failed. Please email lbenmoha@uci.edu directly.'; }); }
      else { var t=document.createElement('textarea'); t.value=txt; document.body.appendChild(t); t.select(); try{document.execCommand('copy'); done();}catch(x){} t.remove(); }
    });
  }

  // Lab member tabs
  var tabs=document.querySelectorAll('#team [role=tab]');
  function selectTab(t){
    tabs.forEach(function(x){ var on=x===t; x.setAttribute('aria-selected',on); x.setAttribute('aria-pressed',on); x.tabIndex=on?0:-1; document.getElementById(x.getAttribute('aria-controls')).hidden=!on; });
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){ selectTab(t); });
    t.addEventListener('keydown',function(e){
      if(e.key==='ArrowRight'||e.key==='ArrowLeft'){ e.preventDefault(); var n=tabs[(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length]; selectTab(n); n.focus(); }
    });
  });

  // Complete publication list (data: pubs-data.js, from PubMed)
  (function(){
    var data=window.LAB_PUBS, wrap=document.getElementById('biblioList');
    if(!data||!wrap) return;
    var q=document.getElementById('biblioQ'), more=document.getElementById('biblioMore'), count=document.getElementById('biblioCount');
    var LIMIT=25, expanded=false;
    function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
    function authors(a){
      var i=a.indexOf('BenMohamed L'), out;
      if(a.length<=6) out=a.map(esc);
      else { out=a.slice(0,3).map(esc); if(i>=3&&i<a.length-1){out.push('...');out.push(esc(a[i]));} out.push('...'); out.push(esc(a[a.length-1])); }
      return out.join(', ').replace('BenMohamed L','<b>BenMohamed L</b>').replace(/, \.\.\., /g,', ..., ');
    }
    data.forEach(function(p){ p._s=(p.t+' '+p.a.join(' ')+' '+p.j+' '+p.y+' '+p.g.join(' ')).toLowerCase(); });
    function render(){
      var term=(q.value||'').trim().toLowerCase(), words=term.split(/\s+/).filter(Boolean);
      var hits=data.filter(function(p){return words.every(function(w){return p._s.indexOf(w)>-1;});});
      var shown=(expanded||words.length)?hits:hits.slice(0,LIMIT);
      var groups={}, order=[];
      shown.forEach(function(p){ if(!groups[p.y]){groups[p.y]=[];order.push(p.y);} groups[p.y].push(p); });
      wrap.innerHTML=order.length?order.map(function(y){
        var all=hits.filter(function(p){return p.y===y;}).length;
        return '<div class="biblio__yr"><h4>'+y+'<small>'+all+(all===1?' paper':' papers')+'</small></h4><ol>'+groups[y].map(function(p){
          return '<li class="bib"><a class="bib__t" href="https://pubmed.ncbi.nlm.nih.gov/'+p.p+'/" target="_blank" rel="noopener">'+esc(p.t)+'</a>'+
            '<p class="bib__a">'+authors(p.a)+'</p>'+
            '<p class="bib__j">'+esc(p.j)+p.g.map(function(g){return '<span class="bib__rev'+(/^Retract/.test(g)?' bib__rev--x':'')+'">'+g+'</span>';}).join('')+'<span class="bib__id">PMID '+p.p+'</span></p></li>';
        }).join('')+'</ol></div>';
      }).join(''):'<p class="biblio__empty">No publications match that search.</p>';
      count.textContent=words.length?(hits.length+' of '+data.length+' publications match'):(shown.length<hits.length?('Showing '+shown.length+' of '+data.length+' publications'):(data.length+' publications'));
      more.hidden=!!words.length||expanded||hits.length<=LIMIT;
    }
    q.addEventListener('input',render);
    more.addEventListener('click',function(){expanded=true;render();});
    render();
  })();

  // Reveal on scroll
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} });
    },{threshold:.12, rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){ io.observe(el); });
  } else { els.forEach(function(el){ el.classList.add('in'); }); }
})();
