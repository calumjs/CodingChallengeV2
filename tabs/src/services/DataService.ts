export class DataService {
    public static async initialiseCodingChallengeData(): Promise<any> {
        const response = await fetch('https://raw.githubusercontent.com/OfficeDev/TeamsFx-Samples/main/samples/tab/src/reference/CodeChallengeSteps.ts');
        const steps = await response.json();
        return steps;
    }
    public static async getCodingChallengeProgress(email: string): Promise<CandidateChallenge> {
        const response = await fetch(`http://localhost:7260/api/GetCodingChallengeProgress?email=${email}`);
        const progress = await response.json();
        progress.CandidateChallengeDetails = JSON.parse(progress.CandidateChallengeDetails);
        progress.CandidateChallengeDetails.Steps = progress.CandidateChallengeDetails.Steps.map((step: CodingChallengeStep) => {
            step.CompletionTime = step.CompletionTime ? new Date(step.CompletionTime) : undefined;
            return step;
        });
        console.log("Progress:", progress);
        return progress
    }
    public static async persistCodingChallengeProgress(email: string, CodingChallengeProgress: CodingChallengeProcess): Promise<CodingChallengeProcess> {
        const body = {email, CodingChallengeProgress}
        const response = await fetch(`http://localhost:7260/api/PersistCodingChallengeProgress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const updatedProgress = await response.json();
        updatedProgress.CandidateChallengeDetails = JSON.parse(updatedProgress.CandidateChallengeDetails);
        return updatedProgress;
    }

}

export interface CodingChallengeProcess {
    Steps: CodingChallengeStep[];
    Completed: boolean;
  }

  export interface CodingChallengeStep {
    Step: number;
    Name: string;
    CompletionTime?: Date;
    Data: any;
    Completed: boolean;
    Description: string;
  }
  
  export interface CandidateChallenge {
    '@odata.etag': string;
    ssw_FirstName: string;
    ssw_Surname: string;
    ssw_Position: string;
    ssw_Location: string;
    ssw_CandidateEmail: string;
    ssw_CandidateLinkedinProfile: {
      Description: string;
      Url: string;
    };
    ssw_CodingChallengeTypeLookupId: string;
    ssw_AppointmentDate: string;
    ssw_FollowUpDate: string;
    ssw_LeadDeveloperLookupId: string;
    Status: string;
    ssw_MockupSent: string;
    Appointment_x0020_ID: string;
    Follow_x002d_up_x0020_Appointmen: string;
    CandidateChallengeDetails: CodingChallengeProcess;
    ContentType: string;
    Modified: string;
    Created: string;
    AuthorLookupId: string;
    EditorLookupId: string;
    _UIVersionString: string;
    Attachments: string;
    Edit: string;
    ItemChildCount: string;
    FolderChildCount: string;
    _ComplianceFlags: string;
    _ComplianceTag: string;
    _ComplianceTagWrittenTime: string;
    _ComplianceTagUserId: string;
    AppEditorLookupId: string;
  }