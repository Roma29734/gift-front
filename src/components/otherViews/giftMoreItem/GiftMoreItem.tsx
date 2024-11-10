import * as React from "react";
import bg from "../../../assets/ico/bg-item.svg";
import LottieAnimation from "../LottieAnimation.tsx";
import {useTheme} from "../../../core/style/ThemeContext.tsx";
import {Price} from "../../../core/remoteWork/StoreRemote.tsx";

interface GiftMoreItemParam {
    urlGif: string;
    name: string;
    price: Price;
    backgroundColor?: string;
    descriptions: string;
}

export const GiftMoreItem: React.FC<GiftMoreItemParam> = ({urlGif, name, price, descriptions, backgroundColor}) => {


    const {theme} = useTheme()

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '16px'
        }}>


            <div style={{
                borderRadius: '12px',
                padding: '16px',
                alignItems: 'center',
                alignContent: 'center',
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}>
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
                }}/>


                <div style={{
                    zIndex: 2, position: 'relative', alignItems: 'center', alignContent: 'center', display: 'flex',
                    flexDirection: 'column',
                }}>

                    <LottieAnimation width={267} height={267} url={`http://localhost:3000${urlGif}`}/>
                </div>
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
            }}>

            <span style={{
                color: theme.tTitle,
                fontSize: '24px',
                fontFamily: 'SFSEMIBOLD'
            }}>{name}</span>


                <div style={{
                    padding: '6px',
                    background: 'rgba(0, 122, 255, 12%)',
                    borderRadius: '100px',
                    marginLeft: '8px'
                }}>
                    <span style={{
                        fontSize: '14px',
                        fontFamily: "SFSEMIBOLD",
                        color: '#007AFF'
                    }}>
                        3 of 300
                    </span>
                </div>

            </div>


            <span style={{
                color: '#8E8E93',
                fontSize: '17px',
                fontFamily: 'SFREGULAR'
            }}>
                {descriptions}
            </span>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '8px'
            }}> 

                <img src={price.imgCurrency} style={{
                    width: '20px',
                    height:'20px'
                }}/>


            <span style={{
                fontSize: '17px',
                color: theme.tTitle,
                fontFamily: 'SFREGULAR'
            }}>
                {price.value} {price.nameCurrency}
            </span>
            </div>

        </div>
    )
}