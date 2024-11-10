import * as React from "react";
import {useState} from "react";
import IcClose from "../../../assets/ico/ic_close.svg";
import {useTheme} from "../../../core/style/ThemeContext.tsx";

interface CloseButtonParam {
    onClick: () => void;
    sizeBtn: number;
    sizeImg: number;
}

export const CloseButton: React.FC<CloseButtonParam> = ({onClick, sizeBtn, sizeImg}) => {

    const [isPressed, setIsPressed] = useState(false)

    const {theme} = useTheme()

    return (

        <div style={{
            boxSizing: 'border-box',
            width: `${sizeBtn}px`,
            height: `${sizeBtn}px`,
            borderRadius: '999px',
            background: theme.btnClose,
            alignItems: 'center',
            alignContent: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            display: 'inline-flex',
            transition: "transform 0.1s ease, box-shadow 0.1s ease",
            cursor: "pointer",
            transform: isPressed ? "scale(0.95)" : "scale(1)",
            boxShadow: isPressed
                ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                : "",
            outline: "none",
            userSelect: "none",
            border: "none",
            WebkitTapHighlightColor: "transparent",
        }} onClick={onClick}
             onMouseDown={() => setIsPressed(true)}
             onMouseUp={() => setIsPressed(false)}
             onMouseLeave={() => setIsPressed(false)}
             onTouchStart={() => setIsPressed(true)}
             onTouchEnd={() => setIsPressed(false)}>

                    <img src={IcClose} style={{
                        width: `${sizeImg}px`,
                        height: `${sizeImg}px`,
                    }}/>

        </div>

    )
}