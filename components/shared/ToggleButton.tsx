"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

type ToggleButtonProps = {
    buttonNames: string[];
    buttonWidth?: string; // Optional width property
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ buttonNames, buttonWidth = '5rem' }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="flex justify-center">
            {buttonNames.map((name, index) => (
                <Button
                    key={name}
                    className="text-sm bg-light-1 text-dark-1 font-medium text-center relative hover:bg-gray-200 rounded-none"
                    onClick={() => handleClick(index)}
                    style={{
                        width: buttonWidth, // Use the buttonWidth prop
                        height: '2.5rem',
                        lineHeight: '2.5rem',
                    }}
                >
                    {name}
                    {activeIndex === index && (
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-6 bg-primary-500"/>
                    )}
                </Button>
            ))}
        </div>
    );
};

export default ToggleButton;

