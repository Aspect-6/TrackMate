import React, { useEffect, useRef, useState } from 'react';
import { TodaysClassesProps } from '@/pages/Dashboard/types';
import ClassItem from '@/pages/Dashboard/components/ClassItem';
import { DASHBOARD } from '@/app/styles/colors';
import { ChevronDown } from 'lucide-react';

const TodaysClasses: React.FC<TodaysClassesProps> = ({ classIds, noSchool, getClassById, openModal, isMobile, isCollapsed, onToggleCollapse }) => {
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
    }, [classIds, noSchool, isMobile]);
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
                            style={{ color: DASHBOARD.CLASS_HEADING_TEXT }}
                            aria-hidden="true"
                        />
                    )}
                    <h2 className="text-xl font-bold" style={{ color: DASHBOARD.CLASS_HEADING_TEXT }}>Today's Classes</h2>
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
                    {noSchool ? (
                        <div className="text-center py-8">
                            <p className="font-semibold text-lg mb-1" style={{ color: DASHBOARD.NO_SCHOOL_TEXT }}>No School</p>
                            <p style={{ color: DASHBOARD.TEXT_GRAY_400 }}>{noSchool.name}</p>
                        </div>
                    ) : classIds.length === 0 || classIds.every(id => !id) ? (
                        <p className="text-center py-4" style={{ color: DASHBOARD.TEXT_GRAY_500 }}>No classes scheduled for today.</p>
                    ) : (
                        classIds.map((classId, index) => {
                            if (!classId) return null;
                            const classInfo = getClassById(classId);
                            if (!classInfo) return null;
                            return (
                                <ClassItem
                                    key={index}
                                    classInfo={classInfo}
                                    period={index + 1}
                                    openModal={openModal}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodaysClasses;
