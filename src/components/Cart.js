import cartStyles from "../styles/cart.module.css";
import { useContext } from "react";
import AppContext from "../services/AppContext";
import AddItem from "./AddItem";
const Cart = () => {
  const [state, setState] = useContext(AppContext);
  return (
    <div className={cartStyles.cartContainer}>
      <div className={cartStyles.heading}>Cart</div>
      <div className={cartStyles.cartWrapper}>
        <div className={cartStyles.cartDetails}>
          {state.cart.length > 0 ? (
            <>
              {state.cart.map((item) => (
                <div className={cartStyles.cart} key={item.id}>
                  <div className={cartStyles.cartLeft}>
                    <img src={item.pic} alt="" />
                  </div>
                  <div className={cartStyles.cartMiddle}>
                    <div className={cartStyles.name}>{item.name}</div>
                    <div className={cartStyles.weight}>{item.weight}</div>
                    <div className={cartStyles.price}>
                      <div className={cartStyles.current}>Rs {item.price}</div>
                      {item.was !== item.price ? (
                        <>
                          <div className={cartStyles.was}>Rs{item.was}</div>
                          <div className={cartStyles.discount}>
                            Rs{item.was - item.price} Off
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className={cartStyles.cartRight}>
                    <AddItem item={item} />
                  </div>
                </div>
              ))}
              <div className={cartStyles.btnContainer}>
                <button className={cartStyles.orderBtn}>Place Order</button>
              </div>
            </>
          ) : (
            <div className={cartStyles.noItem}>Your Cart is Empty </div>
          )}
        </div>
        {state.cart.length > 0 ? (
          <div className={cartStyles.cartSummary}>
            <div className={cartStyles.subHeading}>Summary</div>
            <div className={cartStyles.summary}>
              <div className={cartStyles.summaryLabel}>MRP</div>
              <div className={cartStyles.summaryLabel}>Rs500</div>
            </div>
            <div className={cartStyles.summary}>
              <div className={cartStyles.summaryLabel}>Product Discount</div>
              <div className={`${cartStyles.summaryLabel} ${cartStyles.disc}`}>
                -Rs500
              </div>
            </div>
            <div className={`${cartStyles.summary} ${cartStyles.total}`}>
              <div className={cartStyles.summaryLabel}>Total Amount</div>
              <div className={cartStyles.summaryLabel}>Rs500</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Cart;
