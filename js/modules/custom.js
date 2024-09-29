export default function () {
  const card = document.querySelector('#card');
  const cardFocusFrame = document.querySelector('#card__focus-frame');

  const numberInput = document.querySelector('#number-input');
  const nameInput = document.querySelector('#name-input');
  const dateMonthSelect = document.querySelector('#date-month-select');
  const dateYearSelect = document.querySelector('#date-year-select');

  const numberCard = document.querySelector('#number-card');
  const nameCard = document.querySelector('#name-card');
  const nameCardValue = document.querySelector('#name-card-value');
  const nameCardPlaceholder = document.querySelector('#name-card-placeholder');
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

  //ADD EVENT LISTENERS
  numberInput.addEventListener('focus', () => {
    focusCardArea(numberCard);
  });
  numberInput.addEventListener('blur', unfocusCardArea);

  nameInput.addEventListener('focus', () => {
    focusCardArea(nameCard);
  });
  nameInput.addEventListener('blur', () => {
    unfocusCardArea();
    if (nameInput.value.length === 0) {
      nameCardPlaceholder.classList.add('down-appear');
      nameCardPlaceholder.classList.remove('up-disappear');
    }
  });

  dateMonthSelect.addEventListener('focus', () => {
    focusCardArea(dateCard);
  });
  dateMonthSelect.addEventListener('blur', unfocusCardArea);

  dateYearSelect.addEventListener('focus', () => {
    focusCardArea(dateCard);
  });
  dateYearSelect.addEventListener('blur', unfocusCardArea);

  nameInput.addEventListener('input', (event) => {
    if (nameInput.value.length > 0) {
      nameCardPlaceholder.classList.remove('down-appear');
      nameCardPlaceholder.classList.add('up-disappear');
    }

    nameInput.value = nameInput.value.trimStart();

    if (nameInput.value.length >= 25) {
      nameInput.value = nameInput.value.slice(0, 24);
      return;
    }

    const syncValue = () => {
      const newNameContent = [];
      nameInput.value.split('').forEach((letter) => {
        const newLetter = document.createElement('span');
        newLetter.innerHTML = letter;
        newNameContent.push(newLetter);
      });
      nameCardValue.innerHTML = '';
      nameCardValue.append(...newNameContent);
    };

    if (event.inputType === 'insertText') {
      const newLetterSpan = document.createElement('span');
      const newLetter = nameInput.value.charAt(nameInput.value.length - 1);
      if (newLetter === ' ') {
        newLetterSpan.innerHTML = '&nbsp;';
      } else {
        newLetterSpan.innerHTML = newLetter;
      }
      newLetterSpan.classList.add('right-appear');
      nameCardValue.appendChild(newLetterSpan);

      if (nameInput.value !== [...nameCardValue.children].map((child) => child.innerHTML).join('')) {
        syncValue();
      }
    } else {
      syncValue();
    }
  });
}
