
const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Car App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/aboutUs" >About</NavLink>
                    <NavLink to="/books" >Books</NavLink>
                </nav>
            </section>
        </header>
    )
}