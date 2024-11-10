import React from "react";
import {useTheme} from "../../../core/style/ThemeContext.tsx";

interface ProfileImageWithBadgeProps {
    imageSrc: string;
    badgeText: string;
    badgeColor?: string;
    badgeTextColor?: string;
    size?: number;
}

const ProfileImageWithBadge: React.FC<ProfileImageWithBadgeProps> = ({
                                                                         imageSrc,
                                                                         badgeText,
                                                                         badgeColor = "#888888",
                                                                         badgeTextColor = "#FFFFFF",
                                                                         size = 100,
                                                                     }) => {
    const {theme} = useTheme()

    return (
        <div
            style={{
                position: "relative",
                width: `${size}px`,
                height: `${size}px`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <div
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    overflow: "hidden",
                    clipPath: "circle(50% at 50% 50%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img
                    src={imageSrc}
                    alt="Profile"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </div>


            <div
                style={{
                    position: "absolute",
                    bottom: "-10px",
                    backgroundColor: badgeColor,
                    color: badgeTextColor,
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    fontFamily: 'SFSEMIBOLD',
                    display: "flex",
                    justifyContent: "center",
                    boxShadow: `0 0 0 2px ${theme.background}`,
                    alignItems: "center",
                    whiteSpace: "nowrap",
                }}
            >
                {badgeText}
            </div>
        </div>
    );
};

export default ProfileImageWithBadge;