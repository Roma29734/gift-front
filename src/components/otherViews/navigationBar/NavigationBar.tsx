import React, { useState, useEffect } from 'react';
import icStore from "../../../assets/ico/ic_store.svg";
import ic_gift from "../../../assets/ico/ic_gift.svg";
import ic_profile from "../../../assets/ico/ic_profile.svg";
import ic_leaderboard from "../../../assets/ico/ic_leaderboard.svg";
import {useTheme} from "../../../core/style/ThemeContext.tsx";
import {useTranslation} from "react-i18next";

type NavigationBarProps = {
    initialSelected: string;
    onStoreClick: () => void;
    onGiftClick: () => void;
    onLeaderboardClick: () => void;
    onProfileClick: () => void;
};

const NavigationBar: React.FC<NavigationBarProps> = ({
                                                         initialSelected,
                                                         onStoreClick,
                                                         onGiftClick,
                                                         onLeaderboardClick,
                                                         onProfileClick,
                                                     }) => {
    const [selected, setSelected] = useState<string | null>(
        initialSelected.trim() !== "" ? initialSelected : null
    );

    useEffect(() => {
        setSelected(initialSelected.trim() !== "" ? initialSelected : null);
    }, [initialSelected]);

    const {theme} = useTheme()
    const { t } = useTranslation();

    const getStyleForText = (isSelected: boolean): React.CSSProperties => ({
        fontSize: '10px',
        color: isSelected ? '#007AFF' : '#959595',
        fontFamily: isSelected ? 'SFSEMIBOLD' : 'SFREGULAR',
        marginTop: '5px',
    });

    const navBarStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: theme.navB,
        width: '100%',
        marginLeft: '16px',
        marginRight: '16px',
        overflow: 'hidden',
    };

    const navItemStyle = (): React.CSSProperties => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '10px',
        borderRadius: '10px',
        width: '60px',
        boxSizing: 'border-box',
    });

    const getIconStyle = (isSelected: boolean): React.CSSProperties => ({
        width: '24px',
        height: '26px',
        filter: isSelected
            ? 'brightness(0) saturate(100%) invert(31%) sepia(83%) saturate(4394%) hue-rotate(184deg) brightness(96%) contrast(102%)' // #007AFF
            : 'brightness(0) saturate(100%) invert(35%) sepia(2%) saturate(120%) hue-rotate(190deg) brightness(95%) contrast(94%)', // #959595
    });

    return (
        <div style={navBarStyle}>
            <div
                style={navItemStyle()}
                onClick={() => {
                    setSelected('Store');
                    onStoreClick();
                }}
            >
                <img src={icStore} alt="Fap" style={getIconStyle(selected === 'Store')} />
                <span style={getStyleForText(selected === 'Store')}>{t("navBar.Store")}</span>
            </div>

            <div
                style={navItemStyle()}
                onClick={() => {
                    setSelected('Gift');
                    onGiftClick();
                }}
            >
                <img src={ic_gift} alt="GiftTypes" style={getIconStyle(selected === 'Gift')} />
                <span style={getStyleForText(selected === 'Gift')}>{t("navBar.Gifts")}</span>
            </div>

            <div
                style={navItemStyle()}
                onClick={() => {
                    setSelected('Leaderboard');
                    onLeaderboardClick();
                }}
            >
                <img src={ic_leaderboard} alt="Leaderboard" style={getIconStyle(selected === 'Leaderboard')} />
                <span style={getStyleForText(selected === 'Leaderboard')}>{t("navBar.Leaderboard")}</span>
            </div>

            <div
                style={navItemStyle()}
                onClick={() => {
                    setSelected('Profile');
                    onProfileClick();
                }}
            >
                <img src={ic_profile} alt="Profile" style={getIconStyle(selected === 'Profile')} />
                <span style={getStyleForText(selected === 'Profile')}>{t("navBar.Profile")}</span>
            </div>
        </div>
    );
};

export default NavigationBar;
