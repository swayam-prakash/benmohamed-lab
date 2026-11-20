/* Step-through animated explainers in the science section */
(function () {
  var RM = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var DUR = 5200;

  document.querySelectorAll('[data-xpl]').forEach(function (root) {
    var svg = root.querySelector('.xpl__svg');
    var btns = Array.prototype.slice.call(root.querySelectorAll('[data-go]'));
    var play = root.querySelector('.xpl__play');
    var label = play.querySelector('span');
    var status = root.querySelector('.xpl__status');
    var N = btns.length;
    var step = 1, timer = null, visible = false, playing = !RM.matches;

    root.style.setProperty('--dur', DUR + 'ms');

    function set(n) {
      step = n;
      for (var i = 1; i <= N; i++) svg.classList.toggle('s' + i, i <= n);
      btns.forEach(function (b, i) {
        if (i + 1 === n) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
        b.classList.toggle('is-done', i + 1 < n);
      });
      status.textContent = 'Step ' + n + ' of ' + N;
      tick();
    }
    function tick() {
      root.classList.remove('is-ticking');
      void root.offsetWidth;
      if (playing && visible) root.classList.add('is-ticking');
    }
    function schedule() {
      clearTimeout(timer);
      if (!(playing && visible)) return;
      timer = setTimeout(next, DUR);
    }
    function next() {
      if (step < N) { set(step + 1); schedule(); return; }
      svg.classList.add('is-reset');
      setTimeout(function () {
        set(1);
        svg.getBoundingClientRect();
        requestAnimationFrame(function () {
          svg.classList.remove('is-reset');
          schedule();
        });
      }, 550);
    }
    function syncPlay() {
      play.setAttribute('aria-pressed', String(!playing));
      play.setAttribute('aria-label', playing ? 'Pause animation' : 'Play animation');
      label.textContent = playing ? 'Pause' : 'Play';
    }

    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { set(i + 1); schedule(); });
    });
    play.addEventListener('click', function () {
      playing = !playing;
      if (playing && step === N) set(1);
      syncPlay(); tick(); schedule();
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          visible = e.isIntersecting;
          root.classList.toggle('is-visible', visible);
          tick(); schedule();
        });
      }, { threshold: 0.35 }).observe(root);
    } else { visible = true; root.classList.add('is-visible'); }

    if (RM.addEventListener) RM.addEventListener('change', function () {
      if (RM.matches) { playing = false; syncPlay(); tick(); schedule(); }
    });

    set(1); syncPlay(); schedule();
  });
})();
