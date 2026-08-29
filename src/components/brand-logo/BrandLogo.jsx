export default function BrandLogo() {
  return (
    <svg
      className="bb-brand-logo"
      viewBox="0 0 48 48"
      role="img"
      aria-label="ByteBank"
    >
      <defs>
        <linearGradient id="bb-brand-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b34cff" />
          <stop offset="100%" stopColor="#6b24df" />
        </linearGradient>
      </defs>

      <rect width="48" height="48" rx="14" fill="url(#bb-brand-gradient)" />

      <path
        d="M17 12H27.5C33.2 12 36.5 14.9 36.5 19.2C36.5 22.1 34.9 24.2 32.2 25.2C35.6 26.1 37.5 28.5 37.5 31.8C37.5 36.7 33.8 39 27.6 39H17V12ZM26.4 23.2C29.1 23.2 30.6 22.1 30.6 20.1C30.6 18.2 29.2 17.2 26.6 17.2H22.9V23.2H26.4ZM27.1 33.8C30 33.8 31.6 32.6 31.6 30.4C31.6 28.3 30 27.1 27 27.1H22.9V33.8H27.1Z"
        fill="white"
      />
    </svg>
  );
}
