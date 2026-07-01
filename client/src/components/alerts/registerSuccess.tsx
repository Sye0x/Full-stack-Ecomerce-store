import { Lock } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function RegisterSuccessAlert() {
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <Alert>
        <Lock />
        <AlertTitle>Registration success</AlertTitle>
        <AlertDescription>
          Your account has been created successfully. You will be moved to the
          Login page shortly.
        </AlertDescription>
      </Alert>
    </div>
  );
}
