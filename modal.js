const modalTriggerButtons = document.querySelectorAll('[data-modal-target]');
const modals = document.querySelectorAll('.modal');
const modalContent = document.querySelectorAll('.modal-content');
const modalCloseButtons = document.querySelectorAll('.modal-close');

modalTriggerButtons.forEach((elem) => {
  elem.addEventListener('click', (event) =>
    toggleModal(event.currentTarget.getAttribute('data-modal-target'))
  );
});
modalCloseButtons.forEach((elem) => {
  elem.addEventListener('click', (event) =>
    toggleModal(event.currentTarget.closest('.modal').id)
  );
});
modals.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    if (event.currentTarget === event.target)
      toggleModal(event.currentTarget.id);
  });
});
modals.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    if (event.target === modalContent[0]) toggleModal(event.currentTarget.id);
  });
});

// Close Modal with "Esc"...
document.addEventListener('keydown', (event) => {
  if (event.keyCode === 27 && document.querySelector('.modal.modal-show')) {
    toggleModal(document.querySelector('.modal.modal-show').id);
  }
});

function toggleModal(modalId) {
  const modal = document.getElementById('modal5');

  if (getComputedStyle(modal).display === 'flex') {
    // alternatively: if(modal.classList.contains("modal-show"))
    modal.classList.add('modal-hide');
    setTimeout(() => {
      document.body.style.overflow = 'initial';
      modal.classList.remove('modal-show', 'modal-hide');
      modal.style.display = 'none';
    }, 200);
  } else {
    document.body.style.overflow = 'hidden';
    modal.style.display = 'flex';
    modal.classList.add('modal-show');
  }
}
