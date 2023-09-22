import { IBM_Plex_Sans } from "next/font/google";

const logo = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-logo",
});

type props = {
  children: any;
};

const PageContainer: React.FC<props> = ({ children }) => {
  return (
    <main className={`fixed inset-0 z-0 overflow-y-auto ${logo.variable}`}>
      {children}
    </main>
  );
};

export default PageContainer;
