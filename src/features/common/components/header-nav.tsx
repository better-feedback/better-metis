import Link from "next/link";

import ConnectWalletButton from "./connect-wallet-button";
import config from "config";

export default function HeaderNav() {
  return (
    <header className="bg-gray-800 shadow-xl">
      <nav className="container mx-auto p-4 flex flex-row justify-between items-center">
        <Link href={{ pathname: "/" }}>{config.site.projectName}</Link>
        <ConnectWalletButton />
      </nav>
    </header>
  );
}
