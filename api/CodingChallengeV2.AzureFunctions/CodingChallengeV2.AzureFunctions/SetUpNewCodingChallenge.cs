using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using System.Collections.Generic;
using Microsoft.Graph;
using Azure.Identity;
using CodingChallengeV2.AzureFunctions.Shared;
using System.Linq;

namespace CodingChallengeV2.AzureFunctions
{
    public static class SetUpNewCodingChallenge
    {
        [FunctionName("SetUpNewCodingChallenge")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("InviteGuestUser function processed a request.");

            // Get the request body
            string requestBody = req.ReadAsStringAsync().Result;
            dynamic data = JObject.Parse(requestBody);

            // Get the email address of the guest user
            string email = data?.email;

            if (string.IsNullOrEmpty(email))
            {
                return new BadRequestObjectResult("Please pass a valid email address in the request body.");
            }

            var client = GraphService.GetGraphServiceClient();
            var results = await client.Sites[GraphService.SITE_ID].Lists[GraphService.LIST_ID].Items.Request().Filter($"fields/ssw_CandidateEmail eq '{email}'").Expand("fields").GetAsync();
            if (results.Count == 0)
            {
                throw new Exception("No item was found with the specified email address.");
            }

            var result = results.First();
            var fieldValueSet = new FieldValueSet
            {
                AdditionalData = new Dictionary<string, object>()
                {
                    {"CandidateChallengeDetails", JsonConvert.SerializeObject(CodingChallengeService.GenerateNewCodingChallenge())}
                }
            };

            await client.Sites[GraphService.SITE_ID].Lists[GraphService.LIST_ID].Items[result.Id].Fields.Request().UpdateAsync(fieldValueSet);

            /*var client = GetGraphServiceClient();
            string guestUserId = null;

            var teamsTab = new TeamsTab
            {
                DisplayName = "Coding Challenge",
                Configuration = new TeamsTabConfiguration
                {
                    EntityId = "",
                    ContentUrl = "https://codingchallengev2.azurewebsites.net/",
                    WebsiteUrl = "https://codingchallengev2.azurewebsites.net/",
                    RemoveUrl = "https://codingchallengev2.azurewebsites.net/"
                },
                AdditionalData = new Dictionary<string, object>()
                {
                    {"teamsApp@odata.bind", "" }
                }
            }

            string chatId = "19:a9654938-4d34-4c01-85d1-9ae358f91ab9_ff6701d3-d452-4ae4-aa9a-dd08dab02aff@unq.gbl.spaces";
            
            await client.Chats[chatId].Tabs.Request().AddAsync(new TeamsTab
            {
                DisplayName = "Coding Challenge",
                TeamsApp = new TeamsApp
                {
                    Id = "com.microsoft.teamspace.tab.web",
                    AppDefinitions = new TeamsAppDefinition
                    {
                        Id = "com.microsoft.teamspace.tab.web"
                    }
                },
                Configuration = new TeamsTabConfiguration
                {
                    EntityId = guestUserId,
                    ContentUrl = "https://codingchallengev2.azurewebsites.net",
                    WebsiteUrl = "https://codingchallengev2.azurewebsites.net"
                }
            });

            // Search for the user by email address
            var searchUserResponse = await client.Users.Request().Filter($"mail eq '{email}'").GetAsync();
            
            // Check if the user was found
            if (searchUserResponse.Count > 0)
            {
                // User was found, skip the invitation process
                log.LogInformation("User already exists, skipping invitation.");

                guestUserId = searchUserResponse[0].Id;
            }
            else
            {
                // User was not found, invite the guest user to the tenant
                var inviteResponse = await client.Invitations.Request().AddAsync(new Invitation
                {
                    InvitedUserEmailAddress = email,
                    InviteRedirectUrl = "https://www.microsoft.com",
                    SendInvitationMessage = true
                });

                // Get the guest user's id
                guestUserId = inviteResponse.InvitedUser.Id;
            }
            
            log.LogInformation($"Guest user id: {guestUserId}");

            // Add a new tab in the conversation with the guest user
            /*await client.Chats[""].Tabs.Request().AddAsync(new TeamsTab
            {
                DisplayName = "Coding Challenge",
                TeamsApp = new TeamsApp
                {
                    Id = "com.microsoft.teamspace.tab.webpage",
                    TeamsAppDefinition = new TeamsAppDefinition
                    {
                        Id = "com.microsoft.teamspace.tab.webpage"
                    }
                },
                Configuration = new TabConfiguration
                {
                    EntityId = guestUserId,
                    ContentUrl = "https://codingchallengev2.azurewebsites.net",
                    WebsiteUrl = "https://codingchallengev2.azurewebsites.net"
                }
            });
            HttpResponseMessage tabResponse = await client.PostAsJsonAsync("https://graph.microsoft.com/v1.0/teams/{team-id}/channels/{channel-id}/tabs", new { displayName = "Welcome", websiteUrl = "https://www.example.com", guestId = guestUserId });
            if (!tabResponse.IsSuccessStatusCode)
            {
                return new BadRequestObjectResult("An error occurred while adding the tab to the conversation.");
            }*/

            return new OkObjectResult("Guest user successfully invited and tab added to the conversation.");
        }

    }
}
