import Head from "./head";
import HeaderNav from "./header-nav";
import Footer from "./footer";
import type { ReactElement } from "react";

type Props = {
  children: ReactElement;
  title?: string;
  metaDescription?: string;
};

function Layout(props: Props) {
  return (
    <div>
      <Head title={props.title} metaDescription={props.metaDescription} />
      <HeaderNav />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
