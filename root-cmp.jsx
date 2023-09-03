const {useState} = React
import { Home } from './pages/Home.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'


export function App() {
    const [page, setPage] = useState('book')

    return <section className="app">
        <header className="app-header">
            <h1>My App</h1>
            <nav className="app-nav">
                <a onClick={() => setPage('home')} href="#">Home</a>
                <a onClick={() => setPage('book')} href="#">Books</a>
                <a onClick={() => setPage('about')} href="#">AboutUs</a>
            </nav>
        </header>
        <main className="container">
            {page === 'home' && <Home/>}
            {page === 'book' && <BookIndex/>}
            {page === 'about' && <AboutUs/>}
        </main>
    </section>
}