const {useState,useEffect } = React

export function BookFilter({filterBy, onSetFilterBy}){
    const [filterByToEdit,setFilterByToEdit] = useState(filterBy)

    useEffect(()=> {
        onSetFilterBy(filterByToEdit)
    },[filterByToEdit])

    function handleChange({target}){
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
                value = value || ''
                break;
            default:
                break;
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }
    
    const { title,price } = filterByToEdit
    console.log(title);
    console.log(price);
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">Name: </label>
                <input value={title} onChange={handleChange} type="text" placeholder="By name" id="title" name="title" />

                <label htmlFor="price">Price: </label>
                <input value={price} onChange={handleChange} type="number" placeholder="By Min Price" id="price" name="price" />

                <button>Set Filter</button>
            </form>
        </section>
    )

}