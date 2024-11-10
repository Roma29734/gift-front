import * as React from "react";
import {useTheme} from "../../../core/style/ThemeContext.tsx";
import {MainButton} from "../button/MainButton.tsx";
import IcBallons from "../../../assets/ico/ic_ballons_tg.svg";

interface AbsenceGiftsParam {
    onClick: () => void
}

export const AbsenceGifts: React.FC<AbsenceGiftsParam> = ({onClick}) => {

    const {theme, toggleTheme} = useTheme()


    return (
        <div style={{
            background: theme.secondary,
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            padding: '12px',
            marginTop: '8px'
        }}>

            <img src={IcBallons} style={{
                width: '100px',
                height: '100px'
            }}/>

            <span style={{
                color: theme.tTitle,
                textAlign: 'center',
                fontSize: '17px',
                fontFamily: 'SFREGULAR',
            }}>
                            You can by a gift to receive a gift a return
                        </span>


            <MainButton tx={"Open Store"} onClick={() => {
                toggleTheme()
                onClick()
            }} colorBg={theme.secondary} colorTx={theme.primary}/>


        </div>
    )

}