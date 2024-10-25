import { useEffect } from "react";

/**
 * Dispatches events both manually with ```dispatch``` and automatically with the passed arguments.
 * @param eventType Used to identify the automatic event.
 * @param options
 * ```deps``` - When they change the automatic dispatch will be called;
 * ```detail``` - Object added to the ```event``` object. Used to pass information;
 * ```target``` - Defaults to ```window```, determines which DOM node the events will be dispatched at.
 * @returns ```dispatch``` - Used to dispatch events.
 */
export const useEventDispatcher = <EventType = Event>(
  eventType?: string,
  options?: {
    deps?: any[];
    detail?: EventType;
    target?: EventTarget;
  }
) => {
  const dispatch = <DispatchEventType = EventType>(
    eventType: string,
    options?: {
      detail?: DispatchEventType;
      target?: EventTarget;
    }
  ) => {
    const target = window ?? options?.target;
    let event = new CustomEvent(eventType);
    event = Object.assign(event, options?.detail);
    target.dispatchEvent(event);
  };

  useEffect(() => {
    if (eventType) {
      dispatch(eventType, options);
    }
  }, options?.deps);

  return dispatch;
};
