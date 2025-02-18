export const H1 = ({ children, className }) => (
  <h1
    className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}
  >
    {children}
  </h1>
);

export const H2 = ({ children, className }) => (
  <h2
    className={`scroll-m-20 text-3xl font-bold tracking-tight first:mt-0 ${className}`}
  >
    {children}
  </h2>
);

export const H3 = ({ children, className }) => (
  <h3
    className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
  >
    {children}
  </h3>
);

export const H4 = ({ children, className }) => (
  <h4
    className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
  >
    {children}
  </h4>
);

export const P = ({ children, className }) => (
  <p className={`leading-7 ${className}`}>{children}</p>
);

export const Blockquote = ({ children, className }) => (
  <blockquote className={`mt-6 border-l-2 pl-6 italic ${className}`}>
    {children}
  </blockquote>
);

export const InlineCode = ({ children, className }) => (
  <code
    className={`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className}`}
  >
    {children}
  </code>
);
