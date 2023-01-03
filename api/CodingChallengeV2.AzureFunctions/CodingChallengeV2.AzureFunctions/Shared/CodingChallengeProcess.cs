using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodingChallengeV2.AzureFunctions.Shared
{
    public static class CodingChallengeService
    {
        public static CodingChallengeProcess GenerateNewCodingChallenge()
        {
            return new CodingChallengeProcess()
            {
                Completed = false,
                Steps = new List<CodingChallengeStep>()
                {
                    new CodingChallengeStep()
                    {
                        Step = 0,
                        Name = "Step 1: Request a repo",
                        Completed = false,
                        Description = "To start, please request a repository for your project."
                    },
                    new CodingChallengeStep()
                    {
                        Step = 1,
                        Name = "Step 2: Watch a video",
                        Completed = false,
                        Description = "Next, please watch the following video to learn more about the project."
                    },
                    new CodingChallengeStep()
                    {
                        Step = 2,
                        Name = "Step 3: Attach a mockup",
                        Completed = false,
                        Description = "After watching the video, please attach a mockup of your project."
                    },
                    new CodingChallengeStep()
                    {
                        Step = 3,
                        Name = "Step 4: Join Review Appointment",
                        Completed = false,
                        Description = "Finally, please join the review appointment to discuss your project with the team."
                    }
                }
            };
        }
    }
    public class CodingChallengeProcess
    {
        public IEnumerable<CodingChallengeStep> Steps { get; set; }
        public bool Completed { get; set; }
    }

    public class CodingChallengeStep
    {
        public int Step { get; set; }
        public string Name { get; set; }
        public DateTimeOffset? CompletionTime { get; set; }
        public object Data { get; set; }
        public bool Completed { get; set; }
        public string Description { get; set; }
    }
}
