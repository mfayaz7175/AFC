import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';


import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for handling routes

import './i18n';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Initialize the Inertia App
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Wrap the App in BrowserRouter for compatibility with React Router components
        root.render(
            // <BrowserRouter>
                <App {...props} />
            // </BrowserRouter>
        );
    },
    progress: {
        color: '#4B5563', // Customize the progress bar color
    },
});