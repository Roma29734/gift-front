import * as React from "react";
import NavigationBar from "../../otherViews/navigationBar/NavigationBar.tsx";
import ic_gift from "../../../assets/ico/ic_gift.svg";
import {useEffect, useState} from "react";
import { getGifts, Gift} from "../../../core/remoteWork/StoreRemote.tsx";
import {StoreGiftItem} from "../../otherViews/storeGiftItem/StoreGiftItem.tsx";
import {useNavigate} from "react-router-dom";
import {useTheme} from "../../../core/style/ThemeContext.tsx";

export const StoreScreen: React.FC = () => {

    const [gifts, setGifts] = useState<Gift[] | null>(null)
    const navigate = useNavigate();

    const {theme} = useTheme()
    const getGiftsIts = async () => {
         const result = await getGifts()
        if(typeof result == "object") {
            setGifts(result)
        }
    }


    // const getUserByIdAndCreate = async () => {
    //     const  result = await getUserById()
    //     if(typeof  result == "object") {
    //         result
    //         console.log("result", result)
    //     } else {
    //         const createResult =  await createUsers()
    //         console.log("createResult", createResult)
    //     }
    // }


    useEffect(() => {
        getGiftsIts()
        // getUserByIdAndCreate()
    }, []);





    return (
        <div style={{
            width: '100%',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            background: theme.background,
            gap: '8px'
        }}>

            <div style={{
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center',
                alignContent: 'center',
                height: '100vh',
            }}>
                <img src={ic_gift} style={{
                    width: '44px',
                    height: '48px',
                    filter: 'brightness(0) saturate(100%) invert(31%) sepia(83%) saturate(4394%) hue-rotate(184deg) brightness(96%) contrast(102%)',
                    marginTop: '24px'
                }}/>

                <span style={{
                    fontSize: '24px',
                    fontFamily: 'SFSEMIBOLD',
                    color: theme.tTitle
                }}>
                Buy and Send Gifts
            </span>

                <span style={{
                    fontSize: '17px',
                    fontFamily: 'SFREGULAR',
                    color: theme.tSecond
                }}>
                    Unique gifts for  everyone by Crypto Pay
                </span>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)', // Два элемента в строке
                    gap: '10px', // Расстояние между элементами
                    padding: '16px'
                }}>
                    {gifts?.map((gift) => (
                        <StoreGiftItem
                            key={gift.id}
                            name={gift.name}
                            price={gift.price}
                            urlGif={gift.img}
                            backgroundColor={gift.bgColor}
                            onClick={() => {navigate('/buyGift', { state: { gift } })}}
                        />
                    ))}
                </div>


            </div>


            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>

                <NavigationBar
                    initialSelected={"Store"}
                    onStoreClick={() => {}}
                    onGiftClick={() => {
                        navigate('/gift')
                    }}
                    onLeaderboardClick={() => {
                        navigate('/leaderBoard')
                    }}
                    onProfileClick={() => {
                        navigate('/profile')
                    }}
                />
            </div>

        </div>
    )
}