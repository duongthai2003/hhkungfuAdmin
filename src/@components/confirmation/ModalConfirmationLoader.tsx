import { useEffect } from 'react';
import { useConfirmationContext } from '.';
import confirm from 'antd/lib/modal/confirm';

export function ModalConfirmationLoader() {
  const cf = useConfirmationContext();

  useEffect(() => {
    if (cf.isShow) {
      confirm({
        onOk: cf.ok,
        onCancel: cf.cancel,
        cancelText: 'Cancel',
        content: <div>{cf.message} test</div>,
        closable: true,
        okCancel: true,
      });
    }
  }, [cf.isShow]);
}
