import Navigation from "./navigation";

function Layout ({children}) {
    return <div>
        <Navigation/>
        <main>
            {children}
        </main>
        <footer>
            Design by Cagan
        </footer>
    </div>
}

export default Layout
