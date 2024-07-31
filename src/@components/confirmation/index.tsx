import React, { useContext } from 'react';
import { DefaultLoader } from './DefaultLoader';
import { ModalConfirmationLoader } from '@components/confirmation/ModalConfirmationLoader';

export type ConfirmationContextState = {
  isShow: boolean;
  message?: string;
  showConfirm: (options: ConfirmationOptions) => void;
  ok: () => void;
  cancel: () => void;
  options: ConfirmationOptions;
};

const initialState: ConfirmationContextState = {
  isShow: false,
  showConfirm: (options: ConfirmationOptions) => Promise<void>,
  ok: () => {},
  cancel: () => {},
  options: {
    message: 'Are you sure?',
  },
};

const Context = React.createContext<ConfirmationContextState>(initialState);
Context.displayName = 'ConfirmationContext';

export const useConfirmationContext = () => useContext(Context);
export const ConfirmationContextProvider = Context.Provider;
export const ConfirmationContextConsumer = Context.Consumer;

export type ConfirmationProviderProps = {
  loader?: React.FC<any>;
  children?: any;
};

export type ConfirmationOptions = {
  type?: 'default' | 'info' | 'error' | 'warning';
  message: string;
  title?: string;
  okText?: string;
  cancelText?: string;
};

export class ConfirmationProvider extends React.Component<ConfirmationProviderProps, ConfirmationContextState> {
  state = initialState;
  static defaultProps = {
    loader: ModalConfirmationLoader,
  };
  waiter?: Promise<any> = undefined;
  waiterResovler: any = undefined;

  showConfirm = (options: ConfirmationOptions) => {
    this.setState({
      isShow: true,
      message: options.message,
      options,
    });
    this.waiter = new Promise((resovle, reject) => {
      this.waiterResovler = {
        resovle,
        reject,
      };
    });
    return this.waiter;
  };
  cancel = () => {
    this.setState({
      isShow: false,
      message: '',
    });
    this.waiterResovler.reject();
  };
  ok = () => {
    this.setState({
      isShow: false,
      message: '',
    });
    console.log('ok');
    this.waiterResovler.resovle();
  };
  render () {
    const Loader = this.props.loader;
    return (
      <ConfirmationContextProvider
        value={{
          ...this.state,
          showConfirm: this.showConfirm,
          ok: this.ok,
          cancel: this.cancel,
        }}
      >
        {this.props.children}
        {Loader ? <Loader /> : null}
      </ConfirmationContextProvider>
    );
  }
}
