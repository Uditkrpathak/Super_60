import React from 'react';
import { motion } from 'framer-motion';

const GRID_COLUMNS = 5;
const GRID_ROWS = 6; // You can increase/decrease this as needed

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    const rowItems = [];
    for (let col = 0; col < GRID_COLUMNS; col++) {
      rowItems.push({ id: `${row}-${col}`, active: false });
    }
    grid.push(rowItems);
  }
  return grid;
};

const ChessGrid = () => {
  const [grid, setGrid] = React.useState(getInitialGrid);

  const toggleBox = (rowIndex, colIndex) => {
    const updated = grid.map((row, rIdx) =>
      row.map((box, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex
          ? { ...box, active: !box.active }
          : box
      )
    );
    setGrid(updated);
  };

  return (
    <section className="w-full min-h-screen bg-[#0B0D1A] text-white flex flex-col items-center justify-start pt-20 px-4">
      <h1 className="text-5xl font-bold mb-10 text-orange-500">Interactive Grid</h1>

      <div className="grid" style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_COLUMNS}, 120px)`,
        gap: '12px'
      }}>
        {grid.map((row, rowIndex) =>
          row.map((box, colIndex) => (
            <motion.div
              key={box.id}
              onClick={() => toggleBox(rowIndex, colIndex)}
              className={`w-[120px] h-[120px] rounded-lg cursor-pointer transition duration-300 flex items-center justify-center font-bold text-lg shadow-lg
                ${box.active ? 'bg-orange-500 text-black' : 'bg-slate-800 text-white'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {box.id}
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default ChessGrid;