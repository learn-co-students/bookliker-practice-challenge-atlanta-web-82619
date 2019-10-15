document.addEventListener("DOMContentLoaded", function() {
    renderBooks()
    
    
});

function fetchBooks(){
    return fetch('http://localhost:3000/books')
    .then(response => response.json())
    // .then(books => console.log(books))
}

function fetchBook(id){
    return fetch(`http://localhost:3000/books/${id}`)
    .then(response => response.json())
}

const ul = document.querySelector('#list');
function renderBooks(){
    fetchBooks()
    .then(function(books) {
        // console.log(books);
        books.forEach(function(book){
            const li = document.createElement('li');
            li.textContent = book.title;
            li.dataset.bookId = book.id;
            ul.appendChild(li);
            ul.addEventListener('click', displayBook)
        })
        // debugger;
    })
}


const showPanel = document.querySelector('#show-panel')

function clearNode(node){
    while(node.firstChild){
        node.removeChild(node.firstChild)
    }
}

function displayBook(e){
    if (e.target.dataset.bookId !== undefined){
        fetchBook(e.target.dataset.bookId)
        .then(function(book){
            clearNode(showPanel);
            const header = document.createElement('h2')
            header.textContent = book.title
            const img = document.createElement('img')
            img.src = book.img_url
            const desc = document.createElement('p')
            desc.textContent = book.description
            const button = document.createElement('button')
            button.textContent = 'Read Book'
            button.dataset.buttonId = book.id
            button.addEventListener('click', likeBook)

            // debugger;

            showPanel.appendChild(header);
            showPanel.appendChild(img);
            showPanel.appendChild(desc);
            showPanel.appendChild(button);
            
        })
    }
}

function likeBook(e){
    if (e.target.dataset.buttonId !== undefined){
        fetchBook(e.target.dataset.buttonId)
        .then(function(book){
            console.log(book.users)
            const myUser = {id: 1, username:'pouros'}

            if (book.users.find(user => user.id === myUser.id)){
                alert('You already read this book!!!');
            } else {
                book.users.push(myUser)
                const body =  {users: book.users}
                fetch(`http://localhost:3000/books/${book.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accepts': 'application/json'
                    },
                    body: JSON.stringify(body)
            })
            const user = document.createElement('b')
            const br = document.createElement('br')
            const butt = document.querySelector('button')
            user.textContent = myUser.username
            user.appendChild(br)
            showPanel.insertBefore(user, butt)
            }


            // debugger;
        })
    }

}

