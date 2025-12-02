import { DayType, ThemeMode } from '@/app/types';

export interface ScheduleSettingsProps {
    currentDayType: DayType;
    onSetDayType: (type: 'A' | 'B') => void;
}

export interface DangerZoneProps {
    onClearData: () => void;
}

export interface ThemeSettingsProps {
    currentTheme: ThemeMode;
    onChangeTheme: (mode: ThemeMode) => void;
}
