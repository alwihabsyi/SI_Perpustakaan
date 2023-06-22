import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-sky-500 rounded-b-lg w-full h-12 text-center shadow-lg">
      <Link href="/">
        <h1 className="p-2 text-xl text-white font-sans font-semibold tracking-wider ">
          SI Perpustakaan
        </h1>
      </Link>
    </div>
  );
};

export default Header;
