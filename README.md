
# 🧠 Menu Decider Web App 🍽️

A smart weekly meal planner that generates **3 unique meal combos per day** based on calorific value, taste profile, and freshness constraints. Users can select any day of the week to see curated combos with details like calorie count and dominant meal type (Spicy, Savory, or Sweet).

---

## 🌐 Live Website

👉 [Click here to view the live app](https://stellar-fudge-38b36b.netlify.app/)

> 🔁 Replace the above link with your actual deployed URL (e.g., from Vercel, Netlify, or Vultr).

---

## 📁 Dataset Used

- **menu_data.csv**: Contains 5 dishes, 4 desserts, and 4 drinks, each with:
  - Name
  - Category (`Dish`, `Dessert`, `Drink`)
  - Calorific Value
  - Type (`Spicy`, `Savory`, `Sweet`)

- **sample_output.json**: Shows the expected JSON output format for daily combos.

---

## 🧠 Core Features

- ✅ 7-Day Rolling Meal Planner
- ✅ 3 Unique Combos per Day
- ✅ Each Combo = 1 Dish + 1 Dessert + 1 Drink
- ✅ No duplicate dish in the same day's combos
- ✅ Same combo does not repeat for the next 3 days
- ✅ Calories computed for each combo
- ✅ Each day shows a **dominant flavor type**
- ✅ Responsive, clean UI
- ✅ JSON Output matches provided format

---

## 🧪 Sample Output

```json
{
  "day": "Monday",
  "dominant_type": "Spicy",
  "combos": [
    {
      "main": "Paneer Butter Masala",
      "side": "Rasgulla",
      "drink": "Lassi",
      "total_calories": 670,
      "reasoning": "Balanced nutrition, spicy main dish dominates the combo"
    }
  ]
}
```

---

## 💡 Technologies Used

* **Frontend**: HTML, CSS, JavaScript (or React.js)
* **Backend**: Node.js or Python (Flask/FastAPI) *(if dynamic combo generation is server-driven)*
* **Data Parsing**: CSV and JSON processing
* **Deployment**: Vercel / Netlify / Vultr / Render (your choice)

---

## 🚀 How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/menu-decider.git
   cd menu-decider
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm start
   ```

4. Open your browser at `http://localhost:3000`

---

## ✍️ Author

**Anjali Singh**  
*B.Tech CSE (Cloud), Web + AI Enthusiast*

---

## 📜 License

MIT License. Free to use and modify with credits.
