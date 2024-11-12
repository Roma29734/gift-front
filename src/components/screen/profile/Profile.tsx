import * as React from "react";
import NavigationBar from "../../otherViews/navigationBar/NavigationBar.tsx";
import {useNavigate} from "react-router-dom";
import ToggleSwitch from "../../otherViews/button/SwitchButton.tsx";
import {useEffect, useState} from "react";
import IcMoon from "../../../assets/ico/ic_moon.svg";
import IcSun from "../../../assets/ico/ic_sun.svg";
import ProfileImageWithBadge from "../../otherViews/profileImage/ProfileImage.tsx";
import {getGiftsForUser, GiftArea} from "../../../core/remoteWork/GiftsRemote.tsx";
import {GiftItemSmall} from "../../otherViews/giftItemSmall/GiftItemSmall.tsx";
import {ModalGift} from "../../modal/modalGift/ModalGift.tsx";
import { useTheme } from "../../../core/style/ThemeContext.tsx";
import {AbsenceGifts} from "../../otherViews/absenceGifts/AbsenceGifts.tsx";
import IcWatch from "../../../assets/ico/ic_watch.svg";
import {useTelegramBackButton} from "../../../core/Utils.ts";
import Progressbar from "../../otherViews/progressBar/ProgressBar.tsx";
import {useTranslation} from "react-i18next";
import {useData} from "../../otherViews/DataContext.tsx";
import {changeLanguage} from "i18next";
import {getLanguageState, saveLanguageState} from "../../../core/translations/i18n.ts";

export const ProfileScreen: React.FC = () => {
    try {
        useTelegramBackButton(true)
    } catch (e ) {
        console.log("error in postEvent - ", e)
    }
    const navigate = useNavigate();
    const {theme, toggleTheme, getCurrentTheme} = useTheme()
    const [selectedMode, setSelectedMode] = useState<string>(getCurrentTheme);
    const [selectedLanguage, setSelectedLanguage] = useState(getLanguageState() ? getLanguageState(): "EN");

    const [gifts, setGifts] = useState<GiftArea[] >([])
    const { t } = useTranslation();
    const {dataApp} = useData()
    const [isVisibleSendGiftModal, setIsVisibleSendGiftModal] = useState(false)
    const [selectedGifts, setSelectedGifts] = useState<GiftArea | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const processingGetGiftsForUser = async () => {
        setIsLoading(true)
        const response = await getGiftsForUser()
        if (typeof response == "object") {
            setGifts(response)
        }
        setIsLoading(false)
    }


    const onCloseModal = () => {
        setIsVisibleSendGiftModal(false)
    }


    useEffect(() => {
        processingGetGiftsForUser()
    }, []);


    return (
        <div style={{
            width: '100%',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            background: theme.background,
            gap: '8px',
        }}>

            <div style={{
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center',
                alignContent: 'center',
                height: '100vh',
                padding: '16px'
            }}>


                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>

                    <ToggleSwitch
                        options={[
                            {label: <img src={IcSun} alt="Sun Icon" style={{width: 20, height: 20}}/>, value: "light"},
                            {label: <img src={IcMoon} alt="Moon Icon" style={{width: 20, height: 20}}/>, value: "dark"}
                        ]}
                        selected={selectedMode}
                        onChange={(value) => {
                            setSelectedMode(value)
                            toggleTheme()
                        }}
                        width="100px"
                    />


                    <ProfileImageWithBadge
                        imageSrc={dataApp.imageAvatar? dataApp.imageAvatar : ""}
                        badgeText="#160"
                        badgeColor="#888888"
                        badgeTextColor="#FFFFFF"
                        size={100}
                    />

                    <ToggleSwitch
                        options={[
                            {label: "EN", value: "EN"},
                            {label: "RU", value: "RU"}
                        ]}
                        selected={selectedLanguage ? selectedLanguage: "EN"}
                        onChange={(value) => {
                            setSelectedLanguage(value)
                            saveLanguageState(value)
                            changeLanguage(value)
                        }}
                        width="100px"
                    />
                </div>


                <span style={{
                    fontSize: '24px',
                    color: theme.tTitle,
                    fontFamily: 'SFSEMIBOLD',
                    marginTop: '8px'
                }}>{dataApp.userName}</span>


                <span style={{
                    fontSize: '17px',
                    color: theme.tSecond,
                    fontFamily: 'SFREGULAR',
                    marginTop: '4px'
                }}>
                    {gifts?.length} {t('profile.gifts_received')}
                </span>


                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '16px'
                }} onClick={() => {
                    navigate('/recentActions')
                }}>

                    <img src={IcWatch} style={{
                        width: '16px',
                        height: '16px'
                    }}/>

                    <span style={{
                        fontSize: '17px',
                        fontFamily: 'SFREGULAR',
                        color: theme.primary
                    }}>{t('profile.recent_actions')}</span>
                </div>

                {gifts.length > 0 ?

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '20px',
                        padding: '16px',
                        justifyItems: 'center'
                    }}>
                        {gifts?.map((gift) => (
                            <GiftItemSmall
                                key={gift.id}
                                name={gift.name}
                                price={gift.price}
                                urlGif={gift.img}
                                backgroundColor={gift.bgColor}
                                onClick={() => {
                                    setSelectedGifts(gift)
                                    setIsVisibleSendGiftModal(true)
                                }}
                            />
                        ))}
                    </div> :

                    <AbsenceGifts onClick={() => {}}/>
                }


            </div>


            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>

                <NavigationBar
                    initialSelected={"Profile"}
                    onStoreClick={() => {
                        navigate('/store')
                    }}
                    onGiftClick={() => {
                        navigate('/gift')
                    }}
                    onLeaderboardClick={() => {
                        navigate('/leaderBoard')
                    }}
                    onProfileClick={() => {
                    }}
                />
            </div>

            {selectedGifts &&

                <ModalGift isVisible={isVisibleSendGiftModal} onClose={onCloseModal} itemGiftMore={selectedGifts}/>
            }
            {isLoading && <Progressbar/>}
        </div>
    )
}