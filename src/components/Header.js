import cartImg from "../images/Cart.png";
import headerStyles from "../styles/header.module.css";
const Header = () => {
  return (
    <div className={headerStyles.headerContainer}>
      <div className={headerStyles.logo}>FreshKart</div>
      <div className={headerStyles.nav}>
        <div className={headerStyles.navItem}>Fruits</div>
        <div className={headerStyles.navItem}>Vegetables</div>
      </div>
      <div className={headerStyles.cart}>
        <img src={cartImg} alt="" />
        <span>Cart</span>
      </div>
      <div className={headerStyles.login}>Login</div>
    </div>
  );
};
export default Header;
