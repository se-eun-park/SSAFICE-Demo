import { factory, oneOf, primaryKey } from '@mswjs/data'

const channelsDb = factory({
  team: {
    teamId: primaryKey(String),
    name: String,
    channels: oneOf('channel'),
  },
  channel: {
    channelId: primaryKey(String),
    name: String,
    team: oneOf('team'),
  },
})

const createChannelData = () => {
  // 팀 생성
  const team1 = channelsDb.team.create({
    teamId: '1',
    name: '11기 공지전용',
  })

  const team2 = channelsDb.team.create({
    teamId: '2',
    name: '11기 서울 4반',
  })

  const team3 = channelsDb.team.create({
    teamId: '3',
    name: '11기 공통 서울 2반',
  })

  const team4 = channelsDb.team.create({
    teamId: '4',
    name: '11기 특화 서울 6반',
  })

  const team5 = channelsDb.team.create({
    teamId: '5',
    name: '11기 자율 서울 6반',
  })

  // 채널 생성 및 팀과 연결
  // team1
  channelsDb.channel.create({
    channelId: 'team1-1',
    name: '1. 공지사항',
    team: team1,
  })

  channelsDb.channel.create({
    channelId: 'team1-2',
    name: '2. 소통',
    team: team1,
  })

  channelsDb.channel.create({
    channelId: 'team1-3',
    name: '3. [취업] 공지사항',
    team: team1,
  })

  // team2
  channelsDb.channel.create({
    channelId: 'team2-1',
    name: '1. 공지사항',
    team: team2,
  })

  channelsDb.channel.create({
    channelId: 'team2-2',
    name: '2. 소통',
    team: team2,
  })

  channelsDb.channel.create({
    channelId: 'team2-3',
    name: '3. 행사/이벤트',
    team: team2,
  })

  channelsDb.channel.create({
    channelId: 'team2-4',
    name: '4. 온/오프라인코칭',
    team: team2,
  })

  //team3
  channelsDb.channel.create({
    channelId: 'team3-1',
    name: '공지사항',
    team: team3,
  })

  channelsDb.channel.create({
    channelId: 'team3-2',
    name: '잡담',
    team: team3,
  })

  channelsDb.channel.create({
    channelId: 'team3-3',
    name: '팀빌딩(자기소개)',
    team: team3,
  })

  //team4
  channelsDb.channel.create({
    channelId: 'team4-1',
    name: '공지사항',
    team: team4,
  })

  channelsDb.channel.create({
    channelId: 'team4-2',
    name: '잡담',
    team: team4,
  })

  //team5
  channelsDb.channel.create({
    channelId: 'team5-1',
    name: '공지사항',
    team: team5,
  })

  channelsDb.channel.create({
    channelId: 'team5-2',
    name: '잡담',
    team: team5,
  })

  channelsDb.channel.create({
    channelId: 'team5-3',
    name: '입클퇴클 출결관리',
    team: team5,
  })
}

createChannelData()

export default channelsDb
