import { useState, type ReactNode } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose, Button } from '@hilal-ds/react';

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  /** Called when the user confirms. May return a promise to show loading state. */
  onConfirm: () => void | Promise<void>;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Use the danger styling for destructive confirmations. */
  destructive?: boolean;
  /** Modal size. Default 'sm'. */
  size?: 'sm' | 'md';
}

/**
 * ConfirmDialog — a Modal preset for confirm-then-action flows.
 * Shows a loading state on the confirm button while onConfirm resolves.
 */
export function ConfirmDialog({
  open, onClose, title, description, onConfirm,
  confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  destructive = false, size = 'sm',
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false);
  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} size={size}>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        <ModalClose onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        {description}
      </ModalBody>
      <ModalFooter>
        <Button variant="tertiary" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          variant={destructive ? 'primary' : 'primary'}
          onClick={handleConfirm}
          loading={loading}
          style={destructive ? { background: 'var(--hilal-status-error)' } : undefined}
        >
          {confirmLabel}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
