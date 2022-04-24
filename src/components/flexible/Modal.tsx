import React from "react";
import ReactDom from "react-dom";
import OutsideAlerter from "../../hooks/useOutsideAlerter";

// what will be the background of the popup
const OVERLAY_STYLES: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    // darken the background
    backgroundColor: "rgba(0, 0, 0, .7)",
};

interface ModalProps {
    open: boolean;
    onClose: () => void;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export default function Modal({
    open,
    onClose,
    style = OVERLAY_STYLES,
    children,
}: ModalProps): JSX.Element | null {
    /**
     * Creates a modal with properties that can be adjusted in css.
     *
     * How to use:
     * Wrap the react node(s) around a single element with a className that
     * will be used for styling the entire modal in css.
     *
     * Ex.
     * JSX snippet
     * <Modal open={...} onClose={...}>
     *     <div className="cart-modal">
     *         Put any other content in here, jsx elements, data types, etc.
     *     </div>
     * </Modal>
     *
     * CSS snippet
     * .cart-modal {
     *     position: fixed;
     *     top: 0;
     *     left: 0;
     * }
     *
     * If you wonder why a child div with a wanted class has to wrap around the contents
     * instead of the modal itself taking a class argument, that is because react portals
     * do not allow asynchronous element class updates.
     *
     */

    if (!open) return null;

    return ReactDom.createPortal(
        // class value possibly being undefined doesn't impact the css
        <div>
            {/* the outside of the popup that's blackened */}
            <div style={style} />

            <OutsideAlerter onClickOutside={onClose}>{children}</OutsideAlerter>
        </div>,

        // this is the root element that we want to render into
        document.getElementById("portal") as HTMLElement
    );
}
