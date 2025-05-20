import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div data-testid="layout-wrapper">
      <Header />
      <main>
        <Sidebar />
        <Content />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
