import { type UserTag } from "../api/features/userTags";

interface Props {
    tags: UserTag[];
    max?: number;
}

// Determines readable text color (black/white) based on hex background
function textColor(hex: string): string {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55 ? "#1f2937" : "#ffffff";
}

export function UserTagsBadge({ tags, max = 3 }: Props) {
    if (!tags || tags.length === 0) return null;

    const visible = tags.slice(0, max);
    const rest = tags.length - max;

    return (
        <span className="flex flex-wrap items-center gap-1">
            {visible.map((tag) => (
                <span
                    key={tag.id}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold leading-none whitespace-nowrap"
                    style={{ backgroundColor: tag.color, color: textColor(tag.color) }}
                >
                    {tag.name}
                </span>
            ))}
            {rest > 0 && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-500">
                    +{rest}
                </span>
            )}
        </span>
    );
}
