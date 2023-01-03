using Azure.Identity;
using Microsoft.Graph;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodingChallengeV2.AzureFunctions.Shared
{
    public static class GraphService
    {
        public const string SITE_ID = "sswcom.sharepoint.com,e823d97d-87e4-4ead-bb67-d69d75191be0,c04f9eb0-2850-4e41-a3a6-0e9e4aafe78d";
        public const string LIST_ID = "4816e06e-86c8-43fe-b9bf-4cc495c02db1";
        public static GraphServiceClient GetGraphServiceClient()
        {
            var scopes = new[] { "https://graph.microsoft.com/.default" };
            var options = new TokenCredentialOptions
            {
                AuthorityHost = AzureAuthorityHosts.AzurePublicCloud
            };
            var clientSecretCredential = new ClientSecretCredential(
                "ac2f7c34-b935-48e9-abdc-11e5d4fcb2b0", "e03aa711-79d1-451e-8855-99eb4e3430e2", "JI~8Q~Mw6ad~4VBNRxp5vNI6Woxd3SJ5IzgC5apo", options);
            return new GraphServiceClient(clientSecretCredential, scopes);
        }
    }
}
