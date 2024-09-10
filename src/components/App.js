// import React from "react";
// import Header from "./Header";
// import MainContainer from "./MainContainer";

// function App() {
//   return (
//     <div>
//       <Header />
//       <MainContainer />
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";

function App() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortType, setSortType] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetch("API_URL") // replace with actual API
      .then((res) => res.json())
      .then((data) => setStocks(data));
  }, []);

  const handleBuyStock = (stock) => {
    setPortfolio([...portfolio, stock]);
  };

  const handleSellStock = (stockToSell) => {
    setPortfolio(portfolio.filter((stock) => stock.id !== stockToSell.id));
  };

  const handleSortChange = (sortType) => {
    setSortType(sortType);
  };

  const handleFilterChange = (filterType) => {
    setFilterType(filterType);
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortType === "Alphabetically") {
      return a.name.localeCompare(b.name);
    } else if (sortType === "Price") {
      return a.price - b.price;
    }
    return 0;
  });

  const filteredStocks = filterType
    ? sortedStocks.filter((stock) => stock.type === filterType)
    : sortedStocks;

  return (
    <div>
      <Header />
      <MainContainer
        stocks={filteredStocks}
        portfolioStocks={portfolio}
        onBuyStock={handleBuyStock}
        onSellStock={handleSellStock}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}

export default App;
