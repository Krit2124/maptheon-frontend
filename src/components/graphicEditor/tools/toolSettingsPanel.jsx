import React, { useEffect, useState } from 'react';

import BrushSettings from './brushSettings';
import ObjectSettings from './objectSettings';
import LabelSettings from './labelSettings';
import CanvasSettings from './canvasSettings';
import { useGeneralGraphicEditorStore } from 'store/store';

import closeImage from "../../../assets/icons/Close.png"

export default function ToolSettingsPanel() {
    const {
        currentTool,
        setIsToolSettingsPanelVisible,
        typeOfChoosenObject,
    } = useGeneralGraphicEditorStore();

    const [panelLabel, setPanelLabel] = useState("Свойства инструмента");

    let handleCloseToolSettingsPanel = () => {
        setIsToolSettingsPanelVisible(false)
    }

    // Изменение заголовка панели в зависимости от нажатой кнопки
    useEffect(() => {
        if (currentTool === "Brush") {
            setPanelLabel("Свойства кисти");
        } else if (currentTool === "Object") {
            setPanelLabel("Свойства объекта");
        } else if (currentTool === "Label") {
            setPanelLabel("Свойства подписи");
        } else if (currentTool === "Canvas") {
            setPanelLabel("Свойства холста");
        } else if (typeOfChoosenObject === "Object") {
            setPanelLabel("Свойства объекта");
        } else if (typeOfChoosenObject === "Label") {
            setPanelLabel("Свойства подписи");
        } else if ( typeOfChoosenObject === "Canvas") {
            setPanelLabel("Свойства холста");
        }
    }, [currentTool, typeOfChoosenObject]);

    return (
        <div className="border-black-right background-black canvasPanel size-full-vertical-pagePercent-withHeader flex-col-top-left flex-gap-25">
            <div className='flex-row-sb-c size-full-horizontal-percent panelLabel'>
                <h1>{panelLabel}</h1>

                <button className='button-image-small' onClick={handleCloseToolSettingsPanel}>
                    <img src={closeImage} alt="Закрыть"/>
                </button>
            </div>

            {/* Изменение контента панели в зависимости от нажатой кнопки */}
            {currentTool === "Brush" ? <BrushSettings/> 
            : currentTool === "Object" ? <ObjectSettings/> 
            : currentTool === "Label" ? <LabelSettings/> 
            : currentTool === "Canvas" ? <CanvasSettings/>
            : typeOfChoosenObject === "Label" ? <LabelSettings/> 
            : typeOfChoosenObject === "Object" ? <ObjectSettings/>
            : null}
        </div>
    );
}