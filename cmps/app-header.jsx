
const { Link, NavLink } = ReactRouterDOM

import { UserMsg } from "./user-msg.jsx"

export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Miss Book</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/aboutUs" >About</NavLink>
                    <NavLink to="/books" >Books</NavLink>
                </nav>
            </section>
            < UserMsg/>
        </header>
    )
}