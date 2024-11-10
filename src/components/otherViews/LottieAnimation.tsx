import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

type LottieAnimationProps = {
    url?: string; // URL для загрузки JSON
    animationData?: object; // JSON-данные анимации, если они локальные
    width?: number;
    height?: number;
};

const LottieAnimation: React.FC<LottieAnimationProps> = ({ url, animationData, width = 300, height = 300 }) => {
    const animationContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Проверяем, есть ли либо url, либо animationData
        if (!url && !animationData) return;

        // Загружаем анимацию в зависимости от типа источника
        const loadAnimation = async () => {
            let data = animationData;
            if (!data && url) {
                // Если данных нет, загружаем JSON по URL
                const response = await fetch(url);
                data = await response.json();
            }

            // Загружаем анимацию с помощью Lottie
            lottie.loadAnimation({
                container: animationContainer.current!,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: data,
            });
        };

        loadAnimation().catch(error => console.error('Ошибка загрузки анимации', error));

        // Очищаем анимацию при размонтировании компонента
        return () => {
            lottie.destroy();
        };
    }, [url, animationData]);

    return (
        <div
            ref={animationContainer}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                overflow: 'hidden',
            }}
        />
    );
};

export default LottieAnimation;
