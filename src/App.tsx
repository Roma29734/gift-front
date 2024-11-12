import React from 'react';
import "./App.css"
import {DataProvider} from "./components/otherViews/DataContext.tsx";
import {ToastProvider} from "./components/otherViews/toast/ToastContext.tsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { postEvent, initSwipeBehavior} from "@telegram-apps/sdk";
import {StoreScreen} from "./components/screen/store/Store.tsx";
import {BuyGiftScreen} from "./components/screen/buyGift/BuyGift.tsx";
import {ReceiveGiftScreen} from "./components/screen/receiveGift/ReceiveGift.tsx";
import {GiftsScreen} from "./components/screen/gifts/Gifts.tsx";
import {ProfileScreen} from "./components/screen/profile/Profile.tsx";
import {ThemeProviderComponent} from "./core/style/ThemeContext.tsx";
import {LeaderBoardScreen} from "./components/screen/leaderBoard/LeaderBoard.tsx";
import {AboutUserScreen} from "./components/screen/aboutUser/AboutUser.tsx";
import {RecentActionsScreen} from "./components/screen/recentActions/RecentActions.tsx";
const App: React.FC = () => {



    try {
        postEvent('web_app_expand');
        try {
            const [swipeBehavior] = initSwipeBehavior();
            swipeBehavior.disableVerticalSwipe();
        } catch (e) {
            console.log("change behavor - err", e)
        }
    }catch (e) {
        console.log("change theme - err", e)
    }

    return (
        <div className="app-container">
            <ThemeProviderComponent>

            <DataProvider>
                <ToastProvider>
                    <Router >
                        <Routes>
                            <Route path="/" element={<StoreScreen />} />
                            <Route path="/store" element={<StoreScreen />} />
                            <Route path='/buyGift' element={<BuyGiftScreen />} />
                            <Route path='/receiveGift' element={<ReceiveGiftScreen/>}/>
                            <Route path='/gift' element={<GiftsScreen/>}/>
                            <Route path='/profile' element={<ProfileScreen/>}/>
                            <Route path='/leaderBoard' element={<LeaderBoardScreen/>}/>
                            <Route path='/aboutUser' element={<AboutUserScreen/>}/>
                            <Route path='/recentActions' element={<RecentActionsScreen/>}/>
                        </Routes>
                    </Router>
                </ToastProvider>
            </DataProvider>
            </ThemeProviderComponent>
        </div>
    );
};

export default App;
