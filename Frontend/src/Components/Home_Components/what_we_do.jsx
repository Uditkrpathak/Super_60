import React from 'react';
import { motion } from 'framer-motion';

const GRID_COLUMNS = 5;
const GRID_ROWS = 6;

// Define your custom content for each row
const getInitialGrid = () => {
  const rowsData = [
    // Row 0 - Pattern: col1, IMAGE(col2), COMBINED(col3-4), col5
    {
      items: [
        { content: "", bgColor: "bg-transparent", textColor: "text-white", type: "content", span: 1 },
        { content: "Web Development", bgColor: "bg-orange-500", textColor: "text-white", type: "image", span: 1, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop" },
        { content: "Full Stack Solutions\nReact • Node.js • MongoDB", bgColor: "bg-purple-500", textColor: "text-white", type: "combined", span: 2 },
        { content: "DevOps", bgColor: "bg-red-500", textColor: "text-white", type: "content", span: 1 },
      ]
    },
    // Row 1 - Pattern: col1, COMBINED(col2-3), IMAGE(col4), col5
    {
      items: [
        { content: "React", bgColor: "bg-indigo-500", textColor: "text-white", type: "content", span: 1 },
        { content: "API Development\nRESTful • GraphQL • Microservices", bgColor: "bg-emerald-500", textColor: "text-white", type: "combined", span: 2 },
        { content: "Cloud Solutions", bgColor: "bg-cyan-500", textColor: "text-black", type: "image", span: 1, image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop" },
        { content: "Docker", bgColor: "bg-slate-600", textColor: "text-white", type: "content", span: 1 },
      ]
    },
    // Row 2 - Pattern: col1, IMAGE(col2), COMBINED(col3-4), col5
    {
      items: [
        { content: "UI/UX", bgColor: "bg-pink-500", textColor: "text-white", type: "content", span: 1 },
        { content: "Design Systems", bgColor: "bg-teal-500", textColor: "text-white", type: "image", span: 1, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop" },
        { content: "Database Solutions\nMySQL • PostgreSQL • MongoDB", bgColor: "bg-amber-500", textColor: "text-black", type: "combined", span: 2 },
        { content: "Security", bgColor: "bg-rose-500", textColor: "text-white", type: "content", span: 1 },
      ]
    },
    // Row 3 - Pattern: col1, COMBINED(col2-3), IMAGE(col4), col5
    {
      items: [
        { content: "Analytics", bgColor: "bg-violet-500", textColor: "text-white", type: "content", span: 1 },
        { content: "E-commerce Solutions\nShopify • WooCommerce • Custom", bgColor: "bg-sky-500", textColor: "text-white", type: "combined", span: 2 },
        { content: "AI & Machine Learning", bgColor: "bg-fuchsia-500", textColor: "text-white", type: "image", span: 1, image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop" },
        { content: "Support", bgColor: "bg-neutral-600", textColor: "text-white", type: "content", span: 1 },
      ]
    },
    // Row 4 - Pattern: col1, IMAGE(col2), COMBINED(col3-4), col5
    {
      items: [
        { content: "Consulting", bgColor: "bg-blue-600", textColor: "text-white", type: "content", span: 1 },
        { content: "Digital Strategy", bgColor: "bg-green-600", textColor: "text-white", type: "image", span: 1, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
        { content: "Maintenance & Support\n24/7 Support • Updates • Monitoring", bgColor: "bg-purple-600", textColor: "text-white", type: "combined", span: 2 },
        { content: "Integration", bgColor: "bg-red-600", textColor: "text-white", type: "content", span: 1 },
      ]
    },
    // Row 5 - Pattern: col1, COMBINED(col2-3), IMAGE(col4), col5
    {
      items: [
        { content: "Strategy", bgColor: "bg-indigo-600", textColor: "text-white", type: "content", span: 1 },
        { content: "Deployment & Scaling\nAWS • Azure • Google Cloud", bgColor: "bg-emerald-600", textColor: "text-white", type: "combined", span: 2 },
        { content: "Performance Optimization", bgColor: "bg-orange-600", textColor: "text-white", type: "image", span: 1, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
        { content: "Scale", bgColor: "bg-slate-700", textColor: "text-white", type: "content", span: 1 },
      ]
    },
  ];

  return rowsData;
};

const ChessGrid = () => {
  const [gridData, setGridData] = React.useState(getInitialGrid);
  const [activeItems, setActiveItems] = React.useState(new Set());

  const toggleItem = (rowIndex, itemIndex) => {
    const itemId = `${rowIndex}-${itemIndex}`;
    const newActiveItems = new Set(activeItems);
    
    if (newActiveItems.has(itemId)) {
      newActiveItems.delete(itemId);
    } else {
      newActiveItems.add(itemId);
    }
    
    setActiveItems(newActiveItems);
  };

  const renderGridItem = (item, rowIndex, itemIndex) => {
    const itemId = `${rowIndex}-${itemIndex}`;
    const isActive = activeItems.has(itemId);

    // Significantly increased height for all cards to fit only 2-2.5 rows on screen
    const cardHeight = "h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96";

    if (item.type === 'image') {
      return (
        <motion.div
          key={itemId}
          onClick={() => toggleItem(rowIndex, itemIndex)}
          className={`${cardHeight} rounded-lg cursor-pointer transition-all duration-300 overflow-hidden shadow-lg border-2 relative ${
            isActive 
              ? 'border-orange-400 shadow-orange-200 scale-105' 
              : 'border-transparent hover:border-gray-300'
          }`}
          style={{ gridColumn: `span ${item.span}` }}
          whileHover={{ scale: isActive ? 1.05 : 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src={item.image} 
            alt={item.content}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${item.bgColor} bg-opacity-80 flex items-center justify-center`}>
            <span className={`select-none text-center px-4 font-bold text-lg md:text-xl lg:text-2xl ${item.textColor}`}>
              {item.content}
            </span>
          </div>
        </motion.div>
      );
    }

    if (item.type === 'combined') {
      return (
        <motion.div
          key={itemId}
          onClick={() => toggleItem(rowIndex, itemIndex)}
          className={`${cardHeight} rounded-lg cursor-pointer transition-all duration-300 flex flex-col items-center justify-center font-bold shadow-lg border-2 p-6 ${
            isActive 
              ? 'border-orange-400 shadow-orange-200 scale-105' 
              : 'border-transparent hover:border-gray-300'
          } ${item.bgColor} ${item.textColor}`}
          style={{ gridColumn: `span ${item.span}` }}
          whileHover={{ scale: isActive ? 1.05 : 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="select-none text-center leading-relaxed">
            {item.content.split('\n').map((line, index) => (
              <div key={index} className={index === 0 ? 'text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4' : 'text-base md:text-lg lg:text-xl opacity-90'}>
                {line}
              </div>
            ))}
          </div>
        </motion.div>
      );
    }

    // Regular content item
    return (
      <motion.div
        key={itemId}
        onClick={() => toggleItem(rowIndex, itemIndex)}
        className={`${cardHeight} rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center font-bold shadow-lg border-2 ${
          isActive 
            ? 'border-orange-400 shadow-orange-200 scale-105' 
            : 'border-transparent hover:border-gray-300'
        } ${item.bgColor} ${item.textColor}`}
        style={{ gridColumn: `span ${item.span}` }}
        whileHover={{ scale: isActive ? 1.05 : 1.02 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="select-none text-center px-2 leading-tight text-lg md:text-xl lg:text-2xl">
          {item.content}
        </span>
      </motion.div>
    );
  };

  return (
    <section className="w-full min-h-screen bg-white text-black flex flex-col items-center justify-start pt-8 md:pt-20 px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 md:mb-10 text-orange-500 text-center">What we do?</h1>

      <div className="w-full mx-auto">
        <div className="space-y-3 md:space-y-4 lg:space-y-6">
          {gridData.map((row, rowIndex) => (
            <div 
              key={rowIndex}
              className="grid gap-3 md:gap-4 lg:gap-6"
              style={{
                gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
              }}
            >
              {row.items.map((item, itemIndex) => 
                renderGridItem(item, rowIndex, itemIndex)
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active items display for debugging */}
      <div className="mt-8 text-sm text-gray-600 max-w-4xl">
        <details>
          <summary className="cursor-pointer font-semibold">View Active Items (for debugging)</summary>
          <div className="mt-2 p-4 bg-gray-100 rounded">
            Active items: {Array.from(activeItems).join(', ') || 'None'}
          </div>
        </details>
      </div>
    </section>
  );
};

export default ChessGrid;