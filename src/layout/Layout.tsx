import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <Content />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
