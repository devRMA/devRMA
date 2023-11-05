import {
    GitHubLogoIcon,
    GlobeIcon as RadixGlobeIcon,
    LinkedInLogoIcon,
    MoonIcon as RadixMoonIcon,
    SunIcon as RadixSunIcon,
} from "@radix-ui/react-icons";
import * as React from "react";

import { IconSvgProps } from "@/types";

export const LinkedInIcon = ({ size = 24, width, height }: IconSvgProps) => {
    return <LinkedInLogoIcon height={size || height} width={size || width} fill="currentColor" />;
};

export const GithubIcon = ({ size = 24, width, height }: IconSvgProps) => {
    return <GitHubLogoIcon height={size || height} width={size || width} fill="currentColor" />;
};

export const MoonIcon = ({ size = 24, width, height }: IconSvgProps) => {
    return <RadixMoonIcon height={size || height} width={size || width} fill="currentColor" />;
};

export const SunIcon = ({ size = 24, width, height }: IconSvgProps) => {
    return <RadixSunIcon height={size || height} width={size || width} fill="currentColor" />;
};

export const GlobeIcon = ({ size = 24, width, height }: IconSvgProps) => {
    return <RadixGlobeIcon height={size || height} width={size || width} fill="currentColor" />;
};
