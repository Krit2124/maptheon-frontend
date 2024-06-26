import React from 'react';

import { useGeneralGraphicEditorStore } from 'store/store';

import GraphicEditorPage from './graphicEditorPage';
import GraphicEditorHeader from './graphicEditorHeader';
import HotkeysPanel from './hotkeysPanel';

export default function MainGraphicEditor() {
    const {
        isHotkeysPanelVisible,
    } = useGeneralGraphicEditorStore();

    return (
        <div className="App">
            {isHotkeysPanelVisible && <HotkeysPanel/>}

            <GraphicEditorHeader />

            <GraphicEditorPage />
        </div>
    );
}