const {useState} = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { Home } from './pages/home.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { BookIndex } from './pages/book-index.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { BookDetails } from './pages/book-details.jsx'
import { BookEdit } from './pages/book-edit.jsx'
import { AddReview } from './cmps/add-review.jsx'


export function App() {

    return (
        <Router>
            <section className="app main-layout">
                <AppHeader/>
            <main>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/aboutUs" element={<AboutUs />}/>
                    <Route path="/books" element={<BookIndex />}/>
                    <Route path="/books/:bookId" element={<BookDetails />}>
                        <Route path="review" element={<AddReview />}> </Route>    
                    </Route> 
                    <Route path="/books/edit/:bookId" element={<BookEdit />} />
                    <Route path="/books/edit" element={<BookEdit />} />
                    
                </Routes>
            </main>
        
            </section>
        </Router>
    )
}


