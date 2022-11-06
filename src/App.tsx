import cx from "classix";
import { useEffect, useState } from "react";
import GameInfo from "./components/GameInfo";

import Logo from "./components/Logo";

const cells = new Array(16).fill("");

export default function App() {
  const [selectedCells, selectCells] = useState<number[]>([]);

  useEffect(() => {
    if (selectedCells.length === 2) {
      setTimeout(() => selectCells([]), 2000);
    }
  }, [selectedCells]);
  return (
    <main className="grid place-items-center h-screen w-screen bg-gradient-to-r from-gray-400 via-gray-600 to-blue-800">
      <div className="bg-[rgb(21,26,30)] p-6 rounded-lg grid gap-5">
        <h1 className="text-xl text-white border-b border-slate-600 pb-2">Match the pairs 🤔</h1>
        <div className="grid grid-cols-4 gap-5">
          <GameInfo label="Pairs matched">
            <h2 className="text-xl">
              1<span className="text-gray-400 text-base">/8</span>
            </h2>
          </GameInfo>
          <GameInfo label="Total moves">
            <h2 className="text-xl">4</h2>
          </GameInfo>
          {cells.map((_c, i) => (
            <button
              key={i}
              className=" w-32 h-28 rounded-md text-gray-100 [perspective:1000px]"
              onClick={() =>
                selectedCells.length < 2 && selectCells((pv) => [...new Set([...pv, i])])
              }>
              <div
                className={cx(
                  "[transform-style:preserve-3d] transition-transform duration-300 relative h-full bg-gray-500 hover:bg-cyan-900 hover:text-teal-300 ",
                  selectedCells.includes(i) ? "[transform:rotateY(180deg)]" : ""
                )}>
                <div className="[transform-style:preserve-3d] absolute w-full h-full grid place-items-center [backface-visibility:hidden]">
                  <Logo />
                </div>
                <div
                  className={cx(
                    "[transform-style:preserve-3d] absolute w-full h-full grid place-items-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  )}>
                  <span className="text-6xl">🤩</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
