import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books,onRemoveBook,onSelectedBookId }){
    return (
        <section className="book-list">
            {books.map(book => 
            <div key={book.id}>
                <BookPreview book={book}/>
                <section>
                    <button onClick={()=> onRemoveBook(book.id)}>Remove Book</button>
                    <button onClick={()=> onSelectedBookId(book.id)} >Details</button>
                </section>
            </div>)
            }
        </section>
    )
}