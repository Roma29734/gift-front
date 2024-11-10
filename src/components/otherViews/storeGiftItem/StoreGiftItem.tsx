import * as React from "react";
import LottieAnimation from "../LottieAnimation.tsx";
import bg from "../../../assets/ico/bg-item.svg";
import {Price} from "../../../core/remoteWork/StoreRemote.tsx";

interface StoreGiftItemParam {
    urlGif: string;
    name: string;
    price: Price;
    backgroundColor?: string; // Параметр для цвета фона
    onClick: () => void;
}

export const StoreGiftItem: React.FC<StoreGiftItemParam> = ({
                                                                urlGif,
                                                                name,
                                                                price,
                                                                backgroundColor = "#FE9F41",
                                                                onClick,
                                                            }) => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            borderRadius: '12px',
            padding: '16px',
            alignItems: 'center',
            alignContent: 'center',
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden',
        }} onClick={onClick}>
            {/* Полупрозрачный цветной слой для наложения цвета */}
            <div style={{
                backgroundColor,
                opacity: 0.2, // Уменьшено значение для лучшего отображения текстуры
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '12px',
                zIndex: 1,
            }} />

            {/* Содержимое блока */}
            <div style={{ zIndex: 2, position: 'relative', alignItems: 'center', alignContent: 'center',  display: 'flex',
                flexDirection: 'column', }}>
                <span style={{
                    fontSize: '13px',
                    fontFamily: "SFREGULAR",
                    color: 'black'
                }}>
                    12 in 10
                </span>

                <LottieAnimation width={128} height={128} url={`http://localhost:3000${urlGif}`} />

                <span style={{
                    color: 'black',
                    fontFamily: "SFSEMIBOLD",
                    fontSize: '17px'
                }}>
                    {name}
                </span>

                <div style={{
                    width: '100%',
                    display: 'flex',
                    boxSizing: 'border-box',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    background: '#007AFF',
                    borderRadius: '100px',
                    color: 'white',
                    padding: '4px 8px',
                    marginTop: '8px',
                    flexDirection: 'row',
                    fontFamily: "SFSEMIBOLD",
                    fontSize: '13px'
                }}>
                    <img src={price.imgCurrency} style={{
                        width: '16px',
                        height: '16px'
                    }}/>

                    {price.value} {price.nameCurrency}
                </div>
            </div>
        </div>
    )
}
