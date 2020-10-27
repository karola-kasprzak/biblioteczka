const books =[];
class Book {
  constructor(title,author,img) {
    this.title = title,
    this.author = author,
    this.img = img
  }
};

//funkcja dodająca nowy obiekt do tablicy books
function addBook () {
  let newTitle = document.querySelector('input[name="title"]').value; 
  //input w query selector jest opcjonalny w tym przypadku
  console.log(newTitle);
  let newAuthor = document.querySelector('[name="author"]').value;
  let newImg = document.querySelector('[name="img"]').value;
  let newItem = new Book(newTitle,newAuthor,newImg);
  books.push(newItem);
  console.log(books);
};

function displayAll() {
 const rootDiv = document.getElementById("root");
 rootDiv.innerHTML = ""; //czyszczenie elementu

  books.forEach(element => {
    const mainDiv = createElement("div","class", "card");
    const bookDiv = createElement("div","class","book--container card-body");
    const bookTitle = createElement("p","class","book--title card-title");
    const bookAuthor = createElement("p","class","book--author card-subtitle");
    const bookImg = createElement("img", "class", "book--img img-thumbnail card-img-top");

    mainDiv.styles = "width: 18rem;";
    bookTitle.innerHTML = element.title;
    bookAuthor.innerHTML = element.author;
    bookImg.src = element.img;

    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookImg);
    mainDiv.appendChild(bookDiv);

    return rootDiv.appendChild(mainDiv);
  });
 

};


function createElement (tagName, attr, attrValue) {
  const tag = document.createElement(tagName);
  tag.setAttribute(attr, attrValue);
  return tag;
}


function clearInput () {  
  document.querySelector('input[name="title"]').value = ""; 
  document.querySelector('[name="author"]').value = "";
  document.querySelector('[name="img"]').value = ""; 
};


const addBtn = document.querySelector('.box--btn__add');
addBtn.addEventListener("click", addBook);
addBtn.addEventListener("click", displayAll);
addBtn.addEventListener("click", clearInput);