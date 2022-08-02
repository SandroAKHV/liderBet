import { useContext, useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next';

import FeedContent from '../context/FeedContext'
import './Layout.scss'
import SortIcon from '@mui/icons-material/Sort';



import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
function Layout({ item }) {
    const { card } = useContext(FeedContent)
    const { t } = useTranslation();
    const [feeds, setFeed] = useState([])
    const [dataInfo, setDataInfo] = useState([])
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [tags, setTags] = useState([])
    const [currencyType, setCurrencyType] = useState("")
    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 45,
        height: 25,
        padding: 0,
        display: "flex",
        borderRadius: 21,
        "&:active": {
            "& .MuiSwitch-thumb": {
                width: 15
            },
            "& .MuiSwitch-switchBase.Mui-checked": {
                transform: "translateX(9px)"
            }
        },
        "& .MuiSwitch-switchBase": {
            padding: 3,
            color: "rgb(99 115 142)",
            "&.Mui-checked": {
                transform: "translateX(20px)",
                color: "rgb(99 115 142)",
                "& + .MuiSwitch-track": {
                    opacity: 1,
                    backgroundColor: "rgb(191 197 209)"
                }
            }
        },
        "& .MuiSwitch-thumb": {
            width: 19,
            height: 19,
            borderRadius: "100%",
            transition: theme.transitions.create(["width"], {
                duration: 200
            })
        },
        "& .MuiSwitch-track": {
            borderRadius: "30%",
            opacity: 1,
            backgroundColor:
                "rgb(191 197 209)",
            boxSizing: "border-box"
        }
    }));

    useEffect(() => {
        if (!card) return;

        let res = card.sort((a, b) => (a.price < b.price) ? 1 : -1)
        setFeed(res.filter(item => {
            return item.currencyId === 'LBP'
        }))
        setCurrencyType("GEL")
        setDataInfo("down")


    }, [card])

    useEffect(() => {


    }, [tags])

    useEffect(() => {

        console.log(feeds)


    }, [feeds])
    const ascending = () => {
        setFeed(feeds.sort((a, b) => (a.price > b.price) ? 1 : -1))

    }
    const descanding = () => {
        setFeed(feeds.sort((a, b) => (a.price < b.price) ? 1 : -1))

    }
    const aToZ = () => {
        setFeed(feeds.sort(function (a, b) {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        }))

    }
    const zToA = () => {
        setFeed(feeds.sort(function (a, b) {
            return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        }))
    }
    const handleCurrencyType = () => {
        if (currencyType === "GEL") {
            setFeed(card.filter(item => {
                setCurrencyType("LBP")
                return item.currencyId === 'GEL'
            }))
        }
        else if (currencyType === "LBP") {

            setFeed(card.filter(item => {
                setCurrencyType("GEL")
                return item.currencyId === 'LBP'
            }))
        }
    }

    const handleTopTags = (e) => {
        e.preventDefault();
        e.currentTarget.classList.toggle('active')

        if (!tags.includes(Number(e.currentTarget.id))) {

            setTags([...tags, Number(e.currentTarget.id)])
        }
        else {
            setTags(tags.filter((item, index) => Number(item) !== Number(e.currentTarget.id)));


        }


    }



    const renderCard = () => {
        return (
            feeds.filter((item) => {
                if (inputValue == "") {
                    return item;
                }
                // else if (tags.every(i => item.tags.includes(i))) {
                //     return item;
                // }
                else if (item.name.toLowerCase().includes(inputValue.toLowerCase())) {
                    return item;
                }
            }).map((item, index) => {
                return (
                    <div key={index} className={`${item.name}-container market-item`} >
                        <div className='card-wrap'>
                            <p className='card-text'><span>{item.prizeAmount}</span>{item.prizeType}</p>
                            <p className='card-inner'> </p>
                            <p className='card-name'>   {item.name}</p>
                            <p className='card-price'>  {item.price} {currencyType === "GEL" ? "GEL" : "POINTS"} </p>

                        </div>
                    </div>
                )
            })
        )
    }
    return (
        <>
            <section className='side-section'>
                <ul>
                    <li>
                        1
                    </li>
                    <li>
                        2
                    </li>
                    <li>
                        3
                    </li>
                </ul>
            </section>
            <section className='main-section'>
                <ul className='main-section-nav'>
                    <li id={29} className='nav-item' onClick={(e) => handleTopTags(e)} ><><i className='check-icon'></i>TOP</></li>
                    <li id={30} className='nav-item' onClick={(e) => handleTopTags(e)}> <i className='check-icon'></i>{t('Sale')}</li>
                    <li id={31} className='nav-item' onClick={(e) => handleTopTags(e)}> <i className='check-icon'></i>{t('Bonus')}</li>
                    <li id={1} className='nav-item' onClick={(e) => handleTopTags(e)}> <i className='check-icon'></i>Freespin</li>
                    <li data-id={currencyType} className='switcher-item'>  <FormGroup>

                        <Stack direction="row" spacing={1} alignItems="center" onClick={(e) => handleCurrencyType(e)}>
                            <Typography >POINT</Typography>
                            <AntSwitch checked={currencyType === "GEL"} inputProps={{ "aria-label": "ant design" }} />
                            <Typography >GEL</Typography>
                        </Stack>
                    </FormGroup></li>
                    <li className='search-nav'><input alt="search"
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={t('Search')} /></li>
                    <li onClick={() => setOpen(prev => !prev)} className={open ? 'menu-nav open' : 'menu-nav'} data-section={dataInfo}>
                        <SortIcon className='filter-icon' />
                        <ul>
                            <li onClick={() => { setDataInfo("az"); aToZ() }} className="az">   <i className='check-icon'></i>                             A - Z alphabet</li>
                            <li onClick={() => { setDataInfo("za"); zToA() }} className="za"><i className='check-icon'></i>Z - A alphabet</li>
                            <li onClick={() => { setDataInfo("up"); ascending() }} className="up"><i className='check-icon'></i>Ascending price</li>
                            <li onClick={() => { setDataInfo("down"); descanding() }} className="down"><i className='check-icon'></i>Descending price</li>
                        </ul>
                    </li>
                </ul>
                <div className='offers-wrapper'>

                    <nav className='offers'>
                        <h3>{t('Offers')}</h3>
                        <div></div>
                    </nav>
                    <div className='wrapper'>

                        {renderCard()}
                    </div>
                </div>
            </section >
        </>
    )
}



export default Layout