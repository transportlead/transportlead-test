using System;
using System.Threading.Tasks;

namespace web_server.hubs
{
    public interface IDataHub
    {
        Task Connected(DateTime now);
        Task Receive(string topic, string payload);
        Task Load(object payload);
    }
}
