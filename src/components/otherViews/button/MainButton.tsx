import * as React from "react";
import {useState} from "react";


interface MainButtonParam {
    tx: string;
    onClick: () => void;
    padding?: number | null;
    colorBg?: string | null;
    colorTx?: string | null;
}

export const MainButton: React.FC<MainButtonParam> = ({tx, onClick, colorBg= "#007AFF", colorTx = "white", padding}) => {

    const [isPressed, setIsPressed] = useState(false)


    return (

        <div style={{
            boxSizing: 'border-box',
            width: `calc(100% - ${padding ? padding : 32}px)`,
            borderRadius: '12px',
            background: colorBg,
            paddingLeft: '16px',
            paddingRight: '16px',
            alignItems: 'center',
            alignContent: 'center',
            flexDirection: 'column',
            marginTop: '8px',
            marginBottom: '8px',
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

                    <span style={{
                        color: colorTx,
                        fontFamily: 'SFSEMIBOLD',
                        fontSize: '17px',
                        padding: '14px'
                    }}>{tx}</span>

        </div>

    )
}