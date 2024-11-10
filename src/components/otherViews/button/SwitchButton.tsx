import React from "react";
import { useTheme } from "../../../core/style/ThemeContext.tsx";

interface ToggleOption {
    label: React.ReactNode;
    value: string;
    activeColor?: string; // Уникальный цвет для активного состояния
    iconColor?: string; // Цвет для иконки
}

interface ToggleSwitchProps {
    options: ToggleOption[];
    selected: string;
    onChange: (value: string) => void;
    width?: string;
    height?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
                                                       options,
                                                       selected,
                                                       onChange,
                                                       width = "80px",
                                                       height = "34px",
                                                   }) => {
    const {theme} = useTheme();

    const handleClick = (index: number) => {
        if (options[index].value !== selected) {
            onChange(options[index].value);
        }
    };

    const selectedIndex = options.findIndex(option => option.value === selected);
    const optionWidth = `calc(${width} / ${options.length})`;

    return (
        <div
            style={{
                display: "flex",
                position: "relative",
                width,
                height,
                backgroundColor: theme.swBtn,
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
                outline: "none",
                userSelect: "none",
                border: "none",
                WebkitTapHighlightColor: "transparent",
            }}
            onClick={(e) => {
                // Определение индекса выбранного элемента при клике
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const index = Math.floor(clickX / (rect.width / options.length));
                handleClick(index);
            }}
        >
            {/* Ползунок-подсветка с цветом выбранной опции */}
            <div
                style={{
                    position: "absolute",
                    left: `calc(${selectedIndex} * ${optionWidth})`,
                    width: optionWidth,
                    height: "100%",
                    backgroundColor: options[selectedIndex]?.activeColor || theme.swBtnSelected,
                    borderRadius: "20px",
                    transition: "0.3s ease",
                }}
            />

            {/* Опции */}
            {options.map((option, index) => (
                <div
                    key={option.value}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: `calc(100% / ${options.length})`,
                        height: "100%",
                        color: selected === option.value ? "#fff" : theme.tSecond,
                        fontSize: "14px",
                        fontWeight: selected === option.value ? "bold" : "normal",
                        fontFamily: 'SFSEMIBOLD',
                        zIndex: 1,
                    }}
                >
                    {typeof option.label === "string" ? (
                        option.label
                    ) : (
                        React.cloneElement(option.label as React.ReactElement, {
                            fill: selected === option.value ? option.iconColor || "#fff" : "#000",
                            width: 20,
                            height: 20,
                        })
                    )}
                </div>
            ))}
        </div>
    );
};

export default ToggleSwitch;
