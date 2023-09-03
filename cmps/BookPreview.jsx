export function BookPreview({book}){
    return (
        <section>
            <h2>{book.title}</h2>
            <img src={`${book.thumbnail}`}alt=""/>
            <h1>Price: <span>{book.listPrice.amount + book.listPrice.currencyCode}</span> </h1>
        </section>
    )
}