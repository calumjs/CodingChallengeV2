import { Image, Header, Form, FormInput, FormButton } from "@fluentui/react-northstar";
import { useRef } from "react";
import steps from "../../reference/CodeChallengeSteps";
import { FileUploadForm } from "./FileUploadForm";
import { GitHubForm } from "./GitHubForm";
import { Rating } from "./Rating";
import { RetroForm } from "./RetroForm";
import {YouTubeVideo} from "./YouTubeVideo";

interface WorkingAreaProps {
  step: number;
}

export function WorkingArea(props: WorkingAreaProps) {
  const { step } = props;
  const getContent = (step: number) => {
    switch (step) {
        case 0:
            return (
                <>
                    <p>
                        During your SSW Coding Challenge, you will be required to work on a GitHub repository. 
                    </p>
                    <p>
                        First off, let's go ahead and set it up for you! Please provide your GitHub username and click submit.
                    </p>
                    <p>
                        This process may take a few minutes so go grab a coffee while you wait... ☕
                    </p>
                    <GitHubForm />
                </>
            )
        case 1:
            return (
                <>
                <p>
                  In this step, you will watch a video on the SSW Coding Challenge and take notes.<br />
                  Tip: Watch in full screen or on YouTube for the best experience.
                </p>
                <p>
                  After watching the video, make sure to take detailed notes on the SSW Coding Challenge. These notes will be helpful when you start working on the next part of the project.
                </p>
                <YouTubeVideo videoId="drGbLhK8hRo" ratio={9/16}></YouTubeVideo>
                <p>
                    Rate the video out of 5:
                </p>
                <Rating onChange={()=>{}}/>
              </>
              );
        case 2:
          return (
            <>
              <FileUploadForm message={"Before you continue, upload the mockup of the project screen layout - we will review it and get back to you"} />
            </>
          );
        case 3:
            return (
                <>
                    <p>
                        TODO: Investigate what we can do with the <a href="https://learn.microsoft.com/en-us/graph/api/user-findmeetingtimes">findMeetingTimes 
                        endpoint from Graph API</a>
                    </p>
                    <p>
                        While you wait for confirmation of the review time, let's do a quick retro!
                    </p>
                    <RetroForm onSubmit={()=>{}} />
                </>
            );
        default:
            return (<p>Invalid Step!</p>);
        }
  }
  
    return (
        <div className="working-area">
            <Header as="h2">{steps[step].summary}</Header>
            {getContent(step)}
        </div>
    );
}