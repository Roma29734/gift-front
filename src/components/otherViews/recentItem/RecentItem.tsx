import * as React from "react";
import {
    isBuyGiftType,
    isReceiveGiftType,
    isSentGiftType,
    RecentAction
} from "../../../core/remoteWork/RecentItemRemote.tsx";
import {useTheme} from "../../../core/style/ThemeContext.tsx";
import IcReceive from "../../../assets/ico/ic_status_receive.svg";
import IcSent from "../../../assets/ico/ic_status_sent.svg";
import IcBuy from "../../../assets/ico/ic_status_buy.svg";

interface RecentItemParam {
    item: RecentAction
}

export const RecentItem: React.FC<RecentItemParam> = ({item}) => {

    const {theme} = useTheme()


    const getIconForType = () => {
        if (isReceiveGiftType(item.type)) return IcReceive;
        if (isSentGiftType(item.type)) return IcSent;
        if (isBuyGiftType(item.type)) return IcBuy;
        return IcReceive;
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: 'calc(100% - 32px)'
        }}>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
            }}>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center'
                }}>
                    <div style={{
                        position: 'relative', // Для использования absolute у накладывающейся иконки
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: theme.accentBg,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img src={item.img} style={{
                            width: '32px',
                            height: '32px'
                        }}/>

                        {/* Накладывающаяся иконка */}
                        <img src={
                            getIconForType()
                        } style={{
                            position: 'absolute',
                            right: '-4px',
                            top: '80%',
                            transform: 'translateY(-50%)', // Центровка по вертикали
                            width: '16px', // Задайте подходящий размер для наложенной иконки
                            height: '16px'
                        }}/>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        marginLeft: '8px'
                    }}>
                        <span style={{
                            color: theme.tSecond,
                            fontSize: '13px',
                            fontFamily: 'SFREGULAR'
                        }}>{item.type.name}</span>

                        <span style={{
                            fontFamily: "SFREGULAR",
                            fontSize: '17px',
                            color: theme.tTitle
                        }}>
                            {item.name}
                        </span>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
                    gap: '4px'
                }}>

                    <span style={{
                        color: theme.tTitle,
                        fontSize: '15px',
                        fontFamily: 'SFREGULAR'
                    }}>
                        {isReceiveGiftType(item.type) && "from"}
                        {isSentGiftType(item.type) && "sent"}
                    </span>

                    {isReceiveGiftType(item.type) &&
                        <span style={{
                            color: theme.primary,
                            fontSize: '15px',
                            fontFamily: 'SFREGULAR'
                        }}>
                            {item.type.fromName}
                        </span>
                    }

                    {isSentGiftType(item.type) &&
                        <span style={{
                            color: theme.primary,
                            fontSize: '15px',
                            fontFamily: 'SFREGULAR'
                        }}>
                            {item.type.toName}
                        </span>
                    }
                </div>
            </div>


            <div style={{
                marginLeft: '48px',
                marginRight: '8px',
                width: 'calc(100% - 56px)',
                height: '1px',
                backgroundColor: "black",
                marginTop: '8px'
            }} />
        </div>
    )
}
