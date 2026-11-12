(() => {
  'use strict';

  const STORAGE_KEY = 'huddle-local-chat-v1';
  const channelInfo = {
    general: { description: 'A little corner for everything.' },
    design: { description: 'Ideas, details, and the joy of getting it just right.' },
    product: { description: 'Making useful things, one thoughtful step at a time.' },
    'weekend-plans': { description: 'A low-stakes place for high-quality weekend ideas.' }
  };
  const people = {
    Maya: { initials: 'M', color: '#f3ded0', ink: '#87543b' },
    Theo: { initials: 'T', color: '#dbe5fc', ink: '#45619a' },
    Jules: { initials: 'J', color: '#f4e2b9', ink: '#826528' },
    You: { initials: 'Y', color: '#c7f2df', ink: '#1c634f' }
  };

  const minutesAgo = (minutes) => new Date(Date.now() - minutes * 60_000).toISOString();
  const makeDefaults = () => ({
    general: [
      { author: 'Maya', text: 'Morning, team! Hope everyone had a lovely start to the week.', time: minutesAgo(122) },
      { author: 'Theo', text: 'Good morning! I finally found that tiny coffee place on the corner. Strong recommendation if you are nearby.', time: minutesAgo(111) },
      { author: 'Jules', text: 'Added it to my list. Also, the light in the studio is particularly good today ☀️', time: minutesAgo(96) }
    ],
    design: [
      { author: 'Jules', text: 'Been exploring a calmer color palette for the next concept. Thinking warm neutrals with a little green.', time: minutesAgo(218) },
      { author: 'Maya', text: 'That sounds lovely. A softer contrast could make the whole experience feel more welcoming.', time: minutesAgo(201) }
    ],
    product: [
      { author: 'Theo', text: 'Small product thought: what if the first step felt more like an invitation than a checklist?', time: minutesAgo(347) },
      { author: 'Jules', text: 'Yes to that. We can keep the useful structure but make the language feel more human.', time: minutesAgo(326) }
    ],
    'weekend-plans': [
      { author: 'Maya', text: 'Any good low-key plans for the weekend? I am in the mood for a long walk and something warm to eat.', time: minutesAgo(476) },
      { author: 'Theo', text: 'There is a nice trail by the water. No rush, good views, and a bakery nearby. A very solid combination.', time: minutesAgo(451) }
    ]
  });

  const list = document.getElementById('message-list');
  const channelTitle = document.getElementById('channel-title');
  const channelDescription = document.getElementById('channel-description');
  const textarea = document.getElementById('message-input');
  const form = document.getElementById('message-form');
  const sendButton = document.getElementById('send-button');
  const charCount = document.getElementById('character-count');
  const toast = document.getElementById('toast');
  const resetButton = document.getElementById('reset-button');
  const sidebar = document.getElementById('sidebar');
  const scrim = document.getElementById('sidebar-scrim');
  const mobileQuery = window.matchMedia('(max-width: 760px)');
  let activeChannel = 'general';
  let toastTimer;

  function isValidData(value) {
    return value && typeof value === 'object' && Object.keys(channelInfo).every((channel) =>
      Array.isArray(value[channel]) && value[channel].every((item) =>
        item && typeof item.author === 'string' && typeof item.text === 'string' && typeof item.time === 'string'
      )
    );
  }

  let shouldSeedStorage = false;

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      return true;
    } catch (error) {
      showToast('Browser storage is unavailable. This message may not remain after closing the page.');
      return false;
    }
  }

  function loadMessages() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (isValidData(parsed)) return parsed;
      }
      shouldSeedStorage = true;
    } catch (error) {
      // Fall back to fresh sample conversation when browser storage is blocked or invalid.
    }
    return makeDefaults();
  }

  let messages = loadMessages();

  function showToast(text) {
    toast.textContent = text;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3000);
  }

  function formatTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'just now';
    return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(date);
  }

  function addDayDivider() {
    const divider = document.createElement('div');
    divider.className = 'day-divider';
    divider.textContent = 'Today · sample history';
    list.append(divider);
  }

  function renderMessages() {
    list.replaceChildren();
    addDayDivider();
    for (const item of messages[activeChannel]) {
      const isOwn = item.author === 'You';
      const person = people[item.author] || { initials: item.author.slice(0, 1).toUpperCase(), color: '#e5e8e7', ink: '#455451' };
      const article = document.createElement('article');
      article.className = `message${isOwn ? ' is-own' : ''}`;

      const avatar = document.createElement('div');
      avatar.className = 'avatar message-avatar';
      avatar.setAttribute('aria-hidden', 'true');
      avatar.textContent = person.initials;
      avatar.style.background = person.color;
      avatar.style.color = person.ink;

      const content = document.createElement('div');
      content.className = 'message-content';
      const heading = document.createElement('div');
      heading.className = 'message-heading';
      const author = document.createElement('span');
      author.className = 'message-author';
      author.textContent = item.author;
      const time = document.createElement('time');
      time.className = 'message-time';
      time.dateTime = item.time;
      time.textContent = formatTime(item.time);
      const text = document.createElement('p');
      text.className = 'message-text';
      text.textContent = item.text;

      heading.append(author, time);
      content.append(heading, text);
      article.append(avatar, content);
      list.append(article);
    }
    list.scrollTop = list.scrollHeight;
  }

  function selectChannel(channel) {
    if (!Object.hasOwn(channelInfo, channel)) return;
    activeChannel = channel;
    document.querySelectorAll('.channel-button').forEach((button) => {
      const selected = button.dataset.channel === channel;
      button.classList.toggle('is-active', selected);
      if (selected) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    channelTitle.textContent = channel;
    channelDescription.textContent = channelInfo[channel].description;
    textarea.placeholder = `Message #${channel}`;
    renderMessages();
    closeSidebar();
  }

  function updateComposer() {
    const value = textarea.value;
    charCount.textContent = `${value.length} / 2000`;
    sendButton.disabled = value.trim().length === 0;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  }

  function closeSidebar() {
    document.body.classList.remove('nav-open');
    document.getElementById('open-sidebar').setAttribute('aria-expanded', 'false');
    scrim.hidden = true;
  }

  function openSidebar() {
    if (!mobileQuery.matches) return;
    document.body.classList.add('nav-open');
    document.getElementById('open-sidebar').setAttribute('aria-expanded', 'true');
    scrim.hidden = false;
    document.getElementById('close-sidebar').focus();
  }

  document.getElementById('channel-list').addEventListener('click', (event) => {
    const button = event.target.closest('[data-channel]');
    if (button) selectChannel(button.dataset.channel);
  });

  textarea.addEventListener('input', updateComposer);
  textarea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      if (textarea.value.trim()) form.requestSubmit();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = textarea.value.trim();
    if (!text) return;
    messages[activeChannel].push({ author: 'You', text, time: new Date().toISOString() });
    persist();
    renderMessages();
    textarea.value = '';
    updateComposer();
    textarea.focus();
    showToast('Saved in this browser only. No one else received this message.');
  });

  resetButton.addEventListener('click', () => {
    const confirmed = window.confirm('Restore the fictional sample conversations and remove locally saved messages for this demo?');
    if (!confirmed) return;
    messages = makeDefaults();
    persist();
    renderMessages();
    showToast('Sample conversations restored on this browser.');
  });

  document.getElementById('open-sidebar').addEventListener('click', openSidebar);
  document.getElementById('close-sidebar').addEventListener('click', closeSidebar);
  scrim.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('nav-open')) {
      closeSidebar();
      document.getElementById('open-sidebar').focus();
    }
  });
  window.addEventListener('resize', () => { if (!mobileQuery.matches) closeSidebar(); });

  // Seed initial sample history only when storage can be read and is empty or invalid.
  if (shouldSeedStorage) persist();
  renderMessages();
  updateComposer();
})();
