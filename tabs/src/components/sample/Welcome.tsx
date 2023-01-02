import { useCallback, useContext, useEffect, useState } from "react";
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
  Flex,
  Loader
} from "@fluentui/react-northstar";
import { WorkingArea } from "./WorkingArea";
import { CandidateChallenge, CodingChallengeProcess, DataService } from "../../services/DataService";
import * as microsoftTeams from "@microsoft/teams-js";

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

  const [currentStep, setCurrentStep] = useState(0);
  const [context, setContext] = useState({} as microsoftTeams.app.Context);
  const [email, setEmail] = useState("");
  const [candidateChallenge, setCandidateChallenge] = useState({} as CandidateChallenge)
  const [codingChallengeDetails, setCodingChallengeDetails] = useState({} as CodingChallengeProcess);
  let userName = context?.user?.displayName

  const handleUpdate = useCallback((newCodingChallengeDetails) => {
    setCodingChallengeDetails(newCodingChallengeDetails)
    DataService.persistCodingChallengeProgress(email, newCodingChallengeDetails)
  }, [email, setCodingChallengeDetails])

  const handleDataUpdate = useCallback((newData:any) => {
    let newCodingChallengeDetails = {...codingChallengeDetails}
    newCodingChallengeDetails.Steps[currentStep].Data = newData
    handleUpdate(newCodingChallengeDetails)
  }, [codingChallengeDetails, currentStep, handleUpdate])

  useEffect(() => {
    (async () => {
      setContext(await microsoftTeams.app.getContext())
    })();
  }, [microsoftTeams]);
  useEffect(() => {
    setEmail(context?.user?.loginHint || "")
  }, [context])
  useEffect(() => {
    (async () => {
      if (email) {
        let codingChallenge = await DataService.getCodingChallengeProgress(email)
        setCandidateChallenge(codingChallenge)
        setCodingChallengeDetails(codingChallenge.CandidateChallengeDetails)
      }
    })();
  }, [email])
  // Use effect to console log candidateChallenge
  useEffect(() => {
    console.log(candidateChallenge)
  }, [candidateChallenge])
  // Define the UI elements
  const timeline = codingChallengeDetails.Steps ? (
    <List>
      {codingChallengeDetails.Steps?.map((step, i) => (
        <List.Item
          index={i}
          key={i}
          header={step.Name}
          headerMedia={step.Completed && (
            <>
            <span className="timestamp">
              {step.CompletionTime?.toLocaleString()}
            </span>
            {" "}
            ✅
          </>
          )}
          style={{cursor: "pointer", backgroundColor: currentStep === i ? "#f2f2f2" : "white"}}
          content={step.Description}
          selected={currentStep === i}
          onClick={() => {
            setCurrentStep(i);
            if (currentStep === i) {
              // Save the completion status and timestamp for the step
              handleUpdate({
                ...codingChallengeDetails,
                Steps: codingChallengeDetails.Steps?.map((s, j) => {
                  if (j === i) {
                    return {
                      ...s,
                      Completed: true,
                      CompletionTime: new Date()
                    }
                  }
                  return s
                })
              })
            }
          }}
        >
        </List.Item>
      ))}
    </List>
  ) : (
    <Loader label="Loading..." />
  );
  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <Header as="h1" align="center">
          Welcome to the SSW Coding Challenge{userName && `, ${userName}`}!
        </Header>
        <Flex>
          <Flex.Item size="size.half">
            <Segment>{codingChallengeDetails && codingChallengeDetails.Steps && <WorkingArea step={currentStep} data={codingChallengeDetails?.Steps[currentStep]?.Data} setData={handleDataUpdate} />}</Segment>
          </Flex.Item>
          <Flex.Item size="size.half">
            <Segment>{timeline}</Segment>
          </Flex.Item>
        </Flex>
      </div>
    </div>
  );
}
