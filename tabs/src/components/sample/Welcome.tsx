import { useContext, useEffect, useState } from "react";
import "./Welcome.css";
import { EditCode } from "./EditCode";
import { Graph } from "./Graph";
import { CurrentUser } from "./CurrentUser";
import { useData } from "@microsoft/teamsfx-react";
import { Deploy } from "./Deploy";
import { Publish } from "./Publish";
import { TeamsFxContext } from "../Context";
import steps from "../../reference/CodeChallengeSteps";
import {
  Header,
  Image,
  List,
  Segment,
  Flex
} from "@fluentui/react-northstar";
import { WorkingArea } from "./WorkingArea";

// Define an interface for completed steps, including a step number, a completed boolean, and a timestamp
interface StepDetails {
  step: number;
  completed: boolean;
  timestamp: number;
}
export function Welcome(props: { environment?: string }) {
  const { environment } = {
    environment: window.location.hostname === "localhost" ? "local" : "azure",
    ...props,
  };
  const { teamsUserCredential } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo();
      return userInfo;
    }
  });
  const userName = (loading || error) ? "": data!.displayName;
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([] as StepDetails[]);

  // Define the UI elements
  const timeline = (
    <List>
      {steps.map((step, i) => (
        <List.Item
          index={i}
          key={i}
          header={step.summary}
          headerMedia={completedSteps.some(
            (completedStep) => completedStep.step === i && completedStep.completed
          ) && (
            <>
            <span className="timestamp">
              {new Date(completedSteps.find(completedStep => completedStep.step === i)!.timestamp).toLocaleString()}
            </span>
            {" "}
            ✅
          </>
          )}
          content={step.text}
          selected={currentStep === i}
          onClick={() => {
            setCurrentStep(i);
            if (currentStep === i) {
              // Save the completion status and timestamp for the step
              setCompletedSteps([
                ...completedSteps,
                {
                  step: i,
                  completed: true,
                  timestamp: Date.now()
                }
              ]);
            }
          }}
        >
        </List.Item>
      ))}
    </List>
  );
  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <Header as="h1" align="center">
          Welcome to the SSW Coding Challenge{userName && `, ${userName}`}!
        </Header>
        <Flex>
          <Flex.Item size="size.half">
            <Segment><WorkingArea step={currentStep} /></Segment>
          </Flex.Item>
          <Flex.Item size="size.half">
            <Segment>{timeline}</Segment>
          </Flex.Item>
        </Flex>
      </div>
    </div>
  );
}
