
export const OpenUrl = (url: string) => {
    window.open(url, '_blank')
}

export const sendToTgChose = (shareMessage: string) => {


    const telegramShareUrl = `https://t.me/share/url?url=&text=${encodeURIComponent(shareMessage)};`

    OpenUrl(telegramShareUrl)
}