import addItemStyles from "../styles/addItem.module.css";
import { useContext } from "react";
import AppContext from "../services/AppContext";

const AddItem = ({ item }) => {
  const [state, setState] = useContext(AppContext);

  const addItem = () => {
    item.quantity = 1;
    let tempCart = [...state.cart];
    tempCart.push(item);
    //ObjecT Destructuring
    //{ ...state }: This part spreads all the properties of the state object into a new object. It creates a shallow copy of the state object
    // cart: tempCart: This part of the expression specifies a new property named cart in the new object, and its value is set to the tempCart array. This effectively replaces the cart property in the copied object with the updated tempCart array.
    setState({ ...state, cart: tempCart });
  };

  const increaseQty = () => {
    item.quantity = item.quantity + 1;
    let tempCart = [...state.cart];
    let index = tempCart.findIndex((cartItem) => cartItem.id === item.id);
    if (index > -1) {
      tempCart[index].quantity = item.quantity;
    }
    setState({ ...state, cart: tempCart });
  };

  const decreaseQty = () => {
    item.quantity = item.quantity - 1;
    let tempCart = [...state.cart];
    let index = tempCart.findIndex((cartItem) => cartItem.id === item.id);
    if (index > -1) {
      tempCart[index].quantity = item.quantity;
    }
    setState({ ...state, cart: tempCart });
  };

  return (
    <div className={addItemStyles.addItemContainer}>
      {item.quantity === 0 ? (
        <button className={addItemStyles.addItemBtn} onClick={addItem}>
          Add
        </button>
      ) : (
        <div className={addItemStyles.addItem}>
          <button className={addItemStyles.minusBtn} onClick={decreaseQty}>
            -
          </button>
          <div className={addItemStyles.qty}>{item.quantity}</div>
          <button className={addItemStyles.plusBtn} onClick={increaseQty}>
            +
          </button>
        </div>
      )}
    </div>
  );
};
export default AddItem;
