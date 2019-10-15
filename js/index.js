document.addEventListener("DOMContentLoaded", function() {fetchBooks()});

const booksURL = "http://localhost:3000/books";
const usersURL = "http://localhost:3000/users";
const showPanel = document.querySelector("#show-panel")

function fetchBooks() {
    return fetch(booksURL)
    .then(resp => resp.json())
    .then(books => books.forEach(book => displayBook(book)))
}

function fetchUsers() {
    return fetch(usersURL)
    .then(resp => resp.json())
    .then(users => users.filter(user => user.books))
}

function displayBook(book) {
    const ul = document.querySelector("#book-list")
    let li = document.createElement("li")
    li.innerText = book.title 
    ul.appendChild(li)
    li.addEventListener("click", () => showBookDetails(book)) 
}

function showBookDetails(book) {
    showPanel.innerHTML = ""
    let div = document.createElement("div")
    div.dataset.bookId = book.id
    let h2 = document.createElement("h2")
    h2.innerText = book.title
    let image = document.createElement("img")
    image.src = book.img_url
    let p = document.createElement("p")
    p.innerText = book.description
    let ul = document.createElement("ul") 
    book.users.forEach(user => {
        let li = document.createElement("li")
        li.innerText = user.username
        ul.appendChild(li)
    })
    let bookBtn = document.createElement("button")
    bookBtn.id = book.id
    bookBtn.className = "add-book"
    bookBtn.innerText = "Add Book"
    bookBtn.addEventListener("click", () => {
        const myUser = {"id":1, "username":"pouros"}
        let bookUsers = [...book.users, myUser]
        if(!book.users.find(user => user.id === myUser.id)) {
            fetch(`http://localhost:3000/books/${book.id}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({users: bookUsers}) 
          })
        .then(resp => resp.json())
        .then(book => showBookDetails(book))
        } else {
        alert("You already read this book!")
       }      
    })
    div.append(h2, image, p, ul, bookBtn)
    showPanel.appendChild(div)
}




