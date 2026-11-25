let DATA = null;

fetch('books.json')
  .then(response => response.json())
  .then(json => { DATA = json; })
  .catch(error => console.error('Error loading books.json:', error));

const screens = document.querySelectorAll('.screen');
const quiz = document.getElementById('quiz');
const pick = name => (quiz.elements[name].value || '');
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

function show(id) {
    screens.forEach(s => s.hidden = (s.id !== id));
    document.getElementById('tagline').textContent = document.getElementById(id).dataset.tagline;
    document.querySelectorAll('.so-far').forEach(p => {
        p.textContent = 'Your story so far: ' + [pick('genre'), pick('era')].filter(Boolean).map(cap).join(' · ');
    });
    window.scrollTo(0, 0);
}

document.addEventListener('click', e => {
    const el = e.target.closest('[data-go]');
    if (!el) return;
    e.preventDefault();
    const go = el.dataset.go;
    if (go === 'welcome') { quiz.reset(); document.querySelectorAll('.next').forEach(b => b.disabled = true); }
    if (go === 'results') showResults();
    show(go);
});

quiz.addEventListener('change', e => {
    e.target.closest('.screen').querySelector('.next').disabled = false;
});

function showResults() {
    const box = document.getElementById('book');
    if (!DATA) { box.innerHTML = '<p>Books are still loading. Please try again.</p>'; return; }

    const era = new Set(DATA.era[pick('era')]);
    const det = new Set(DATA.detail[pick('detail')]);
    const matches = DATA.genre[pick('genre')].filter(t => era.has(t) && det.has(t));
    const t = matches[Math.floor(Math.random() * matches.length)];

    box.innerHTML = t
      ? `
        <article class="book">
          <div class="cover"><span>${t}</span><span>${DATA.books[t].author}</span></div>
          <h2>${t}</h2>
          <p class="author">by ${DATA.books[t].author}</p>
          <ul class="tags"><li>${cap(pick('genre'))}</li><li>${cap(pick('era'))}</li><li>${cap(pick('detail'))}</li></ul>
          <p class="synopsis">${DATA.books[t].synopsis}</p>
        </article>`
      : '<p>Book not found. Try changing one of your choices.</p>';
}

show('welcome');