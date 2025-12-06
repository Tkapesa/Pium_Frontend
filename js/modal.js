(function(){
  function init(){
    const modal = document.getElementById('newQuizModal');
  // ENDPOINTS to wire:
  // GET /api/questionbanks -> populate #questionbank options
  // GET /api/phases        -> populate #phase options
  // GET /api/sources       -> populate #source options
  // GET /api/topics?query=... -> populate #moreTopics options (searchable)
  // POST /api/quizzes      -> submit payload to create a quiz
    // Prefer explicit id, fallback to text match
    let openBtn = document.getElementById('newQuizButton');
    if(!openBtn){
      openBtn = Array.from(document.querySelectorAll('button'))
        .find(btn => btn.textContent && btn.textContent.trim().toLowerCase() === 'new quiz');
    }

    if(!modal){
      console.error('[NewQuiz] Modal element #newQuizModal not found');
      return;
    }
    if(!openBtn){
      console.error('[NewQuiz] Open button not found');
      return;
    }

    const closeEls = modal.querySelectorAll('[data-close-modal]');

    function openModal(ev){
      if(ev) ev.preventDefault();
      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  document.body.classList.add('modal-open');
      console.log('[NewQuiz] Modal opened');
    }
    function closeModal(){
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  document.body.classList.remove('modal-open');
      console.log('[NewQuiz] Modal closed');
    }

    openBtn.addEventListener('click', openModal);
    closeEls.forEach(el => el.addEventListener('click', closeModal));

    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape') closeModal();
    });

  // Handle Create action: collect values and call backend
    const createBtn = document.getElementById('createQuizBtn');
    if(createBtn){
      createBtn.addEventListener('click', async (ev)=>{
        ev.preventDefault();
        const payload = {
          // TODO: replace chip parsing with real topic selection
          topicIds: [],
          questionbankId: document.getElementById('questionbank')?.value || '',
          phase: document.getElementById('phase')?.value || '',
          source: document.getElementById('source')?.value || '',
          count: Number(document.getElementById('count')?.value || 0)
        };

    console.log('[NewQuiz] Ready to POST (mock) createQuiz', payload);
        // Use MockApi when available; fallback to overlay only
        if (window.MockApi && typeof window.MockApi.createQuiz === 'function') {
          try {
            const { id } = await window.MockApi.createQuiz(payload);
            console.log('[NewQuiz] Mock create success id=', id);
            closeModal();
            const quizScreen = document.getElementById('quizScreen');
            if (quizScreen) {
              quizScreen.style.display = 'block';
              quizScreen.setAttribute('aria-hidden','false');
              const openBtn = document.getElementById('openQuizView');
              if (openBtn) {
                openBtn.onclick = () => {
                  window.location.href = `templates/quiz-sub.html?id=${encodeURIComponent(id)}`;
                };
              }
            }
          } catch (err) {
            console.error('[NewQuiz] Mock create failed', err);
            alert('Failed to create quiz (mock).');
          }
        } else {
          // Fallback overlay
          closeModal();
          const quizScreen = document.getElementById('quizScreen');
          if (quizScreen) {
            quizScreen.style.display = 'block';
            quizScreen.setAttribute('aria-hidden','false');
          }
        }
      });
    }

    // Quiz screen actions
    const closeQuizScreenBtn = document.getElementById('closeQuizScreen');
    closeQuizScreenBtn?.addEventListener('click', () => {
      const quizScreen = document.getElementById('quizScreen');
      if (quizScreen) {
        quizScreen.style.display = 'none';
        quizScreen.setAttribute('aria-hidden','true');
      }
    });
    const openQuizViewBtn = document.getElementById('openQuizView');
    openQuizViewBtn?.addEventListener('click', () => {
      // TODO: Navigate to your actual quiz page/route
      // Example: window.location.href = '/quizzes' or `/quizzes?id=${createdQuizId}`
      const quizScreen = document.getElementById('quizScreen');
      if (quizScreen) {
        quizScreen.style.display = 'none';
        quizScreen.setAttribute('aria-hidden','true');
      }
    });

  // Populate example selects using MockApi
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.MockApi) return;
    const qbSel = document.getElementById('questionbank');
    const phaseSel = document.getElementById('phase');
    const sourceSel = document.getElementById('source');
    const countSel = document.getElementById('count');
    // Using generic lists to populate if present
    window.MockApi.getTopics?.().then(list => {
      if (qbSel) list.forEach(t => { const o=document.createElement('option'); o.value=t; o.textContent=t; qbSel.appendChild(o); });
      if (sourceSel) list.forEach(t => { const o=document.createElement('option'); o.value=t; o.textContent=t; sourceSel.appendChild(o); });
    });
    window.MockApi.getDifficulties?.().then(list => {
      if (phaseSel) list.forEach(p => { const o=document.createElement('option'); o.value=p; o.textContent=p; phaseSel.appendChild(o); });
    });
    window.MockApi.getQuestionCounts?.().then(list => {
      if (countSel) list.forEach(c => { const o=document.createElement('option'); o.value=c; o.textContent=c; countSel.appendChild(o); });
    });
  });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
