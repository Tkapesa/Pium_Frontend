// Mock API simulating GET options and POST quiz creation, persisted in localStorage.
(function(){
  const KEY = 'pium.quizzes';
  const store = {
    getAll(){
      try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
    },
    saveAll(list){ localStorage.setItem(KEY, JSON.stringify(list)); },
  };

  const delay = (ms=250) => new Promise(res=>setTimeout(res, ms));

  const topics = [
    'Pigmentation Disorders',
    'Heart Anatomy and Physiology',
    'Brain Tumors',
    'Arboviruses',
    'Dermatology Basics',
  ];
  const difficulties = ['Easy','Medium','Hard'];
  const questionCounts = [5,10,15,20];

  async function getTopics(){ await delay(); return topics; }
  async function getDifficulties(){ await delay(); return difficulties; }
  async function getQuestionCounts(){ await delay(); return questionCounts; }

  async function createQuiz(payload){
    await delay();
    const list = store.getAll();
    const id = String(Date.now());
    const quiz = {
      id,
      title: payload.title || 'Untitled Quiz',
      topic: payload.topic || topics[0],
      difficulty: payload.difficulty || difficulties[0],
      count: payload.count || 5,
      createdAt: new Date().toISOString(),
      // Rich dummy questions resembling app layout
      questions: Array.from({length: payload.count || 5}, (_,i)=>{
        const qid = `${id}-q${i+1}`;
        const stem = 'During the cardiac cycle, coordinated contraction and relaxation of various heart chambers ensure efficient blood flow. Which of the following statements best describes the events that occur during ventricular systole?';
        const opts = [
          { key: 'A', text: 'The atria contract, pushing blood into the ventricles, and the semilunar valves remain closed.' },
          { key: 'B', text: 'The ventricles contract, causing the atrioventricular valves to close and the semilunar valves to open, allowing blood to be ejected into the aorta and pulmonary artery.' },
          { key: 'C', text: 'The ventricles relax, the semilunar valves close to prevent backflow, and blood passively fills the heart chambers.' },
          { key: 'D', text: 'Both the atria and ventricles contract simultaneously, resulting in the complete emptying of the heart chambers.' }
        ];
        return { id: qid, text: stem, options: opts, answer: 'B' };
      })
    };
    list.push(quiz);
    store.saveAll(list);
    return { id, quiz };
  }

  // Expose globally
  window.MockApi = { getTopics, getDifficulties, getQuestionCounts, createQuiz };
})();
