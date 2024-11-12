import {on, postEvent } from "@telegram-apps/sdk-react";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const OpenUrl = (url: string) => {
    window.open(url, '_blank')
}

export const sendToTgChose = (shareMessage: string) => {


    const telegramShareUrl = `https://t.me/share/url?url=&text=${encodeURIComponent(shareMessage)}`

    OpenUrl(telegramShareUrl)
}

const setupBackButton = (state: boolean) => {
    try {
        postEvent('web_app_setup_back_button', {is_visible: state});
    } catch (e) {
        console.log("error in postEvent - ", e);
    }
};

export const useTelegramBackButton = (state: boolean) => {
    const navigate = useNavigate();

    useEffect(() => {
        setupBackButton(state);

        const removeListener = on('back_button_pressed', () => {
            console.log('Back button pressed');
            navigate(-1);
        });

        return () => {
            removeListener();
        };
    }, [navigate]);
};

