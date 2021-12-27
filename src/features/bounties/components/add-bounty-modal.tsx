import Modal from "features/common/components/modal";

import type { Issue } from "features/issues/types";

export default function AddBountyModal(props: {
  isOpen: boolean;
  onClose: () => void;
  issue: Issue;
}) {
  return (
    <Modal title="Add bounty" onClose={props.onClose} isOpen={props.isOpen}>
      <form>
        <div>
          <label>hello</label>
          <input />
        </div>
      </form>
    </Modal>
  );
}
