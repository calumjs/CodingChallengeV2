using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using CodingChallengeV2.AzureFunctions.Shared;
using System.Web;
using System.Collections.Generic;

namespace CodingChallengeV2.AzureFunctions
{

    public static class GetCodingChallengeProgress
    {      
        [FunctionName("GetCodingChallengeProgress")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string email = req.Query["email"];
            
            var client = GraphService.GetGraphServiceClient();
            
            var result = await client.Sites[GraphService.SITE_ID].Lists[GraphService.LIST_ID].Items.Request().Filter($"fields/ssw_CandidateEmail eq '{email}'").Expand("fields").GetAsync();
            if (result.Count == 0)
            {
                throw new Exception("No item was found with the specified email address.");
            }
            
            var fieldValues = new Dictionary<string, string>();

            foreach (var pair in result[0].Fields.AdditionalData)
            {
                fieldValues[pair.Key] = pair.Value.ToString();
            }
            string jsonResult = JsonConvert.SerializeObject(fieldValues);

            return new OkObjectResult(jsonResult);
        }
    }
}
