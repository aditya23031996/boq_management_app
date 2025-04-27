import Header from "./Header";
import Footer from "./Footer";
import BackToTopButton from "./BackToTopButton"; // 👈 Import it!

function PageLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">{children}</main>
      <Footer />
      <BackToTopButton /> {/* 👈 Add it here */}
    </div>
  );
}

export default PageLayout;
