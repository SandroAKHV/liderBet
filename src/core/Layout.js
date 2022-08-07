import { useContext, useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next';

import FeedContent from '../context/FeedContext'
import './Layout.scss'
import SortIcon from '@mui/icons-material/Sort';
import Slider from '@mui/material/Slider';

import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Acordion from '../components/menuFilter/Acordion'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import moment from "moment"

function Layout({ item }) {
    const { card, alltags, filterTags, menuTags, discounts, products, currencies } = useContext(FeedContent)
    const { t } = useTranslation();
    const ref = useRef()

    const [visibility, setVisibility] = useState();
    const [value, setValue] = useState([]);
    const [feeds, setFeed] = useState([])
    const [dataInfo, setDataInfo] = useState([])
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [tags, setTags] = useState([])
    const [currencyType, setCurrencyType] = useState("")
    const [discount, setDiscount] = useState(false)


    useEffect(() => {
        const outsideClickHandler = e => {
            if (visibility && ref.current && !ref.current.contains(e.target)) {
                setVisibility(false)
            }
        }
        document.addEventListener("mousedown", outsideClickHandler)
        return () => {
            document.removeEventListener("mousedown", outsideClickHandler)
        }
    }, [visibility])

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
    const handleDiscount = (e) => {
        e.currentTarget.classList.toggle('active')
        setDiscount(prev => !prev)
    }
    const handleMenu = () => {
        setVisibility(true)
    }

    useEffect(() => {
        if (!card) return;
        const mapProduct = new Map(products.map(el => [el.id, el]))

        card.filter(el1 => products.some(el2 => {
            return el1.productId === el2.id
        })).map(function (element) {
            let result = Object.assign(element, {
                ...mapProduct.get(element.id),
                productId: mapProduct.get(element.productId),
            })
            return result
        })

        const mapSale = new Map(discounts.map(el => [el.id, el]))

        card.filter(el1 => discounts.some(el2 => {
            return el1.discountId === el2.id
        })).map(function (element) {
            let result = Object.assign(element, {
                ...mapSale.get(element.id),
                discountId: mapSale.get(element.discountId),
            })
            return result
        })

        let res = card.sort((a, b) => (a.price < b.price) ? 1 : -1)
        setFeed(res.filter(item => {
            return item.currencyId === 'GEL'
        }))
        setCurrencyType("GEL")
        setDataInfo("down")

        const min = feeds.reduce((m, p) => (p.price < m ? p.price : m), Infinity)
        const max = feeds.reduce((m, p) => (p.price > m ? p.price : m), -Infinity)
        setValue([min, max])

    }, [card, discounts, alltags])

    // top navigation filter tags
    const handleFilterBar = () => {
        var props = ['id', 'name'];
        var result = alltags.filter(el1 => filterTags.some(el2 => {
            return el1.id === el2.id
        })).map(function (item) {
            return props.reduce(function (newElem, name) {
                newElem[name] = item[name];
                return newElem;
            }, {});
        });
        return result.map(item => {
            return (
                <>
                    <li key={item.id} id={item.id} className='nav-item' onClick={(e) => handleTopTags(e)}> <i className='check-icon'></i>{t(`${item.name}`)}</li>
                </>

            )
        })

    }

    const rangeSelector = (event, newValue) => {
        setValue([
            ...newValue
        ]);
    };
    // 'select' tags render
    const handleFilterBarMobile = () => {
        var props = ['id', 'name'];
        var result = alltags
            .filter(function (elem1) {
                return filterTags.some(function (elem2) {
                    return elem1.id === elem2.id;
                });
            })
            .map(function (item) {
                return props.reduce(function (newElem, name) {
                    newElem[name] = item[name];
                    return newElem;
                }, {});
            });
        return result.map(item => {
            return (
                <>
                    <option value={item.id} key={item.id} id={item.id} className='nav-item' onClick={(e) => handleTopTags(e)}> {t(`${item.name}`)}</option>
                </>

            )
        })

    }

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
                return item.currencyId === 'LBP'
            }))
        }
        else if (currencyType === "LBP") {

            setFeed(card.filter(item => {
                setCurrencyType("GEL")
                return item.currencyId === 'GEL'
            }))
        }
    }

    useEffect(() => {


    }, [tags])

    // menu filter tags handler
    const handleParentTags = (e) => {
        e.preventDefault();
        e.currentTarget.classList.toggle('active')
        let parentTags = menuTags.map(item => item.id)
        if (!tags.includes(Number(e.currentTarget.id))) {
            if (parentTags.some(r => tags.includes(r))) {
                tags.filter(el1 => !parentTags.some(el2 => {
                    if (el1 === el2) {
                        tags.splice(tags.indexOf(el1), 1)
                    }
                }));
                setTags([...tags, Number(e.currentTarget.id)])
            }
            else {
                setTags([...tags, Number(e.currentTarget.id)])
            }
        }
        else {
            setTags(tags.filter((item, index) => Number(item) !== Number(e.currentTarget.id)));
        }
    }

    // 'select' onChange tags handler
    const handleSelectChange = (e) => {
        let navTags = filterTags.map(item => item.id)
        if (!tags.includes(Number(e.target.value))) {
            if (navTags.some(r => tags.includes(r))) {
                tags.filter(el1 => !navTags.some(el2 => {
                    if (el1 === el2) {
                        tags.splice(tags.indexOf(el1), 1)
                    }
                }));
                setTags([...tags, Number(e.target.value)])
            }
            else {
                setTags([...tags, Number(e.target.value)])
            }
        }
        else {
            setTags(tags.filter((item, index) => Number(item) !== Number(e.target.value)));
        }
    }

    // add filtered tags to state
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
                else if (item.name.toLowerCase().includes(inputValue.toLowerCase())) {
                    return item;
                }
            }).filter((item) => {
                if (tags.every(i => item.tags.includes(i))) {
                    return item
                }
                else if (tags.length == 0) {
                    return item;
                }
            }).filter((item) => {
                if (item.price >= value[0] && item.price <= value[1]) {
                    return item
                }
            }).filter((item) => {
                if (discount) {
                    return item.discountId !== null
                }
                else {
                    return item
                }
            }).map((item, index) => {
                var today = moment(item?.discountId?.end_date);
                var date = {
                    time: today.format('HH:mm'),
                    month: today.format("MMM"),
                    num: today.format('DD')
                }
                return (
                    <div key={index} className={`${index}-container market-item`} >
                        {
                            item.discountId?.end_date &&
                            <div className='card-discount'>
                                <div>
                                    <AccessTimeOutlinedIcon />
                                    <span>{date.num} </span>
                                    <span>{date.month} </span>
                                    <span>{date.time} </span>
                                </div>
                                <p>-{item.discountId.percent}%</p>
                            </div>
                        }

                        <div className='card-wrap'>
                            <p className='card-text'><span>{item.prizeAmount}</span>{item.prizeType}</p>
                            <p className='card-name'>   {item.name}</p>
                            <p className='card-desc'>   {item.productId.descr}</p>
                            <p className='card-price' data-text={item.name}>
                                <span>{item.price} {currencyType == "GEL" ? "GEL" : "POINTS"} </span>
                                {item.discountId?.end_date && <span className='last-prise'>{Number(item.price / (1 - item.discountId?.percent / 100)).toFixed(2)} GEL</span>}</p>
                            <div className='card-btns'>
                                <div>BUY</div>
                                <div>FOR <br /> FRIEND</div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    return (
        <>
            <div style={{ display: visibility ? "block" : "none" }} className='menu-overlay'></div>

            <section ref={ref} className={visibility ? 'side-section active' : 'side-section'}>
                <Acordion handleTopTags={handleTopTags} handleParentTags={handleParentTags} />
            </section>
            <section className='main-section'>
                <ul className='main-section-nav-mobile'>
                    <li className='burger-menu' onClick={() => handleMenu()}>მენიუ</li>
                    <li className='mobile-search'>
                        <input type={"search"} value={inputValue} autoComplete="off" onChange={(e) => setInputValue(e.target.value)}
                        /></li>
                </ul>
                <ul className='main-section-nav'>
                    <li className='nav-item' onClick={(e) => handleDiscount(e)}> <i className='check-icon'></i>{t('Sale')}</li>
                    {handleFilterBar()}
                    <li className='select-filter'>
                        <select onChange={handleSelectChange}>
                            {handleFilterBarMobile()}
                        </select>
                    </li>
                    <li data-id={currencyType} className='switcher-item'>
                        <FormGroup>
                            <Stack direction="row" spacing={1} alignItems="center" onClick={(e) => handleCurrencyType(e)}>
                                <Typography >{currencies[1]?.code}</Typography>
                                <AntSwitch checked={currencyType === "GEL"} inputProps={{ "aria-label": "ant design" }} />
                                <Typography >{currencies[0]?.code}</Typography>
                            </Stack>
                        </FormGroup>
                    </li>
                    <li className='search-nav'><input alt="search" value={inputValue}
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
                        <div className='slider'>
                            <div style={{
                                margin: 'auto',
                                display: 'block',
                                width: '100%'
                            }}>

                                <Slider
                                    value={value}
                                    onChange={rangeSelector}
                                    min={feeds.reduce((m, p) => (p.price < m ? p.price : m), Infinity)}
                                    max={feeds.reduce((m, p) => (p.price > m ? p.price : m), -Infinity)}
                                    valueLabelDisplay="on"
                                />
                            </div>
                        </div>
                    </nav>
                    <div className='wrapper'>

                        {renderCard()}
                    </div>
                </div>
            </section>
        </>
    )
}



export default Layout
