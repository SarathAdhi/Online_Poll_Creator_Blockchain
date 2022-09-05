import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

const LinkedItem: React.FC<Props> = ({ href, className, children }) => {
  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default LinkedItem;
