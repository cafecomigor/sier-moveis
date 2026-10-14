(function () {
  var D = window.CALENDAR_DATA;

  var MONTHS = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
  function fmtDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0");
  }
  function fmtDateLong(iso) {
    var d = new Date(iso + "T00:00:00");
    return String(d.getDate()).padStart(2, "0") + " " + MONTHS[d.getMonth()] + " " + d.getFullYear();
  }
  var STATUS_LABEL = { published: "Publicado", approved: "Aprovado", script: "Roteiro aprovado" };

  var PLAY_SVG = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';

  function byDateAsc(a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; }
  function byDateDesc(a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; }

  function applyBrand() {
    document.documentElement.style.setProperty("--accent", D.client.accent);
    var rgb = hexToRgb(D.client.accent);
    if (rgb) document.documentElement.style.setProperty("--accent-soft", "rgba(" + rgb.join(",") + ",0.10)");
    document.title = D.client.name + " — Calendário Editorial · " + D.period.label;
  }
  function hexToRgb(hex) {
    var m = hex.replace("#", "").match(/.{1,2}/g);
    if (!m || m.length < 3) return null;
    return m.slice(0, 3).map(function (h) { return parseInt(h, 16); });
  }

  function renderNav() {
    document.getElementById("brand-mark").textContent = D.client.shortName;
    document.getElementById("brand-name").textContent = D.client.name;
  }

  function renderHero() {
    document.getElementById("hero-period-label").textContent = "Planejamento editorial · " + D.period.label;
    document.getElementById("hero-headline").textContent = D.period.headline;
    document.getElementById("hero-intro").textContent = D.period.intro;
    document.getElementById("hero-period-range").textContent =
      fmtDateLong(D.period.start) + " – " + fmtDateLong(D.period.end);

    var total = D.posts.length;
    var cards = D.posts.filter(function (p) { return p.type === "card"; }).length;
    var videos = D.posts.filter(function (p) { return p.type === "video"; }).length;
    var published = D.posts.filter(function (p) { return p.status === "published"; }).length;

    document.getElementById("stat-total").textContent = total;
    document.getElementById("stat-cards").textContent = cards + " (" + published + " publicado" + (published === 1 ? "" : "s") + ")";
    document.getElementById("stat-videos").textContent = videos;

    var featured = D.posts.filter(function (p) { return p.date === D.nextPublication; })[0] || D.posts.slice().sort(byDateAsc)[0];
    var f = document.getElementById("featured-block");
    if (featured) {
      f.style.display = "";
      f.querySelector(".f-img").src = featured.image;
      f.querySelector(".f-title").textContent = featured.title;
      f.querySelector(".f-meta").textContent = fmtDate(featured.date) + " · " + featured.pillar;
      f.onclick = function () { openModal(featured.id); };
    } else {
      f.style.display = "none";
    }
  }

  function tileBadge(post) {
    if (post.type === "video") {
      return '<span class="tile-badge">' + PLAY_SVG + "</span>";
    }
    return "";
  }

  function renderFeed() {
    var grid = document.getElementById("feed-grid");
    var sorted = D.posts.slice().sort(byDateDesc);
    if (sorted.length === 0) {
      grid.innerHTML = '<p style="color:var(--ink-faint); grid-column:1/-1;">Nenhum post adicionado ainda.</p>';
    } else {
      grid.innerHTML = sorted.map(function (p) {
        return '<div class="feed-tile" data-id="' + p.id + '">' +
          '<img src="' + p.image + '" alt="' + p.title + '" loading="lazy">' +
          tileBadge(p) +
          "</div>";
      }).join("");
    }
    grid.querySelectorAll(".feed-tile").forEach(function (el) {
      el.addEventListener("click", function () { openModal(parseInt(el.dataset.id, 10)); });
    });
    document.getElementById("feed-count").textContent = D.posts.length;
  }

  function renderPillars() {
    var grid = document.getElementById("pillars-grid");
    grid.innerHTML = D.pillars.map(function (pillar, i) {
      var items = D.posts.filter(function (p) { return p.pillar === pillar.name; }).sort(byDateAsc);
      var itemsHtml = items.map(function (p) {
        return '<div class="pp-item" data-id="' + p.id + '"><span class="pp-date">' + fmtDate(p.date) + "</span><span>" + p.title + "</span></div>";
      }).join("") || '<div class="pp-item" style="color:var(--ink-faint);">Nenhum post ainda</div>';
      return '<div class="pillar-card">' +
        '<div class="p-num">' + (i + 1) + "</div>" +
        "<h3>" + pillar.name + "</h3>" +
        "<p>" + pillar.desc + "</p>" +
        '<div class="pillar-posts">' + itemsHtml + "</div>" +
        "</div>";
    }).join("");
    grid.querySelectorAll(".pp-item[data-id]").forEach(function (el) {
      el.addEventListener("click", function () { openModal(parseInt(el.dataset.id, 10)); });
    });
  }

  function renderCalendar(filter) {
    filter = filter || "all";
    var grid = document.getElementById("cal-grid");
    var sorted = D.posts.slice().sort(byDateAsc).filter(function (p) {
      return filter === "all" || p.type === filter;
    });
    if (sorted.length === 0) {
      grid.innerHTML = '<p style="color:var(--ink-faint);">Nenhum post por aqui ainda.</p>';
    } else {
      grid.innerHTML = sorted.map(function (p) {
        return '<div class="cal-card" data-id="' + p.id + '">' +
          '<div class="cc-thumb"><img src="' + p.image + '" alt="' + p.title + '" loading="lazy">' +
          '<span class="cc-status">' + STATUS_LABEL[p.status] + "</span></div>" +
          '<div class="cc-body"><div class="cc-date">' + fmtDate(p.date) + " · " + (p.type === "video" ? "Vídeo" : "Card") + '</div>' +
          '<div class="cc-title">' + p.title + "</div></div>" +
          "</div>";
      }).join("");
    }
    grid.querySelectorAll(".cal-card").forEach(function (el) {
      el.addEventListener("click", function () { openModal(parseInt(el.dataset.id, 10)); });
    });
  }

  function wireCalFilters() {
    var chips = document.querySelectorAll("#cal-filters .chip");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        renderCalendar(chip.dataset.filter);
      });
    });
    document.getElementById("cal-count-all").textContent = D.posts.length;
    document.getElementById("cal-count-card").textContent = D.posts.filter(function (p) { return p.type === "card"; }).length;
    document.getElementById("cal-count-video").textContent = D.posts.filter(function (p) { return p.type === "video"; }).length;
  }

  function renderSummary() {
    var published = D.posts.filter(function (p) { return p.status === "published"; }).length;
    var approved = D.posts.filter(function (p) { return p.status === "approved"; }).length;
    var videos = D.posts.filter(function (p) { return p.type === "video"; }).length;
    document.getElementById("sum-published").textContent = published;
    document.getElementById("sum-approved").textContent = approved;
    document.getElementById("sum-videos").textContent = videos;
    document.getElementById("sum-next").textContent = D.nextPublication ? fmtDate(D.nextPublication) : "—";
    document.getElementById("sum-priority").textContent = D.priorityDays;
    document.getElementById("footer-client").textContent = D.client.name;
    document.getElementById("footer-production").textContent = D.production;
  }

  function openModal(id) {
    var post = D.posts.filter(function (p) { return p.id === id; })[0];
    if (!post) return;
    var overlay = document.getElementById("modal-overlay");
    overlay.querySelector(".m-img img").src = post.image;
    overlay.querySelector(".m-status").textContent = STATUS_LABEL[post.status];
    overlay.querySelector(".m-title").textContent = post.title;
    overlay.querySelector(".m-meta").textContent = fmtDateLong(post.date) + " · " + post.pillar;
    overlay.querySelector(".m-caption").textContent = post.caption;

    var actions = overlay.querySelector(".m-actions");
    if (post.type === "card") {
      actions.innerHTML = '<a class="btn primary" href="' + post.image + '" download="' + slug(post.title) + '.svg">Baixar arte ↓</a>';
    } else {
      actions.innerHTML = '<button class="btn primary" id="download-script">Baixar roteiro ↓</button>';
      actions.querySelector("#download-script").addEventListener("click", function () {
        downloadText(slug(post.title) + "-roteiro.txt", post.title + "\n\n" + post.caption);
      });
    }
    overlay.classList.add("open");
  }
  function closeModal() { document.getElementById("modal-overlay").classList.remove("open"); }

  function slug(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  function downloadText(filename, text) {
    var blob = new Blob([text], { type: "text/plain" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function wireModal() {
    document.getElementById("modal-overlay").addEventListener("click", function (e) {
      if (e.target.id === "modal-overlay") closeModal();
    });
    document.getElementById("modal-close").addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
  }

  function wireZipDownload() {
    var btn = document.getElementById("download-all");
    if (!btn) return;
    btn.addEventListener("click", function () {
      if (typeof JSZip === "undefined") { alert("Não foi possível carregar o gerador de ZIP."); return; }
      btn.disabled = true;
      var original = btn.textContent;
      btn.textContent = "Preparando…";
      var zip = new JSZip();
      var cardPosts = D.posts.filter(function (p) { return p.type === "card"; });
      Promise.all(cardPosts.map(function (p) {
        return fetch(p.image).then(function (r) { return r.blob(); }).then(function (blob) {
          zip.file(slug(p.title) + ".svg", blob);
        });
      })).then(function () {
        return zip.generateAsync({ type: "blob" });
      }).then(function (blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url; a.download = slug(D.client.name) + "-artes-" + slug(D.period.label) + ".zip";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
        btn.disabled = false; btn.textContent = original;
      }).catch(function () {
        alert("Não foi possível gerar o ZIP agora.");
        btn.disabled = false; btn.textContent = original;
      });
    });
  }

  function revealOnScroll() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    els.forEach(function (e) { io.observe(e); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyBrand();
    renderNav();
    renderHero();
    renderFeed();
    renderPillars();
    wireCalFilters();
    renderCalendar("all");
    renderSummary();
    wireModal();
    wireZipDownload();
    revealOnScroll();
  });
})();
