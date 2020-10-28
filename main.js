const books = [];
// dodano dwa nowe klucze genre i score
class Book {
  constructor(title, author, img, genre, score) {
    this.title = title,
      this.author = author,
      this.img = img,
      this.genre = genre,
      this.score = score
  }
};

//funkcja dodająca nowy obiekt do tablicy books
function addBook() {
  let newTitle = checkItem("title");
  let newAuthor = checkItem("author");
  let newImg = checkImg();
  let newGenre = decodeGenre();
  let newScore = checkScore();
  // if (newScore === "err" | newTitle === "err") {
  //   return;
  // }
  let newItem = new Book(newTitle, newAuthor, newImg, newGenre, newScore);
  books.unshift(newItem); //zmiana z push żeby najnowsze karty ładowały się jako pierwsze
  console.log(books);
};

// funkcja dodająca nową książkę w postaci karty w html
function displayAll() {
  const rootDiv = document.getElementById("root");
  rootDiv.innerHTML = ""; //czyszczenie elementu
  books.forEach(createCard);
};


function createElement(tagName, attr, attrValue) {
  const tag = document.createElement(tagName);
  tag.setAttribute(attr, attrValue);
  return tag;
}


function clearInput() {
  document.querySelector('input[name="title"]').value = "";
  document.querySelector('[name="author"]').value = "";
  document.querySelector('[name="img"]').value = "";
  document.querySelector('[name="genre"]').value = "0";
  document.querySelector('[name="score"]').value = "";
};

function decodeGenre() {
  let newGenre = document.querySelector('[name="genre"]').value;
  let value = "";
  switch (newGenre) {
    case "1":
      value = "powieść obyczajowa";
      break;
    case "2":
      value = "powieść historyczna";
      break;
    case "3":
      value = "powieść fantastyczna";
      break;
    case "4":
      value = "powieść kryminalna";
      break;
    case "5":
      value = "powieść sensacyjna";
      break;
    case "6":
      value = "powieść fantastyczno-naukowa";
      break;
    case "7":
      value = "powieść przygodowa";
      break;
    case "8":
      value = "inne";
      break;
    default:
      value = "bd.";
  }
  return value
}

function checkImg() {
  let newImg = document.querySelector('[name="img"]').value;
  if (newImg === "") {
    newImg = "books.jpg"
  };
  return newImg
}

function checkItem(name) {
  let item = document.querySelector(`input[name="${name}"]`).value;
  if (name === "title" && item === "") {
    // alert("Przynajmniej podaj tytuł książki");
    item = "err";
  } else if (item === "") {
    item = "bd."
  };

  return item
}

function checkScore() {
  let item = document.querySelector('[name="score"]').value;

  if (item === "") {
    item = 0
  } else if (item > 6) {
    // alert("Podaj wartość z zakresu 1 - 6");
    item = "err";
  };

  return item
}

function createCard(element) {
  const rootDiv = document.getElementById("root");

  // docelowy wyglad karty jest opisany w book-card.html

  const bookDiv = createElement("div", "class", "card m-2");
  bookDiv.style = "width: 300px;";
  console.log(bookDiv);

  const bookImg = createElement("img", "class", "card-img-top");
  bookImg.src = element.img;
  bookImg.style = "width: 298px; height: 298px;";

  const bookDivBody = createElement("div", "class", "card-body");

  const bookTitle = createElement("h5", "class", "card-title");
  bookTitle.innerHTML = element.title;

  const bookAuthor = createElement("h6", "class", "card-subtitle mb-2 text-muted");
  bookAuthor.innerHTML = element.author;

  const bookGenre = createElement("p", "class", "mb-2");
  bookGenre.innerHTML = `Gatunek: ${element.genre}`;

  const bookScoreDiv = createElement("div", "class", "mt-0");

  // const bookScoreLabel = createElement("span", "class", "pr-2");
  // bookScoreLabel.innerHTML = `Ocena: ${element.score}`;
  // na razie bez gwiazdek
  bookScoreDiv.innerHTML = printStars(element.score);


  // bookScoreDiv.appendChild(bookScoreLabel);
  bookDivBody.appendChild(bookTitle);
  bookDivBody.appendChild(bookAuthor);
  bookDivBody.appendChild(bookGenre);
  bookDivBody.appendChild(bookScoreDiv);
  bookDiv.appendChild(bookImg);
  bookDiv.appendChild(bookDivBody);

  return rootDiv.appendChild(bookDiv);
}

function printStars(score) {
  const bookScoreLabel = createElement("span", "class", "pr-2");
  bookScoreLabel.innerHTML = "Ocena: ";

  const bookStar__pathTag = createElement("path", "d", 'M511.267,197.258c-1.764-5.431-6.457-9.389-12.107-10.209l-158.723-23.065L269.452,20.157 c-2.526-5.12-7.741-8.361-13.45-8.361c-5.71,0-10.924,3.241-13.451,8.361l-70.988,143.827l-158.72,23.065 c-5.649,0.82-10.344,4.778-12.108,10.208c-1.765,5.431-0.293,11.392,3.796,15.377l114.848,111.954L92.271,482.671 c-0.966,5.628,1.348,11.314,5.967,14.671c2.613,1.898,5.708,2.864,8.818,2.864c2.388,0,4.784-0.569,6.978-1.723l141.967-74.638 l141.961,74.637c5.055,2.657,11.178,2.215,15.797-1.141c4.619-3.356,6.934-9.044,5.969-14.672l-27.117-158.081l114.861-111.955 C511.56,208.649,513.033,202.688,511.267,197.258z');
  
  const bookStar__gTag = createElement("g","class","");
  const bookStar__svgTag = createElement("svg", "viewBox", "0 0 512.002 512.002");

  bookStar__gTag.appendChild(bookStar__pathTag);
  bookStar__svgTag.appendChild(bookStar__gTag);

  const bookStarYellow = bookStar__svgTag;
  bookStarYellow.classList.add("star", "star--yellow");
  
  const bookStarGray = bookStar__svgTag;
  // bookStarGray.classList.add("star", "star--gray");
  
  const numYellowStars = score;
  const numGrayStars = 6 - score;

  console.log(bookStar__svgTag);
  console.log(bookStarYellow);
  return bookScoreLabel.innerText
}


const addBtn = document.querySelector('.box--btn__add');
addBtn.addEventListener("click", addBook);
addBtn.addEventListener("click", displayAll);
addBtn.addEventListener("click", clearInput);