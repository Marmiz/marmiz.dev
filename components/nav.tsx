import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-end mx-auto px-5">
      <Link href="/">
        <a className="hover:underline px-3">Home</a>
      </Link>
      <Link href="/about">
        <a className="hover:underline">About</a>
      </Link>
    </nav>
  );
};

export default Nav;
