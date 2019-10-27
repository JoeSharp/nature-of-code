import React from "react";

interface Props {
  page: string;
  pendingFrom: string | undefined;
  onPrepareLink: () => void;
  onCancelLink: () => void;
  onCompleteLink: () => void;
  onRemove: () => void;
}

const Page: React.FunctionComponent<Props> = ({
  page,
  pendingFrom,
  onPrepareLink,
  onCancelLink,
  onCompleteLink,
  onRemove
}) => {
  return (
    <div className="card">
      <div className="card-header">{page}</div>
      <div className="card-body">
        {pendingFrom === undefined && (
          <button className="btn btn-primary" onClick={onPrepareLink}>
            Prepare Link From
          </button>
        )}
        {pendingFrom !== undefined && pendingFrom !== page && (
          <button className="btn btn-primary" onClick={onCompleteLink}>
            Complete Link To
          </button>
        )}
        {pendingFrom === page && (
          <button className="btn btn-warning" onClick={onCancelLink}>
            Cancel Link
          </button>
        )}
        <button className="btn btn-primary" onClick={onRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Page;
