const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.bookId) loadBook()
    }, [])


    function loadBook() {
        bookService.get(params.bookId)
            .then(setBookToEdit)
            .catch(err => console.log('err:', err))
    }


    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        console.log(field);
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        if(field === 'price') {
            setBookToEdit(prevBookToEdit => ({...prevBookToEdit, listPrice:
                 {...prevBookToEdit.listPrice , amount: value} }))
        }
        else setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, [field]: value }))
    }


    function onSaveBook(ev) {
        ev.preventDefault()
        console.log(bookToEdit);
        bookService.save(bookToEdit)
            .then(() => {
                navigate('/books')
                showSuccessMsg(`The book ${bookToEdit.title} has been saved`)
            })
            .catch(err => {
                showErrorMsg(`The book ${bookToEdit.title} didnt saved.`)
                console.log('err:', err)})

    }

    const { title, price } = bookToEdit
    return (
        <section className="book-edit">
            <form onSubmit={onSaveBook} >
                <label htmlFor="title">Title:</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="price">price:</label>
                <input onChange={handleChange} value={price} type="number" name="price" id="price" />

                <button>Save</button>
            </form>
        </section>
    )
}