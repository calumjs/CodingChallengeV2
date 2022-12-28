import { Form, FormInput, TextArea, Button } from '@fluentui/react-northstar';
import React, { useState } from 'react';

interface RetroInfo {
  wentWell: string | undefined;
  didNotGoWell: string | undefined;
  improvements: string | undefined;
}

interface RetroFormProps {
  onSubmit: (info: RetroInfo) => void;
}

export function RetroForm({ onSubmit }: RetroFormProps) {
  const [wentWell, setWentWell] = useState<string | undefined>('');
  const [didNotGoWell, setDidNotGoWell] = useState<string | undefined>('');
  const [improvements, setImprovements] = useState<string | undefined>('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit({ wentWell, didNotGoWell, improvements });
  };

  return (
    <Form style={{justifyContent:"normal"}} onSubmit={handleSubmit}>
      <FormInput label="What went well?">
        <TextArea resize="both" value={wentWell} onChange={(e, data) => setWentWell(data?.value)} />
      </FormInput>
      <FormInput label="What didn't go so well?">
        <TextArea resize="both" value={didNotGoWell} onChange={(e, data) => setDidNotGoWell(data?.value)} />
      </FormInput>
      <FormInput label="What could be improved next time?">
        <TextArea resize="both" value={improvements} onChange={(e, data) => setImprovements(data?.value)} />
      </FormInput>
      <Button type="submit" content="Submit" />
    </Form>
  );
}