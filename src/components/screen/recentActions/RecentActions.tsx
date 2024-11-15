import * as React from "react";
import {useEffect, useState} from "react";
import {useTheme} from "../../../core/style/ThemeContext.tsx";
import {getRecentActions, RecentAction} from "../../../core/remoteWork/RecentItemRemote.tsx";
import {RecentItem} from "../../otherViews/recentItem/RecentItem.tsx";
import lottieBalloons from "../../../assets/lottie/emoji-balloons.json"
import LottieAnimation from "../../otherViews/LottieAnimation.tsx";
import {useTelegramBackButton} from "../../../core/Utils.ts";
import  Progressbar from "../../otherViews/progressBar/ProgressBar.tsx";

export const RecentActionsScreen: React.FC = () => {

    try {
        useTelegramBackButton(true)
    } catch (e) {
        console.log("error in postEvent - ", e)
    }

    const {theme} = useTheme()
    const [recentItem, setRecentItem] = useState<RecentAction[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const isGetRecentActions = async () => {
        setIsLoading(true)
        const result = await getRecentActions()
        if (typeof result == "object") {
            setRecentItem(result)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        isGetRecentActions()
    }, []);

    return (
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
        }}>

            {!isLoading &&

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', alignContent: 'center',
                    width: '100%',
                }}>
                    {recentItem?.length > 0 ?
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center', alignContent: 'center',
                            width: '100%',
                        }}>
            <span style={{
                color: theme.tTitle,
                fontSize: '24px',
                fontFamily: "SFSEMIBOLD",
                marginTop: '24px'
            }}>Recent Actions</span>


                            <span style={{
                                color: theme.tSecond,
                                fontSize: '17px',
                                fontFamily: 'SFREGULAR',
                                marginTop: '8px'
                            }}>Here is your action history.</span>


                            {recentItem?.map((item) => (
                                <RecentItem item={item}/>
                            ))}

                        </div>
                        :
                        <div style={{
                            display: 'flex',
                            height: '100%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            alignContent: 'center',
                            paddingTop: '32px',
                            justifyContent: 'center'
                        }}>

                            <LottieAnimation animationData={lottieBalloons} width={100} height={100}/>

                            <span style={{
                                color: theme.tTitle,
                                fontSize: "24px",
                                fontFamily: 'SFSEMIBOLD'
                            }}>History is Empty</span>

                            <span style={{
                                color: theme.tTitle,
                                fontSize: "17px",
                                fontFamily: 'SFREGULAR',
                                textAlign: 'center'
                            }}>Give and receive gifts so there`s something here.</span>

                        </div>

                    }
                </div>
            }

            {isLoading && <Progressbar/>}
        </div>
    )
}