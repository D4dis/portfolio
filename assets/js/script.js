let avaibleKeywords = {
  'A propos de moi': 'apropos',
  'Skills': 'skills',
  'Projets': 'projets',
  'Contact': 'contact',
};

const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("search");

inputBox.onkeyup = function () {
  let result = [];
  let input = inputBox.value;
  if (input.length) {
    result = Object.keys(avaibleKeywords).filter((keyword) => {
      return keyword.toLowerCase().includes(input.toLowerCase());
    });
  }
  display(result);

  if (!result.length) {
    resultsBox.innerHTML = '';
  }
};

function display(result) {
  const content = result.map((key) => {
    let hrefValue = avaibleKeywords[key];
    return `<a href="#${hrefValue}" onclick="suppInput()"><li>${key}</li></a>`;
  });
  resultsBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

// INPUT

const btnSupp = document.getElementById('suppInput');

document.getElementById('search').addEventListener('input', function (evt) {
  btnSupp.classList.remove('hidden');
});

btnSupp.addEventListener('click', () => {
  btnSupp.classList.add('hidden');
})

function selectInput(list) {
  inputBox.value = list.innerHTML;
}

function suppInput() {
  const inputSearch = document.getElementById('search');
  inputSearch.value = '';
  resultsBox.innerHTML = '';
  btnSupp.classList.add('hidden');
}

// NAVBAR

const navbar = document.getElementById('navbar');

function handleScroll() {
  if (window.scrollY > 0) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleScroll);

const homeBtn = document.getElementById('homeBtn');
const homeBtn2 = document.getElementById('homeBtn2');

function smoothScrollToTop() {
  const start = window.scrollY;
  const duration = 500;
  const startTime = 0;

  function scrollStep(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2; 

    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}

homeBtn.addEventListener('click', smoothScrollToTop);
homeBtn2.addEventListener('click', smoothScrollToTop);