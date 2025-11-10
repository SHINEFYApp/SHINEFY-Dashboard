import type { FC } from 'react';
import { cn } from '../../lib/utils';
import type { AnimatedTabsProps } from '../../types/common';

export const AnimatedTabs: FC<AnimatedTabsProps> = ({
    tabs,
    activeTab,
    onTabChange,
    className,
}) => {
    return (
        <div className={cn('w-full', className)}>
            <div className="flex items-center gap-8 border-b border-gray-200 relative">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={cn(
                                'relative pb-4 text-lg font-semibold transition-colors duration-200',
                                isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                            )}
                        >
                            {tab.label}

                            {/* Yellow underline indicator */}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-sm animate-scale-up" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};