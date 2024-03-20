import "./App.css";

const originalGroceries = [
  {
    id: crypto.randomUUID(),
    price: 5,
    category: "veggie",
    name: "Zucchini",
    quantity: 5,
    important: true,
  },
  {
    id: crypto.randomUUID(),
    price: 25,
    category: "meat",
    name: "ground-beef",
    quantity: 1,
    important: false,
  },
];

import { useState } from "react";

function App() {
  /**
   * One state per input is a good rule-of-thumb.
   * We can aswell group all the states in an object,
   * if we want our code to be shorter.
   */
  const [groceries, setGroceries] = useState(originalGroceries);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("-1");
  const [important, setImportant] = useState(false);

  // Frontend Error handling
  const [errorMessage, setErrorMessage] = useState("");

  // You are still in JS, you can create variables, and calculate values
  // before rendering.
  const totalQuantity = groceries.reduce((acc, val) => acc + val.quantity, 0);
  const totalPrice = groceries.reduce(
    (acc, val) => acc + val.price * val.quantity,
    0
  );

  // All setter functions (for the inputs) are handled here.
  const handleName = (e) => setName(e.currentTarget.value);
  const handlePrice = (e) => setPrice(e.currentTarget.valueAsNumber);
  const handleQuantity = (e) => setQuantity(e.currentTarget.valueAsNumber);
  const handleCategory = (e) => setCategory(e.currentTarget.value);
  const handleImportant = (e) => setImportant(e.target.checked);
  // This function is extracted from the handleSubmit
  // it allows us to clean inputs / handle errors
  const validInput = () => {
    const errors = [];
    if (quantity <= 0) {
      errors.push(<li>You need to add a quantity &gt; 0</li>);
    }
    if (name === "") {
      errors.push(<li>You need to add a name</li>);
    }
    if (price <= 0) {
      errors.push(<li>You need to add a price &gt; 0</li>);
    }
    if (category === "-1") {
      errors.push(<li>You need to select a category</li>);
    }
    if (errors.length) {
      setErrorMessage(errors);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    //This is needed in order to prevent any reloading.
    event.preventDefault();

    // Check for any errors.
    if (!validInput()) {
      return;
    }

    // We now want to create the grocery and add it to the
    // groceries state

    // const newGrocery = {
    // 	id: crypto.randomUUID(),
    // 	name: name,
    // 	price: price,
    // 	quantity: quantity,
    // 	category: category,
    // }

    const newGrocery = {
      id: crypto.randomUUID(),
      name,
      price,
      quantity,
      category,
      important,
    };

    // Modify groceries so that React re-render
    setGroceries([...groceries, newGrocery]);
    // Set all the states back to their original values
    resetInputs();
  };

  const handleDecreaseQuantity = (grocery) => {
    const newGroceries = groceries.map((el) => {
      if (el.id === grocery.id) {
        const copy = { ...el };
        if (copy.quantity > 0) {
          copy.quantity--;
        }
        return copy;
      }
      return el;
    });
    setGroceries(newGroceries);
  };
  const handleIncreaseQuantity = (grocery) => {
    const newGroceries = groceries.map((el) => {
      if (el.id === grocery.id) {
        const copy = { ...el };
        copy.quantity++;
        return copy;
      }
      return el;
    });
    setGroceries(newGroceries);
  };

  const resetInputs = () => {
    setName("");
    setPrice(0);
    setCategory("-1");
    setQuantity(0);
  };
  return (
    <section>
      <h1>For my next groceries I need: {totalPrice}€</h1>
      <p>I am buying {totalQuantity} items.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name=""
            id="name"
            value={name}
            onChange={handleName}
          />
        </div>
        <div>
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            min={0}
            name=""
            id="price"
            value={price}
            onChange={handlePrice}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            name=""
            id="quantity"
            value={quantity}
            onChange={handleQuantity}
          />
        </div>
        <div>
          <label htmlFor="category">Category: </label>
          <select
            name=""
            id="category"
            value={category}
            onChange={handleCategory}
          >
            <option disabled value="-1">
              Please select a category
            </option>
            <option value="veggie">vegetable</option>
            <option value="meat">meat</option>
            <option value="fruit">fruit</option>
          </select>
        </div>

        <div>
          <label htmlFor="important">It's important</label>
          <input
            type="checkbox"
            name=""
            id="important"
            checked={important}
            onChange={handleImportant}
          />
        </div>

        <button>Create grocery</button>
      </form>

      {/* {errorMessage !== "" && <p className="error">{errorMessage}</p>} */}
      <ul className="error">{errorMessage}</ul>

      <div className="Actions"></div>

      <div className="container">
        {groceries.map((grocery) => {
          return (
            <article
              className={grocery.important && "important"}
              key={grocery.id}
            >
              <h2>{grocery.name}</h2>
              <p>{grocery.category}</p>
              <p>
                Quantity: {grocery.quantity}{" "}
                <button onClick={() => handleDecreaseQuantity(grocery)}>
                  -
                </button>
                |
                <button onClick={() => handleIncreaseQuantity(grocery)}>
                  +
                </button>
              </p>
              <p>Price: {grocery.price}€</p>
              <p>Total price: {grocery.price * grocery.quantity}€</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default App;
