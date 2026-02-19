// Wrap entire app in IIFE for encapsulation
const RecipeApp = (() => {
  'use strict';
  // ============================================
  // PRIVATE: DATA
  // ============================================

  // Your recipes array
  const recipes = [
    {
      id: 1,
      title: "Classic Spaghetti Carbonara",
      time: 25,
      difficulty: "easy",
      description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
      category: "pasta",
      ingredients: [
        "400g spaghetti",
        "200g pancetta or guanciale",
        "4 large eggs",
        "100g Pecorino Romano cheese",
        "Black pepper",
        "Salt"
      ],
      steps: [
        "Bring salted water to boil",
        "Cook spaghetti until al dente",
        {
          text: "Prepare sauce",
          substeps: [
            "Beat eggs",
            "Add grated cheese",
            "Add black pepper",
            "Mix well"
          ]
        },
        "Cook pancetta until crispy",
        "Combine hot pasta with pancetta",
        "Mix in egg mixture off heat",
        "Serve immediately"
      ]
    },

    {
      id: 2,
      title: "Chicken Tikka Masala",
      time: 45,
      difficulty: "medium",
      description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
      category: "curry",
      ingredients: [
        "500g chicken breast",
        "1 cup yogurt",
        "2 tbsp tikka masala paste",
        "1 onion",
        "400g tomato puree",
        "1/2 cup cream",
        "Oil",
        "Salt"
      ],
      steps: [
        "Marinate chicken with yogurt and spices",
        "Cook chicken pieces until lightly charred",
        "Saute onion until golden",
        "Add tomato puree and simmer",
        "Add cream and cooked chicken",
        "Simmer 10 minutes and serve"
      ]
    },

    {
      id: 3,
      title: "Homemade Croissants",
      time: 180,
      difficulty: "hard",
      description: "Buttery, flaky French pastries.",
      category: "baking",
      ingredients: [
        "500g flour",
        "300g butter",
        "300ml milk",
        "50g sugar",
        "10g yeast",
        "Salt"
      ],
      steps: [
        "Prepare dough and let rise",
        {
          text: "Laminate dough",
          substeps: [
            "Roll dough into rectangle",
            "Place butter slab in center",
            "Fold dough over butter",
            "Roll and fold 3 times"
          ]
        },
        "Shape croissants",
        "Proof until puffy",
        "Bake at 200°C for 15–20 minutes"
      ]
    },

    {
      id: 4,
      title: "Greek Salad",
      time: 15,
      difficulty: "easy",
      description: "Fresh vegetables with feta and olives.",
      category: "salad",
      ingredients: [
        "Tomatoes",
        "Cucumber",
        "Red onion",
        "Feta cheese",
        "Olives",
        "Olive oil",
        "Oregano",
        "Salt"
      ],
      steps: [
        "Chop vegetables",
        "Add olives and feta",
        "Drizzle olive oil",
        "Sprinkle oregano and salt",
        "Toss gently and serve"
      ]
    },

    {
      id: 5,
      title: "Beef Wellington",
      time: 120,
      difficulty: "hard",
      description: "Beef fillet wrapped in pastry.",
      category: "meat",
      ingredients: [
        "Beef fillet",
        "Mushrooms",
        "Puff pastry",
        "Parma ham",
        "Mustard",
        "Egg yolk",
        "Salt and pepper"
      ],
      steps: [
        "Season and sear beef",
        {
          text: "Prepare mushroom duxelles",
          substeps: [
            "Finely chop mushrooms",
            "Cook until moisture evaporates",
            "Season with salt and pepper"
          ]
        },
        "Wrap beef with ham and duxelles",
        "Enclose in puff pastry",
        "Brush with egg yolk",
        "Bake at 200°C until golden"
      ]
    },

    {
      id: 6,
      title: "Vegetable Stir Fry",
      time: 20,
      difficulty: "easy",
      description: "Mixed vegetables in savory sauce.",
      category: "vegetarian",
      ingredients: [
        "Broccoli",
        "Carrots",
        "Bell peppers",
        "Soy sauce",
        "Garlic",
        "Ginger",
        "Oil"
      ],
      steps: [
        "Heat oil in wok",
        "Add garlic and ginger",
        "Add vegetables and stir fry",
        "Pour soy sauce",
        "Cook until tender-crisp",
        "Serve hot"
      ]
    },

    {
      id: 7,
      title: "Pad Thai",
      time: 30,
      difficulty: "medium",
      description: "Thai stir-fried rice noodles.",
      category: "noodles",
      ingredients: [
        "Rice noodles",
        "Shrimp",
        "Eggs",
        "Bean sprouts",
        "Peanuts",
        "Tamarind paste",
        "Fish sauce",
        "Sugar"
      ],
      steps: [
        "Soak noodles in warm water",
        "Cook shrimp until pink",
        {
          text: "Prepare sauce",
          substeps: [
            "Mix tamarind paste",
            "Add fish sauce",
            "Add sugar",
            "Stir well"
          ]
        },
        "Push shrimp aside and scramble eggs",
        "Add noodles and sauce",
        "Toss with sprouts and peanuts",
        "Serve with lime"
      ]
    },

    {
      id: 8,
      title: "Margherita Pizza",
      time: 60,
      difficulty: "medium",
      description: "Classic pizza with mozzarella and basil.",
      category: "pizza",
      ingredients: [
        "Pizza dough",
        "Tomato sauce",
        "Fresh mozzarella",
        "Fresh basil",
        "Olive oil",
        "Salt"
      ],
      steps: [
        {
          text: "Prepare base",
          substeps: [
            "Roll dough into circle",
            "Transfer to baking tray"
          ]
        },
        "Spread tomato sauce",
        "Add mozzarella slices",
        "Bake at 220°C for 12–15 minutes",
        "Top with basil leaves",
        "Drizzle olive oil and serve"
      ]
    }
  ];

  // ============================================
  // PRIVATE: STATE
  // ============================================
  let currentFilter = 'all';
  let currentSort = 'none';
  let searchQuery = '';
  let favorites = JSON.parse(localStorage.getItem('recipeFavorites')) || [];
  let debounceTimer;

  // ============================================
  //PRIVATE: DOM REFERENCES
  // ============================================
  const recipeContainer = document.querySelector("#recipe-container");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const sortButtons = document.querySelectorAll(".sort-btn");
  const searchInput = document.querySelector('#search-input');
  const clearSearchBtn = document.querySelector('#clear-search');
  const recipeCountDisplay = document.querySelector('#recipe-count');



  // ============================================
  // FILTER FUNCTIONS
  // ============================================
  const filterBySearch = (recipes, query) => {
    if (!query || query.trim() === '') {
      return recipes;
    }

    const lowerQuery = query.toLowerCase().trim();

    return recipes.filter(recipe => {
      // TODO: Search in title
      const titleMatch = recipe.title.toLowerCase().includes(lowerQuery);

      // TODO: Search in ingredients (use .some())
      const ingredientMatch = recipe.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(lowerQuery)
      );

      // TODO: Search in description
      const descriptionMatch = recipe.description.toLowerCase().includes(lowerQuery);

      return titleMatch || ingredientMatch || descriptionMatch;
    });
  };

  const filterByDifficulty = (recipes, difficulty) =>
    recipes.filter((r) => r.difficulty === difficulty);

  const filterByTime = (recipes, maxTime) =>
    recipes.filter((r) => r.time <= maxTime);

  const applyFilter = (recipes, type) => {
    switch (type) {
      case "easy":
      case "medium":
      case "hard":
        return filterByDifficulty(recipes, type);
      case "quick":
        return filterByTime(recipes, 30);
      case "favorites":
        return filterFavorites(recipes);
      default:
        return recipes;
    }
  };
  const filterFavorites = (recipes) => {

    // TODO: Return only recipes where recipe.id is in favorites array
    // Hint: Use .filter() and check favorites.includes(recipe.id)

    return recipes.filter(recipe => favorites.includes(recipe.id));
  };




  // ============================================
  // SORT FUNCTIONS
  // ============================================
  const sortByName = (recipes) =>
    [...recipes].sort((a, b) => a.title.localeCompare(b.title));

  const sortByTime = (recipes) =>
    [...recipes].sort((a, b) => a.time - b.time);

  const applySort = (recipes, type) => {
    switch (type) {
      case "name":
        return sortByName(recipes);
      case "time":
        return sortByTime(recipes);
      default:
        return recipes;
    }
  };
  // ============================================
  // RENDER FUNCTION
  // ============================================

  // Recursive function to render steps (handles nesting)
  const renderSteps = (steps, level = 0) => {
    const listClass = level === 0 ? 'steps-list' : 'substeps-list';
    let html = `<ol class="${listClass}">`;

    steps.forEach(step => {
      if (typeof step === 'string') {
        html += `<li>${step}</li>`;
      } else {
        html += `<li>`;
        html += step.text;

        if (step.substeps && step.substeps.length > 0) {
          html += renderSteps(step.substeps, level + 1);
        }

        html += `</li>`;
      }
    });

    html += `</ol>`;
    return html;
  };

  const createStepsHTML = (steps) => {
    if (!steps || steps.length === 0) {
      return '<p>No steps available</p>';
    }
    return renderSteps(steps);
  };

  // ============================================
  // CARD CREATION (UPDATED)
  // ============================================
  const createRecipeCard = (recipe) => {
    const isFavorited = favorites.includes(recipe.id);
    const heartIcon = isFavorited ? '❤️' : '🤍';
    return `
    <div class="recipe-card" data-recipe-id="${recipe.id}">
    
      <button class="favorite-btn ${isFavorited ? 'favorited' : ''}" 
                    data-recipe-id="${recipe.id}">
                ${heartIcon}
            </button>
      <h3>${recipe.title}</h3>

      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">
          ${recipe.difficulty}
        </span>
      </div>

      <p>${recipe.description}</p>

      <div class="card-actions">
        <button class="toggle-btn"
                data-recipe-id="${recipe.id}"
                data-toggle="steps">
          📋 Show Steps
        </button>

        <button class="toggle-btn"
                data-recipe-id="${recipe.id}"
                data-toggle="ingredients">
          🥗 Show Ingredients
        </button>
      </div>

      <div class="ingredients-container"
           data-recipe-id="${recipe.id}">
        <h4>Ingredients:</h4>
        <ul>
          ${recipe.ingredients.map((i) => `<li>${i}</li>`).join("")}
        </ul>
      </div>

      <div class="steps-container"
           data-recipe-id="${recipe.id}">
        <h4>Cooking Steps:</h4>
        ${createStepsHTML(recipe.steps)}
      </div>
    </div>
  `;
  };

  const renderRecipes = (recipesToRender) => {
    recipeContainer.innerHTML = recipesToRender
      .map(createRecipeCard)
      .join("");
  };

  // ============================================
  // ACTIVE BUTTON UI
  // ============================================
  const updateActiveButtons = () => {
    filterButtons.forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.filter === currentFilter)
    );

    sortButtons.forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.sort === currentSort)
    );
  };

  // NEW: Update recipe counter
  const updateRecipeCounter = (showing, total) => {
    if (recipeCountDisplay) {
      // TODO: Set text content to "Showing X of Y recipes"
      recipeCountDisplay.textContent = `Showing ${showing} of ${total} recipes`;
    }
  };

  // ============================================
  // MAIN UPDATE FUNCTION
  // ============================================
 const updateDisplay = () => {
  let recipesToDisplay = recipes;

  recipesToDisplay = filterBySearch(recipesToDisplay, searchQuery);
  recipesToDisplay = applyFilter(recipesToDisplay, currentFilter);
  recipesToDisplay = applySort(recipesToDisplay, currentSort);

  updateRecipeCounter(recipesToDisplay.length, recipes.length);
  renderRecipes(recipesToDisplay);
  updateActiveButtons();
};


  // ============================================
  // FAVORITES MANAGEMENT
  // ============================================

  // Save favorites to localStorage
  const saveFavorites = () => {
    // TODO: Save favorites array to localStorage as JSON
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  };

  // Toggle favorite status
  const toggleFavorite = (recipeId) => {
    const id = parseInt(recipeId);

    if (favorites.includes(id)) {
      // TODO: Remove from favorites
      // Hint: Use .filter() to create array without this id
      favorites = favorites.filter(favId => favId !== id);
    } else {
      // TODO: Add to favorites
      // Hint: Use .push() to add id
      favorites.push(id);
    }

    saveFavorites();
    updateDisplay();
  };


  // ============================================
  // EVENT HANDLERS
  // ============================================
  const handleFilterClick = (event) => {
    const filterType = event.target.dataset.filter;
    currentFilter = filterType;
    updateActiveButtons();

    // Still works because updateDisplay is in the return object
    updateDisplay();
  };

  const handleSortClick = (e) => {
    currentSort = e.target.dataset.sort;
    updateActiveButtons();
    updateDisplay();
  };

  // Toggle Ingredients / Steps
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("toggle-btn")) return;

    const id = e.target.dataset.recipeId;
    const type = e.target.dataset.toggle;

    const section = document.querySelector(
      `.${type}-container[data-recipe-id="${id}"]`
    );

    section.classList.toggle("visible");
    e.target.textContent = section.classList.contains("visible")
      ? e.target.textContent.replace("Show", "Hide")
      : e.target.textContent.replace("Hide", "Show");
  });

  // ============================================
  // EVENT HANDLERS
  // ============================================



  // NEW: Search input handler
  const handleSearchInput = (event) => {
    const query = event.target.value;

    // Show/hide clear button
    if (clearSearchBtn) {
      clearSearchBtn.style.display = query ? 'block' : 'none';
    }

    // TODO: Implement debouncing

    // Clear existing timer
    clearTimeout(debounceTimer);

    // Set new timer
    debounceTimer = setTimeout(() => {
      // Update search query and display after 300ms
      searchQuery = query;
      updateDisplay();
      // YOUR CODE HERE
    }, 300);
  };

  // NEW: Clear search handler
  const handleClearSearch = () => {
    // TODO: Clear input value, query, hide button, update display
    if (searchInput) {
      searchInput.value = '';
    }
    searchQuery = '';
    if (clearSearchBtn) {
      clearSearchBtn.style.display = 'none';
    }
    updateDisplay();
  };

  // NEW: Favorite button handler (event delegation)
 const handleFavoriteClick = (event) => {
  if (!event.target.classList.contains('favorite-btn')) return;

  const recipeElement = event.target.closest('.recipe-card');
  const recipeId = parseInt(recipeElement.dataset.id);

  toggleFavorite(recipeId);
};

  // ============================================
  // PRIVATE: INITIALIZATION
  // ============================================


  // ============================================
  // EVENT LISTENER SETUP
  // ============================================
  const setupEventListeners = () => {
    // Existing listeners
    filterButtons.forEach(btn => {
      btn.addEventListener('click', handleFilterClick);
    });

    sortButtons.forEach(btn => {
      btn.addEventListener('click', handleSortClick);
    });



    // TODO: Add favorite click listener (event delegation on recipeContainer)

    if (searchInput) {
      searchInput.addEventListener('input', handleSearchInput);
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', handleClearSearch);
    }

    recipeContainer.addEventListener('click', handleFavoriteClick);

    console.log('Event listeners attached!');
  };

   const init = () => {
    console.log('🍳 RecipeJS initializing...');
    setupEventListeners();
    updateDisplay();
    console.log('✅ RecipeJS ready!');
    console.log(`📊 ${recipes.length} recipes loaded`);
    console.log(`❤️  ${favorites.length} favorites saved`);
  };


  // ============================================
  // PUBLIC API - What's accessible from outside
  // ============================================
  return {
    init: init,
    // Expose updateDisplay so filter/sort handlers can call it
    updateDisplay: updateDisplay
  };

})();
RecipeApp.init();
