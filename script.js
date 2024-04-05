const modal = document.getElementById('modal');
const modalClose = document.getElementById('close-modal');
const modalShow = document.getElementById('show-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const bookmarkNameEl = document.getElementById('bookmark-name');
const bookmarkUrlEl = document.getElementById('bookmark-url');
const bookmarkContainer = document.getElementById('bookmark-container');
const websiteNameEl = document.getElementById('website-name');
const websiteURL = document.getElementById('website-url');

let bookmarks = [];

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
    // alert('match');
  }
  if (!urlValue.match(regex)) {
    alert('Plese provide a valid web address');
    return false;
  }
  // valid
  return true;
}

// Build Bookmarks DOM
function buildBookmarks(){
  // Build Items
  bookmarks.forEach((bookmark) => {
    const {name, url} = bookmark;
    console.log({name, url});
    // item
    const item = document.createElement('div');
    item.classList.add('item');
    // Close icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmarks('${url}')`);
    // Fabicon / Link Container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');

    // Favicon
    const favicon = document.createElement('img');
    favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'Favicon');
    // Link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', `_blank`);
    link.textContent = name;
    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarkContainer.appendChild(item);

  });
}

// Fetch Bookmars
function fetchBookmarks(){
  // Get bookmarks from localStorage if available
  if(localStorage.getItem('bookmarks')){
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // create bookmarks array in localStorage
    bookmarks =[
      {
        name: 'Jacinto Design',
        url: 'https://jacinto.design',
      }
    ];
    localStorage.setItem('bookmarks', JSON.stringify('Fetch bookmarks :',bookmarks));
  }
 buildBookmarks();
}

// Delete Bookmark
function deleteBookmarks(url){
  console.log('delete URL', url);
}

// Handle Date from Form
function storBookmark(e) {
  e.preventDefault();
  // console.log(e);
  const nameValue = websiteNameEl.value;
  let urlValue = websiteURL.value;
  if (!urlValue.includes('http://') && !urlValue.includes('https://')) {
    urlValue = `https://${urlValue}`;
  }
  // console.log("Name Value: ", nameValue, "  URL: ", urlValue)
  if(!validate(nameValue, urlValue)){

    return false;
  };
  const bookmark = {
    name:nameValue,
    url:urlValue,
  };
  bookmarks.push(bookmark);
  // console.log(JSON.stringify(bookmarks));
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();

}

// Event Listener
bookmarkForm.addEventListener('submit', storBookmark);

// on load, Fetch bookmark function
fetchBookmarks();