import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";

interface IProps {
    isOpen: boolean;
    title?: string;
    children: ReactNode;
    closeModal: () => void;
}

function Modal({ isOpen, title, children, closeModal }: IProps) {
    return (
        <>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeModal}>
                <DialogBackdrop className="fixed inset-0 backdrop-brightness-75" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel transition className="w-full space-y-4 max-w-md rounded-xl bg-slate-100 p-6  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                            {title && (
                                <DialogTitle as="h3" className="text-lg text-indigo-600 font-medium ">
                                    {title}
                                </DialogTitle>
                            )}
                            {children}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default Modal;
