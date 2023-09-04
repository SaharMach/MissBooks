const {useState, useEffect} = React
const {Link} = ReactRouterDOM

import { BookList } from "../cmps/book-list.jsx";
import { bookService } from "../services/book.service.js";
import { BookFilter } from "../cmps/book-filter.jsx";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";


export function BookIndex(){
    const [books, setBooks] = useState(null)
    const [filterBy,setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(()=> {
        bookService.query(filterBy)
            .then(books => setBooks(books))
    },[filterBy])

    function onRemoveBook(bookId){
        bookService.remove(bookId)
            .then(() => {setBooks(prevBook => 
                prevBook.filter(book => book.id !== bookId))
                showSuccessMsg(`Book removed ${bookId}`)
            })
            .catch(err=> {
                console.log('err', err)
                showErrorMsg(`Cannot remove ${bookId}`)
            })     
    }



    function onSetFilterBy(filterBy){  
        console.log(filterBy);
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

 

    if(!books) return <div>Loading...</div>
    return (
        <section className="books-container">
            {
                <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>
                    <Link to="/books/edit"><button>Add Book</button></Link>
                    <BookList books={books} onRemoveBook={onRemoveBook}/>
                </React.Fragment>
            }
            
        </section>
    )
}
