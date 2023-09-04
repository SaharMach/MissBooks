const { Link } = ReactRouterDOM
import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books,onRemoveBook,onSelectedBookId }){
    return (
        <section className="book-list">
            {books.map(book => 
            <div key={book.id}>
                <BookPreview book={book}/>
                <section>
                    <button onClick={()=> onRemoveBook(book.id)}>Remove Book</button>
                    <button><Link to={`/books/${book.id}`}>Details</Link></button>
                </section>
            </div>
            )}
        </section>
    )
}