document.addEventListener('DOMContentLoaded', () => {
  // Navbar shadow + show on scroll up (sticky)
  const nav = document.getElementById('mainNav');
  if (nav) {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 4) nav.classList.add('shadow-sm'); else nav.classList.remove('shadow-sm');
      const goingDown = y > lastY + 2;
      const goingUp = y < lastY - 2;
      if (goingDown && y > 80) nav.classList.add('nav-hidden');
      else if (goingUp) nav.classList.remove('nav-hidden');
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Gallery multi-group filtering (location, style, theme)
  const grid = document.getElementById('gallery-grid');
  const filterGroups = document.querySelectorAll('[data-filter-group]');
  if (grid && filterGroups.length) {
    const items = Array.from(grid.querySelectorAll('.gallery-item'));
    const state = { location: 'all', style: 'all', theme: 'all' };

    const applyFilters = () => {
      items.forEach(el => {
        const okLocation = state.location === 'all' || (el.dataset.location || '').toLowerCase() === state.location;
        const okStyle = state.style === 'all' || (el.dataset.style || '').toLowerCase().split(/\s+/).includes(state.style);
        const okTheme = state.theme === 'all' || (el.dataset.theme || '').toLowerCase().split(/\s+/).includes(state.theme);
        el.style.display = (okLocation && okStyle && okTheme) ? '' : 'none';
      });
    };

    filterGroups.forEach(group => {
      group.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-filter]');
        if (!btn) return;
        const groupName = group.getAttribute('data-filter-group');
        group.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state[groupName] = btn.getAttribute('data-filter');
        applyFilters();
      });
    });
  }

  // Lightbox using Bootstrap modal
  const lightboxModal = document.getElementById('lightboxModal');
  if (lightboxModal) {
    const imgEl = document.getElementById('lightboxImg');
    const capEl = document.getElementById('lightboxCaption');
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-lightbox]');
      if (!link) return;
      e.preventDefault();
      imgEl.src = link.getAttribute('data-img');
      imgEl.alt = link.getAttribute('data-alt') || '';
      capEl.textContent = link.getAttribute('data-caption') || '';
      const modal = bootstrap.Modal.getOrCreateInstance(lightboxModal);
      modal.show();
    });
    lightboxModal.addEventListener('hidden.bs.modal', () => {
      imgEl.src = '';
      imgEl.alt = '';
      capEl.textContent = '';
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }

  // Flip-card interactions for gallery
  const flipCards = document.querySelectorAll('.flip-card');
  if (flipCards.length) {
    flipCards.forEach(card => {
      const toggle = () => card.classList.toggle('is-flipped');
      card.addEventListener('click', (e) => {
        e.preventDefault();
        toggle();
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
    // Click outside to close any flipped card
    document.addEventListener('click', (e) => {
      const isCard = e.target.closest('.flip-card');
      if (!isCard) {
        document.querySelectorAll('.flip-card.is-flipped').forEach(c => c.classList.remove('is-flipped'));
      }
    });
  }

  // Service area map (Leaflet) with intersection polygon
  const mapEl = document.getElementById('service-map');
  if (mapEl && window.L) {
    const map = L.map(mapEl, { scrollWheelZoom: false }).setView([35.4107, -80.8428], 10); // Huntersville approx
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      subdomains: 'abcd',
      attribution: '&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);
    const spots = [
      { name: 'Huntersville', coords: [-80.8428, 35.4107] },
      { name: 'Charlotte',   coords: [-80.8431, 35.2271] },
      { name: 'Cornelius',   coords: [-80.8601, 35.4868] },
      { name: 'Davidson',    coords: [-80.8487, 35.4993] },
    ];

    // Build 20-mile radius circles around each point and compute their intersection
    // Note: interpreting "20 degree radius" as 20 miles. Adjust easily.
    let intersection = null;
    if (window.turf) {
      const circles = spots.map(s => turf.circle(s.coords, 20, { steps: 128, units: 'miles' }));
      intersection = circles.reduce((acc, curr) => acc ? turf.intersect(acc, curr) : curr, null);
    }

    if (intersection) {
      const layer = L.geoJSON(intersection, {
        style: { color: '#39A0ED', weight: 2, fillColor: '#39A0ED', fillOpacity: 0.15 }
      }).addTo(map);
      map.fitBounds(layer.getBounds(), { padding: [20, 20] });
    } else {
      // Fallback: if intersection fails, show the union-ish extent
      const bounds = L.latLngBounds(spots.map(s => [s.coords[1], s.coords[0]]));
      map.fitBounds(bounds.pad(0.25));
    }
  }
});
