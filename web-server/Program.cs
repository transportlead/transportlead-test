using System;
using System.IO;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace web_server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string pathToContentRoot = Directory.GetCurrentDirectory();
            IConfiguration configuration = CreateConfiguration(args, pathToContentRoot);
            CreateWebHostBuilder(args, configuration).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args, IConfiguration config)
        {
            string pattern = @"\[(\w+)\]";
            MatchEvaluator evaluator = new MatchEvaluator(Replacer);
            return WebHost.CreateDefaultBuilder(args)
                .UseWebRoot(Regex.Replace(config["web:root"], pattern, evaluator, RegexOptions.IgnoreCase, TimeSpan.FromSeconds(2)))
                .UseKestrel()
                .UseConfiguration(config)
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>();
        }

        public static IConfiguration CreateConfiguration(string[] args, string pathToContentRoot)
        {
            string environmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            IConfigurationBuilder builder = new ConfigurationBuilder()
                .SetBasePath(pathToContentRoot)
                .AddJsonFile($"appsettings.json", true, true)
                .AddJsonFile($"appsettings.{environmentName}.json", true, true)
                .AddEnvironmentVariables()
                .AddCommandLine(args);

            return builder.Build();
        }

        public static string Replacer(Match match)
        {
            if (match.Success)
            {
                if (match.Groups[1].Value.ToUpper() == "CWD")
                {
                    return Directory.GetCurrentDirectory();
                }
                return match.Groups[1].Value;
            }
            return match.Value;
        }
    }
}
