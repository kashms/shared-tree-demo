/* eslint-disable react/jsx-key */
import React from 'react';
import { createRoot } from 'react-dom/client';

import { loadNotebookData } from './notebookdata';
import { Notebook } from './notebook';

import { loadFluidData } from './fluid';
import { ReactApp } from './ux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

async function main() {
    
    // create the root element for React
    const app = document.createElement('div');
    app.id = 'app';
    document.body.appendChild(app);
    const root = createRoot(app);

    // Initialize Fluid data
    const { appData, sessionData, services, container } = await loadFluidData();    
    // const { notebookData, notebookServices, notebookContainer } = await loadNotebookData();  

    // Render the app    
    root.render(
        // <Notebook data={notebookData} services={notebookServices} container={notebookContainer} />
        <DndProvider backend={HTML5Backend}>
            <ReactApp data={appData} session={sessionData} audience={services.audience} container={container} />
        </DndProvider>
    );
}

export default main();
