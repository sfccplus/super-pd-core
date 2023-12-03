import React, { useEffect, useRef, useState } from "react";
import { ChromePicker, ColorResult } from 'react-color';
import { Portal } from 'react-portal';
import styles from './color-picker.module.scss';

interface ColorPickerProps {
    name: string;
    pickerPosition: 'top' | 'bottom';
    value: string;
    onChange: (a: string) => void
}

export default function ColorPicker({pickerPosition, name, value = '', onChange} : ColorPickerProps) {
    const [colorPickerActive, setColorPickerActive] = useState(false);
    const [selectedColor, setSelectedColor] = useState(value);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const colorPickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => setSelectedColor(value), [value]);

    function handleOutsideClick() {
        setColorPickerActive(false);
    }

    function handleChange(color: ColorResult) {
        const rgb = color.rgb;
        setSelectedColor(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`)
    }

    function handleChangeComplete(color: ColorResult) {
        const rgb = color.rgb;
        if (onChange) {
            onChange(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`);
        }
    }

    function toggleColorPicker(event: React.MouseEvent<HTMLButtonElement>) {
        setColorPickerActive(!colorPickerActive);
        event.stopPropagation();
        return false;
    }

    function getPickerPosition() {
        const buttonElement = buttonRef.current;

        if(!buttonElement) return;

        const clientRec = buttonElement.getBoundingClientRect();
        if (pickerPosition == 'bottom') {
            return {
                top: clientRec.bottom + 5,
                right: window.innerWidth - clientRec.right + 2,
            };
        }

        return {
            bottom: window.innerHeight - clientRec.bottom + 40,
            right: window.innerWidth - clientRec.right + 2,
        };
    }

    return (
        <div className={`${styles.colorPickerContainer} slds-form-element`}>
            <label className="slds-form-element__label">{name}</label>
            <div className="slds-form-element__control slds-grid">
                <input
                    type="text"
                    value={selectedColor}
                    placeholder={name}
                    className="slds-input slds-m-right_x-small"
                    readOnly
                />
                <div className={`${styles.pickerButtonContainer} slds-size_xxx-small`}>
                    <button
                        className={`${styles.colorPickerButton} slds-button slds-button_neutral`}
                        style={{backgroundColor: selectedColor}}
                        onClick={toggleColorPicker}
                        ref={buttonRef}
                    ></button>
                </div>
            </div>

            <Portal>
                {colorPickerActive && (
                    <>
                        <div
                            onMouseDown={handleOutsideClick}
                            style={{
                                position: 'fixed',
                                height: '100%',
                                width: '100%',
                                backgroundColor: 'transparent',
                                top: 0,
                                left: 0,
                            }}
                        ></div>
                        <div
                            ref={colorPickerRef}
                            className={`${styles.colorPicker}`}
                            style={{ ...getPickerPosition() }}
                        >
                            <ChromePicker
                                color={selectedColor}
                                onChangeComplete={handleChangeComplete}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                )}
            </Portal>
        </div>
    )    
}