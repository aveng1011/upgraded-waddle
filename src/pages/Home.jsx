import { Link } from 'react-router-dom';
import { useContent } from '../content/ContentContext.jsx';
import ProjectListItem from '../components/ProjectListItem.jsx';

export default function Home() {
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

  const { site, projects } = data;
  const featured = projects.filter((p) => p.featured);
  const hasMore = projects.some((p) => !p.featured);

  return (
    <div className="home">
      <main>
        <header className="line">
          <h1>{site.name}</h1>
          {site.role && <p className="role">{site.role}</p>}
        </header>

        {site.bio && (
          <p className="bio line" dangerouslySetInnerHTML={{ __html: site.bio }} />
        )}

        {featured.length > 0 && (
          <section className="line">
            <p className="label">// selected work</p>
            <ul className="work">
              {featured.map((p) => (
                <ProjectListItem key={p.slug} project={p} />
              ))}
            </ul>
            {hasMore && (
              <p style={{ marginTop: '1.4rem' }}>
                <Link to="/projects">→ all projects</Link>
              </p>
            )}
          </section>
        )}

        {site.links?.length > 0 && (
          <section className="line">
            <p className="label">// contact</p>
            <ul className="links">
              {site.links.map((link) => (
                <li key={link.key}>
                  <span className="key">{link.key}</span>
                  <a href={link.url}>{link.label ?? link.url}</a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {site.footer && <footer className="line">{site.footer}</footer>}
      </main>
    </div>
  );
}
