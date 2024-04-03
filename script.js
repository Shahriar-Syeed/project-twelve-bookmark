const modal = document.getElementById('modal');
const modalClose = document.getElementById('close-modal');
const modalShow = document.getElementById('show-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const bookmarkNameEl = document.getElementById('bookmark-name');
const bookmarkUrlEl = document.getElementById('bookmark-url');
const bookmarkContainer = document.getElementById('bookmark-container');
const websiteNameEl = document.getElementById('website-name');
const websiteURL = document.getElementById('website-url');
// Show Modal, Focus on Input

function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}


// modal event Liseners
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

// validate Form
function validate(nameValue, urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if(!nameValue || !urlValue){
    alert('Please submit values for both fields.');
    return false;
  }
  if (urlValue.match(regex)) {
    alert('match');
  }
  if (!urlValue.match(regex)) {
    alert('Plese provide a valid web address');
    return false;
  }
  // valid
  return true;
}

// Handle Date from Form
function storBookmark(e) {
  e.preventDefault();
  console.log(e);
  const nameValue = websiteNameEl.value;
  let urlValue = websiteURL.value;
  if (!urlValue.includes('http://') && !urlValue.includes('https://')) {
    urlValue = `https://${urlValue}`;
  }
  console.log("Name Value: ", nameValue, "  URL: ", urlValue)
  if(!validate(nameValue, urlValue)){

    return false;
  }
}

// Event Listener
bookmarkForm.addEventListener('submit', storBookmark);