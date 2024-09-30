export default function () {
  //SELECTORS

  const card = document.getElementById('card');
  const cardFocusFrame = document.getElementById('card__focus-frame');

  const numberInput = document.getElementById('number-input');
  const nameInput = document.getElementById('name-input');
  const dateMonthSelect = document.getElementById('date-month-select');
  const dateYearSelect = document.getElementById('date-year-select');

  const numberCard = document.getElementById('number-card');
  const nameCard = document.getElementById('name-card');
  const nameCardValue = document.getElementById('name-card-value');
  const nameCardPlaceholder = document.getElementById('name-card-placeholder');
  const dateCard = document.getElementById('date-card');
  const dateValueCard = document.getElementById('date-value-card');
  const ccvInput = document.getElementById('ccv-input');

  //CONSTANTS

  const defaultDelay = 300;

  //SETUP

  const currentYear = new Date().getFullYear();

  for (let i = 0; i < 12; i++) {
    const option = document.createElement('option');
    option.value = i + currentYear;
    option.innerHTML = i + currentYear;
    dateYearSelect.appendChild(option);
  }

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

  const replaceElementWithAnimation = (id, newInnerHTML, container, className) => {
    const oldElement = document.getElementById(id);
    oldElement.classList.add('up-disappear');
    oldElement.id = `${id}-prev`;
    setTimeout(() => {
      oldElement.remove();
    }, defaultDelay * 2);

    const newElement = document.createElement('span');
    newElement.id = id;
    if (className) {
      newElement.classList.add(className);
    }
    newElement.classList.add('down-appear');
    setTimeout(() => {
      newElement.classList.remove('down-appear');
    }, defaultDelay);
    newElement.innerHTML = newInnerHTML;
    container.insertBefore(newElement, oldElement);
  };

  //EVENT LISTENERS FOCUS/BLUR

  numberInput.addEventListener('focus', () => {
    if (card.classList.contains('flipped')) {
      setTimeout(() => {
        focusCardArea(numberCard);
      }, defaultDelay * 2);
    } else focusCardArea(numberCard);
  });
  numberInput.addEventListener('blur', unfocusCardArea);

  nameInput.addEventListener('focus', () => {
    if (card.classList.contains('flipped')) {
      setTimeout(() => {
        focusCardArea(nameCard);
      }, defaultDelay * 2);
    } else focusCardArea(nameCard);
  });
  nameInput.addEventListener('blur', () => {
    unfocusCardArea();
    if (nameInput.value.length === 0 && nameCardPlaceholder.classList.contains('up-disappear')) {
      nameCardPlaceholder.classList.add('down-appear');
      nameCardPlaceholder.classList.remove('up-disappear');
    }
  });

  dateMonthSelect.addEventListener('focus', () => {
    if (card.classList.contains('flipped')) {
      setTimeout(() => {
        focusCardArea(dateCard);
      }, defaultDelay * 2);
    } else focusCardArea(dateCard);
  });
  dateMonthSelect.addEventListener('blur', unfocusCardArea);

  dateYearSelect.addEventListener('focus', () => {
    if (card.classList.contains('flipped')) {
      setTimeout(() => {
        focusCardArea(dateCard);
      }, defaultDelay * 2);
    } else focusCardArea(dateCard);
  });
  dateYearSelect.addEventListener('blur', unfocusCardArea);

  ccvInput.addEventListener('focus', () => {
    card.classList.add('flipped');
  });

  ccvInput.addEventListener('blur', () => {
    setTimeout(() => {
      card.classList.remove('flipped');
    }, 0);
  });

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

      replaceElementWithAnimation(digitId, newValue[index], numberCard, 'card__digit');
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

  dateMonthSelect.addEventListener('input', () => {
    replaceElementWithAnimation('date-month', dateMonthSelect.value, dateValueCard);
  });

  dateYearSelect.addEventListener('input', () => {
    replaceElementWithAnimation('date-year', dateYearSelect.value.slice(-2), dateValueCard);
  });
}
