/* WORKS AS INTENDED */

//React
import { useEffect } from "react";

/**
 * Adds, updates and removes event listeners automatically.
 * @param eventType - used to identify the event.
 * @param eventFn - called when the event is fired.
 * @param options
 * ```deps``` - When they change the listener will update to the current ```eventFn```;
 * ```target``` - Defaults to ```window```, determines which DOM node the listener will be attached to.
 * @overload ```Default``` - generic event. Default overload when no type arguments are passed.
 * @overload ```<EventType>``` - specific event. Determines the type for ```eventFn```'s parameters.
 */
export const useEventListener = <EventType = Event>(
  eventType: string,
  eventFn: (event: EventType) => void,
  options?: {
    deps?: any[];
    target?: EventTarget;
  }
): void => {
  useEffect(() => {
    const target = window ?? options?.target;
    const fn = (event: Event) => {
      eventFn(event as EventType);
    };
    target.addEventListener(eventType, fn);
    return () => {
      target.removeEventListener(eventType, fn);
    };
  }, options?.deps);
};
