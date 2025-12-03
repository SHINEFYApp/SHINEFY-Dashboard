import type { DetailRowProps } from "../../types/bookings";
import { cn } from "../../utils/utils";

export const DetailRow = ({
    label,
    value,
    type = "text",
    badgeColor = "yellow",
    actionButton,
}: DetailRowProps) => {
    const badgeColors = {
        yellow: "bg-primary/10 border-primary text-secondary-900",
        green: "bg-green-50 border-green-200 text-green-700",
        blue: "bg-blue-50 border-blue-200 text-blue-700",
        red: "bg-red-50 border-red-200 text-red-700",
        purple: "bg-purple-50 border-purple-200 text-purple-700",
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-3">
            {/* Label */}
            <div className="text-gray-500 sm:text-lg w-full sm:w-auto sm:shrink-0 text-sm!">
                {label} :
            </div>

            {/* Value */}
            <div className="flex items-center gap-4 flex-1">
                {type === "badge" ? (
                    <span
                        className={cn(
                            "px-6 py-2 rounded-lg border-2 font-medium inline-block text-sm!",
                            badgeColors[badgeColor]
                        )}
                    >
                        {value}
                    </span>
                ) : (
                    <div className="bg-gray-50 rounded-lg px-6 py-3 text-sm! font-medium text-secondary-900 flex-1">
                        {value}
                    </div>
                )}

                {/* Optional Action Button (icon is a component type) */}
                {actionButton && (
                    <button
                        onClick={actionButton.onClick}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 transition-all whitespace-nowrap border-2 rounded-sm shrink-0 text-sm!",
                            badgeColors[badgeColor]
                        )}
                    >
                        {actionButton.icon && (
                            <actionButton.icon className="w-4 h-4" />
                        )}
                        {actionButton.text}
                    </button>
                )}
            </div>
        </div>
    );
};
