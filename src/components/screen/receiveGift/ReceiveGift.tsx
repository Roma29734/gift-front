import * as React from "react";
import {useLocation} from "react-router-dom";
import LottieAnimation from "../../otherViews/LottieAnimation.tsx";
import {MainButton} from "../../otherViews/button/MainButton.tsx";
import {useTheme} from "../../../core/style/ThemeContext.tsx";


export const ReceiveGiftScreen: React.FC = () => {

    const location = useLocation();
    const gift = location.state?.gift;

    const {theme} = useTheme()

    if (!gift) {
        return <div>Gift not found</div>;
    }

    return(
        <div style={{
            width: '100%',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            background: theme.background,
            gap: '8px',
            textAlign: 'center',
            alignContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>


            <LottieAnimation width={100} height={100} url={`http://localhost:3000${gift.img}`}/>


            <span style={{
                color: theme.tTitle,
                fontFamily: 'SFSEMIBOLD',
                fontSize: "24px"
            }}>Gift purchased</span>


            <span style={{
                color: theme.tTitle,
                fontFamily: 'SFSEMIBOLD',
                fontSize: "17px",
                textAlign: 'center'
            }}>
                The {gift.name} gift was purchased for {gift.price} USD
            </span>


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


                <MainButton tx={"Send GiftTypes"} onClick={() => {
                }}/>

                <MainButton tx={"Open Store"} onClick={() => {
                }} colorBg={theme.navB} colorTx={"#007AFF"}/>



            </div>


        </div>
    )


}