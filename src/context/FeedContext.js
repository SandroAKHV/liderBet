import React, { useState, useEffect, createContext } from "react";

const FeedContent = createContext()

export const FeedProvider = ({ children }) => {
    const [card, setCard] = useState([])
    const [alltags, setAlltags] = useState([])
    const [filterTags, setFilterTags] = useState([])
    const [menuTags, setMenuTags] = useState([])
    const [discounts, setDiscounts] = useState([])
    const [products, setProducts] = useState([])
    const [currencies, setCurrencies] = useState([])

    useEffect(() => {
        fetchFeed()
    }, [])


    const fetchFeed = () => {
        fetch("/db")
            .then((response) => response.json())
            .then((data) => {
                Object.entries(data).forEach(([key, val]) => {
                    if (key === 'marketItem') {
                        const marketItem = Object.keys(val).map(i => val[i])
                        setCard(marketItem)
                    }
                    if (key === 'products') {
                        const convertedProArray = Object.keys(val).map((x) => ({
                            id: x,
                            name: val[x].name,
                            descr: val[x].descr,
                            url: val[x].url,

                        }));
                        setProducts(convertedProArray)
                    }
                    if (key === 'tags') {
                        const convertedTagArray = Object.keys(val).map((x) => ({
                            id: Number(x),
                            name: val[x].name

                        }));
                        setAlltags(convertedTagArray)
                    }
                    if (key === 'filterBarTags') {
                        const filterTags = Object.keys(val).map(i => val[i])
                        setFilterTags(filterTags)
                    }
                    if (key === 'discounts') {
                        const convertedSaleArray = Object.keys(val).map((x) => ({
                            id: Number(x),
                            percent: val[x].percent,
                            end_date: val[x].end_date

                        }));
                        setDiscounts(convertedSaleArray)
                    }
                    if (key === 'menuTags') {
                        setMenuTags(val)
                    }
                    if (key === 'currencies') {
                        const currencies = Object.keys(val).map(i => val[i])
                        setCurrencies(currencies)
                    }
                })
            })
            .catch((error) => console.log("An error occured"));
    }
    (() => {


    })()

    return (
        <FeedContent.Provider
            value={{
                card,
                discounts,
                alltags,
                filterTags,
                menuTags,
                products,
                currencies
            }}
        >
            {children}
        </FeedContent.Provider>
    )
}

export default FeedContent

