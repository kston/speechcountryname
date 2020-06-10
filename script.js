const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

fetch('https://restcountries.eu/rest/v2/all')
  .then((res) => res.json())
  .then((data) =>
    data.forEach((item) => {
      console.log(item);
      const box = document.createElement('div');
      box.classList.add('box');
      box.innerHTML = `
  <img src="${item.flag}" alt="${item.name}"/>
  <p class="info">${item.name}</p>
  
  `;

      box.addEventListener('click', () => {
        setTextMessage(item.name);
        speakText();

        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
      });
      main.appendChild(box);
    })
  );

const message = new SpeechSynthesisUtterance();
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

voicesSelect.addEventListener('change', setVoice);

getVoices();
