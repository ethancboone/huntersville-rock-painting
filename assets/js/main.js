document.addEventListener('DOMContentLoaded', () => {
  // Gallery tag filtering
  const filterBar = document.getElementById('gallery-filters');
  const grid = document.getElementById('gallery-grid');
  if (filterBar && grid) {
    const items = Array.from(grid.querySelectorAll('.gallery-item'));
    const setActive = (tag) => {
      items.forEach(el => {
        const tags = (el.getAttribute('data-tags') || '').split(/\s+/);
        const show = tag === 'all' || tags.includes(tag);
        el.style.display = show ? '' : 'none';
      });
    };
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      filterBar.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      setActive(btn.getAttribute('data-filter'));
    });
    // Optional: hash -> initial filter
    const hash = (location.hash || '').replace('#', '');
    if (hash) {
      const map = { birthday: 'birthday', school: 'school', events: 'event', event: 'event' };
      const tag = map[hash] || 'all';
      const btn = filterBar.querySelector(`[data-filter="${tag}"]`);
      if (btn) { btn.click(); }
    }
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
});

