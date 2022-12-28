import { Form, FormButton, FormInput } from "@fluentui/react-northstar";
import { useState } from "react";

export function GitHubForm() {

    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = (event: any) => {
        event.preventDefault();
        setSubmitting(true)
    }

    return (
        <>
        <Form style={{justifyContent:"normal"}} onSubmit={handleSubmit}>
            <FormInput
            label="Enter your GitHub username"
            aria-label="GitHub username"
            styles={{
                width: "100%",
            }}
            disabled={submitting}
            />
            {submitting ? (
                <FormButton content="Provisioning..." loading disabled />
            ) : (
                <FormButton content="Submit" />
            )}
            
        </Form>
        </>
    );
}