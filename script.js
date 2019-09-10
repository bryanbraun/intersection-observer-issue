// Elements
const marginLineEl = document.querySelector('.margin-line');
const rangeEl = document.querySelector('[type="range"]');
const marginReadoutEl = document.querySelector('#margin-readout');
const intersectionReadoutEl = document.querySelector('#intersection-readout');
const triangleEl = document.querySelector('.triangle');

const initialTopMargin = 100;
let observer;

// INTERSECTION OBSERVER CODE
function setupObserver(topMargin) {
  const options = {
    root: null, // defaults to the viewport
    rootMargin: `-${topMargin}px 0px 0px 0px`,
    threshold: 1,
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      intersectionReadoutEl.innerHTML = `-${entry.boundingClientRect.top}px`;
    });
  }, options);

  observer.observe(triangleEl);

  // Adjust Readout
  marginReadoutEl.innerHTML = `-${topMargin}px`;
  marginLineEl.style.top = `${topMargin}px`;
}

setupObserver(initialTopMargin);

// SLIDER CODE
rangeEl.addEventListener('input', (event) => {
  observer.unobserve(triangleEl);
  setupObserver(event.target.value);
});
