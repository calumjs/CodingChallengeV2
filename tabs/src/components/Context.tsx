import { TeamsFx, TeamsUserCredential } from "@microsoft/teamsfx";
import { createContext } from "react";
import { ThemePrepared } from "@fluentui/react-northstar";

export const TeamsFxContext = createContext<{
  theme?: ThemePrepared,
  themeString: string,
  teamsfx?: TeamsFx,
  teamsUserCredential?: TeamsUserCredential,
}>({
  theme: undefined,
  themeString: "",
  teamsfx: undefined,
  teamsUserCredential: undefined
});
