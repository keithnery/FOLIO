
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

    const choices = [
        { label: pick('genre'),  list: DATA.genre[pick('genre')]   || [] },
        { label: pick('era'),    list: DATA.era[pick('era')]       || [] },
        { label: pick('detail'), list: DATA.detail[pick('detail')] || [] }
    ].map(c => ({ ...c, set: new Set(c.list) }));

    const titles = new Set(choices.flatMap(c => c.list));
    const score = t => choices.filter(c => c.set.has(t)).length;

    let pool = [...titles].filter(t => score(t) === 3);
    let partial = false;

    if (pool.length === 0) {
        pool = [...titles].filter(t => score(t) === 2);
        partial = true;
    }

    const t = pool[Math.floor(Math.random() * pool.length)];

    const matched = choices.filter(c => c.set.has(t));
    box.innerHTML = t
      ? `
        <article class="book">
          <div class="cover"><span>${t}</span><span>${DATA.books[t].author}</span></div>
          <div class="info">
            ${partial ? '<p class="notice">No book matches all three choices, but this one fits two of them.</p>' : ''}
            <h2>${t}</h2>
            <p class="author">by ${DATA.books[t].author}</p>
            <ul class="tags">
              ${matched.map(c => `<li>${cap(c.label)}</li>`).join('')}
            </ul>
            <p class="synopsis">${DATA.books[t].synopsis}</p>
          </div>
        </article>`
      : '<p>Book not found. Try changing one of your choices.</p>';
}

show('welcome');