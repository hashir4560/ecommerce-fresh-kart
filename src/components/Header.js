import headerStyles from "../styles/header.module.css";
import cartImg from "../images/Cart.png";
import { useContext } from "react";
import AppContext from "../services/AppContext";
import { NavLink } from "react-router-dom";
import userImg from "../images/User.png";

const Header = () => {
  const [state, setState] = useContext(AppContext);

  return (
    <div className={headerStyles.headerContainer}>
      <div className={headerStyles.logo}>
        <NavLink to="/home">Freshkart</NavLink>
      </div>
      <div className={headerStyles.nav}>
        <div className={headerStyles.navItem}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${headerStyles.active}` : ""
            }
            to="/items/fruits"
          >
            Fruits
          </NavLink>
        </div>
        <div className={headerStyles.navItem}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${headerStyles.active}` : ""
            }
            to="/items/vegetables"
          >
            Vegetables
          </NavLink>
        </div>
      </div>
      <div className={headerStyles.cart}>
        <NavLink to="/cart">
          <img src={cartImg} alt="" />
          {state.cart.length > 0 ? (
            <div className={headerStyles.count}>{state.cart.length}</div>
          ) : null}
          <span>Cart</span>
        </NavLink>
      </div>
    </div>
  );
};
export default Header;
