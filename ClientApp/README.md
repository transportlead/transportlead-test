# ClientApp
Builds the frontend of the application

## Dependencies
* [Mithril](https://mithril.js.org/)
* [Spectre CSS](https://picturepan2.github.io/spectre/getting-started.html)
* [SignalR](https://docs.microsoft.com/en-us/aspnet/core/tutorials/signalr?view=aspnetcore-2.2&tabs=visual-studio-code)

## Modules
* **hub** - starts a connection to the server using signalr

### Examples

replace **'&lt;message from server&gt;'** with ones sent by the Hub
replace **'&lt;callback&gt;'** with a function that will handle the data sent from the Hub

    import Hub from './hub';

    Hub.on('error', console.error);
    Hub.init()
        .then(() => {
            Hub.on('<message from server>', <callback>)
        });

## Components
The **Main** component supplied is just an example, replace it by your own
