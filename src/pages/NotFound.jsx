import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="home">
      <main>
        <header className="line">
          <h1>404</h1>
          <p className="role">page not found</p>
        </header>
        <p>
          <Link to="/">← home</Link>
        </p>
      </main>
    </div>
  );
}
