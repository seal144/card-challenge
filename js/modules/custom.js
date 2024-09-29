export default function () {
  const card = document.querySelector('#card');
  const cardFocusFrame = document.querySelector('#card__focus-frame');

  const numberInput = document.querySelector('#number-input');
  const nameInput = document.querySelector('#name-input');
  const dateMonthSelect = document.querySelector('#date-month-select');
  const dateYearSelect = document.querySelector('#date-year-select');

  const numberCard = document.querySelector('#number-card');
  const nameCard = document.querySelector('#name-card');
  const dateCard = document.querySelector('#date-card');

  const focusCardArea = (cardArea) => {
    const cardAreaRect = cardArea.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    cardFocusFrame.classList.add('card__focus-frame--active');
    cardFocusFrame.style.width = `${cardAreaRect.width}px`;
    cardFocusFrame.style.height = `${cardAreaRect.height}px`;
    cardFocusFrame.style.top = `${cardAreaRect.y - cardRect.y}px`;
    cardFocusFrame.style.left = `${cardAreaRect.x - cardRect.x}px`;
  };

  const unfocusCardArea = () => {
    cardFocusFrame.classList.remove('card__focus-frame--active');
    cardFocusFrame.style.width = '';
    cardFocusFrame.style.height = '';
    cardFocusFrame.style.top = '';
    cardFocusFrame.style.left = '';
  };

  numberInput.addEventListener('focus', () => {
    focusCardArea(numberCard);
  });
  numberInput.addEventListener('blur', unfocusCardArea);

  nameInput.addEventListener('focus', () => {
    focusCardArea(nameCard);
  });
  nameInput.addEventListener('blur', unfocusCardArea);

  dateMonthSelect.addEventListener('focus', () => {
    focusCardArea(dateCard);
  });
  dateMonthSelect.addEventListener('blur', unfocusCardArea);

  dateYearSelect.addEventListener('focus', () => {
    focusCardArea(dateCard);
  });
  dateYearSelect.addEventListener('blur', unfocusCardArea);
}
