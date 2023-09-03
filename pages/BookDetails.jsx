const {useState,useEffect,useRef} = React
import { bookService } from "../services/book.service.js";
import { LongTxt } from "../cmps/LongTxt.jsx";

export function BookDetails({bookId, onBack}){
    const [book, setBook] = useState(null)
    const [pageCount, setPageCount] = useState(null)
    const [publishedDate, setPublishedDate] = useState(null)
    const [priceColor, setPriceColor] = useState('')
    const [isOnSale, setIsOnSale] = useState(null)
    const [isExpanded, setExpanded] = useState(false)

     

    useEffect(()=> {
        bookService.get(bookId)
            .then(book => {
                setBook(book)
                OnSetPageCount(book)
                onSetPublishedDate(book)
                onSetPriceColor(book)
                isOnSaleCheck(book)
            })
    },[])

    function onSetExpaneded(){
        console.log(book);
        setExpanded(prevState => !prevState)
    }

    function OnSetPageCount(currBook){
        console.log(currBook);
        if(currBook.pageCount > 500) setPageCount('Serious Reading')
        else if(currBook.pageCount > 200 && currBook.pageCount < 500) setPageCount('Descent Reading')
        else setPageCount('Light Reading') 
    }

    function onSetPublishedDate(currBook){
        (2023 - currBook.publishedDate > 10) ? setPublishedDate('Vintage') : setPublishedDate('New')
    }

    function onSetPriceColor(currBook){
        if(currBook.listPrice.amount > 150){
            setPriceColor('red')
        } 
        if(currBook.listPrice.amount < 50)
        { 
            setPriceColor('green')
         }
        else{   
            setPriceColor('')
        } 
    }

    function isOnSaleCheck(currBook){
        (currBook.listPrice.isOnSale) ? setIsOnSale('sale-modal') : setIsOnSale('hide')
    }

    if(!book) return <div>Loading...</div>
    return (
        <section className='book-details'> 
            <h2>{book.title}</h2>
            <h1>Author: {book.authors}</h1>
            <h1>Book Price: <span className={priceColor}>{book.listPrice.amount + book.listPrice.currencyCode}</span> </h1>
            <LongTxt txt={isExpanded ? book.description : book.description.substring(0,40)}/>
            <span onClick={onSetExpaneded}>{isExpanded ? 'read less...' : 'read more...'}</span>
            <img src={`${book.thumbnail}`}alt=""/>
            <section>
                <span>Level: {pageCount}</span><br/>
                <span>{publishedDate}</span><br/>
                <button onClick={onBack}>Return</button>
            </section>
            <section className={isOnSale}>on Sale</section>
        </section>
    )
}