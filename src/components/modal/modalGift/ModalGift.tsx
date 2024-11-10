import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {CloseButton} from "../../otherViews/button/CloseButton.tsx";
import {GiftArea} from "../../../core/remoteWork/GiftsRemote.tsx";
import LottieAnimation from "../../otherViews/LottieAnimation.tsx";
import {MainButton} from "../../otherViews/button/MainButton.tsx";
import GiftTable from "../../otherViews/table/Table.tsx";
import IcBgStar from "../../../assets/ico/ic_bg_star.svg";

interface ModalGiftProps {
    isVisible: boolean;
    onClose: () => void;
    itemGiftMore: GiftArea
}


export const ModalGift: React.FC<ModalGiftProps> = ({isVisible, onClose, itemGiftMore}) => {


    const overlayRef = useRef<HTMLDivElement>(null);
    const sheetRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);


    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
            if (overlayRef.current && sheetRef.current) {
                // Устанавливаем начальные стили перед анимацией
                overlayRef.current.style.opacity = "0";
                overlayRef.current.style.visibility = "visible";
                sheetRef.current.style.transform = "translateY(100%)";

                // Используем requestAnimationFrame для отсрочки анимации
                requestAnimationFrame(() => {
                    overlayRef.current!.style.opacity = "1";
                    sheetRef.current!.style.transform = "translateY(0)";



                });
            }
        } else {
            if (overlayRef.current && sheetRef.current) {
                sheetRef.current.style.transform = "translateY(100%)";
                setTimeout(() => {
                    if (overlayRef.current) {
                        overlayRef.current.style.opacity = "0";
                        overlayRef.current.style.visibility = "hidden";
                    }
                    setIsAnimating(false);
                }, 300); // Длительность анимации
            }
        }
    }, [isVisible]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
            onClose();
        }
    };

    if (!isVisible && !isAnimating) return null;


    return (
        <div
            className={"modal-overlay"}
            ref={overlayRef}
            onClick={handleOverlayClick}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                opacity: 0,
                visibility: "hidden",
                transition: "opacity 0.3s ease-out, visibility 0.3s ease-out",
                zIndex: 150
            }}>

            <div
                ref={sheetRef}
                style={{
                    backgroundColor: "#EFEFF3",
                    width: "100%",
                    maxWidth: "500px",
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    padding: "20px",
                    boxSizing: "border-box",
                    transform: "translateY(100%)",
                    transition: "transform 0.3s ease-out",
                    alignItems: "center",
                    alignContent: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}>


                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "10px",
                        width: "100%",
                        alignContent: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    ></div>
                    <CloseButton sizeImg={16} sizeBtn={30} onClick={onClose}/>
                </div>

                <div style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '150px'
                }}>
                    {/* Фоновое изображение */}
                    <img
                        src={IcBgStar}
                        alt="Background"
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: 'auto',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />

                    {/* Lottie анимация поверх изображения */}
                    <LottieAnimation
                        width={150}
                        height={150}
                        url={`http://localhost:3000${itemGiftMore.img}`}
                    />
                </div>


                <span style={{
                    fontSize: '24px',
                    color: 'black',
                    fontFamily: 'SFSEMIBOLD',
                    textAlign: 'center',
                }}>
                    Send Gift
                </span>
                <div style={{height: '24px'}}/>

                <GiftTable
                    rows={[
                        {label: "Gift", value: itemGiftMore.name},
                        {label: "Date", value: itemGiftMore.date.toString()},
                        {
                            label: "Price",
                            value: itemGiftMore.price.value.toString(),
                            icon: itemGiftMore.price.imgCurrency
                        },
                        {label: "Availability", value: "3 of 10,000"}
                    ]}
                />

                <div style={{height: '24px'}}/>

                <MainButton tx={"Close"} onClick={() => {
                    onClose()
                }} padding={1}/>

            </div>
        </div>
    )
}