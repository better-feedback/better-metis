import Link from "next/link";

function Footer() {
  return (
    <div className="w-full h-40 pb-8 mt-auto text-xs text-gray-500 bg-gradient-to-b to-gray-200 from-gray-100">
      <div className="grid grid-cols-3">
        <div className="pl-8">Powered by Better © 2021</div>
        <div className="pl-8">
          <div className="block my-2 font-medium uppercase">Better</div>
          <ul className="space-y-1">
            <li>Homepage</li>
            <li>Documentation</li>
            <li>Developers</li>
          </ul>
        </div>
        <div className="pl-8">
          <div className="block my-2 font-medium uppercase">
            Your Project Here
          </div>
          <ul className="space-y-1">
            <li>Homepage</li>
            <li>Documentation</li>
            <li>Developers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
