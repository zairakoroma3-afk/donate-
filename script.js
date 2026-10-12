
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('mainNav');

menuToggle?.addEventListener('click', () => {
  nav?.classList.toggle('open');
});

document.querySelectorAll('.dropdown > button').forEach((button) => {
  button.addEventListener('click', (event) => {
    if (window.innerWidth <= 850) {
      event.preventDefault();
      button.closest('.dropdown')?.classList.toggle('open');
    }
  });
});
