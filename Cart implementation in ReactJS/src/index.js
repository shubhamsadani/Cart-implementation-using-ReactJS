import React from "react";
import ReactDOM from "react-dom";

let products = [
  {
    name: "Shampoo",
    price: 250
  },
  {
    name: "Soap",
    price: 200
  },
  {
    name: "Deo",
    price: 150
  }
];

/** This Function is to traverse through different elements of cart */
function DisplayCart({ finalCart, addCartHandler, removeCartHandler }) {
  console.log(finalCart);
  return (
    <div>
      <h1>Cart</h1>
      {finalCart.map((items) => (
        <CartContent
          name={items.name}
          price={items.price}
          quantity={items.quantity}
          adder={addCartHandler}
          remover={removeCartHandler}
        />
      ))}
    </div>
  );
}

/** This function is to display the content of each element of cart */
function CartContent({ name, price, quantity, adder, remover }) {
  return (
    <div>
      <h3>
        {name} : {price}
      </h3>
      <span>
        Quantity:
        <button onClick={() => remover(name)}>-</button>
        {quantity}
        <button onClick={() => adder(name, price)}>+</button>
      </span>
    </div>
  );
}

/** This function is to display the products */
function ProductDisplay({ name, price, addCartHandler }) {
  return (
    <div>
      <h1>
        {name} : {price}
      </h1>
      <button onClick={() => addCartHandler(name, price)}>Add to Cart</button>
    </div>
  );
}

class Cart extends React.Component {
  state = {
    cart: []
  };

  removeItem = (name) => {
    let i = 0;

    /** Used temp below because we cannot directly update this.state.cart. Updating the cart directly is also called as mutating the array. To update the array and display the changes instantly setState() should be used. */

    let temp = this.state.cart;
    while (this.state.cart.length > i) {
      if (this.state.cart[i].name === name) {
        temp[i].quantity--;
        if (temp[i].quantity === 0) {
          temp.splice(i, 1);
        }
        this.setState({ cart: temp });
        break;
      }
      i++;
    }
  };

  updateCart = (name, price) => {
    let i = 0;
    let quantity = 1;
    let availability = 0;
    let temp = this.state.cart;
    while (this.state.cart.length > i) {
      if (this.state.cart[i].name === name) {
        temp[i].quantity++;
        this.setState({ cart: temp });
        availability = 1;
        break;
      }
      i++;
    }
    if (availability === 0) {
      this.setState({
        cart: this.state.cart.concat({ name, price, quantity })
      });
    }
  };

  render() {
    return (
      <div>
        {products.map((item) => (
          /** A function can be called in ReactJS as below. These type of functions are called as "Component" in ReactJS. They are called while rendering using a tag which is similar to HTML tag. Also name,price and addCartHandler below are known as "Props" that means Properties. Props are like function parameters. */

          <ProductDisplay
            name={item.name}
            price={item.price}
            addCartHandler={this.updateCart}
          />
        ))}
        <DisplayCart
          finalCart={this.state.cart}
          addCartHandler={this.updateCart}
          removeCartHandler={this.removeItem}
        />
      </div>
    );
  }
}

ReactDOM.render(<Cart />, document.getElementById("root"));
