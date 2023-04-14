"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Logged() {
  return (
    <li className="flex gap-8 items-center">
      <button onClick={() => signOut()}>Sign Out</button>
    </li>
  );
}
