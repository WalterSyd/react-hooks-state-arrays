import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  // State management
  // foods: array of spicy food objects, setFoods: function to update foods
  const [foods, setFoods] = useState(spicyFoods);
  // filterBy: current cuisine filter, setFilterBy: function to update filter
  const [filterBy, setFilterBy] = useState("All");

  // Event handlers
  // Adds a new random spicy food to the list
  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    setFoods([...foods, newFood]);
    console.log(newFood);
  }

  // Increases the heat level of a food when clicked
  function handleLiClick(id) {
    const newFoodArray = foods.map((food) => 
      food.id === id ? { ...food, heatLevel: food.heatLevel + 1 } : food
    );
    setFoods(newFoodArray);
  }

  // Updates the cuisine filter when a new option is selected
  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }

  // Helper functions
  // Filters the foods array based on the selected cuisine
  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });

  // Render functions
  // Creates list items for each food in the filtered array
  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  // Renders the dropdown for cuisine filtering
  const renderFilterSelect = () => (
    <select name="filter" onChange={handleFilterChange}>
      <option value="All">All</option>
      <option value="American">American</option>
      <option value="Mexican">Mexican</option>
      <option value="Thai">Thai</option>
      <option value="Sichuan">Sichuan</option>
    </select>
  );

  // Component render
  // Renders the main component with add button, filter dropdown, and food list
  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      {renderFilterSelect()}
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;