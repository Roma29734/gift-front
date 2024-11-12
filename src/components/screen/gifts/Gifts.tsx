import * as React from "react";
import NavigationBar from "../../otherViews/navigationBar/NavigationBar.tsx";
import {useNavigate} from "react-router-dom";
import {getGiftsForUser, GiftArea} from "../../../core/remoteWork/GiftsRemote.tsx";
import {useEffect, useState} from "react";
import {GiftItemSmall} from "../../otherViews/giftItemSmall/GiftItemSmall.tsx";
import {SendGifModal} from "../../modal/sendGif/SendGif.tsx";
import {useTheme} from "../../../core/style/ThemeContext.tsx";
import {AbsenceGifts} from "../../otherViews/absenceGifts/AbsenceGifts.tsx";
import {useTelegramBackButton} from "../../../core/Utils.ts";
import Progressbar from "../../otherViews/progressBar/ProgressBar.tsx";

export const GiftsScreen: React.FC = () => {
    try {
        useTelegramBackButton(true)
    } catch (e ) {
        console.log("error in postEvent - ", e)
    }
    const navigate = useNavigate();
    const [gifts, setGifts] = useState<GiftArea[]>([])
    const {theme} = useTheme()

    const [isVisibleSendGiftModal, setIsVisibleSendGiftModal] = useState(false)
    const [selectedGifts, setSelectedGifts] = useState<GiftArea | null>(null)
    const [isLoading, setIsLoading] = useState(true)
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
                padding: '16px',
            }}>

                <span style={{
                    fontSize: '24px',
                    fontFamily: 'SFSEMIBOLD',
                    color: theme.tTitle,
                    marginTop: '24px'
                }}>
                Send Gifts in Telegram
            </span>

                <span style={{
                    fontSize: '17px',
                    fontFamily: 'SFREGULAR',
                    color: theme.tSecond,
                    textAlign: 'center'
                }}>
                    Send gifts to users that can be stored in their app profile.
                </span>


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
                                    // navigate('/buyGift', {state: {gift}})
                                }}
                            />
                        ))}
                    </div>:
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
                    initialSelected={"Gift"}
                    onStoreClick={() => {
                        navigate('/store')
                    }}
                    onGiftClick={() => {
                    }}
                    onLeaderboardClick={() => {
                        navigate('/leaderBoard')
                    }}
                    onProfileClick={() => {
                        navigate('/profile')
                    }}
                />
            </div>

            {selectedGifts &&

                <SendGifModal isVisible={isVisibleSendGiftModal} onClose={onCloseModal} onBtnClick={() => {
                }} itemGiftMore={selectedGifts}/>
            }

            {isLoading && <Progressbar/>}

        </div>
    )

}