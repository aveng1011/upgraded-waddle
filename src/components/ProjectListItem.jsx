import { Link } from 'react-router-dom';
import DefaultThumb from './DefaultThumb.jsx';

function resolveAsset(path) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, '')}`;
}

export default function ProjectListItem({ project }) {
  const href = `/projects/${project.slug}`;
  const thumbSrc = resolveAsset(project.thumbnail);

  return (
    <li>
      <Link className="thumb" to={href} aria-label={`${project.title} preview`}>
        {thumbSrc ? (
          <img src={thumbSrc} alt={`${project.title} thumbnail`} />
        ) : (
          <DefaultThumb slug={project.slug} />
        )}
      </Link>
      <div className="meta-row">
        <p className="title">
          <span className="arrow">→ </span>
          <Link to={href}>{project.title}</Link>
        </p>
        {project.description && <p className="desc">{project.description}</p>}
      </div>
    </li>
  );
}
