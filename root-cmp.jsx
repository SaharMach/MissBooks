const {useState} = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookEdit } from './cmps/book-edit.jsx'


export function App() {

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
                    <Route path="/books/edit/:bookId" element={<BookEdit />} />
                    <Route path="/books/edit" element={<BookEdit />} />
                </Routes>
            </main>
        
            </section>
        </Router>
    )
}