import React, { useState, useEffect } from 'react';
import '../translations/i18n';
import './LanguageSwitcher.scss'
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Ru from "../assets/images/ru.png"
import En from "../assets/images/en.png"
import Ge from "../assets/images/ge.png"

export default function LanguageSwitcher() {
    const { t, i18n } = useTranslation();
    const [languagesData, setLanguagesData] = useState([]);
    // const [showDropdown, setShowDropdown] = useState(false);
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
                return <img src={Ge} />;
            case 'ru':
                return <img src={Ru} />;
            case 'en':
                return <img src={En} />;
            default:
                return '';
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

                        {/* {!!localStorage.getItem('current_language')
              ? t(
                Object.values(languagesData).find(lang => lang.id === localStorage.getItem('current_language')) &&
                Object.values(languagesData).find(lang => lang.id === localStorage.getItem('current_language'))
                  .name
              )
              : 'English'} */}
                        {renderSwitch(localStorage.getItem('current_language'))}

                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        {Object.values(languagesData).map((language, index) => (
                            <Dropdown.Item key={index} onClick={() => handleItemSelect(language)}>
                                {renderSwitch(language.id)}
                                {/* <span className={'language-name'}> {t(language.name)}</span> */}
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