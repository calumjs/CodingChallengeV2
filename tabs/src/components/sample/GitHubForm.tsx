import { Form, FormButton, FormInput } from "@fluentui/react-northstar";
import { useState } from "react";

enum GitHubFormState {
    NotSubmitted,
    Submitting,
    Submitted,
    Error,
}

export function GitHubForm({data, setData}: {data: any, setData: (newData: any) => void} ) {
    const [githubUsername, setGithubUsername] = useState(data?.githubUsername || "");
    const [state, setState] = useState(data?.githubUsername ? GitHubFormState.Submitted : GitHubFormState.NotSubmitted);
    const handleSubmit = (event: any) => {
        event.preventDefault();
        setData({githubUsername: event.target.githubUsername.value})
        setState(GitHubFormState.Submitting);
    }

    return (
        <>
        <Form style={{justifyContent:"normal"}} onSubmit={handleSubmit}>
            <FormInput
            name="githubUsername"
            label="Enter your GitHub username"
            aria-label="GitHub username"
            styles={{
                width: "100%",
            }}
            disabled={state === GitHubFormState.Submitting}
            value={githubUsername}
            />
            {state === GitHubFormState.Submitting ? (
                <FormButton content="Provisioning..." loading disabled />
            ) : (
                <FormButton content="Submit" />
            )}
            {state === GitHubFormState.Submitted && (
                <div>✅</div>
            )}
            {state === GitHubFormState.Error && (
                <div>Error!</div>
            )}
            
        </Form>
        </>
    );
}