import React, { ReactNode } from "react";
import cx from "classix";

function GameInfo({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "bg-[rgb(28,33,38)] p-2 rounded-md grid gap-2 text-white/90 col-span-2",
        className
      )}>
      <h3>{label}</h3>
      {children}
    </div>
  );
}

export default GameInfo;
