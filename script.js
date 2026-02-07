const chips = Array.from(document.querySelectorAll('.chip'));
const search = document.getElementById('search');
const count = document.getElementById('game-count');
const gameGrid = document.getElementById('game-grid');

const baseGames = [
  {
    title: 'Snake Sprint',
    description: 'Classic snake gameplay with keyboard controls.',
    category: 'arcade',
    href: 'games/snake-sprint.html',
    cta: 'Play Now'
  },
  {
    title: 'Memory Flip',
    description: 'Match all pairs in this quick brain teaser.',
    category: 'puzzle',
    href: 'games/memory-flip.html',
    cta: 'Play Now'
  },
  {
    title: 'Speed Lane',
    description: 'Dodge traffic and keep your lane in this racer.',
    category: 'racing',
    href: 'https://www.crazygames.com/game/madalin-stunt-cars-2',
    cta: 'Play Free'
  },
  {
    title: 'Ninja Jump',
    description: 'Fast-paced jumping adventure with obstacles.',
    category: 'action',
    href: 'https://www.crazygames.com/game/stickman-hook',
    cta: 'Play Free'
  }
];

const generatedGames = [];
const categoryTemplates = [
  { category: 'arcade', prefix: 'Arcade Blast', desc: 'Quick reflex challenges and high-score arcade fun.' },
  { category: 'puzzle', prefix: 'Puzzle Quest', desc: 'Brainy levels, logic twists, and satisfying clears.' },
  { category: 'action', prefix: 'Action Strike', desc: 'Fast movement, timed jumps, and thrilling moments.' },
  { category: 'racing', prefix: 'Racing Rush', desc: 'Boost, drift, and weave through intense race tracks.' }
];

categoryTemplates.forEach((template) => {
  for (let i = 1; i <= 25; i += 1) {
    const title = `${template.prefix} ${i}`;
    generatedGames.push({
      title,
      description: template.desc,
      category: template.category,
      href: `https://www.crazygames.com/search?q=${encodeURIComponent(title)}`,
      cta: 'Play Free'
    });
  }
});

const games = [...baseGames, ...generatedGames];

function renderGames(items) {
  gameGrid.innerHTML = '';

  items.forEach((game, index) => {
    const card = document.createElement('article');
    card.className = 'game-card';
    card.dataset.category = game.category;
    card.dataset.title = game.title.toLowerCase();

    const thumb = document.createElement('div');
    thumb.className = `thumb gradient-${(index % 4) + 1}`;
    thumb.setAttribute('aria-hidden', 'true');

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h3');
    title.textContent = game.title;

    const description = document.createElement('p');
    description.textContent = game.description;

    const link = document.createElement('a');
    link.className = 'play-btn';
    link.href = game.href;
    link.textContent = game.cta;

    if (game.href.startsWith('http')) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }

    body.append(title, description, link);
    card.append(thumb, body);
    gameGrid.append(card);
  });
}

function updateCards() {
  const activeCategory = document.querySelector('.chip.active')?.dataset.category || 'all';
  const query = (search.value || '').trim().toLowerCase();

  const filtered = games.filter((game) => {
    const categoryMatch = activeCategory === 'all' || game.category === activeCategory;
    const textMatch = game.title.toLowerCase().includes(query);
    return categoryMatch && textMatch;
  });

  renderGames(filtered);
  count.textContent = `${filtered.length} game${filtered.length === 1 ? '' : 's'} found`;
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((item) => item.classList.remove('active'));
    chip.classList.add('active');
    updateCards();
  });
});

search.addEventListener('input', updateCards);
document.getElementById('year').textContent = new Date().getFullYear();
updateCards();
