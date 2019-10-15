const api = "http://localhost:3000/books";
books();

function books() {
  fetch(api)
    .then(r => r.json())
    .then(books => {
      books.forEach(allBooks);
    });
}

function allBooks(book) {
  const ul = document.querySelector("#list");
  const li = document.createElement("li");
  li.textContent = book.title;
  ul.appendChild(li);
  li.addEventListener("click", e => showBook(e, book));
}

function showBook(e, book) {
  let show = document.querySelector("#show-panel");
  show.innerHTML = "";
  const h2 = document.createElement("h2");
  h2.innerText = book.title;
  show.appendChild(h2);

  const img = document.createElement("img");
  img.setAttribute("src", book.img_url);
  show.appendChild(img);

  const p = document.createElement("p");
  p.textContent = book.description;
  show.appendChild(p);

  let button = document.createElement("button");
  button.id = book.id;
  button.className = "add-book";
  button.textContent = "Add Book";
  show.appendChild(button);

  button.addEventListener("click", e => {
    const me = { id: 1, username: "pouros" };
    let bookUsers = [...book.users, me];
    if (!book.users.find(user => user.id === me.id)) {
      fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ users: bookUsers })
      })
        .then(r => r.json())
        .then(book => showBook(book));
    } else {
      alert("You've already read this book!");
    }
  });
}
