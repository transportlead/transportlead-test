using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace web_server.hubs
{
    public class DataHub : Hub<IDataHub>
    {
        public async Task Connect()
        {
            await Clients.Caller.Connected(DateTime.Now);
        }
    }
}
