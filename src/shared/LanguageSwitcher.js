import React, { useState, useEffect } from 'react';
import '../translations/i18n';
import './LanguageSwitcher.scss'
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';


export default function LanguageSwitcher() {
    const { t, i18n } = useTranslation();
    const [languagesData, setLanguagesData] = useState([]);
    const [show, setShow] = useState(false);
    const showDropdown = (e) => {
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }
    const renderSwitch = (param) => {
        switch (param) {
            case 'ge':
                return <div className='ge logo'></div>;
            case 'ru':
                return <div className='ru logo'></div>;
            case 'en':
                return <div className='en logo'></div>;
            default:
                return '';
        }
    }
    const renderChecked = (param) => {
        if (param == localStorage.getItem('current_language')) {
            return <div className={`${param} logo`}></div>
        }
    }
    const languageChanger =
        (
            <div className="language-wrapper d-flex burger-link text-light-gray">
                <Dropdown

                    show={show}
                    onMouseEnter={showDropdown}
                    onMouseLeave={hideDropdown}
                >
                    <Dropdown.Toggle className="main-style"
                        id="dropdown-basic">
                        {renderChecked(localStorage.getItem('current_language'))}

                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        {Object.values(languagesData).filter(checked => checked.id != localStorage.getItem('current_language')).map((language, index) => (
                            <Dropdown.Item key={index} onClick={() => handleItemSelect(language)}>
                                {renderSwitch(language.id)}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    useEffect(() => {
        setLanguagesData({ "en": { "id": "en", "name": "English" }, "ru": { "id": "ru", "name": "Russian" }, "ge": { "id": "ge", "name": "Georgian" } });

    }, []);
    const handleItemSelect = item => {
        setShow(false);
        let current_language = localStorage.getItem('current_language');
        if (current_language === item.id) return;
        localStorage.setItem('current_language', item.id);
        i18n.changeLanguage(item.id.toLowerCase());
    };

    return (
        <div>
            {languageChanger}
        </div>
    );
}