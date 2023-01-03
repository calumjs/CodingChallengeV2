using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using CodingChallengeV2.AzureFunctions.Shared;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Graph;

namespace CodingChallengeV2.AzureFunctions
{
    public static class PersistCodingChallengeProgress
    {
        [FunctionName("PersistCodingChallengeProgress")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            // Get the request body
            string requestBody = req.ReadAsStringAsync().Result;
            dynamic data = JObject.Parse(requestBody);
            
            // Get the email address of the guest user
            string email = data?.email;
            var codingChallengeProgress = data?.CodingChallengeProgress;

            var client = GraphService.GetGraphServiceClient();
            var results = await client.Sites[GraphService.SITE_ID].Lists[GraphService.LIST_ID].Items.Request().Filter($"fields/ssw_CandidateEmail eq '{email}'").Expand("fields").GetAsync();
            if (results.Count == 0)
            {
                throw new Exception("No item was found with the specified email address.");
            }
            var persistResult = await client.Sites[GraphService.SITE_ID].Lists[GraphService.LIST_ID].Items[results.First().Id].Fields.Request().UpdateAsync(new FieldValueSet
            {
                AdditionalData = new Dictionary<string, object>()
                {
                    {"CandidateChallengeDetails", JsonConvert.SerializeObject(codingChallengeProgress)}
                }
            });

            return new OkObjectResult(persistResult);
        }
    }
}
