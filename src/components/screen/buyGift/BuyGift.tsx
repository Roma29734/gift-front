import * as React from "react";
import {GiftMoreItem} from "../../otherViews/giftMoreItem/GiftMoreItem.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {MainButton} from "../../otherViews/button/MainButton.tsx";
import {useTheme} from "../../../core/style/ThemeContext.tsx";
import {OpenUrl, useTelegramBackButton} from "../../../core/Utils.ts";
import {getPayment, sendToBuyGift} from "../../../core/remoteWork/BuyGiftRemote.tsx";
import {useEffect, useState} from "react";
import Progressbar from "../../otherViews/progressBar/ProgressBar.tsx";

export const BuyGiftScreen: React.FC = () => {

    try {
        useTelegramBackButton(true)
    } catch (e ) {
        console.log("error in postEvent - ", e)
    }
    const location = useLocation();
    const gift = location.state?.gift;
    const navigate = useNavigate();

    const {theme} = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    let purchaseCheckInterval: ReturnType<typeof setInterval>; // Тип интервала для браузера

    if (!gift) {
        return <div>Gift not found</div>;
    }

    const buyGift = async () => {
        setIsLoading(true)
        const isResult = await sendToBuyGift(gift.id)
        if(typeof isResult == "object") {
            OpenUrl(isResult.url)
            purchaseCheckInterval = setInterval(async () => {
                const purchaseStatus = await getPayment(isResult.invoiceId);
                if (typeof purchaseStatus == "object") {
                    if(purchaseStatus.status == "completed") {
                        setIsLoading(false);
                        clearInterval(purchaseCheckInterval);
                        navigate('/receiveGift', { state: { gift } });
                    }
                }
            }, 3000);
        }
    }

    useEffect(() => {
        return () => {
            // Очищаем интервал при размонтировании компонента
            if (purchaseCheckInterval) {
                clearInterval(purchaseCheckInterval);
            }
        };
    }, []);

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            background: theme.background,
            gap: '8px'
        }}>

            <GiftMoreItem name={gift.name} urlGif={gift.img} price={gift.price} backgroundColor={gift.bgColor}
                          descriptions={gift.description}/>

            <div style={{
                width: '100%',
                height: '12px',
                backgroundColor: theme.accentBg,
            }}/>

            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: theme.navB,
            }}>


                <MainButton tx={"Buy a GiftTypes"} onClick={() => {
                                        buyGift()
                }}/>

            </div>
            {isLoading && <Progressbar/>}
        </div>
    )
}