function searchFreeEbooks(query) {
  const encodedQuery = encodeURIComponent(query);
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=react&key=AIzaSyB04R7cPoOAImaemtk16vBI75xeKyhv3Xk`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const bookList = document.getElementById('book-list');

      if (data.totalItems > 0) {
        data.items.forEach(item => {
          const title = item.volumeInfo.title;
          const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author';
          const thumbnail = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'no-image.png';

          const listItem = document.createElement('li');

          const bookImage = document.createElement('img');
          bookImage.src = thumbnail;

          const bookTitle = document.createElement('h3');
          bookTitle.textContent = title;

          const bookAuthors = document.createElement('p');
          bookAuthors.textContent = `By: ${authors}`;

          const bookLink = document.createElement('button');
          bookLink.textContent = 'Buy Now';

          bookLink.addEventListener('click', () => {
           
            window.open(item.volumeInfo.previewLink, '_blank');
          });

          listItem.appendChild(bookImage);
          listItem.appendChild(bookTitle);
          listItem.appendChild(bookAuthors);
          listItem.appendChild(bookLink);

          bookList.appendChild(listItem);
        });
      } else {
        const listItem = document.createElement('li');
        listItem.textContent = 'No free ebooks found.';
        bookList.appendChild(listItem);
      }
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
}

searchFreeEbooks('flowers');

const productContainers = [...document.querySelectorAll('.product-ctn')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener('click', () => {
    item.scrollLeft += containerWidth;
  });

  preBtn[i].addEventListener('click', () => {
    item.scrollLeft -= containerWidth;
  });
});
