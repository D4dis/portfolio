let availableKeywords = {
  'Acceuil': 'home',
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
    result = Object.keys(availableKeywords).filter((keyword) => {
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
    let hrefValue = availableKeywords[key];
    if (hrefValue == 'home') {
      return `<a href="#${hrefValue}" onclick="suppInput()" id="homeBtn3"><li>${key}</li></a>`;
    } else {
      return `<a href="#${hrefValue}" onclick="suppInput()"><li>${key}</li></a>`;
    }
  });
  resultsBox.innerHTML = `<ul class ="d-flex flex-column">` + content.join('') + "</ul>";
}

function displayAll() {
  const content = Object.entries(availableKeywords).map(([key, hrefValue]) => {
    if (hrefValue == 'home') {
      return `<a href="#${hrefValue}" onclick="suppInput()" id="homeBtn5"><li>${key}</li></a>`;
    } else {
      return `<a href="#${hrefValue}" onclick="suppInput()"><li>${key}</li></a>`;
    }
  });
  resultsBox.innerHTML = `<ul class="d-flex flex-column">` + content.join('') + "</ul>";
}

inputBox.addEventListener('click', () => {
  if (inputBox.value == '') {
    displayAll();
    inputBox.addEventListener('focusout', () => {
      setTimeout(() => {
        suppInput();
      }, 100);
    })
  }
})


// INPUT

const btnSupp = document.getElementById('suppInput');

document.getElementById('search').addEventListener('input', function (evt) {
  btnSupp.classList.remove('hidden');
});

btnSupp.addEventListener('click', () => {
  btnSupp.classList.add('hidden');
})

document.getElementById('search').addEventListener('blur', () => {
  if (document.getElementById('search').value == '') {
    btnSupp.classList.add('hidden');
  }
});

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
document.getElementById('search').addEventListener('change', () => {
  const homeBtn3 = document.getElementById('homeBtn3');
  if (homeBtn3) {
    homeBtn3.addEventListener('click', smoothScrollToTop);
  }
})
const homeBtn4 = document.getElementById('homeBtn4');
document.getElementById('search').addEventListener('click', () => {
  const homeBtn5 = document.getElementById('homeBtn5');
  if (homeBtn5) {
    homeBtn5.addEventListener('click', smoothScrollToTop);
  }
})

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

homeBtn4.addEventListener('click', smoothScrollToTop);

// ACTIVE CLASS

const buttons = [
  { id: 'projetsBtn', hash: '#projets' },
  { id: 'projetsBtn2', hash: '#projets' },
  { id: 'proposBtn', hash: '#apropos' },
  { id: 'skillsBtn', hash: '#skills' },
  { id: 'contactBtn', hash: '#contact' },
  { id: 'homeBtn2', hash: '#home' },
  { id: 'homeBtn4', hash: '#home' }
];


const updateActiveButtons = (visibleSectionId) => {
  buttons.forEach(({ id, hash }) => {
    const button = document.getElementById(id);
    if (hash === `#${visibleSectionId}`) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
};

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const visibleSectionId = entry.target.id;
      updateActiveButtons(visibleSectionId);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

document.querySelectorAll('section').forEach((section) => observer.observe(section));