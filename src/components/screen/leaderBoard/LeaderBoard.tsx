import * as React from "react";
import {useTheme} from "../../../core/style/ThemeContext.tsx";
import NavigationBar from "../../otherViews/navigationBar/NavigationBar.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getLeaderboard, getLeaderboardResponse} from "../../../core/remoteWork/LeaderBoardRemote.tsx";
import {LeaderBoardItem} from "../../otherViews/leaderBoardItem/LeaderBoardItem.tsx";


export const LeaderBoardScreen: React.FC = () => {

    const {theme} = useTheme()
    const navigate = useNavigate();

    const [isLeader, setIsLeader] = useState<getLeaderboardResponse[] | null>(null)


    const isGetLeaderboard = async () => {
        const result = await getLeaderboard()
        console.log("result is",result)
        if(typeof result == "object") {
            setIsLeader(result)
        }
    }

    useEffect(() => {
        isGetLeaderboard()
    }, []);


    return (<div style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: theme.background,
        gap: '8px',
    }}>


        <div style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            height: '100vh',
            padding: '16px',
            gap: '6px'
        }}>


            {isLeader?.map((leader, pos ) => (

                <LeaderBoardItem name={leader.userName} gift={leader.gifts} onClick={() => {
                    navigate('/aboutUser', { state: {user: leader, pos: pos + 1} })
                }} img={leader.imageAvatar} posithion={pos + 1}/>

            ))}


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
                initialSelected={"Leaderboard"}
                onStoreClick={() => {
                    navigate('/store')
                }}
                onGiftClick={() => {
                    navigate('/gift')
                }}
                onLeaderboardClick={() => {
                }}
                onProfileClick={() => {
                    navigate('/profile')
                }}
            />
        </div>


    </div>)
}