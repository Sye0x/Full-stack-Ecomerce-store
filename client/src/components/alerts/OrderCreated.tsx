import { CheckCircle2Icon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function OrderSuccessAlert() {
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Order successful</AlertTitle>
        <AlertDescription>
          Your order has been processed. A receipt has been added in Orders
          Menu.
        </AlertDescription>
      </Alert>
    </div>
  );
}
