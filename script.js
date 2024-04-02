const modal = document.getElementById('modal');
const modalClose = document.getElementById('close-modal');
const modalShow = document.getElementById ('show-modal');
const bookmarkForm = document.getElementById ('bookmark-form');
const bookmarkNameEl = document.getElementById ('bookmark-name');
const bookmarkUrlEl = document.getElementById ('bookmark-url');
const bookmarkContainer = document.getElementById ('bookmark-container');
// Show Modal, Focus on Input

function showModal(){
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}


// modal event Liseners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e)=>console.log(e.target));