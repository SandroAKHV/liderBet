import * as React from 'react';
import { useContext, useEffect, useState } from 'react'
import './Acordion.scss'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';



import FeedContent from '../../context/FeedContext'


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
    '&:hover': {
        backgroundColor: '#f8f8f8',
        transition: '0.2s ease-in-out'
    },

}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));


function MenuAcordion({ handleTopTags, handleParentTags }) {

    const { alltags, menuTags } = useContext(FeedContent)

    const [expanded, setExpanded] = React.useState('panel1');
    const [menuFilter, setMenuFilter] = useState([])

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    useEffect(() => {
        if (alltags?.length && menuTags?.length) {
            const map = new Map(alltags?.map(el => [el.id, el]));
            const result = menuTags?.length != 0 && menuTags.map(el =>
                Object.assign(el, {
                    ...map.get(el.id),
                    children: el.children.map(id => map.get(id))
                })
            );
            setMenuFilter(result)
        }
    }, [alltags, menuTags])
    return (
        <div className='acordion-container'>
            {
                menuFilter.map((item, index) => {
                    return (
                        <Accordion key={index} className={item.children.length == 0 && "empty-dropdown"} expanded={expanded === item.name} onChange={handleChange(item.name)}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <p className='acordion-name' id={item.id} onClick={(e) => handleParentTags(e)}> {item.name}</p >
                            </AccordionSummary>
                            <ul className='menu-section-nav '>
                                {
                                    item.children.length > 0 && item.children.map((child, index) => {
                                        return (
                                            <li key={index} id={child.id} className='nav-item' onClick={(e) => handleTopTags(e)}> <i className='check-icon'></i>{child.name}</li>
                                        )
                                    })
                                }
                            </ul>
                        </Accordion>
                    )
                })}
        </div >
    );

}
export default MenuAcordion;
