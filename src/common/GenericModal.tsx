import type { ReactNode } from "react";

interface GenericModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    children: ReactNode;
    className?: string;
}

export const GenericModal = ({
    isOpen,
    onClose,
    title = "Modal Title",
    subtitle,
    children,
    className = ""
}: GenericModalProps) => {
    return (
        <section
            className={`
                fixed top-0 left-0 w-screen h-screen flex justify-center items-center
                bg-black/30 backdrop-blur-sm transition-all duration-300 z-50 
                ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
            `}
            onClick={onClose}
        >
            <div
                className={`w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300 mx-4
                    ${isOpen ? "scale-100" : "scale-95"} ${className}
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                {title && <div className=" gap-5 px-8 py-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    {subtitle && <p className="text-gray-700">{subtitle}</p>}
                </div>}

                {/* Modal Body */}
                <div className="p-8 max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </section>
    );
};
