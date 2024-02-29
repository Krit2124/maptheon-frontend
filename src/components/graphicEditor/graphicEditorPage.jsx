import React from 'react';

import GraphicEditorToolsPanel from './graphicEditorToolsPanel';
import ObjectListOnCanvas from './objectListOnCanvas';
import ToolSettingsPanel from './toolSettingsPanel';

function GraphicEditorPage() {
    return (
        <section className="background-gray-default size-full-vertical-pagePercent-withHeader">
            <div className='size-full-horizontal-percent flex-row-sb-c'>
                <div className='flex-row-left-c'>
                    <GraphicEditorToolsPanel />
                    <ToolSettingsPanel />
                </div>
                

                <ObjectListOnCanvas />
            </div>
        </section>
    );
}

export default GraphicEditorPage;