import Link from "next/link";

import config from "../../shared/config";

function HeaderNav() {
  return (
    <header>
      <Link href={{ pathname: "/" }}>{config.projectName}</Link>
    </header>
  );
}

export default HeaderNav;
