import React, { useEffect, useRef, useState } from 'react';
import { TodaysEventsProps } from '@/pages/Dashboard/types';
import EventItem from '@/pages/Dashboard/components/EventItem';
import {
    DASHBOARD
} from '@/app/styles/colors';
import { ChevronDown } from 'lucide-react';

const TodaysEvents: React.FC<TodaysEventsProps> = ({ events, onEventClick, isMobile, isCollapsed, onToggleCollapse }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<number>(0);

    useEffect(() => {
        if (!isMobile) return;

        const computeHeight = () => {
            if (contentRef.current) {
                setContentHeight(contentRef.current.scrollHeight);
            }
        };

        computeHeight();

        if (typeof ResizeObserver !== 'undefined') {
            const observer = new ResizeObserver(() => computeHeight());
            if (contentRef.current) observer.observe(contentRef.current);
            return () => observer.disconnect();
        }

        window.addEventListener('resize', computeHeight);
        return () => window.removeEventListener('resize', computeHeight);
    }, [events, isMobile]);
    const headerBorderColor = isMobile && isCollapsed ? 'transparent' : DASHBOARD.HEADER_DIVIDER;
    const headerProps = isMobile ? {
        role: 'button' as const,
        tabIndex: 0,
        onClick: onToggleCollapse,
        onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onToggleCollapse?.();
            }
        }
    } : {};

    return (
        <div
            className="border p-6 rounded-xl dashboard-collapsible"
            style={{
                backgroundColor: DASHBOARD.MODULE_BG,
                borderColor: DASHBOARD.MODULE_BORDER,
                boxShadow: DASHBOARD.MODULE_SHADOW
            }}
            data-collapsed={isMobile && isCollapsed ? 'true' : 'false'}
        >
            <div
                className={`flex items-center justify-between pb-3 mb-3 ${isMobile ? 'cursor-pointer' : ''}`}
                aria-expanded={!isCollapsed}
                {...headerProps}
            >
                <div className="flex items-center gap-2">
                    {isMobile && (
                        <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : 'rotate-0'}`}
                            style={{ color: DASHBOARD.EVENT_HEADING_TEXT }}
                            aria-hidden="true"
                        />
                    )}
                    <h2 className="text-xl font-bold" style={{ color: DASHBOARD.EVENT_HEADING_TEXT }}>Today's Events</h2>
                </div>
            </div>
            <div
                className="dashboard-collapse-outer"
                style={{
                    maxHeight: isMobile ? (isCollapsed ? '0px' : `${contentHeight}px`) : 'none',
                    overflow: 'hidden',
                }}
            >
                <div
                    ref={contentRef}
                    className="space-y-2 pr-2"
                >
                    {events.length === 0 ? (
                        <p className="text-center py-4" style={{ color: DASHBOARD.TEXT_GRAY_500 }}>No events scheduled for today.</p>
                    ) : (
                        events.map(event => (
                            <EventItem
                                key={event.id}
                                event={event}
                                onClick={() => onEventClick(event.id)}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodaysEvents;
