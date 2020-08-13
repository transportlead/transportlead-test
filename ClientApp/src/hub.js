import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { EventEmitter } from 'events';

export const hub = new EventEmitter();

hub.init = () => {
    const connection = new HubConnectionBuilder()
        .withUrl('/data')
        .configureLogging(LogLevel.Information)
        .build();

    const addListener = hub.addListener;
    hub.addListener = (...args) => {
        addListener.call(hub, ...args);
        connection.on(...args);
    };
    const removeListener = hub.removeListener;
    hub.removeListener = (...args) => {
        removeListener.call(hub, ...args);
        connection.off(...args);
    };
    hub.on = hub.addListener;
    hub.off = hub.removeListener;

    const emit = hub.emit;
    hub.emit = (...args) => {
        emit.call(hub, ...args);
        connection.invoke(...args);
    };

    connection.onclose = () => {
        emit.call(hub, 'hub:close');
    };

    hub.start = () => connection.start()
        .then(() => {
            emit.call(hub, 'hub:start');
            connection.invoke('Connect');
        })
        .catch(err => hub.emit('error', err));

    return hub.start();
};

export default hub;
