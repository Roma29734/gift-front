import * as React from "react";
import NavigationBar from "../../otherViews/navigationBar/NavigationBar.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ProfileImageWithBadge from "../../otherViews/profileImage/ProfileImage.tsx";
import {getGiftsForUser, GiftArea} from "../../../core/remoteWork/GiftsRemote.tsx";
import {GiftItemSmall} from "../../otherViews/giftItemSmall/GiftItemSmall.tsx";
import {ModalGift} from "../../modal/modalGift/ModalGift.tsx";
import { useTheme } from "../../../core/style/ThemeContext.tsx";


export const AboutUserScreen: React.FC = () => {

    const location = useLocation();
    const user = location.state?.user;
    const pos = location.state?.pos

    const navigate = useNavigate();

    const [gifts, setGifts] = useState<GiftArea[] | null>(null)

    const [isVisibleSendGiftModal, setIsVisibleSendGiftModal] = useState(false)
    const [selectedGifts, setSelectedGifts] = useState<GiftArea | null>(null)
    const processingGetGiftsForUser = async () => {
        const response = await getGiftsForUser(user.userId)
        if (typeof response == "object") {
            setGifts(response)
        }
    }

    const {theme} = useTheme()

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




                    <ProfileImageWithBadge
                        imageSrc={user.image}
                        badgeText={`#${pos}`}
                        badgeColor="#888888"
                        badgeTextColor="#FFFFFF"
                        size={100}
                    />



                <span style={{
                    fontSize: '24px',
                    color: theme.tTitle,
                    fontFamily: 'SFSEMIBOLD',
                    marginTop: '8px'
                }}>{user.userName}</span>


                <span style={{
                    fontSize: '17px',
                    color: theme.tSecond,
                    fontFamily: 'SFREGULAR',
                    marginTop: '4px'
                }}>
                    {user.gifts} gifts received
                </span>

                {gifts?.length > 0 &&

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
                    </div>
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
                    initialSelected={"Leaderboard"}
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

        </div>
    )
}