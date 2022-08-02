import { createContext, useState, useEffect } from 'react'
const FeedContent = createContext()

export const FeedbackProvider = ({ children }) => {
    const [card, setCard] = useState([])


    useEffect(() => {

        fetchFeed()
    }, [])

    const fetchFeed = async () => {
        fetch('/db')
            .then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                Object.entries(data).forEach(([key, val]) => {
                    if (key === 'marketItem') {
                        const marketItem = Object.keys(val).map(i => val[i])
                        setCard(marketItem)
                    }
                })
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (
        <FeedContent.Provider
            value={{
                card

            }}
        >
            {children}
        </FeedContent.Provider>
    )
}

export default FeedContent

