import React, { useRef, useEffect } from "react";

enum MOUSE_BUTTON_CLICKS {
    LEFT = 0,
    MIDDLE = 1,
    RIGHT = 2,
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(
    ref: React.RefObject<any>,
    callback: () => void
): void {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(evt: MouseEvent) {
            if (
                ref.current &&
                !ref.current.contains(evt.target) &&
                evt.button === MOUSE_BUTTON_CLICKS.LEFT
            )
                callback();
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };

        // callback is not a dependency to avoid rendering on every
        // other render
    }, [ref]);
}

interface OutsideAlerterProps {
    onClickOutside: () => void;

    children?: React.ReactNode;
}

export default function OutsideAlerter({
    onClickOutside,
    children,
}: OutsideAlerterProps): JSX.Element {
    /**
     * Will run a callback whenever the user makes a left mouse click
     * outside of the targetted children.
     *
     * How to use:
     *
     * <OutsideAlerter>
     *     Click outside of this box's contents to run the callback
     * </OutsideAlerter>
     *
     * Useful with modals, popups, etc, since they can be simply
     * closed by clicking outside of them.
     */

    const wrapperRef = useRef<HTMLDivElement>(null);
    useOutsideAlerter(wrapperRef, onClickOutside);

    return <div ref={wrapperRef}>{children}</div>;
}
