import * as React from "react";
import {GiftMoreItem} from "../../otherViews/giftMoreItem/GiftMoreItem.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {MainButton} from "../../otherViews/button/MainButton.tsx";
import {useTheme} from "../../../core/style/ThemeContext.tsx";


export const BuyGiftScreen: React.FC = () => {


    const location = useLocation();
    const gift = location.state?.gift;
    const navigate = useNavigate();

    const {theme} = useTheme()

    if (!gift) {
        return <div>Gift not found</div>;
    }

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
                    navigate('/receiveGift', { state: { gift } })
                }}/>





            </div>

        </div>
    )
}