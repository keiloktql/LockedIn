export const H1 = ({ text }) => (
  <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    {text}
  </h1>
);

export const H2 = ({ text }) => (
  <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
    {text}
  </h2>
);

export const H3 = ({ text }) => (
  <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{text}</h3>
);

export const H4 = ({ text }) => (
  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{text}</h4>
);

export const P = ({ text }) => (
  <p className="leading-7 [&:not(:first-child)]:mt-6">{text}</p>
);

export const Blockquote = ({ text }) => (
  <blockquote className="mt-6 border-l-2 pl-6 italic">{text}</blockquote>
);

export const InlineCode = ({ text }) => (
  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
    {text}
  </code>
);
