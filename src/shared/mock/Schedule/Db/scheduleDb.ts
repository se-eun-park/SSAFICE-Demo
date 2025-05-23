import { factory, primaryKey } from '@mswjs/data'

const traineeScheduleDb = factory({
  content: {
    scheduleId: primaryKey(String),
    title: String,
    memo: String,
    createdAt: String,
    startDateTime: String,
    endDateTime: String,
    scheduleSourceTypeCd: String,
    scheduleStatusTypeCd: String,
    isEssentialYn: String,
    isEnrollYn: String,
    chargeUser: {
      userId: Number,
      name: String,
      email: String,
      profileImgUrl: String,
    },
    createUser: {
      userId: Number,
      name: String,
      email: String,
      profileImgUrl: String,
    },
    // noticeSummary: {
    //   noticeId: Number,
    //   title: String,
    //   content: String,
    //   createdAt: String,
    //   startDateTime: String,
    //   endDateTime: String,
    //   isEssentialYn: String,
    //   noticeTypeCd: String,
    //   createUser: {
    //     userId: Number,
    //     name: String,
    //     email: String,
    //     profileImgUrl: String,
    //   },
    //   channelSummary: {
    //     channelId: String,
    //     channelName: String,
    //   },
    // },
  },
})

// 날짜 포맷팅
const formatDate = (date: Date) => {
  return date.toISOString()
}

const endDateTime = (addDays: number) => {
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + addDays)
  endDate.setHours(23, 59, 59)
  return formatDate(endDate)
}

const formatEndDateTime = (endDateTime: string) => {
  const month = endDateTime.split('T')[0].split('-')[1]
  const day = endDateTime.split('T')[0].split('-')[2]
  const hour = endDateTime.split('T')[1].split(':')[0]
  const minute = endDateTime.split('T')[1].split(':')[1]

  return { month, day, hour, minute }
}

// 데이터 생성
// 필수 공지
const createTraineeScheduleData = () => {
  traineeScheduleDb.content.create({
    scheduleId: 'aadkvg',
    title: '[오늘마감] 12기 실습코치 모집이 오늘까지 입니다.',
    memo: `마감 기한까지 늦지 않게 제출 바랍니다.

    * 기한: ${formatEndDateTime(endDateTime(0)).month}월 ${formatEndDateTime(endDateTime(0)).day}일`,
    createdAt: '2025-05-13T00:00:00',
    startDateTime: '2025-05-13T00:00:00',
    endDateTime: endDateTime(0),
    scheduleSourceTypeCd: 'GLOBAL',
    scheduleStatusTypeCd: 'IN_PROGRESS',
    isEssentialYn: 'Y',
    isEnrollYn: 'Y',
    chargeUser: {
      userId: 3,
      name: '최프로(교육프로)',
      email: 'pro1@ssafy.com',
      profileImgUrl: '/img/proProfileImg.png',
    },
    createUser: {
      userId: 3,
      name: '최프로(교육프로)',
      email: 'pro1@ssafy.com',
      profileImgUrl: '/img/proProfileImg.png',
    },
  })

  traineeScheduleDb.content.create({
    scheduleId: 'eolfsk',
    title: '[자율 프로젝트 활용동의서 제출안내]',
    memo: `SSAFY에서 수행한 11기 여러분의 우수한 프로젝트는 
    우수 사례로 소개되는 등 후배 기수를 위해 활용될 수 있습니다.
    
    이에, 사무국에서 프로젝트 활용동의서를 받고 있으니,
    각 팀의 팀장님은 팀원들의 서류를 취합하시어 반담당프로님께 전달 부탁드립니다.🩷
    
    📌 파일명: 11기 자율 프로젝트 결과물 활용 동의서_지역_팀코드_이름
    📌 제출 기한: ${formatEndDateTime(endDateTime(4)).month}월 ${formatEndDateTime(endDateTime(4)).day}일 16시까지
    
    💡 작성 유의점 💡 
    🔹 결과물 세부 목록 내 "서비스명" 반드시 기재
    🔹 생년월일 기재
    🔹 성명은 정자로 기재
    🔹 날인 or 서명 필수!!
    🔹 전체 팀원이 모두 작성`,
    createdAt: '2025-05-14T13:23:00',
    startDateTime: '2025-05-14T16:00:00',
    endDateTime: endDateTime(4),
    scheduleSourceTypeCd: 'TEAM',
    scheduleStatusTypeCd: 'TODO',
    isEssentialYn: 'Y',
    isEnrollYn: 'Y',
    chargeUser: {
      userId: 3,
      name: '최프로(교육프로)',
      email: 'pro1@ssafy.com',
      profileImgUrl: '/img/proProfileImg.png',
    },
    createUser: {
      userId: 3,
      name: '최프로(교육프로)',
      email: 'pro1@ssafy.com',
      profileImgUrl: '/img/proProfileImg.png',
    },
  })

  // 미등록 공지
  traineeScheduleDb.content.create({
    scheduleId: 'dkenndie',
    title: '<결선 발표회> 현장참여생 대상 안내 드립니다',
    memo: `안녕하세요! 오늘 진행될 <결선 발표회> 현장참여생 대상 안내 드립니다 :)
    * 일시: ${formatEndDateTime(endDateTime(12)).month}/${formatEndDateTime(endDateTime(12)).day} 13:00~17:10(예상)
    * 좌석: 하단 내 좌석배치표 참고🩷
    
    미리 본인 자리(위치) 확인해주시고, 13시까지 꼭 착석해주세요✨
    ❌18층 음료 반입 금지
    ⭕뚜껑 달린 생수는 반입 가능`,
    createdAt: '2025-05-14T00:00:00',
    startDateTime: '2025-05-14T00:00:00',
    endDateTime: endDateTime(12),
    scheduleSourceTypeCd: 'GLOBAL',
    scheduleStatusTypeCd: 'TODO',
    isEssentialYn: 'N',
    isEnrollYn: 'N',
    chargeUser: {
      userId: 3,
      name: '최프로(교육프로)',
      email: 'pro1@ssafy.com',
      profileImgUrl: '/img/proProfileImg.png',
    },
    createUser: {
      userId: 3,
      name: '최프로(교육프로)',
      email: 'pro1@ssafy.com',
      profileImgUrl: '/img/proProfileImg.png',
    },
  })

  // 개인 등록 할 일
  traineeScheduleDb.content.create({
    scheduleId: 'voeoms',
    title: 'AI 거버넌스 특강 설문 제출하기',
    memo: `${formatEndDateTime(endDateTime(2)).month}/${formatEndDateTime(endDateTime(2)).day} 오후 5시 전까지 제출하기`,
    createdAt: '2025-05-16T22:50:00',
    startDateTime: '2025-05-16T22:50:00',
    endDateTime: endDateTime(2),
    scheduleSourceTypeCd: 'PERSONAL',
    scheduleStatusTypeCd: 'DONE',
    isEssentialYn: 'N',
    isEnrollYn: 'Y',
    chargeUser: {
      userId: 3,
      name: '최프로(교육프로)',
      email: 'pro1@ssafy.com',
      profileImgUrl: '/img/proProfileImg.png',
    },
    createUser: {
      userId: 2,
      name: '김교육_11기_서울_6반',
      email: 'trainee1@ssafy.com',
      profileImgUrl: '',
    },
  })
}

createTraineeScheduleData()

export default traineeScheduleDb
