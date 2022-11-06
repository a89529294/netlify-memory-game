import cx from "classix";
import { useState } from "react";
import GameInfo from "./components/GameInfo";

import Logo from "./components/Logo";

const cells = new Array(16).fill("");

export default function App() {
  const [selectedCells, selectCells] = useState<number[]>([]);

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
              className="bg-gray-500 w-32 h-28 rounded-md text-gray-100 hover:bg-cyan-900 hover:text-teal-300 relative"
              onClick={() => selectedCells.length < 2 && selectCells((pv) => [...pv, i])}>
              <div className="absolute inset-0 grid place-items-center [backface-visibility:hidden]">
                <Logo />
              </div>
              <div
                className={cx(
                  "absolute inset-0 grid place-items-center [backface-visibility:hidden] ",
                  selectedCells.includes(i) ? "" : "[transform:rotateY(180deg)]"
                )}>
                <span className="text-6xl">🤩</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
