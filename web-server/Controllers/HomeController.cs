using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace load_manager.Controllers
{
    public class HomeController : Controller
    {
        private readonly string IndexFile;

        public HomeController(IConfiguration config)
        {
            IndexFile = config["web:index"];
        }

        public IActionResult Index()
        {
            return File(IndexFile, "text/html");
        }
    }
}
