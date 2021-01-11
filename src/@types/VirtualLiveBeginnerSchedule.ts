export interface VirtualLiveBeginnerSchedule {
  id: number
  virtualLiveId: number
  dayOfWeek:
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday'
  startTime: string
  endTime: string
}
