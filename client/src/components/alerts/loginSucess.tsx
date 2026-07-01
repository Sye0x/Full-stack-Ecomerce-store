import { Lock } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function LoginSuccessAlert() {
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <Alert>
        <Lock />
        <AlertTitle>Login success</AlertTitle>
        <AlertDescription>
          Your will be moved to Home promptly. Please wait for a moment.
        </AlertDescription>
      </Alert>
    </div>
  );
}
