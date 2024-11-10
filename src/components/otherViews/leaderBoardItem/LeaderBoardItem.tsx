import * as React from "react";
import {useTheme} from "../../../core/style/ThemeContext.tsx";
import IcGift from "../../../assets/ico/ic_gift.svg";

interface LeaderBoardItemParam {
    img: string;
    name: string;
    posithion: number;
    gift: number
    onClick: () => void;
}

export const LeaderBoardItem: React.FC<LeaderBoardItemParam> = ({img, name, posithion, gift, onClick}) => {

    const {theme} = useTheme()

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'
        }} onClick={onClick}>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '6px'
            }}>

                <img src={img} style={{
                    width: '40px',
                    height: '40px'
                }}/>

                <div
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>

                    <span style={{
                        color: theme.tTitle,
                        fontFamily: 'SFREGULAR',
                        fontSize: '17px'
                    }}>
                        {name}
                    </span>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '6px'
                    }}>

                        <img src={IcGift} style={{
                            width: '12px',
                            height: '12px',
                            filter: 'brightness(0) saturate(100%) invert(31%) sepia(83%) saturate(4394%) hue-rotate(184deg) brightness(96%) contrast(102%)'
                        }}/>

                        <span style={{
                            color: theme.primary,
                            fontFamily: 'SFREGULAR',
                            fontSize: '13px'
                        }}>
                            {gift} gifts
                        </span>


                    </div>

                </div>

            </div>

            <span style={{
                color: theme.tSecond,
                fontFamily: 'SFREGULAR',
                fontSize: '15px'
            }}>
                #{posithion}
            </span>

        </div>
    )

}