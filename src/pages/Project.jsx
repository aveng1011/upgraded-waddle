import { Link, useParams } from 'react-router-dom';
import { useContent, useProject } from '../content/ContentContext.jsx';
import DefaultThumb from '../components/DefaultThumb.jsx';

function resolveAsset(path) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, '')}`;
}

export default function Project() {
  const { slug } = useParams();
  const { status, error } = useContent();
  const project = useProject(slug);

  if (status === 'loading') {
    return <div className="project"><main>Loading…</main></div>;
  }
  if (status === 'error') {
    return (
      <div className="project">
        <main>
          <p>Failed to load content: {error?.message}</p>
        </main>
      </div>
    );
  }
  if (!project) {
    return (
      <div className="project">
        <main>
          <div className="topbar">
            <Link to="/" aria-label="back">←</Link>
            <span className="path">~/projects/{slug}</span>
          </div>
          <h1>not found</h1>
          <p className="tagline">No project with slug “{slug}”.</p>
          <p>
            <Link to="/projects">→ see all projects</Link>
          </p>
        </main>
      </div>
    );
  }

  const heroSrc = resolveAsset(project.hero);

  return (
    <div className="project">
      <main>
        <div className="topbar">
          <Link to="/" aria-label="back">←</Link>
          <span className="path">~/work/{project.slug}</span>
        </div>

        <header>
          <h1>{project.title}</h1>
          {project.tagline && <p className="tagline">{project.tagline}</p>}

          {(project.status || project.year || project.tech || project.links?.length > 0) && (
            <div className="meta-bar">
              {project.status && (
                <span className="status">
                  <span className="dot" />
                  {project.status}
                </span>
              )}
              {project.year && (
                <>
                  <span className="sep">·</span>
                  <span>{project.year}</span>
                </>
              )}
              {project.tech && (
                <>
                  <span className="sep">·</span>
                  <span>{project.tech}</span>
                </>
              )}
              {project.links?.map((link) => (
                <span key={link.key + link.url}>
                  <span className="sep">·</span>
                  <a href={link.url}>{link.label ?? link.key}</a>
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="hero" aria-label={`${project.title} overview`}>
          {heroSrc ? (
            <img src={heroSrc} alt={`${project.title} hero`} />
          ) : (
            <DefaultThumb slug={project.slug} />
          )}
        </div>

        {project.sections?.map((section, idx) => (
          <section key={idx}>
            {section.label && <p className="label">{section.label}</p>}
            {section.paragraphs?.map((para, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </section>
        ))}

        {project.gallery?.length > 0 && (
          <section>
            <p className="label">// gallery</p>
            <div className="gallery">
              {project.gallery.map((img, i) => {
                const src = resolveAsset(img.src);
                return (
                  <figure key={i}>
                    <div className="tile">
                      {src ? <img src={src} alt={img.alt ?? ''} /> : <DefaultThumb slug={`${project.slug}-${i}`} />}
                    </div>
                    {img.caption && <figcaption>{img.caption}</figcaption>}
                  </figure>
                );
              })}
            </div>
          </section>
        )}

        <footer>
          <Link to="/projects">← all projects</Link>
          <Link to="/">home</Link>
        </footer>
      </main>
    </div>
  );
}
