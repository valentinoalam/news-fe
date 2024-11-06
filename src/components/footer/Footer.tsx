export default function Footer() {
    return (
      <footer className="bg-neutral-100 mt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-serif font-bold mb-4">News</h4>
              <ul className="space-y-2 text-sm">
                <li>Home Page</li>
                <li>World</li>
                <li>U.S.</li>
                <li>Politics</li>
                <li>New York</li>
                <li>Business</li>
                <li>Tech</li>
                <li>Science</li>
              </ul>
            </div>
  
            <div>
              <h4 className="font-serif font-bold mb-4">Opinion</h4>
              <ul className="space-y-2 text-sm">
                <li>Today&apos;s Opinion</li>
                <li>Op-Ed Contributors</li>
                <li>Letters</li>
                <li>Sunday Review</li>
                <li>Video: Opinion</li>
              </ul>
            </div>
  
            <div>
              <h4 className="font-serif font-bold mb-4">Arts</h4>
              <ul className="space-y-2 text-sm">
                <li>Today&apos;s Arts</li>
                <li>Art & Design</li>
                <li>Books</li>
                <li>Dance</li>
                <li>Movies</li>
                <li>Music</li>
                <li>Television</li>
                <li>Theater</li>
              </ul>
            </div>
  
            <div>
              <h4 className="font-serif font-bold mb-4">Living</h4>
              <ul className="space-y-2 text-sm">
                <li>Automobiles</li>
                <li>Games</li>
                <li>Education</li>
                <li>Food</li>
                <li>Health</li>
                <li>Jobs</li>
                <li>Magazine</li>
                <li>Real Estate</li>
              </ul>
            </div>
          </div>
  
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} The New York Times Clone. All rights reserved.</p>
            <p className="mt-2">
              This is a demo clone created for educational purposes only. Not affiliated with The New York Times.
            </p>
          </div>
        </div>
      </footer>
    );
  }