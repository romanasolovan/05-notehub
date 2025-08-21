import css from "./Modal.module.css";
import {useEffect, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
};

function Modal({ children, onClose }: ModalProps) {
    const onEsc = useCallback ((e: KeyboardEvent) => {
        if (e.key === 'Escape') { onClose(); }
        }, [onClose]);


    const handleBackdrop = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) { onClose(); }
    }, [onClose]);

    useEffect(() => {
        addEventListener("keydown", onEsc);
        document.body.style.overflow = "hidden";
        return () => {
            removeEventListener("keydown", onEsc);
            document.body.style.overflow = "auto";
        };
    }, [onEsc]);

    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdrop}
        >
            <div
                className={css.modal}
                onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;