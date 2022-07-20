import React, { useState, useEffect } from "react";

// Providing Context
// ==================

const Context = React.createContext();

function ContextProvider({ children }) {
    // State
    const [cartID, setCartID] = useState("");
    const [cartItems, setCartItems] = useState([]);

    // Local Storage: setting & getting data
    useEffect(() => {
        const cartItemsData = JSON.parse(localStorage.getItem("cartItems"));
        const cartIDData = JSON.parse(localStorage.getItem("cartID"));

        if (cartItemsData) {
            setCartItems(cartItemsData);
        }
        if (cartItemsData) {
            setCartID(cartIDData);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        localStorage.setItem("cartID", JSON.stringify(cartID));
    }, [cartItems, cartID]);

    //Setters
    function addToCart(newItem) {
        setCartItems(newItem);
    }

    function setCartId(id) {
        setCartID(id);
    }

    function removeFromCart(id) {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }

    function updateCheckout(id) {
        //look if a checkout is already created
        //post new checkout
        //if successful update localstorage
    }

    return (
        <Context.Provider
            value={{
                cartID,
                cartItems,
                setCartId,
                addToCart,
                removeFromCart,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export { ContextProvider, Context };
