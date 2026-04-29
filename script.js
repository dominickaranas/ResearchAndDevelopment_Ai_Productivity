 // ── Section switching ──────────────────────────────────────────────────────
  function showSection(id) {
    document.querySelectorAll('.hero, section').forEach(el => {
      el.style.display = 'none';
      el.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    const target = document.getElementById(id);
    if (id === 'home') {
      target.style.display = 'flex';
      document.querySelectorAll('.tab-btn')[0].classList.add('active');
    } else {
      target.style.display = 'block';
      target.classList.add('active');
      const map = { photo: 1, video: 2 };
      if (map[id] !== undefined) document.querySelectorAll('.tab-btn')[map[id]].classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Modal / lightbox ───────────────────────────────────────────────────────
  let modalItems = [], modalIndex = 0;

  function openModal(thumb) {
    const grid = thumb.closest('.screenshot-grid');
    modalItems = Array.from(grid.querySelectorAll('.screenshot-thumb'));
    modalIndex = modalItems.indexOf(thumb);
    document.getElementById('modal-step-label').textContent = grid.dataset.step || '';
    renderModal();
    document.getElementById('modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function renderModal() {
    const thumb = modalItems[modalIndex];
    const label = thumb.dataset.label || '';
    const img   = thumb.querySelector('.thumb-img');
    const icon  = thumb.querySelector('.thumb-placeholder-icon')?.textContent || '🖼️';

    document.getElementById('modal-title').textContent = label;
    document.getElementById('modal-counter').textContent = `${modalIndex + 1} / ${modalItems.length}`;
    document.getElementById('btn-prev').disabled = modalIndex === 0;
    document.getElementById('btn-next').disabled = modalIndex === modalItems.length - 1;

    const wrap = document.getElementById('modal-image-wrap');
    wrap.innerHTML = img
      ? `<img src="${img.src}" alt="${label}">`
      : `<div class="modal-image-placeholder">
           <span class="big-icon">${icon}</span>
           <p>Screenshot placeholder — swap the <code>.thumb-placeholder</code> div with<br><code>&lt;img class="thumb-img" src="your-file.png"&gt;</code> to show your screenshot here.</p>
         </div>`;
  }

  function navigateModal(dir) {
    const next = modalIndex + dir;
    if (next >= 0 && next < modalItems.length) { modalIndex = next; renderModal(); }
  }

  function closeModal() {
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow = '';
  }

  function handleOverlayClick(e) {
    if (e.target === document.getElementById('modal')) closeModal();
  }

  document.addEventListener('keydown', e => {
    if (!document.getElementById('modal').classList.contains('open')) return;
    if (e.key === 'Escape')      closeModal();
    if (e.key === 'ArrowLeft')   navigateModal(-1);
    if (e.key === 'ArrowRight')  navigateModal(1);
  });

  // ── Scroll-to-top button ───────────────────────────────────────────────────
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }