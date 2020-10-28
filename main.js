const books = [];
// dodano dwa nowe klucze: genre i score
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
  //warunek nie pozwala utorzyć nowego obiektu bez tytułu lub z nieprawidłową liczbą przyznanych gwiazdek
  if (newScore === "err" | newTitle === "err") {
    return;
  }
  let newItem = new Book(newTitle, newAuthor, newImg, newGenre, newScore);
  //zmiana z push żeby najnowsze karty ładowały się jako pierwsze
  books.unshift(newItem);
  console.log(books);
};

// funkcja dodająca nową książkę w postaci karty w html
function displayAll() {
  const rootDiv = document.getElementById("root");
  rootDiv.innerHTML = ""; //czyszczenie elementu
  books.forEach(createCard);
};

// fukcja do tworzenia elementu z zadanym atrybutem i jego waroscia
function createElement(tagName, attr, attrValue) {
  const tag = document.createElement(tagName);
  tag.setAttribute(attr, attrValue);
  return tag;
}

// czyszczenie formularza
function clearInput() {
  document.querySelector('input[name="title"]').value = "";
  document.querySelector('[name="author"]').value = "";
  document.querySelector('[name="img"]').value = "";
  document.querySelector('[name="genre"]').value = "0";
  document.querySelector('[name="score"]').value = "";
};

// funkcja zwraca nazwe gatunku z pola "Gatunek" w formularzu
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
      value = "b.d.";
  }
  return value
}

// f. sprawdzająca czy podano url w formularzu i zwracajaca ten url lub domyslny obraz jesli nie podano innego url
function checkImg() {
  let newImg = document.querySelector('[name="img"]').value;
  if (newImg === "") {
    newImg = "img/books.jpg"
  };
  return newImg
}

// f. sprawdzająca wartości pól tekstowych w formularzu i drukująca "b.d." w przypadku ich braku lub "err" jeśli tym polem był tytuł książki
function checkItem(name) {
  let item = document.querySelector(`input[name="${name}"]`).value;
  if (name === "title" && item === "") {
    alert("Książka musi mieć tytuł");
    item = "err";
  } else if (item === "") {
    item = "b.d."
  };
  return item
}

// f. sprawdzajaca wartość podaną w polu "Ocena" i zaokrąglająca w górę w przypadku ułamkowych ocen oraz nie pozwalająca przyznać ujemnych gwiazdek
function checkScore() {
  let item = Math.ceil(document.querySelector('[name="score"]').value);
  if (item === "") {
    item = 0
  } else if (item > 6 || item < 0) {
    alert("Możesz przyznać od 1 do 6 gwiazdek");
    item = "err";
  };
  return item
}

// f. tworzaca karte ksiazki
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

  for (let i = 1; i <= numYellowStars; i++) {
    const bookStarYellow = createElement("img", "class", "star");
    bookStarYellow.setAttribute("src", "img/star_yellow.png");
    bookScoreDiv.appendChild(bookStarYellow);
  }

  for (let i = 1; i <= numGrayStars; i++) {
    const bookStarGray = createElement("img", "class", "star");
    bookStarGray.setAttribute("src", "img/star_gray.png");
    bookScoreDiv.appendChild(bookStarGray);
  }

  bookDivBody.appendChild(bookTitle);
  bookDivBody.appendChild(bookAuthor);
  bookDivBody.appendChild(bookGenre);
  bookDivBody.appendChild(bookScoreDiv);
  bookDiv.appendChild(bookImg);
  bookDiv.appendChild(bookDivBody);

  return rootDiv.appendChild(bookDiv);
}

// Dodanie funkcji do przycisku "Dodaj"
const addBtn = document.querySelector('#add');
addBtn.addEventListener("click", addBook);
addBtn.addEventListener("click", displayAll);
addBtn.addEventListener("click", clearInput);