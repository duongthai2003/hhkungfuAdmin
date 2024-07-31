import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

export type WebSocketContextType = {
  init: () => void;
  close: () => void;
  wsAddListener: (event: any, filter?: string) => void;
  wsSendMessage: (event: any) => void;
  wsRemoveListener: (event: any, filter?: string) => void;
  wsSend: (event: any, data?: any) => void;
  subscribe: (event: any, data?: any) => void;
  unsubscribe: (event: any, data?: any) => void;
};
export const WebSocketContext = React.createContext<WebSocketContextType>({
  init: () => {},
  close: () => {},
  wsAddListener: () => {},
  wsSendMessage: () => {},
  wsRemoveListener: () => {},
  wsSend: () => {},
  subscribe: () => {},
  unsubscribe: () => {},
});

const keepAlive = (
  websocket: WebSocket,
  interval: number,
  onClosed?: () => void,
) => {
  websocket.send(
    JSON.stringify({
      event: 'ping',
    }),
  );

  // setInterval(() => {
  //   websocket.send(
  //     JSON.stringify({
  //       event: 'ping',
  //     }),
  //   );
  //   // keepAlive(websocket, interval);
  // }, interval);
  return setTimeout(() => {
    // connection closed
    console.log('asdfasdfasdfasdfxxxxx closed');
    if (onClosed) {
      onClosed();
    }
  }, interval);
};

export const WebSocketProvider = ({
  children,
  keepAliveInterval,
  onClose,
  onOpen,
  initDidMount,
}: {
  children: ReactNode;
  keepAliveInterval: number;
  onClose?: (event: any, ws: WebSocket) => void;
  onOpen?: (event: any, websocket: WebSocket) => void;
  initDidMount?: boolean;
}) => {
  // const [webSocket, setWebsocket] = useState<WebSocket | null>(null);
  // const [listeners, setListeners] = useState<{
  //   [key: string]: ((event: any) => void)[];
  // }>({});
  const webSocketRef = useRef<WebSocket | null>(null);
  const keepAliveRef = useRef(null);
  const listenersRef = useRef<{
    [key: string]: ((event: any) => void)[];
  }>({});
  const intervalKeepAliveRef = useRef(null);
  const reftryRef = useRef(0);
  // const webSocket = webSocketRef.current;
  const eventSubscribedRef = useRef<string[]>([]);
  // const [subscribed, setSubscribed] = useState<string[]>([]);

  const sendMessage = (message: string) => {
    if (webSocketRef.current) {
      webSocketRef.current.send(message);
    }
  };

  const wsSend = (event, data) => {
    sendMessage(
      JSON.stringify({
        event,
        data,
      }),
    );
  };

  const getEventSubscribed = () => {
    const data = localStorage.getItem('__socket__event-subscribed');
    return data ? JSON.parse(data) : [];
  };

  const setEventSubscribed = (data) => {
    localStorage.setItem(
      '__socket__event-subscribed',
      JSON.stringify(data || []),
    );
  };

  const subscribe = (names: string[]) => {
    const currentData = getEventSubscribed();
    const all = [...currentData];
    names.forEach((x) => {
      if (all.indexOf(x) === -1) {
        all.push(x);
      }
    });
    setEventSubscribed(all);
    wsSend('event-subscribe', {
      events: all,
    });
    // eventSubscribedRef.current = [...all];
    // setSubscribed(all);
  };

  const unsubscribe = (names: string[]) => {
    const currentData = getEventSubscribed();
    const all = [...currentData];
    names.forEach((x) => {
      if (all.indexOf(x) > -1) {
        all.splice(all.indexOf(x), 1);
      }
    });
    setEventSubscribed(all);
    wsSend('event-subscribe', {
      events: all,
    });
  };

  const addListener = (fn: any, filter = 'any') => {
    const listeners = listenersRef.current[filter] || [];
    subscribe([filter]);
    listenersRef.current = {
      ...listenersRef.current,
      [filter]: [...listeners, fn],
    };
    // setListeners((currentListeners) => {
    //   console.log('filterfilter', filter);
    //   const listeners = currentListeners[filter] || [];
    //   // if (listeners.length === 0) {
    //   subscribe([filter]);
    //   // }
    //   return {
    //     ...currentListeners,
    //     [filter]: [...listeners, fn],
    //   };
    // });
  };

  const removeListener = (fn: any, filter = 'any') => {
    listenersRef.current = {
      ...listenersRef.current,
      [filter]: (listenersRef.current[filter] || []).filter(
        (x) => x.toString() !== fn.toString(),
      ),
    };
    // setListeners((currentListeners) => {
    //   return {
    //     ...currentListeners,
    //     [filter]: (currentListeners[filter] || []).filter(
    //       (x) => x.toString() !== fn.toString(),
    //     ),
    //   };
    // });
  };

  const onMessage = (event: any, ws: WebSocket) => {
    const eventData = JSON.parse(event.data);
    // console.log('listenerslisteners', listeners);
    const listeners = listenersRef.current;
    if (listeners[eventData.stream]) {
      listeners[eventData.stream].forEach((listener) =>
        listener({
          ...event,
          data: eventData,
        }),
      );
    }

    if (listeners.any) {
      listeners.any.forEach((listener) =>
        listener({
          ...event,
          data: eventData,
        }),
      );
    }
  };

  const init = () => {
    // if (intervalKeepAliveRef.current) {
    //   clearInterval(intervalKeepAliveRef.current);
    //   clearTimeout(keepAliveRef.current);
    // }
    const token = localStorage.getItem('accessToken');
    const ws = new WebSocket(
      `${import.meta.env.VITE_BASE_SOCKET_URL}${token ? '?token=' + JSON.parse(token) : ''}`,
    );
    // setWebsocket(ws);
    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      // console.log('eventevent', data);
      if (data.event === 'pong') {
        clearTimeout(keepAliveRef.current);
        keepAliveRef.current = null;
        return;
      }
      onMessage(event, ws);
    };
    if (onClose) {
      ws.onclose = (event: Event) => {
        onClose(event, ws);
      };
    }

    ws.onopen = (event: Event) => {
      // setWebsocket(ws);
      webSocketRef.current = ws;
      onOpen && onOpen(event, ws);

      // console.log('connected', ws);

      const currentData = getEventSubscribed();
      if (currentData && currentData.length) {
        wsSend('event-subscribe', {
          events: currentData,
        });
      }
      // clear
      if (intervalKeepAliveRef.current) {
        clearInterval(intervalKeepAliveRef.current);
        clearTimeout(keepAliveRef.current);
      }

      // init
      intervalKeepAliveRef.current = setInterval(() => {
        ws.send(
          JSON.stringify({
            event: 'ping',
          }),
        );
        // console.log('pingddddd');
        keepAliveRef.current = setTimeout(() => {
          // closed
          if (reftryRef.current < 5) {
            reftryRef.current = 0;
            init();
          } else {
            clearInterval(intervalKeepAliveRef.current);
            clearTimeout(keepAliveRef.current);
          }
          reftryRef.current += 1;
        }, 4000);
      }, 5000);
    };

    ws.onerror = (event) => {
      console.log('Error', event);
      // ws.close();
    };

    ws.onclose = (event) => {
      console.log('On Closed', event);
    };
    return ws;
  };

  const close = useCallback(() => {
    // console.log('asdfasdddd-close', webSocket);
    clearInterval(intervalKeepAliveRef.current);
    clearTimeout(keepAliveRef.current);
    webSocketRef.current.close();
  }, [
    webSocketRef.current,
    intervalKeepAliveRef.current,
    keepAliveRef.current,
  ]);

  // useEffect(() => {
  //   init();
  //   return () => {
  //     if (intervalKeepAliveRef.current) {
  //       clearInterval(intervalKeepAliveRef.current);
  //       intervalKeepAliveRef.current = null;
  //     }
  //     webSocket?.close();
  //   };
  // }, []);

  useEffect(() => {
    if (webSocketRef.current) {
      webSocketRef.current.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        // console.log('eventevent', data, keepAliveRef.current);
        if (data.event === 'pong') {
          clearTimeout(keepAliveRef.current);
          keepAliveRef.current = null;
          return;
        }
        onMessage(event, webSocketRef.current);
      };
    }
  }, [webSocketRef.current, listenersRef.current]);

  useEffect(() => {
    // const needSubscribed = subscribed.filter((x) => x.status === 0);
    // console.log('subscribedsubscribed', subscribed, needSubscribed);
    // console.log('subscribedsubscribed', eventSubscribedRef.current);

    console.log(
      'eventSubscribedRef.currentxx',
      eventSubscribedRef.current,
      webSocketRef.current,
    );

    const currentData = getEventSubscribed();
    if (currentData) {
      wsSend('event-subscribe', {
        events: currentData,
      });
    }
    // if (subscribed.filter((x) => x.status === 3).length > 0) {
    //   wsSend('event-unsubscribe', {
    //     events: subscribed.filter((x) => x.status === 3).map((x) => x.name),
    //   });
    // }
  }, [webSocketRef.current]);

  useEffect(() => {
    if (initDidMount) {
      init();
    }
    return () => {
      if (initDidMount) {
        close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        init: init,
        close: close,
        wsAddListener: addListener,
        wsSendMessage: sendMessage,
        wsRemoveListener: removeListener,
        wsSend: wsSend,
        subscribe,
        unsubscribe,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
