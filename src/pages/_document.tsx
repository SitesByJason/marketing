import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="h-full">
      <Head />
      <body className="h-full text-text antialiased">
        <Main />
        <NextScript />
        <div id="modal"></div>
      </body>
    </Html>
  );
}
