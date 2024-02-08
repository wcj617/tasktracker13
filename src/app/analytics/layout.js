'use client'
// Analytics/layout.js
export default function analyticsLayout({ children }) {
    return (
        <div>
            <header>
                {/* Your header content */}
            </header>
            <main>{children}</main>
            <footer>
                {/* Your footer content */}
            </footer>
        </div>
    );
}
