/* ══════════════════════════════════════════════════════════
   МОНЬКА — Финансовый помощник для детей
   app.js — главная логика приложения
   Данные хранятся в localStorage (без сервера)
══════════════════════════════════════════════════════════ */

// ─── КОНФИГ: уроки (можно легко добавлять новые объекты) ───────────────────
const LESSONS_CONFIG = [
  {
    id: "lesson_budget",
    emoji: "📦",
    title: "Что такое бюджет?",
    desc: "Учимся планировать деньги",
    reward: 10,
    unlockLevel: 1,
    content: `
      <p>Бюджет — это план: сколько денег придёт и сколько уйдёт. Как карта для путешествия! 🗺️</p>
      <p>Представь: тебе дали 50 монеток на неделю. Бюджет помогает решить, сколько потратить на мороженое, а сколько отложить на мечту.</p>
      <p><b>Правило трёх частей:</b><br>
      🍦 Трать — на удовольствия прямо сейчас<br>
      🏦 Копи — на большую мечту<br>
      🎁 Дари — на подарки близким</p>
      <div class="quiz">
        <div class="quiz-q">❓ Что такое бюджет?</div>
        <button class="quiz-opt" data-correct="false">Это кошелёк с деньгами</button>
        <button class="quiz-opt" data-correct="true">Это план доходов и расходов</button>
        <button class="quiz-opt" data-correct="false">Это много монеток сразу</button>
      </div>`,
  },
  {
    id: "lesson_save",
    emoji: "🐷",
    title: "Зачем копить?",
    desc: "Секрет большой мечты",
    reward: 10,
    unlockLevel: 1,
    content: `
      <p>Копить — это как строить башню из кубиков. Каждый день добавляешь по кубику, и скоро башня станет огромной! 🏰</p>
      <p>Если велосипед стоит 500 монеток, а ты откладываешь по 25 монеток каждую неделю — через 20 недель (5 месяцев) он твой!</p>
      <p><b>Лайфхак:</b> Как только получил деньги — сразу отложи часть в копилку. Не жди конца недели!</p>
      <div class="quiz">
        <div class="quiz-q">❓ У Саши 10 монеток в неделю. Через сколько недель у него будет 50 монеток?</div>
        <button class="quiz-opt" data-correct="false">10 недель</button>
        <button class="quiz-opt" data-correct="true">5 недель</button>
        <button class="quiz-opt" data-correct="false">50 недель</button>
      </div>`,
  },
  {
    id: "lesson_income_expense",
    emoji: "⚖️",
    title: "Доходы и расходы",
    desc: "Что приходит и что уходит",
    reward: 15,
    unlockLevel: 1,
    content: `
      <p><b>Доход</b> — это деньги, которые приходят к тебе. Карманные деньги, подарок на день рождения, награда за помощь по дому. 💚</p>
      <p><b>Расход</b> — это деньги, которые ты тратишь. Мороженое, игра, книга. 🔴</p>
      <p>Главное правило: <b>расходы не должны быть больше доходов!</b> Иначе монетки закончатся, и на мечту не хватит.</p>
      <p>Монька всегда следит, чтобы «Что ушло» было меньше «Что пришло». 🦉</p>
      <div class="quiz">
        <div class="quiz-q">❓ Маша получила 30 монеток и потратила 45. Это хорошо или плохо?</div>
        <button class="quiz-opt" data-correct="false">Хорошо, потратила много</button>
        <button class="quiz-opt" data-correct="true">Плохо, она потратила больше, чем получила</button>
        <button class="quiz-opt" data-correct="false">Нормально, главное купить</button>
      </div>`,
  },
  {
    id: "lesson_goals",
    emoji: "🎯",
    title: "Финансовые цели",
    desc: "Как исполнить мечту",
    reward: 15,
    unlockLevel: 2,
    content: `
      <p>Цель — это твоя мечта с числом и датой. Не просто «хочу велосипед», а «хочу велосипед за 500 монеток через 3 месяца»! 🚲</p>
      <p><b>Как поставить цель:</b><br>
      1️⃣ Выбери, что хочешь<br>
      2️⃣ Узнай, сколько стоит<br>
      3️⃣ Реши, сколько откладывать каждую неделю<br>
      4️⃣ Следи за копилкой!</p>
      <p>В приложении Монька можно добавить цель прямо сейчас! Попробуй 👇</p>
      <div class="quiz">
        <div class="quiz-q">❓ Велосипед стоит 300 монеток. Ты откладываешь по 30 монеток в неделю. Через сколько недель накопишь?</div>
        <button class="quiz-opt" data-correct="true">10 недель</button>
        <button class="quiz-opt" data-correct="false">30 недель</button>
        <button class="quiz-opt" data-correct="false">300 недель</button>
      </div>`,
  },
  {
    id: "lesson_wants_needs",
    emoji: "🤔",
    title: "Хочу vs Нужно",
    desc: "Умные покупки",
    reward: 20,
    unlockLevel: 3,
    content: `
      <p>Перед каждой покупкой задай себе вопрос: это <b>нужно</b> или <b>хочу</b>?</p>
      <p>🍎 <b>Нужно</b> — еда, одежда, учёба. Без этого не обойтись.<br>
      🎮 <b>Хочу</b> — игрушки, сладости, развлечения. Можно и без них, но хочется!</p>
      <p>Умный финансист сначала заботится о «нужно», а потом покупает «хочу».</p>
      <p>Иногда стоит <b>подождать 24 часа</b> перед покупкой «хочу» — бывает, желание проходит!</p>
      <div class="quiz">
        <div class="quiz-q">❓ Что из этого "нужно"?</div>
        <button class="quiz-opt" data-correct="false">Новая игра 🎮</button>
        <button class="quiz-opt" data-correct="true">Школьный рюкзак 🎒</button>
        <button class="quiz-opt" data-correct="false">Шоколадка 🍫</button>
      </div>`,
  },
  {
    id: "lesson_invest",
    emoji: "🌱",
    title: "Деньги растут!",
    desc: "Как работают инвестиции",
    reward: 25,
    unlockLevel: 4,
    content: `
      <p>Представь: ты посадил зёрнышко. Через год из него выросло дерево, которое даёт плоды каждый год! 🌳</p>
      <p>Деньги тоже могут «расти»! Когда взрослые кладут деньги в банк, банк платит проценты — это как плоды от дерева.</p>
      <p><b>Пример:</b> Положил 100 монеток. Через год — уже 105 монеток (5% годовых). Без усилий!</p>
      <p>Монька мечтает, что когда ты вырастешь, твои монетки будут работать за тебя. 🦉✨</p>
      <div class="quiz">
        <div class="quiz-q">❓ Ты положил 200 монеток в банк под 10% годовых. Сколько будет через год?</div>
        <button class="quiz-opt" data-correct="false">200 монеток</button>
        <button class="quiz-opt" data-correct="true">220 монеток</button>
        <button class="quiz-opt" data-correct="false">210 монеток</button>
      </div>`,
  },
];

// ─── КОНФИГ: категории транзакций ─────────────────────────────────────────
const CATEGORIES = {
  income: [
    { key: "pocket",  label: "🎒 Карманные" },
    { key: "gift",    label: "🎁 Подарок" },
    { key: "task",    label: "✅ За задание" },
    { key: "found",   label: "🔍 Нашёл" },
    { key: "other_i", label: "💚 Другое" },
  ],
  expense: [
    { key: "food",     label: "🍦 Еда" },
    { key: "toys",     label: "🧸 Игрушки" },
    { key: "game",     label: "🎮 Игры" },
    { key: "gift_e",   label: "🎁 Подарок" },
    { key: "save",     label: "🐷 Накопление" },
    { key: "other_e",  label: "🔴 Другое" },
  ],
};

// ─── КОНФИГ: ачивки ────────────────────────────────────────────────────────
const ACHIVS = [
  { id: "first_coin",   ico: "🪙", label: "Первая монетка", condition: (s) => s.transactions.length >= 1 },
  { id: "saver_10",     ico: "💰", label: "Накоплено 10+",  condition: (s) => s.balance >= 10 },
  { id: "lesson_1",     ico: "📚", label: "Первый урок",    condition: (s) => s.completedLessons.length >= 1 },
  { id: "goal_set",     ico: "🎯", label: "Первая цель",    condition: (s) => s.goals.length >= 1 },
  { id: "saver_100",    ico: "💎", label: "Сотня монет!",   condition: (s) => s.balance >= 100 },
  { id: "tx_10",        ico: "📝", label: "10 записей",     condition: (s) => s.transactions.length >= 10 },
  { id: "all_lessons",  ico: "🏆", label: "Все уроки!",     condition: (s) => s.completedLessons.length >= LESSONS_CONFIG.length },
];

// ─── КОНФИГ: советы Моньки (аналитика) ────────────────────────────────────
const TIPS = [
  "Если откладывать хотя бы 10% от карманных денег — за год соберётся целый клад! 🪙",
  "Следи, на что тратишь больше всего. Может, можно сократить? 🤔",
  "Запись каждой монетки помогает видеть всю картину! Не ленись. 📝",
  "Поставь цель на этой неделе и иди к ней! 🚀",
  "Умный совёнок говорит: копи сначала, трать потом! 🦉",
  "Сравни доходы и расходы — доходы должны побеждать! 💪",
];

// ─── УРОВНЕВАЯ СИСТЕМА ────────────────────────────────────────────────────
const LEVELS = [
  { level: 1, name: "Монетный гном",    minXP: 0 },
  { level: 2, name: "Копилкин",         minXP: 50 },
  { level: 3, name: "Финансёнок",       minXP: 120 },
  { level: 4, name: "Счётный мастер",   minXP: 250 },
  { level: 5, name: "Звёздный банкир",  minXP: 450 },
  { level: 6, name: "Монетный рыцарь",  minXP: 700 },
  { level: 7, name: "Золотой орёл",     minXP: 1000 },
  { level: 8, name: "Легенда копилок",  minXP: 1400 },
  { level: 9, name: "Монека Мастер",    minXP: 1900 },
  { level: 10, name: "Великий Финансик", minXP: 2500 },
];

// ─── РЕЧИ СОВЁНКА ──────────────────────────────────────────────────────────
const OWL_PHRASES = [
  "Копи мудро! 🦉",
  "Ты молодец! ⭐",
  "Отложи немного! 💰",
  "Следи за целью! 🎯",
  "Учись финансам! 📚",
  "Монетки любят счёт! 🪙",
];

// ══════════════════════════════════════════════════════════
//   ХРАНИЛИЩЕ ДАННЫХ (localStorage)
// ══════════════════════════════════════════════════════════

function loadState() {
  try {
    const raw = localStorage.getItem("monka_state");
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  // Начальное состояние для нового пользователя
  return {
    childName: "Алёша",
    balance: 0,
    xp: 0,
    transactions: [],       // { id, type, amount, category, note, date }
    goals: [],              // { id, name, emoji, target, saved }
    completedLessons: [],   // [lessonId, ...]
    completedTasks: [],     // [taskId+date, ...]
    dailyTasksDate: null,
    lastRewardTs: 0,
  };
}

function saveState() {
  localStorage.setItem("monka_state", JSON.stringify(state));
}

let state = loadState();

// ══════════════════════════════════════════════════════════
//   НАВИГАЦИЯ
// ══════════════════════════════════════════════════════════

let currentScreen = "home";
let currentMoneyTab = "income"; // текущий таб на экране деньги
let selectedCategory = "";
let selectedGoalEmoji = "🚲";
let currentLessonId = null;

function switchScreen(screen) {
  // Убираем активный класс у всех экранов и кнопок таббара
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

  // Активируем нужный экран
  const el = document.getElementById(`screen-${screen}`);
  if (el) el.classList.add("active");

  // Активируем таб
  const tab = document.querySelector(`[data-screen="${screen}"]`);
  if (tab) tab.classList.add("active");

  currentScreen = screen;

  // Рендеримся для нужного экрана
  if (screen === "home")    renderHome();
  if (screen === "money")   renderMoney();
  if (screen === "goals")   renderGoals();
  if (screen === "lessons") renderLessons();
  if (screen === "stats")   renderStats();

  // Специальный переход на таб дохода/расхода
  if (screen === "income")  { switchScreen("money"); setMoneyTab("income"); }
  if (screen === "expense") { switchScreen("money"); setMoneyTab("expense"); }
}

function setMoneyTab(tab) {
  currentMoneyTab = tab;
  document.getElementById("tab-income").classList.toggle("active", tab === "income");
  document.getElementById("tab-expense").classList.toggle("active", tab === "expense");
  document.getElementById("add-money-label").textContent =
    tab === "income" ? "+ Добавить доход" : "+ Записать расход";
  renderCategoryChips();
  renderTransactionsList();
}

// ══════════════════════════════════════════════════════════
//   ГЛАВНАЯ СТРАНИЦА
// ══════════════════════════════════════════════════════════

function renderHome() {
  // Баланс
  document.getElementById("balance-display").textContent = state.balance;
  // Имя
  document.getElementById("child-name").textContent = state.childName + "! 👋";

  // Уровень
  const lvlInfo = getCurrentLevel();
  document.getElementById("current-level").textContent = lvlInfo.level;
  const nextLvl = LEVELS[lvlInfo.level] || LEVELS[LEVELS.length - 1];
  const progress = lvlInfo.level >= LEVELS.length
    ? 100
    : ((state.xp - lvlInfo.minXP) / (nextLvl.minXP - lvlInfo.minXP)) * 100;
  document.getElementById("level-fill").style.width = Math.min(progress, 100) + "%";
  document.getElementById("level-next-txt").textContent =
    lvlInfo.level >= LEVELS.length ? "Макс. уровень! 🏆" : `до ур. ${lvlInfo.level + 1}`;

  // Речь совёнка
  const phrase = OWL_PHRASES[Math.floor(Math.random() * OWL_PHRASES.length)];
  document.getElementById("mascot-speech").textContent = phrase;

  // Последние 4 операции
  const container = document.getElementById("home-transactions");
  const recent = [...state.transactions].reverse().slice(0, 4);
  if (recent.length === 0) {
    container.innerHTML = `<div class="empty-state">Пока тихо... Добавь первую монетку! 🪙</div>`;
  } else {
    container.innerHTML = recent.map(tx => renderTxItem(tx)).join("");
  }

  // Ачивки
  renderAchivs();
}

function renderAchivs() {
  const container = document.getElementById("achivs-row");
  container.innerHTML = ACHIVS.map(a => {
    const earned = a.condition(state);
    return `<div class="achiv-badge ${earned ? "earned" : "locked"}" title="${a.label}">
      <span class="achiv-ico">${a.ico}</span>
      <span class="achiv-lbl">${a.label}</span>
    </div>`;
  }).join("");
}

// ══════════════════════════════════════════════════════════
//   ЭКРАН ДЕНЕГ
// ══════════════════════════════════════════════════════════

function renderMoney() {
  renderCategoryChips();
  renderTransactionsList();
  document.getElementById("add-money-label").textContent =
    currentMoneyTab === "income" ? "+ Добавить доход" : "+ Записать расход";
}

function renderCategoryChips() {
  const cats = CATEGORIES[currentMoneyTab];
  const container = document.getElementById("category-chips");
  container.innerHTML = cats.map(c => `
    <button class="chip ${selectedCategory === c.key ? "selected" : ""}"
      onclick="selectCategory('${c.key}')">${c.label}</button>
  `).join("");
}

function selectCategory(key) {
  selectedCategory = key;
  renderCategoryChips();
}

function addTransaction() {
  const amountInput = document.getElementById("money-amount");
  const noteInput = document.getElementById("money-note");
  const amount = parseInt(amountInput.value, 10);

  if (!amount || amount <= 0) {
    shakeElement(amountInput);
    return;
  }
  if (!selectedCategory) {
    const chips = document.getElementById("category-chips");
    shakeElement(chips);
    return;
  }

  const tx = {
    id: Date.now(),
    type: currentMoneyTab,
    amount,
    category: selectedCategory,
    note: noteInput.value.trim() || (currentMoneyTab === "income" ? "Доход" : "Расход"),
    date: new Date().toLocaleDateString("ru-RU"),
  };

  state.transactions.push(tx);

  // Меняем баланс
  if (tx.type === "income") {
    state.balance += amount;
    state.xp += Math.ceil(amount * 0.5);
  } else {
    state.balance = Math.max(0, state.balance - amount);
    state.xp += 2; // за любую запись
  }

  saveState();

  // Анимация монетки
  spawnFlyingCoin(document.getElementById("add-money-btn"));
  showReward(`${tx.type === "income" ? "+" : "-"}${amount} 🪙`);

  // Сброс формы
  amountInput.value = "";
  noteInput.value = "";
  selectedCategory = "";
  renderCategoryChips();
  renderTransactionsList();
  checkDailyTasks();
}

function renderTransactionsList() {
  const container = document.getElementById("transactions-list");
  const filtered = [...state.transactions]
    .filter(tx => tx.type === currentMoneyTab)
    .reverse();

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state">Записей пока нет. Добавь первую! ✏️</div>`;
  } else {
    container.innerHTML = filtered.map(tx => renderTxItem(tx, true)).join("");
  }
}

function renderTxItem(tx, withDelete = false) {
  const cats = [...CATEGORIES.income, ...CATEGORIES.expense];
  const cat = cats.find(c => c.key === tx.category) || { label: "🪙" };
  const sign = tx.type === "income" ? "+" : "-";
  const cls = tx.type === "income" ? "income" : "expense";
  const icoCls = tx.type === "income" ? "tx-income-ico" : "tx-expense-ico";

  return `<div class="tx-item">
    <div class="tx-cat-ico ${icoCls}">${cat.label.split(" ")[0]}</div>
    <div class="tx-info">
      <div class="tx-note">${escHtml(tx.note)}</div>
      <div class="tx-date">${cat.label} · ${tx.date}</div>
    </div>
    <div class="tx-amount ${cls}">${sign}${tx.amount} 🪙</div>
    ${withDelete ? `<button class="tx-delete" onclick="deleteTransaction(${tx.id})">✕</button>` : ""}
  </div>`;
}

function deleteTransaction(id) {
  const tx = state.transactions.find(t => t.id === id);
  if (!tx) return;
  state.transactions = state.transactions.filter(t => t.id !== id);
  if (tx.type === "income") state.balance = Math.max(0, state.balance - tx.amount);
  else state.balance += tx.amount;
  saveState();
  renderTransactionsList();
}

// ══════════════════════════════════════════════════════════
//   ЭКРАН ЦЕЛЕЙ
// ══════════════════════════════════════════════════════════

const GOAL_EMOJIS = ["🚲", "🎮", "📱", "🤖", "🎒", "🎨", "⚽", "🎵", "📚", "🍕", "✈️", "🌟"];

function renderGoals() {
  // Эмодзи-пикер
  const picker = document.getElementById("goal-emoji-picker");
  picker.innerHTML = GOAL_EMOJIS.map(e => `
    <button class="emoji-opt ${selectedGoalEmoji === e ? "selected" : ""}"
      onclick="selectGoalEmoji('${e}')">${e}</button>
  `).join("");

  // Список целей
  const container = document.getElementById("goals-list");
  if (state.goals.length === 0) {
    container.innerHTML = `<div class="empty-state">У тебя пока нет целей. Поставь первую! 🌈</div>`;
    return;
  }

  container.innerHTML = state.goals.map(g => {
    const pct = Math.min((g.saved / g.target) * 100, 100);
    const done = g.saved >= g.target;
    return `
    <div class="goal-card ${done ? "goal-complete" : ""}">
      <div class="goal-header">
        <span class="goal-emoji">${g.emoji}</span>
        <div class="goal-info">
          <div class="goal-name">${escHtml(g.name)}</div>
          <div class="goal-progress-txt">${g.saved} из ${g.target} 🪙${done ? "" : ` · ещё ${g.target - g.saved}`}</div>
          ${done ? `<span class="goal-complete-badge">✅ Цель достигнута!</span>` : ""}
        </div>
      </div>
      <div class="goal-bar">
        <div class="goal-fill" style="width:${pct}%"></div>
      </div>
      <div class="goal-actions">
        ${!done ? `<button class="goal-add-btn" onclick="addToGoal(${g.id})">💰 Добавить монетку в копилку</button>` : ""}
        <button class="goal-delete-btn" onclick="deleteGoal(${g.id})">🗑️</button>
      </div>
    </div>`;
  }).join("");
}

function selectGoalEmoji(e) {
  selectedGoalEmoji = e;
  renderGoals();
}

function addGoal() {
  const name = document.getElementById("goal-name").value.trim();
  const target = parseInt(document.getElementById("goal-target").value, 10);

  if (!name) { shakeElement(document.getElementById("goal-name")); return; }
  if (!target || target <= 0) { shakeElement(document.getElementById("goal-target")); return; }

  state.goals.push({ id: Date.now(), name, emoji: selectedGoalEmoji, target, saved: 0 });
  state.xp += 5;
  saveState();

  document.getElementById("goal-name").value = "";
  document.getElementById("goal-target").value = "";
  showReward("Цель поставлена! 🎯");
  renderGoals();
  checkDailyTasks();
}

function addToGoal(goalId) {
  const goal = state.goals.find(g => g.id === goalId);
  if (!goal) return;

  // Добавляем 1 монетку из баланса
  if (state.balance <= 0) {
    showReward("Монеток нет! Сначала добавь доход 💚");
    return;
  }

  goal.saved += 1;
  state.balance -= 1;
  state.xp += 1;
  saveState();

  spawnFlyingCoin(document.querySelector(".goal-add-btn"));
  renderGoals();
}

function deleteGoal(goalId) {
  state.goals = state.goals.filter(g => g.id !== goalId);
  saveState();
  renderGoals();
}

// ══════════════════════════════════════════════════════════
//   ЭКРАН УРОКОВ
// ══════════════════════════════════════════════════════════

// Генерируем ежедневные задания (сбрасываются каждый день)
function getDailyTasks() {
  const today = new Date().toDateString();
  if (state.dailyTasksDate !== today) {
    state.dailyTasksDate = today;
    state.completedTasks = state.completedTasks.filter(id => !id.startsWith("daily_"));
    saveState();
  }

  return [
    {
      id: `daily_income_${today}`,
      ico: "💚",
      text: "Запиши хотя бы один доход",
      reward: 5,
      check: () => state.transactions.some(t => t.type === "income" && t.date === new Date().toLocaleDateString("ru-RU")),
    },
    {
      id: `daily_expense_${today}`,
      ico: "📝",
      text: "Запиши хотя бы один расход",
      reward: 5,
      check: () => state.transactions.some(t => t.type === "expense" && t.date === new Date().toLocaleDateString("ru-RU")),
    },
    {
      id: `daily_goal_${today}`,
      ico: "🎯",
      text: "Добавь монетку в копилку к цели",
      reward: 5,
      check: () => state.goals.some(g => g.saved > 0),
    },
    {
      id: `daily_lesson_${today}`,
      ico: "📚",
      text: "Пройди один урок сегодня",
      reward: 10,
      check: () => {
        const todayKey = `lesson_today_${today}`;
        return state.completedTasks.includes(todayKey);
      },
    },
  ];
}

function checkDailyTasks() {
  // Авто-завершение заданий при выполнении условий
  getDailyTasks().forEach(task => {
    if (!state.completedTasks.includes(task.id) && task.check()) {
      state.completedTasks.push(task.id);
      state.xp += task.reward;
      saveState();
    }
  });
  if (currentScreen === "lessons") renderLessons();
}

function renderLessons() {
  // Ежедневные задания
  const tasks = getDailyTasks();
  const tasksContainer = document.getElementById("daily-tasks");
  tasksContainer.innerHTML = tasks.map(task => {
    const done = state.completedTasks.includes(task.id) || task.check();
    return `<div class="task-item ${done ? "done" : ""}">
      <span class="task-ico">${task.ico}</span>
      <span class="task-text">${task.text}</span>
      <span class="task-reward">+${task.reward} 🪙</span>
      <span class="task-check">${done ? "✅" : "⭕"}</span>
    </div>`;
  }).join("");

  // Уроки
  const lvl = getCurrentLevel().level;
  const lessonsContainer = document.getElementById("lessons-list");
  lessonsContainer.innerHTML = LESSONS_CONFIG.map(lesson => {
    const done = state.completedLessons.includes(lesson.id);
    const locked = lesson.unlockLevel > lvl;

    return `<div class="lesson-card ${done ? "completed" : ""} ${locked ? "locked" : ""}"
      onclick="${locked ? "" : `openLesson('${lesson.id}')`}">
      <span class="lesson-ico">${lesson.emoji}</span>
      <div class="lesson-info">
        <div class="lesson-title">${lesson.title}</div>
        <div class="lesson-desc">${lesson.desc}${locked ? ` · 🔒 Уровень ${lesson.unlockLevel}` : ""}</div>
        ${done ? `<div class="lesson-stars">✅ Пройдено!</div>` : ""}
      </div>
      <span class="lesson-reward">${done ? "✨" : "+" + lesson.reward} 🪙</span>
    </div>`;
  }).join("");
}

function openLesson(lessonId) {
  const lesson = LESSONS_CONFIG.find(l => l.id === lessonId);
  if (!lesson) return;
  currentLessonId = lessonId;

  document.getElementById("modal-emoji").textContent = lesson.emoji;
  document.getElementById("modal-title").textContent = lesson.title;
  document.getElementById("modal-body").innerHTML = lesson.content;
  document.getElementById("modal-complete-btn").style.display =
    state.completedLessons.includes(lessonId) ? "none" : "block";

  // Навешиваем слушатели на квиз
  document.querySelectorAll(".quiz-opt").forEach(btn => {
    btn.addEventListener("click", function() {
      const correct = this.dataset.correct === "true";
      document.querySelectorAll(".quiz-opt").forEach(b => {
        b.classList.remove("correct", "wrong");
        b.disabled = true;
      });
      this.classList.add(correct ? "correct" : "wrong");
      if (!correct) {
        document.querySelectorAll(".quiz-opt").forEach(b => {
          if (b.dataset.correct === "true") b.classList.add("correct");
        });
      }
    });
  });

  document.getElementById("lesson-modal").classList.add("open");
}

function closeLessonModal(e) {
  if (e && e.target !== document.getElementById("lesson-modal") && !e.currentTarget.classList.contains("modal-close")) return;
  document.getElementById("lesson-modal").classList.remove("open");
  currentLessonId = null;
}

function completeLesson() {
  if (!currentLessonId) return;
  const lesson = LESSONS_CONFIG.find(l => l.id === currentLessonId);
  if (!lesson) return;

  if (!state.completedLessons.includes(currentLessonId)) {
    state.completedLessons.push(currentLessonId);
    state.balance += lesson.reward;
    state.xp += lesson.reward * 2;
    saveState();
    showReward(`+${lesson.reward} 🪙 за урок!`);
    spawnFlyingCoin(document.getElementById("modal-complete-btn"));

    // Засчитываем ежедневное задание
    const todayKey = `lesson_today_${new Date().toDateString()}`;
    if (!state.completedTasks.includes(todayKey)) {
      state.completedTasks.push(todayKey);
      state.xp += 10;
      saveState();
    }
  }

  document.getElementById("lesson-modal").classList.remove("open");
  renderLessons();
  checkDailyTasks();
}

// ══════════════════════════════════════════════════════════
//   ЭКРАН АНАЛИТИКИ
// ══════════════════════════════════════════════════════════

function renderStats() {
  // Сводка за всё время (упрощённо)
  const totalIncome  = state.transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = state.transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);

  document.getElementById("week-income").textContent = totalIncome;
  document.getElementById("week-expense").textContent = totalExpense;
  document.getElementById("week-balance").textContent = state.balance;

  // Совет
  const tip = TIPS[Math.floor(Math.random() * TIPS.length)];
  document.getElementById("tip-text").textContent = tip;

  drawDonutChart();
  drawBarChart();
}

// ─── Пончиковая диаграмма расходов по категориям ──────────────────────────
function drawDonutChart() {
  const canvas = document.getElementById("donut-chart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const expenses = state.transactions.filter(t => t.type === "expense");

  // Группируем по категории
  const grouped = {};
  CATEGORIES.expense.forEach(c => { grouped[c.key] = 0; });
  expenses.forEach(t => { if (grouped[t.category] !== undefined) grouped[t.category] += t.amount; });

  const catColors = {
    food:    "#F97316",
    toys:    "#A855F7",
    game:    "#0EA5E9",
    gift_e:  "#EC4899",
    save:    "#22C55E",
    other_e: "#94A3B8",
  };

  const data = CATEGORIES.expense.map(c => ({ key: c.key, label: c.label, val: grouped[c.key], color: catColors[c.key] }))
    .filter(d => d.val > 0);
  const total = data.reduce((s, d) => s + d.val, 0);

  const legend = document.getElementById("donut-legend");

  if (total === 0) {
    ctx.fillStyle = "#33266A";
    ctx.beginPath();
    ctx.arc(110, 110, 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#B8A8E0";
    ctx.font = "bold 14px Nunito";
    ctx.textAlign = "center";
    ctx.fillText("Нет данных", 110, 115);
    legend.innerHTML = "";
    return;
  }

  let startAngle = -Math.PI / 2;
  const cx = 110, cy = 110, outerR = 90, innerR = 52;

  data.forEach(d => {
    const slice = (d.val / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, outerR, startAngle, startAngle + slice);
    ctx.closePath();
    ctx.fillStyle = d.color;
    ctx.fill();
    startAngle += slice;
  });

  // Отверстие
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.fillStyle = "#2A1D55";
  ctx.fill();

  // Текст в центре
  ctx.fillStyle = "#F0EAFF";
  ctx.font = "bold 20px Fredoka One";
  ctx.textAlign = "center";
  ctx.fillText(total + " 🪙", cx, cy + 7);

  // Легенда
  legend.innerHTML = data.map(d => `
    <div class="legend-item">
      <span class="legend-dot" style="background:${d.color}"></span>
      ${d.label.split(" ").slice(1).join(" ")}: ${d.val}
    </div>`).join("");
}

// ─── Столбчатая диаграмма по последним 7 дням ─────────────────────────────
function drawBarChart() {
  const canvas = document.getElementById("bar-chart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Последние 7 дней
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toLocaleDateString("ru-RU"));
  }

  const incByDay  = days.map(d => state.transactions.filter(t => t.type === "income"  && t.date === d).reduce((s, t) => s + t.amount, 0));
  const expByDay  = days.map(d => state.transactions.filter(t => t.type === "expense" && t.date === d).reduce((s, t) => s + t.amount, 0));
  const maxVal    = Math.max(...incByDay, ...expByDay, 1);

  const W = canvas.width;
  const H = canvas.height;
  const pad = 14;
  const barW  = 18;
  const gap   = 8;
  const step  = (W - pad * 2) / 7;

  days.forEach((d, i) => {
    const x = pad + step * i + step / 2;
    const iH = (incByDay[i] / maxVal) * (H - 30);
    const eH = (expByDay[i] / maxVal) * (H - 30);

    // Доход
    if (iH > 0) {
      ctx.fillStyle = "#22C55E";
      ctx.beginPath();
      ctx.roundRect(x - barW - 2, H - 20 - iH, barW, iH, 4);
      ctx.fill();
    }

    // Расход
    if (eH > 0) {
      ctx.fillStyle = "#EF4444";
      ctx.beginPath();
      ctx.roundRect(x + 2, H - 20 - eH, barW, eH, 4);
      ctx.fill();
    }

    // Подпись дня
    const dayName = ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"][(new Date(d.split(".").reverse().join("-"))).getDay()];
    ctx.fillStyle = "#B8A8E0";
    ctx.font = "11px Nunito";
    ctx.textAlign = "center";
    ctx.fillText(dayName, x + (barW) / 2, H - 4);
  });
}

// ══════════════════════════════════════════════════════════
//   УТИЛИТЫ
// ══════════════════════════════════════════════════════════

function getCurrentLevel() {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (state.xp >= lvl.minXP) current = lvl;
  }
  return current;
}

function showReward(text) {
  const popup = document.getElementById("reward-popup");
  document.getElementById("reward-coins").textContent = "🪙✨🪙";
  document.getElementById("reward-text").textContent = text;
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 1800);
}

function spawnFlyingCoin(anchorEl) {
  if (!anchorEl) return;
  const rect = anchorEl.getBoundingClientRect();
  for (let i = 0; i < 4; i++) {
    const coin = document.createElement("span");
    coin.className = "flying-coin";
    coin.textContent = ["🪙", "⭐", "✨"][Math.floor(Math.random() * 3)];
    coin.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 60) + "px";
    coin.style.top  = (rect.top + rect.height / 2) + "px";
    coin.style.animationDelay = (i * 80) + "ms";
    document.body.appendChild(coin);
    setTimeout(() => coin.remove(), 1000);
  }
}

function shakeElement(el) {
  el.style.animation = "none";
  el.style.border = "2px solid #EF4444";
  setTimeout(() => {
    el.style.border = "";
  }, 800);
}

function escHtml(str) {
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

// Клик по совёнку — случайная фраза
document.addEventListener("DOMContentLoaded", () => {
  const mascot = document.getElementById("mascot-home");
  if (mascot) {
    mascot.addEventListener("click", () => {
      const speech = document.getElementById("mascot-speech");
      speech.textContent = OWL_PHRASES[Math.floor(Math.random() * OWL_PHRASES.length)];
      speech.style.animation = "none";
      void speech.offsetWidth;
      speech.style.animation = "speechPop 0.4s ease";
    });
  }

  // Инициализация начального рендера
  renderHome();
  selectedCategory = CATEGORIES.income[0].key;
  selectedGoalEmoji = GOAL_EMOJIS[0];
});
