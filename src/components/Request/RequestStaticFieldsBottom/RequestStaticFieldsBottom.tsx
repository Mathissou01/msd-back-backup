import RequestStaticUser, {
  IRequestStaticUserLabels,
} from "./RequestStaticUser/RequestStaticUser";
import RequestStaticProofOfReceipt, {
  IRequestStaticProofOfReceiptLabels,
} from "./RequestStaticProofOfReceipt/RequestStaticProofOfReceipt";
import RequestStaticConfirmationMessage, {
  IRequestStaticConfirmationMessageLabels,
} from "./RequestStaticConfirmationMessage/RequestStaticConfirmationMessage";

export interface IRequestStaticFieldsBottomLabels {
  user: IRequestStaticUserLabels;
  confirmationMessage: IRequestStaticConfirmationMessageLabels;
  proofOfReceipt: IRequestStaticProofOfReceiptLabels;
}

interface IRequestStaticFieldsBottomProps {
  labels: IRequestStaticFieldsBottomLabels;
  hasUser: boolean;
}

export default function RequestStaticFieldsBottom({
  labels,
  hasUser,
}: IRequestStaticFieldsBottomProps) {
  return (
    <>
      <div className="o-Form__Group">
        <RequestStaticUser labels={labels.user} hasUser={hasUser} />
      </div>
      <div className="o-Form__Group">
        <RequestStaticConfirmationMessage labels={labels.confirmationMessage} />
      </div>
      <div className="o-Form__Group">
        <RequestStaticProofOfReceipt labels={labels.proofOfReceipt} />
      </div>
    </>
  );
}
