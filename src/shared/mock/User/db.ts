import { factory, primaryKey } from '@mswjs/data'

const userDb = factory({
  NONE: {
    userId: primaryKey(Number),
    role: String,
    email: String,
    name: String,
    profileImage: String,
  },
  TRAINEE: {
    userId: primaryKey(Number),
    role: String,
    email: String,
    name: String,
    profileImage: String,
  },
  PRO: {
    userId: primaryKey(Number),
    role: String,
    email: String,
    name: String,
    profileImage: String,
  },
})

userDb.NONE.create({
  userId: 1,
  role: 'NONE',
  email: '',
  name: '',
  profileImage: '',
})

userDb.TRAINEE.create({
  userId: 2,
  role: 'TRAINEE',
  email: 'trainee1@ssafy.com',
  name: '김교육(교육생)',
  profileImage: '',
})

userDb.PRO.create({
  userId: 3,
  role: 'PRO',
  email: 'pro1@ssafy.com',
  name: '최프로(교육프로)',
  profileImage: '/img/proProfileImg.png',
})

export default userDb
