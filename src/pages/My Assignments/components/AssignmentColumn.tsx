import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AssignmentColumnProps } from '@/pages/My Assignments/types';
import AssignmentItem from '@/pages/My Assignments/components/AssignmentItem';
import { GLOBAL, MY_ASSIGNMENTS } from '@/app/styles/colors';
import { ChevronDown } from 'lucide-react';

const DEFAULT_CARD_HEIGHT = 150;
const MAX_VISIBLE_CARDS = 3;
const EMPTY_STATE_MIN_HEIGHT = 60;
const LIST_BOTTOM_PADDING = 12;

const DropPlaceholder: React.FC = () => (
    <div className="assignment-drop-placeholder" aria-hidden="true" />
);

const AssignmentColumn: React.FC<AssignmentColumnProps> = ({
    status,
    title,
    assignments,
    onAssignmentClick,
    getClassById,
    isMobile,
    isCollapsed,
    onToggleCollapse,
    activeId,
    overId,
    dragEnabled
}) => {
    const itemsInView = useMemo(() => {
        const filtered = assignments.filter(a => a.status === status);
        filtered.sort((a, b) => {
            if (status === 'To Do' || status === 'In Progress') {
                return a.dueDate.localeCompare(b.dueDate);
            }
            return b.dueDate.localeCompare(a.dueDate);
        });
        return filtered;
    }, [assignments, status]);

    const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id: status });

    const isOverColumn = overId === status || itemsInView.some(item => item.id === overId);
    const overIndex = itemsInView.findIndex(item => item.id === overId);
    const insertionIndex = isOverColumn ? (overIndex >= 0 ? overIndex : itemsInView.length) : -1;
    const showPlaceholder = dragEnabled && !!activeId && isOverColumn;

    const getHeaderColor = () => {
        switch (status) {
            case 'To Do': return MY_ASSIGNMENTS.HEADER_TEXT_TODO;
            case 'In Progress': return MY_ASSIGNMENTS.HEADER_TEXT_INPROGRESS;
            case 'Done': return MY_ASSIGNMENTS.HEADER_TEXT_DONE;
            default: return MY_ASSIGNMENTS.TEXT_PRIMARY;
        }
    };
    const headerColor = getHeaderColor();
    const getBadgeBorderColor = () => {
        switch (status) {
            case 'To Do': return MY_ASSIGNMENTS.COUNT_BORDER_TODO;
            case 'In Progress': return MY_ASSIGNMENTS.COUNT_BORDER_INPROGRESS;
            case 'Done': return MY_ASSIGNMENTS.COUNT_BORDER_DONE;
            default: return MY_ASSIGNMENTS.BORDER_LIGHT;
        }
    };
    const badgeBorderColor = getBadgeBorderColor();

    const listRef = useRef<HTMLDivElement>(null);
    const animationInitializedRef = useRef(false);
    const [contentMaxHeight, setContentMaxHeight] = useState(EMPTY_STATE_MIN_HEIGHT);
    const [shouldAnimate, setShouldAnimate] = useState(!isMobile);

    const contentId = `assignments-${status.replace(/\s+/g, '-').toLowerCase()}`;
    const isListHidden = isMobile && isCollapsed;

    const headerInteractionProps = isMobile
        ? {
            role: 'button' as const,
            tabIndex: 0,
            onClick: onToggleCollapse,
            onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onToggleCollapse();
                }
            }
        }
        : {};

    useEffect(() => {
        if (!isMobile) {
            setShouldAnimate(true);
            animationInitializedRef.current = true;
        } else {
            setShouldAnimate(false);
            animationInitializedRef.current = false;
        }
    }, [isMobile]);

    useEffect(() => {
        const computeContentHeight = () => {
            if (!isMobile) {
                setContentMaxHeight(EMPTY_STATE_MIN_HEIGHT);
                return;
            }

            const cardElements = listRef.current?.querySelectorAll('.assignments-item') ?? [];
            const visibleCards = Math.min(MAX_VISIBLE_CARDS, Math.min(cardElements.length, itemsInView.length));

            let cardsHeight = 0;
            if (visibleCards > 0) {
                const first = cardElements[0] as HTMLElement | undefined;
                const target = cardElements[visibleCards - 1] as HTMLElement | undefined;
                if (first && target) {
                    cardsHeight = target.offsetTop - first.offsetTop + target.offsetHeight;
                }
            }

            if (visibleCards === 0) {
                setContentMaxHeight(EMPTY_STATE_MIN_HEIGHT);
            } else {
                const fallbackCardsHeight = visibleCards * DEFAULT_CARD_HEIGHT;
                const targetCardsHeight = cardsHeight || fallbackCardsHeight;
                setContentMaxHeight(targetCardsHeight + LIST_BOTTOM_PADDING);
            }

            if (!animationInitializedRef.current && isMobile) {
                animationInitializedRef.current = true;
                if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
                    window.requestAnimationFrame(() => setShouldAnimate(true));
                } else {
                    setShouldAnimate(true);
                }
            }
        };

        computeContentHeight();

        if (!isMobile) {
            return;
        }

        if (typeof ResizeObserver !== 'undefined') {
            const observer = new ResizeObserver(() => computeContentHeight());
            if (listRef.current) observer.observe(listRef.current);
            return () => observer.disconnect();
        }

        window.addEventListener('resize', computeContentHeight);
        return () => window.removeEventListener('resize', computeContentHeight);
    }, [itemsInView, isMobile]);

    return (
        <div
            className={`assignments-col w-full lg:flex-1 rounded-xl p-4 flex flex-col border ${isMobile ? '' : 'h-full min-h-0'}`}
            style={{
                backgroundColor: MY_ASSIGNMENTS.BOARD_BG,
                borderColor: MY_ASSIGNMENTS.COLUMN_BORDER,
                boxShadow: MY_ASSIGNMENTS.COLUMN_SHADOW,
            }}
            data-collapsed={isListHidden ? 'true' : 'false'}
            aria-hidden={isListHidden}
        >
            <div
                className={`assignment-column-header flex justify-between items-center mb-4 px-2 py-2 border-b ${isMobile ? 'cursor-pointer' : ''}`}
                style={{ borderColor: isListHidden ? 'transparent' : GLOBAL.HEADER_DIVIDER }}
                aria-expanded={!isListHidden}
                aria-controls={contentId}
                {...headerInteractionProps}
            >
                <div className="flex items-center gap-2">
                    {isMobile && (
                        <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${isListHidden ? '-rotate-90' : 'rotate-0'}`}
                            style={{ color: headerColor }}
                            aria-hidden="true"
                        />
                    )}
                    <h2 className="text-lg font-bold" style={{ color: headerColor }}>{title}</h2>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-full border" style={{ backgroundColor: MY_ASSIGNMENTS.ITEM_HOVER_BG, color: headerColor, borderColor: badgeBorderColor }}>
                    {itemsInView.length}
                </span>
            </div>

            <div
                className="assignments-collapse-outer flex-grow"
                data-animate={!isMobile || shouldAnimate ? 'true' : 'false'}
                style={{
                    maxHeight: isMobile ? (isListHidden ? '0px' : `${contentMaxHeight}px`) : 'none',
                    overflow: isMobile ? 'hidden' : 'visible',
                }}
            >
                    <div
                        ref={(node) => {
                            setDroppableRef(node);
                            listRef.current = node;
                        }}
                        id={contentId}
                        className="assignment-list h-full space-y-3 overflow-y-auto custom-scrollbar"
                        data-over={isOver ? 'true' : 'false'}
                        style={{
                            minHeight: itemsInView.length === 0 ? `${EMPTY_STATE_MIN_HEIGHT}px` : undefined,
                            paddingBottom: isMobile && itemsInView.length > 0 ? `${LIST_BOTTOM_PADDING}px` : undefined,
                        }}
                    >
                    {itemsInView.length === 0 ? (
                        <p className="assignments-empty-copy">No assignments here.</p>
                    ) : (
                        <SortableContext items={itemsInView.map(a => a.id)} strategy={verticalListSortingStrategy}>
                            {itemsInView.map((assignment, index) => {
                                const shouldShowBefore = showPlaceholder && insertionIndex === index;
                                return (
                                    <React.Fragment key={assignment.id}>
                                        {shouldShowBefore && <DropPlaceholder />}
                                        <AssignmentItem
                                            assignment={assignment}
                                            onClick={onAssignmentClick}
                                            getClassById={getClassById}
                                            dragEnabled={dragEnabled}
                                        />
                                    </React.Fragment>
                                );
                            })}
                            {showPlaceholder && insertionIndex === itemsInView.length && (
                                <DropPlaceholder />
                            )}
                        </SortableContext>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignmentColumn;
