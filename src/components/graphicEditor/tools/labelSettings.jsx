import React, { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useGeneralGraphicEditorStore, useLabelSettingsState } from 'store/store';

import showOrHideImage from "../../../assets/icons/ShowOrHide.png"
import boldFontImage from "../../../assets/icons/BoldFont.png"
import italicFontImage from "../../../assets/icons/ItalicFont.png"
import leftAlignmentImage from "../../../assets/icons/LeftAlignment.png"
import centerAlignmentImage from "../../../assets/icons/CenterAlignment.png"
import rightAlignmentImage from "../../../assets/icons/RightAlignment.png"

export default function LabelSettings() {
    const {
        currentLabelValue, setCurrentLabelValue,
        fontSize, setFontSize,
        letterSpacing, setLetterSpacing,
        lineSpacing, setLineSpacing,
        labelRotation, setLabelRotation,
        labelBorderWidth, setLabelBorderWidth,
        selectedFont, setSelectedFont,
        labelColor, setLabelColor,
        labelBorderColor, setLabelBorderColor,
        isLabelBold, setIsLabelBold,
        isLabelItalic, setIsLabelItalic,
        labelAlign, setLabelAlign,
        labelSelected, setLabelSelected,
    } = useLabelSettingsState();
    
    // Обработка изменения шрифта
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleFontSelect = (fontOption) => {
        setSelectedFont(fontOption);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Обработка изменения свойств шрифта
    const handleSliderChange = (value, setValue) => {
        setValue(value);
    };

    const handleInputChange = (value, setValue, min, max) => {
        if (value > max) {
            value = max;
        } else if (value < min) {
            value = min;
        }

        setValue(value);
    };

    const [textareaValue, setTextareaValue] = useState(currentLabelValue);

    // Обработки изменения значений свойств
    const handleTextChange = (value) => {
        if (labelSelected != null) {
            labelSelected.text = value;
        }
        setCurrentLabelValue(value);
        setTextareaValue(value);
    };

    const handleFontChange = (value) => {
        if (labelSelected != null) {
            labelSelected.fontFamily = value;
        } 
        setSelectedFont(value);
    };

    const handleFontSizeChange = (value) => {
        if (labelSelected != null) {
            labelSelected.fontSize = value;
        }
        setFontSize(value);
    };

    const handleBorderWidthChange = (value) => {
        if (labelSelected != null) {
            labelSelected.strokeWidth = value;
        }
        setLabelBorderWidth(value);
    };

    const handleBorderColorChange = (value) => {
        if (labelSelected != null) {
            labelSelected.stroke = value;
        }
        setLabelBorderColor(value);
    };

    const handleFontColorChange = (value) => {
        if (labelSelected != null) {
            labelSelected.fill = value;
        }
        setLabelColor(value);
    };

    const handleIsBoldChange = (value) => {
        if (labelSelected != null) {
            if (value === true) labelSelected.fontWeight = 'bold';
            else labelSelected.fontWeight = 'normal'
        }
        setIsLabelBold(value);
    };

    const handleIsItalicChange = (value) => {
        if (labelSelected != null) {
            if (value === true) labelSelected.fontStyle = 'italic';
            else labelSelected.fontStyle = 'normal'
        }
        setIsLabelItalic(value);
    };

    const handleAlignChange = (value) => {
        if (labelSelected != null) {
            labelSelected.textAlign = value;
        }
        setLabelAlign(value);
    };

    const handleLetterSpacingChange = (value) => {
        if (labelSelected != null) {
            labelSelected.charSpacing = value * 500;
        }
        setLetterSpacing(value);
    };

    const handleLineSpacingChange = (value) => {
        if (labelSelected != null) {
            labelSelected.lineHeight = value;
        }
        setLineSpacing(value);
    };

    const handleRotationChange = (value) => {
        if (labelSelected != null) {
            labelSelected.angle = value;
        }
        setLabelRotation(value);
    };

    return (
        <div className='flex-col-top-left flex-gap-25 size-full-horizontal-percent'>
            <div className='flex-col-sb-left flex-gap-10 size-full-horizontal-percent'>
                <p>Текст</p>
                <textarea 
                    // @ts-ignore
                    rows="3" 
                    className="textInput-usual size-full-horizontal-percent" 
                    value={textareaValue}
                    onChange={(e) => handleTextChange(e.target.value)}
                />
            </div>

            <div className="flex-row-sb-c size-full-horizontal-percent">
                <p>Шрифт</p>

                <DropdownButton className='flex-col-sb-right white-border-when-active' onToggle={handleDropdownToggle} align="end" title={
                    <span className=' button-text-usual'>
                        {selectedFont}
                        <img
                            src={showOrHideImage}
                            alt="Показать или скрыть"
                            style={{
                            marginLeft: '15px',
                            width: '12px',
                            transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                            transition: 'transform 0.3s ease-in-out',
                            }}
                        />
                    </span>
                }>
                    <div className='flex-col-sb-right'>
                        <Dropdown.Item onClick={() => handleFontChange('Times New Roman')}>Times New Roman</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFontChange('Verdana')}>Verdana</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFontChange('Segoe UI')}>Segoe UI</Dropdown.Item>
                    </div>
                </DropdownButton>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Размер шрифта</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="8" max="72" value={fontSize} onChange={(e) => handleSliderChange(parseInt(e.target.value), handleFontSizeChange)}/>
                    <input type="number" min="8" max="72" value={fontSize} onChange={(e) => handleInputChange(parseInt(e.target.value), handleFontSizeChange, 8, 72)}/>
                </div>
            </div>

            <div className="flex-row-sb-c flex-gap-15">
                <div className="flex-col-sb-left flex-gap-10">
                    <p>Цвет текста</p>
                    <p>Обводка</p>
                </div>

                <div className="flex-col-sb-left flex-gap-10">
                    <input type="color" value={labelColor} onChange={(e) => handleFontColorChange(e.target.value)} />
                    <div className='flex-row-sb-c flex-gap-15'>
                        <input type="color" value={labelBorderColor} onChange={(e) => handleBorderColorChange(e.target.value)} />
                        <input type="number" min="0" max="10" onChange={(e) => handleInputChange(parseFloat(e.target.value), handleBorderWidthChange, 0, 10)}/>
                    </div>
                </div>
            </div>

            <div className="flex-row-sb-c size-full-horizontal-percent">
                <div className="flex-row-sb-c flex-gap-5">
                    <button className={`button-image-medium ${isLabelBold ? 'active' : ''}`} onClick={() => handleIsBoldChange(!isLabelBold)}>
                        <img src={boldFontImage} alt="Жирный шрифт"/>
                    </button>

                    <button className={`button-image-medium ${isLabelItalic ? 'active' : ''}`} onClick={() => handleIsItalicChange(!isLabelItalic)}>
                        <img src={italicFontImage} alt="Курсивный шрифт"/>
                    </button>
                </div>

                <div className="flex-row-sb-c flex-gap-5">
                    <button className={`button-image-medium ${labelAlign === 'left' ? 'active' : ''}`} onClick={() => handleAlignChange('left')}>
                        <img src={leftAlignmentImage} alt="Выравнивание по левому краю"/>
                    </button>

                    <button className={`button-image-medium ${labelAlign === 'center' ? 'active' : ''}`} onClick={() => handleAlignChange('center')}>
                        <img src={centerAlignmentImage} alt="Выравнивание по центру"/>
                    </button>

                    <button className={`button-image-medium ${labelAlign === 'right' ? 'active' : ''}`} onClick={() => handleAlignChange('right')}>
                        <img src={rightAlignmentImage} alt="Выравнивание по правому краю"/>
                    </button>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Межбуквенный интервал</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="0" max="10" step="0.1" value={letterSpacing} onChange={(e) => handleSliderChange(parseFloat(e.target.value), handleLetterSpacingChange)}/>
                    <input type="number" min="0" max="10" step="0.1" value={letterSpacing} onChange={(e) => handleInputChange(parseFloat(e.target.value), handleLetterSpacingChange, 0, 10)}/>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Междустрочный интервал</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="0.5" max="3" step="0.1" value={lineSpacing} onChange={(e) => handleSliderChange(parseFloat(e.target.value), handleLineSpacingChange)}/>
                    <input type="number" min="0.5" max="3" step="0.1" value={lineSpacing} onChange={(e) => handleInputChange(parseFloat(e.target.value), handleLineSpacingChange, 0.5, 3)}/>
                </div>
            </div>

            <div className="flex-row-sb-c flex-gap-10">
                <p>Поворот (°)</p>
                <input type="number" min="0" max="360" value={labelRotation} onChange={(e) => handleInputChange(parseInt(e.target.value), handleRotationChange, 0, 360)}/>
            </div>
        </div>
    );
}