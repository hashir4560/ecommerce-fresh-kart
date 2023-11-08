import React, { useContext, useEffect, useState } from "react";
import Banner from "./Banner";
import Cards from "./Cards";
import Popular from "./Popular";
import AppContext from "../services/AppContext";
import axios from "axios"; // Import axios
import { toast } from "react-toastify";
import useApi from "../db";

const Home = () => {
  const [state, setState] = useContext(AppContext);
  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);

  const api = useApi();

  const fetchProducts = () => {
    api
      .getAllItems()
      .then((res) => {
        let products = res.data.data;
        for (let product of products) {
          product.quantity = 0;
        }
        categorizeProducts(products);
        setState({ ...state, products });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);

        toast.error("Error Fetching Products. Please Try Again");
      });
  };

  const categorizeProducts = (products) => {
    let tempFruits = [];
    let tempVegetables = [];
    for (let product of products) {
      if (product.type === "fruits" && product.popular === 1) {
        tempFruits.push(product);
      }
      if (product.type === "vegetables" && product.popular === 1) {
        tempVegetables.push(product);
      }
    }
    setFruits(tempFruits);
    setVegetables(tempVegetables);
  };

  useEffect(() => {
    if (state.products.length === 0) {
      fetchProducts();
    } else {
      categorizeProducts(state.products);
    }
  }, []);

  return (
    <>
      <Banner />
      <Cards />
      <Popular title="Popular Fruits" items={fruits} />
      <Popular title="Popular Vegetables" items={vegetables} />
    </>
  );
};

export default Home;

// import React, { useContext, useEffect, useState } from "react";
// import Banner from "./Banner";
// import Cards from "./Cards";
// import Popular from "./Popular";
// import AppContext from "../services/AppContext";
// import useApi from "../db";

// const Home = () => {
//   const [state, setState] = useContext(AppContext);
//   const [fruits, setFruits] = useState([]);
//   const [vegetables, setVegetables] = useState([]);

//   const api = useApi();

//   const fetchProducts = () => {
//     api
//       .getAllItems()
//       .then((res) => {
//         let products = res.data.data;
//         for (let product of products) {
//           product.quantity = 0;
//         }
//         setState({ ...state, products });
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   };

//   const fetchPopularFruits = () => {
//     api
//       .getAllPopularItems("fruits")
//       .then((res) => {
//         setFruits(res.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching popular fruits:", error);
//       });
//   };

//   const fetchPopularVegetables = () => {
//     api
//       .getAllPopularItems("vegetables")
//       .then((res) => {
//         setVegetables(res.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching popular vegetables:", error);
//       });
//   };

//   useEffect(() => {
//     if (state.products.length === 0) {
//       fetchProducts();
//     }

//     // Fetch popular fruits and vegetables
//     fetchPopularFruits();
//     fetchPopularVegetables();

//     // If you want to make additional API calls for specific popular items, you can call them here.
//     // For example:
//     // const popularFruits = api.getAllPopularItems("fruits");
//     // const popularVegetables = api.getAllPopularItems("vegetables");
//     // Handle the responses as needed.
//   }, []);

//   return (
//     <>
//       <Banner />
//       <Cards />
//       <Popular title="Popular Fruits" items={fruits} />
//       <Popular title="Popular Vegetables" items={vegetables} />
//     </>
//   );
// };

// export default Home;
