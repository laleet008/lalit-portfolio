/*
 * Recreation of Chai & Co.'s hero: paper sky, three ridgelines, and a matte
 * tin with its label — all SVG, like the original.
 */
export function ChaiPoster() {
  return (
    <svg aria-hidden viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <rect width="800" height="500" fill="#F4F0E8" />
      <circle cx="610" cy="120" r="46" fill="#C9A227" opacity="0.18" />
      <path d="M0 330 C120 270 210 300 300 262 S500 230 590 270 S740 250 800 230 V500 H0Z" fill="#4F6F52" opacity="0.28" />
      <path d="M0 380 C140 330 240 360 360 320 S560 300 660 340 S760 330 800 320 V500 H0Z" fill="#4F6F52" opacity="0.5" />
      <path d="M0 430 C160 400 280 420 420 392 S640 380 800 400 V500 H0Z" fill="#1A1714" opacity="0.85" />
      <g transform="translate(330 150)">
        <ellipse cx="70" cy="252" rx="78" ry="10" fill="#1A1714" opacity="0.25" />
        <rect x="0" y="22" width="140" height="228" rx="10" fill="#C9A227" />
        <rect x="-4" y="6" width="148" height="34" rx="8" fill="#B08C1F" />
        <rect x="14" y="78" width="112" height="128" rx="4" fill="#F4F0E8" />
        <text x="70" y="108" textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" fill="#1A1714">
          Chai &amp; Co.
        </text>
        <line x1="40" y1="118" x2="100" y2="118" stroke="#C9A227" strokeWidth="1.5" />
        <text x="70" y="148" textAnchor="middle" fontFamily="Georgia, serif" fontSize="19" fontWeight="600" fill="#1A1714">
          MIST
        </text>
        <path d="M70 162 c-8 6 -8 18 0 24 c8 -6 8 -18 0 -24z" fill="#C9A227" />
        <text x="70" y="198" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="6.5" letterSpacing="1.5" fill="#1A1714">
          ILAM · NEPAL · 1,900 M
        </text>
      </g>
      <text x="40" y="70" fontFamily="Georgia, serif" fontSize="34" fill="#1A1714">
        Grown in the clouds.
      </text>
      <text x="40" y="98" fontFamily="system-ui, sans-serif" fontSize="10" letterSpacing="3" fill="#B3541E">
        ILAM · EASTERN NEPAL · EST. 1971
      </text>
    </svg>
  );
}
