const { Link } = ReactRouterDOM
import { BookPreview } from "./book-preview.jsx"

export function BookList({ books,onRemoveBook }){
    return (
        <section className="book-list">
            {books.map(book => 
            <div key={book.id}>
                <BookPreview book={book}/>
                <section>
                    <button onClick={()=> onRemoveBook(book.id)}>Remove Book</button>
                    <button><Link to={`/books/${book.id}`}>Details</Link></button>
                    <button><Link to={`/books/edit/${book.id}`}>Edit</Link></button>
                </section>
            </div>
            )}
        </section>
    )
}