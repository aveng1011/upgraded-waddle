// A handful of decorative SVG placeholders used when a project has no image.
// The chosen variant is deterministic per-slug so re-renders are stable.

function hashSlug(slug = '') {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return h;
}

function ArmVariant() {
  return (
    <svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect className="bg" width="160" height="120" />
      <g className="grid">
        <line x1="0" y1="40" x2="160" y2="40" />
        <line x1="0" y1="80" x2="160" y2="80" />
        <line x1="53" y1="0" x2="53" y2="120" />
        <line x1="107" y1="0" x2="107" y2="120" />
      </g>
      <rect className="mut-f" x="66" y="102" width="28" height="8" />
      <polyline
        className="acc"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="80,102 80,66 112,50 132,62"
      />
      <g className="acc-f">
        <circle cx="80" cy="102" r="3.5" />
        <circle cx="80" cy="66" r="3.5" />
        <circle cx="112" cy="50" r="3.5" />
      </g>
      <path
        className="acc"
        strokeWidth="2.5"
        strokeLinecap="round"
        d="M132 56 L141 52 M132 68 L141 72"
      />
    </svg>
  );
}

function KalmanVariant() {
  return (
    <svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect className="bg" width="160" height="120" />
      <g className="grid">
        <line x1="0" y1="40" x2="160" y2="40" />
        <line x1="0" y1="60" x2="160" y2="60" />
        <line x1="0" y1="80" x2="160" y2="80" />
      </g>
      <polyline
        className="mut"
        strokeWidth="1.5"
        points="8,70 24,52 36,80 52,44 66,76 82,40 98,68 114,48 130,74 152,54"
      />
      <path
        className="acc"
        strokeWidth="2.5"
        strokeLinecap="round"
        d="M8 70 C 40 62, 60 54, 82 54 S 132 58, 152 56"
      />
    </svg>
  );
}

function NBodyVariant() {
  return (
    <svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect className="bg" width="160" height="120" />
      <g className="mut" strokeWidth="0.8" opacity="0.5">
        <line x1="40" y1="40" x2="86" y2="66" />
        <line x1="86" y1="66" x2="120" y2="44" />
        <line x1="86" y1="66" x2="64" y2="92" />
      </g>
      <g className="acc-f">
        <circle cx="86" cy="66" r="5" />
        <circle cx="40" cy="40" r="3" />
        <circle cx="120" cy="44" r="3.5" />
      </g>
      <g className="mut-f">
        <circle cx="64" cy="92" r="2.5" />
        <circle cx="132" cy="84" r="2" />
        <circle cx="28" cy="78" r="2" />
        <circle cx="108" cy="96" r="1.8" />
        <circle cx="52" cy="58" r="1.5" />
      </g>
    </svg>
  );
}

const VARIANTS = [ArmVariant, KalmanVariant, NBodyVariant];

export default function DefaultThumb({ slug }) {
  const Variant = VARIANTS[hashSlug(slug) % VARIANTS.length];
  return <Variant />;
}
