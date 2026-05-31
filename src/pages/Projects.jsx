import { Link } from 'react-router-dom';
import { useContent } from '../content/ContentContext.jsx';
import ProjectListItem from '../components/ProjectListItem.jsx';

export default function Projects() {
  const { status, data, error } = useContent();

  if (status === 'loading') return <div className="home"><main>Loading…</main></div>;
  if (status === 'error') {
    return (
      <div className="home">
        <main>
          <p>Failed to load content: {error?.message}</p>
        </main>
      </div>
    );
  }

  const { projects, site } = data;
  const nonFeatured = projects.filter((p) => !p.featured);

  return (
    <div className="home">
      <main>
        <div className="topbar" style={{ marginBottom: '2.6rem' }}>
          <Link to="/" aria-label="back">←</Link>
          <span className="path">~/projects</span>
        </div>

        <header className="line">
          <h1>projects</h1>
          <p className="role">everything else I've made</p>
        </header>

        <section className="line">
          <p className="label">// projects</p>
          {nonFeatured.length === 0 ? (
            <p style={{ color: 'var(--muted)' }}>No additional projects yet.</p>
          ) : (
            <ul className="work">
              {nonFeatured.map((p) => (
                <ProjectListItem key={p.slug} project={p} />
              ))}
            </ul>
          )}
        </section>

        {site.footer && <footer className="line">{site.footer}</footer>}
      </main>
    </div>
  );
}
