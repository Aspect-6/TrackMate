import { Class, DayType } from '@/app/types'

export namespace DaySchedule {
    export interface Props {
        children: React.ReactNode
    }
    // ======================

    export interface HeaderProps {
        title: string
    }

    export namespace Body {
        export interface Props {
            children: React.ReactNode
        }
        // ======================

        export interface ScheduleSlotProps {
            dayType: NonNullable<DayType>
            index: number
            classId: string | null
            getClassById: (id: string) => Class
            onRemove: (dayType: NonNullable<DayType>, index: number) => void
            onSelect: (dayType: NonNullable<DayType>, index: number) => void
        }

        export interface EmptySlotProps {
            onClick: () => void
        }

        export namespace FilledSlot {
            export interface Props {
                classInfo: Class
                children: React.ReactNode
            }
            // ======================

            export interface FilledSlotHeaderProps {
                name: string
                teacherName: string | null
            }

            export interface FilledSlotFooterProps {
                roomNumber: string | number | null
                onRemove: () => void
            }
        }
    }
}
