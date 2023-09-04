const {useState,useEffect} = React
const {useParams, useNavigate,Link} = ReactRouterDOM
import { bookService } from "../services/book.service.js";
import { LongTxt } from "../cmps/longtxt.jsx";
import { utilService } from "../services/util.service.js";
import { AddReview } from "../cmps/add-review.jsx";

export function BookDetails(){
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=> {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err);
                navigate('/books')
            })
    },[params.bookId])


    function getPageCount() {
        let pageCount = book.pageCount
        if (pageCount > 500) return `${pageCount} - Serious Reading`
        else if (pageCount > 200) return `${pageCount} - Descent Reading`
        else if (pageCount < 100) return `${pageCount} - Light Reading`
    }

    function getPublisheYear() {
        const currYear = new Date().getFullYear()
        let publishedYear = book.publishedDate
        let diff = currYear - publishedYear
        if (diff > 10) publishedYear += ' - Vintage';
        else if (diff < 1) publishedYear += ' - New!'
        return publishedYear
    }

    function getPriceColor() {
        const price = book.listPrice.amount
        if (price > 150) return 'red'
        else if (price < 20) return 'green'
    }

    function getBookPrice() {
        let price = book.listPrice.amount
        let currencyCode = utilService.getCurrencySymbol(book.listPrice.currencyCode)
        return `${price} ${currencyCode}`
    }

    function getBookReviews() {
        let reviews = book.reviews
        if(!reviews || !reviews.length) return
        return reviews.map(review => {
            console.log(review)
            return (
                <div key={review.id}>
                    <div>Fullname: {review.fullname}</div>
                    <div>Rating: {review.rating}</div>
                    <div>ReadAt: {review.readAt}</div>
                    <div>WrittenAt: {review.writtenAt} </div>
                    <button onClick={() => onDeleteReview(review.id)} >X</button>
                </div>
            )
        })
    }

    function handleReviewAdded(newReview){
        setBook(prevBook => ({...prevBook, reviews:[...prevBook.reviews,newReview]}))
    }

    function onDeleteReview(reviewId){
        console.log(reviewId);
        bookService.deleteReview(book.id, reviewId)
            .then(()=>{
                const updatedReviews = book.reviews.filter(review => review.id !== reviewId)
                setBook(prevBook => ({...prevBook, reviews: updatedReviews}))
            })
    }


    function onBack(){
        navigate('/books')
    }
    if(!book) return <div>Loading...</div>
    return (
        <section>
            <section className='book-details'> 
                <h2>{book.title}</h2>
                <h1>Author: {book.authors}</h1>
                <h4>Price: <span className={getPriceColor()}>{getBookPrice()}</span></h4>  
                <img src={`${book.thumbnail}`}alt=""/>
                <div>Description:<LongTxt txt={book.description} /></div>
                <section>
                    <h4>Page Count: {getPageCount()}</h4>
                    <h4>Publish year: {getPublisheYear()}</h4><br/>
                    <h4>Categories: {book.categories.join(',')}</h4>
                    <button onClick={onBack}>Return</button>
                </section>
            {book.listPrice.isOnSale && <p className='sale-modal'>On Sale</p>}
            </section>
            <AddReview book={book} onAddingReview={handleReviewAdded}></AddReview>
            <section className='book-reviews'>
                <h4>Reviews:</h4>
                <article>{getBookReviews()}</article>
            </section>
        </section>
    )
}