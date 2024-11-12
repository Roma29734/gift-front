import * as React from "react";
import LottieAnimation from "../LottieAnimation.tsx";
import {useState} from "react";
import {useTheme} from "../../../core/style/ThemeContext.tsx";
import {Price} from "../../../core/remoteWork/StoreRemote.tsx";

interface GiftItemSmallParam {
    urlGif: string;
    name: string;
    price: Price;
    backgroundColor?: string;
    onClick: () => void;
}

export const GiftItemSmall: React.FC<GiftItemSmallParam> = ({
                                                                urlGif,
                                                                name,
                                                                price,
                                                                onClick,
                                                            }) => {


    const [isPressed, setIsPressed] = useState(false)
    const {theme} = useTheme()

    return (
        <div style={{
            width: '100%',
            maxWidth: '150px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            borderRadius: '12px',
            padding: '12px',
            alignItems: 'center',
            background: theme.item,
            position: 'relative',
            overflow: 'hidden',
            transition: "transform 0.1s ease, box-shadow 0.1s ease",
            cursor: "pointer",
            transform: isPressed ? "scale(0.95)" : "scale(1)",
            outline: "none",
            userSelect: "none",
            border: "none",
            WebkitTapHighlightColor: "transparent",
        }} onClick={onClick}

             onMouseDown={() => setIsPressed(true)}
             onMouseUp={() => setIsPressed(false)}
             onMouseLeave={() => setIsPressed(false)}
             onTouchStart={() => setIsPressed(true)}
             onTouchEnd={() => setIsPressed(false)}
        >

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                flex: 1, // Заполняем пространство, чтобы не было сдвигов
                justifyContent: 'space-between', // Выровнять контент сверху и снизу
            }}>
                <span style={{
                    color: theme.tTitle,
                    fontFamily: "SFSEMIBOLD",
                    fontSize: '16px',
                    marginBottom: '6px',
                }}>
                    {name}
                </span>

                <LottieAnimation width={80} height={80} url={`${urlGif}`} />

                    <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    background: '#007AFF',
                    borderRadius: '100px',
                    color: 'white',
                    padding: '4px 8px',
                    fontSize: '14px',
                        fontFamily: "SFSEMIBOLD",
                }}>
                    {price.value}

            </div>
        </div>
</div>
)
};