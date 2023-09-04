const {useState} = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { BookDetails } from './pages/BookDetails.jsx'


export function App() {
    const [page, setPage] = useState('book')

    return (
        <Router>
            <section className="app main-layout">
                <AppHeader/>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/aboutUs" element={<AboutUs/>}/>
                    <Route path="/books" element={<BookIndex/>}/>
                    <Route path="/books/:bookId" element={<BookDetails/>}/>
                </Routes>
            </main>
        
            </section>
        </Router>
    )
}