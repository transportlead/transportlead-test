import m from 'mithril';
import Hub from './hub';

import 'spectre.css/dist/spectre.min.css';

Hub.on('error', console.error);

const Main = {
    oninit() {
        this.connected = null;

        Hub.on('Connected', (data) => {
            this.connected = new Date(data).toISOString();
            m.redraw();
        });
    },
    view() {
        return (
            <div>{this.connected}</div>
        );
    }
};

Hub.init()
    .then(() => {
        m.mount(document.querySelector('#main') || document.body, Main);
    });
