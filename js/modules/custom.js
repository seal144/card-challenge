export default function () {
  //SELECTORS

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

  //CONSTANTS
  const defaultDelay = 300;

  //HELPERS

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

  const validateMaxChars = (input, charNumber) => {
    if (input.value.length > charNumber) {
      input.value = input.value.slice(0, charNumber);
      return false;
    }
    return true;
  };

  //EVENT LISTENERS FOCUS/BLUR
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

  //EVENT LISTENERS INPUT

  numberInput.addEventListener('input', (event) => {
    if (!validateMaxChars(numberInput, 16)) {
      return;
    }
    if (numberInput.value.match(/[^0-9]/)) {
      numberInput.value = numberInput.value.replace(/[^0-9]/g, '');
      return;
    }

    const oldValue = [...document.querySelectorAll('.card__digit:not(.up-disappear)')].map(
      (spanDigit) => spanDigit.innerHTML
    );
    const newValue = numberInput.value.padEnd(16, '#').split('');
    const changedIndexes = [];
    oldValue.forEach((digit, index) => (digit !== newValue[index] ? changedIndexes.push(index) : null));

    changedIndexes.forEach((index) => {
      const digitId = `digit-${index}`;

      const oldDigit = document.getElementById(digitId);
      oldDigit.classList.add('up-disappear');
      oldDigit.style.left = `${0.5 + index * 1 + 0.5 * Math.floor(index / 4)}rem`;
      oldDigit.id = '';
      setTimeout(() => {
        oldDigit.remove();
      }, defaultDelay * 2);

      const newDigit = document.createElement('span');
      newDigit.id = digitId;
      newDigit.classList.add('card__digit');
      newDigit.classList.add('down-appear');
      setTimeout(() => {
        newDigit.classList.remove('down-appear');
      }, defaultDelay);
      newDigit.innerHTML = newValue[index];
      numberCard.insertBefore(newDigit, oldDigit);
    });
  });

  nameInput.addEventListener('input', (event) => {
    if (nameInput.value.length > 0) {
      nameCardPlaceholder.classList.remove('down-appear');
      nameCardPlaceholder.classList.add('up-disappear');
    }

    nameInput.value = nameInput.value.trimStart();

    if (!validateMaxChars(nameInput, 27)) {
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
