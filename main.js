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

  // Tworzenie napisu "Ocena: "
  const bookScoreLabel = createElement("span", "class", "pr-2");
  bookScoreLabel.innerHTML = "Ocena: ";
  bookScoreDiv.appendChild(bookScoreLabel);

  // Drukowanie gwiazdek
  const numYellowStars = element.score;
  const numGrayStars = 6 - element.score;

  const bookStarYellow = drawStar("star--yellow");
  console.log(bookStarYellow)
  bookScoreDiv.appendChild(bookStarYellow);

  // for (let i = 0; i <= numYellowStars; i++) {
  //   bookScoreDiv.appendChild(drawStar("star--yellow"));
  // }

  // for (let i = 0; i <= numGrayStars; i++) {
  //   bookScoreDiv.appendChild(drawStar("star--gray"));
  // }

  bookDivBody.appendChild(bookTitle);
  bookDivBody.appendChild(bookAuthor);
  bookDivBody.appendChild(bookGenre);
  bookDivBody.appendChild(bookScoreDiv);
  bookDiv.appendChild(bookImg);
  bookDiv.appendChild(bookDivBody);

  return rootDiv.appendChild(bookDiv);
}

// function printStars(score) {
//   const bookScoreLabel = createElement("span", "class", "pr-2");
//   bookScoreLabel.innerHTML = "Ocena: ";

  
//   const bookStarYellow = drawStar("star--yellow");
//   console.log("printStars -> bookStarYellow", bookStarYellow)

  
//   const bookStarGray = drawStar("star--gray");
//   console.log("printStars -> bookStarGray", bookStarGray)
  
//   const numYellowStars = score;
//   const numGrayStars = 6 - score;

//   return bookScoreLabel.innerText + bookStarYellow
// }

function drawStar (colorClass) {
  let ns = 'http://www.w3.org/2000/svg';
  const bookStar__pathTag = document.createElementNS(ns, "path")
  bookStar__pathTag.setAttribute("d", "M100 100 L100 0 A100 100 0 0 1 187 50 Z");
  
  // const bookStar__gTag = document.createElement("g");
  const bookStar__svgTag = createElement("svg", "viewBox", "0 0 512.002 512.002");

  // bookStar__gTag.appendChild(bookStar__pathTag);
  bookStar__svgTag.appendChild(bookStar__pathTag);

  bookStar__svgTag.classList.add("star", colorClass);
  return bookStar__svgTag
}

const addBtn = document.querySelector('.box--btn__add');
addBtn.addEventListener("click", addBook);
addBtn.addEventListener("click", displayAll);
addBtn.addEventListener("click", clearInput);