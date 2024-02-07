/**
 * @enum EventSort 이벤트 정렬 기준
 * @var Total 전체 이벤트
 * @var Upcoming 진행 예정 이벤트
 * @var End 종료된 이벤트
 */

export enum EventSort {
  Total = 'TOTAL',
  Upcoming = 'UPCOMING',
  End = 'END',
}

/**
 * @enum PartnerSort 함께 뛴 파트너 정렬 기준
 * @var Count 횟수 순
 * @var Name 이름 순
 * @var Record 기록 순
 */

export enum PartnerSort {
  Count = 'COUNT',
  Name = 'NAME',
  Record = 'RECORD',
}
