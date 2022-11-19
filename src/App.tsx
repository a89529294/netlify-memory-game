import cx from "classix";
import { useEffect, useState } from "react";
import GameInfo from "./components/GameInfo";

import Logo from "./components/Logo";

const cells = new Array(16).fill("").map((_, i) => i);
const emojis = ["😀", "😆", "😂", "🤣", "😍", "🥰", "🤪", "😋", "🥳", "🥶", "😭", "😴", "🤮", "👹"];
const finalEmojiArray: string[] = [];

for (let i = 0; i < 8; i++) {
  const randEmojiIdx = Math.floor(Math.random() * emojis.length);
  const emoji = emojis.splice(randEmojiIdx, 1)[0];

  const randIdx = Math.floor(Math.random() * cells.length);
  const indexForEmoji1 = cells.splice(randIdx, 1)[0];

  const randIdx2 = Math.floor(Math.random() * cells.length);
  const indexForEmoji2 = cells.splice(randIdx2, 1)[0];

  finalEmojiArray[indexForEmoji1] = emoji;
  finalEmojiArray[indexForEmoji2] = emoji;
}

export default function App() {
  const [selectedCells, selectCells] = useState<{ idx: number; emoji: string }[]>([]);
  const [correctCells, setCorrectCells] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const pairsMatched = correctCells.length / 2;
  useEffect(() => {
    if (selectedCells.length === 2) {
      if (selectedCells[0].emoji === selectedCells[1].emoji) {
        setCorrectCells((pv) => [...pv, selectedCells[0].idx, selectedCells[1].idx]);
      }
      setTimeout(() => selectCells([]), 1000);
    }
  }, [selectedCells]);
  return (
    <main className="grid place-items-center h-screen w-screen bg-gradient-to-r from-gray-400 via-gray-600 to-blue-800">
      <div className="bg-[rgb(21,26,30)] p-6 rounded-lg grid gap-5">
        <h1 className="text-xl text-white border-b border-slate-600 pb-2">Match the pairs 🤔</h1>
        <div className="grid grid-cols-4 gap-5">
          <GameInfo label="Pairs matched">
            <h2 className="text-xl">
              {pairsMatched}
              <span className="text-gray-400 text-base">/8</span>
            </h2>
          </GameInfo>
          <GameInfo label="Total moves">
            <h2 className="text-xl">{moves}</h2>
          </GameInfo>
          {finalEmojiArray.map((emoji, i) => {
            const flip = selectedCells.map((c) => c.idx).includes(i) || correctCells.includes(i);
            return (
              <button
                key={i}
                className=" w-32 h-28 rounded-md text-gray-100 [perspective:1000px]"
                onClick={() => {
                  if (selectedCells.length >= 2 || correctCells.includes(i)) return;
                  selectCells((pv) => [...pv, { emoji, idx: i }]);
                  setMoves((pv) => ++pv);
                }}>
                <div
                  className={cx(
                    "[transform-style:preserve-3d] transition-transform duration-300 relative h-full bg-gray-500 hover:bg-cyan-900 hover:text-teal-300 ",
                    flip ? "[transform:rotateY(180deg)]" : ""
                  )}>
                  <div className="[transform-style:preserve-3d] absolute w-full h-full grid place-items-center [backface-visibility:hidden]">
                    <Logo />
                  </div>
                  <div
                    className={cx(
                      "[transform-style:preserve-3d] absolute w-full h-full grid place-items-center [backface-visibility:hidden] [transform:rotateY(180deg)]"
                    )}>
                    <span className="text-6xl">{emoji}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
