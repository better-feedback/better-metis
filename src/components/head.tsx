import Head from "next/head";
import config from "../config";

type Props = {
  title?: string;
  metaDescription?: string;
};

function CustomHead(props: Props) {
  return (
    <Head>
      <title>
        {props.title ? `${props.title} | ` : ""}
        {config.siteTitle}
      </title>
      <meta name="description" content={props.metaDescription} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default CustomHead;
