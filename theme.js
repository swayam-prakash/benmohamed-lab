/* Shared light/dark background preference for every page of the lab site.
   Include in <head> on each page: <script src="theme.js"></script>
   The choice is stored in localStorage under "theme" ("light" or "dark"). */
(function () {
  var KEY = 'theme', root = document.documentElement;
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function apply(t) {
    if (t === 'light') root.setAttribute('data-theme', 'light'); else root.removeAttribute('data-theme');
    var btn = document.getElementById('themeBtn');
    if (btn) {
      var light = t === 'light';
      btn.setAttribute('aria-pressed', String(light));
      btn.setAttribute('aria-label', light ? 'Switch to dark background' : 'Switch to light background');
    }
  }
  apply(saved());  // runs in <head>, before first paint, so there is no flash of the wrong theme

  function wire() {
    apply(saved());
    var btn = document.getElementById('themeBtn');
    if (btn && !btn.dataset.themeWired) {
      btn.dataset.themeWired = '1';
      btn.addEventListener('click', function () {
        var t = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        try { localStorage.setItem(KEY, t); } catch (e) {}
        apply(t);
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire); else wire();

  // Keep other open tabs or pages of the site in sync
  window.addEventListener('storage', function (e) { if (e.key === KEY) apply(e.newValue); });
  // Restore correctly when a page is shown from the back/forward cache
  window.addEventListener('pageshow', function () { apply(saved()); });
})();
