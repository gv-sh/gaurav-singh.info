// Instagram-style album carousel for /photos/. No dependencies.
// Reads album data from #albums-data, opens a lightbox on tile click, and
// supports keyboard (arrows/Esc), swipe/scroll-snap, and a thumbnail strip.
(function () {
  "use strict";

  var dataEl = document.getElementById("albums-data");
  if (!dataEl) return;

  var albums;
  try {
    albums = JSON.parse(dataEl.textContent);
  } catch (e) {
    return;
  }

  // --- build the lightbox shell once ---
  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("aria-hidden", "true");
  box.innerHTML =
    '<div class="lightbox-backdrop" data-close></div>' +
    '<button type="button" class="lightbox-close" data-close aria-label="Close">&times;</button>' +
    '<div class="lightbox-track" tabindex="-1"></div>' +
    '<div class="lightbox-meta">' +
    '<div class="lightbox-meta-top"><span class="lightbox-title"></span>' +
    '<span class="lightbox-count"></span></div>' +
    '<div class="lightbox-links"></div></div>' +
    '<div class="lightbox-thumbs"></div>';
  document.body.appendChild(box);

  var track = box.querySelector(".lightbox-track");
  var thumbsEl = box.querySelector(".lightbox-thumbs");
  var titleEl = box.querySelector(".lightbox-title");
  var countEl = box.querySelector(".lightbox-count");
  var linksEl = box.querySelector(".lightbox-links");

  var current = 0; // current slide index
  var slideCount = 0;
  var lastFocus = null;

  function render(album) {
    track.innerHTML = "";
    thumbsEl.innerHTML = "";
    slideCount = album.images.length;

    album.images.forEach(function (src, i) {
      var slide = document.createElement("div");
      slide.className = "lightbox-slide";
      var img = document.createElement("img");
      img.src = src;
      img.alt = album.title + " (" + (i + 1) + " of " + slideCount + ")";
      slide.appendChild(img);
      track.appendChild(slide);

      var thumb = document.createElement("button");
      thumb.type = "button";
      thumb.className = "lightbox-thumb";
      thumb.setAttribute("aria-label", "Go to photo " + (i + 1));
      var timg = document.createElement("img");
      timg.src = src;
      timg.alt = "";
      timg.loading = "lazy";
      thumb.appendChild(timg);
      thumb.addEventListener("click", function () {
        goto(i);
      });
      thumbsEl.appendChild(thumb);
    });

    var titleHtml = album.title;
    if (album.note) {
      titleHtml = '<a href="' + album.note + '">' + album.title + "</a>";
    }
    titleEl.innerHTML = titleHtml + (album.year ? " · " + album.year : "");

    linksEl.innerHTML = "";
    if (album.links && album.links.length) {
      album.links.forEach(function (l) {
        var a = document.createElement("a");
        a.href = l.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = l.label;
        linksEl.appendChild(a);
      });
      linksEl.style.display = "";
    } else {
      linksEl.style.display = "none";
    }

    var single = slideCount <= 1;
    thumbsEl.style.display = single ? "none" : "";
    countEl.style.display = single ? "none" : "";
  }

  function goto(i, smooth) {
    current = Math.max(0, Math.min(slideCount - 1, i));
    var slide = track.children[current];
    if (slide) {
      track.scrollTo({
        left: slide.offsetLeft,
        behavior: smooth === false ? "auto" : "smooth",
      });
    }
    update();
  }

  function update() {
    countEl.textContent = current + 1 + " / " + slideCount;
    var thumbs = thumbsEl.children;
    for (var i = 0; i < thumbs.length; i++) {
      var active = i === current;
      thumbs[i].classList.toggle("is-active", active);
      if (active) {
        thumbs[i].scrollIntoView({ inline: "nearest", block: "nearest" });
      }
    }
  }

  // keep `current` in sync when the user swipes / scroll-snaps
  var scrollTimer;
  track.addEventListener("scroll", function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      var idx = Math.round(track.scrollLeft / track.clientWidth);
      if (idx !== current) {
        current = idx;
        update();
      }
    }, 60);
  });

  function open(albumIndex) {
    var album = albums[albumIndex];
    if (!album) return;
    lastFocus = document.activeElement;
    render(album);
    box.classList.add("is-open");
    box.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    goto(0, false);
    box.querySelector(".lightbox-close").focus();
  }

  function close() {
    box.classList.remove("is-open");
    box.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // --- wire up controls ---
  document.querySelectorAll(".album-tile").forEach(function (tile) {
    tile.addEventListener("click", function () {
      open(parseInt(tile.getAttribute("data-album"), 10));
    });
  });

  box.addEventListener("click", function (e) {
    // close when clicking the backdrop or the empty area around a photo,
    // but not the photo itself or the controls
    if (
      e.target.hasAttribute("data-close") ||
      e.target.classList.contains("lightbox-slide") ||
      e.target.classList.contains("lightbox-track")
    ) {
      close();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") goto(current - 1);
    else if (e.key === "ArrowRight") goto(current + 1);
  });
})();
