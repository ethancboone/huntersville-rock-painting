document.addEventListener('DOMContentLoaded', () => {
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
});

