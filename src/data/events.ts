import midAutumnImg from '../assets/news_photos/mid-autumn.jpeg';

export interface ChurchEvent {
  id: string;
  titleEnglish: string;
  titleChinese: string;
  subtitleEnglish: string;
  subtitleChinese: string;
  introEnglish?: string;
  introChinese?: string;
  dateEn: string;
  dateZh: string;
  timeEn: string;
  timeZh: string;
  locationEnglish: string;
  locationChinese: string;
  specialGuestEnglish?: string;
  specialGuestChinese?: string;
  descriptionEnglish: string;
  descriptionChinese: string;
  activitiesSubtitleEnglish?: string;
  activitiesSubtitleChinese?: string;
  activitiesEnglish: string[];
  activitiesChinese: string[];
  callToActionEnglish?: string;
  callToActionChinese?: string;
  contactName: string;
  contactPhone: string;
  posterImage: string;
  isUpcoming?: boolean;
}

export const eventsData: ChurchEvent[] = [
  {
    id: 'mid-autumn-gathering-2026',
    titleEnglish: 'Christchurch Catholic Chinese Community | Mid-Autumn Gathering',
    titleChinese: '基督城天主教华人团体｜中秋聚会',
    subtitleEnglish: 'Full Moon, Spring in Christchurch',
    subtitleChinese: '月圆中秋 · 春满基督城',
    introEnglish: 'Here in the Southern Hemisphere, we welcome the Mid-Autumn Festival in the beautiful springtime of Christchurch!',
    introChinese: '在南半球的春天，我们一起过一个不一样的中秋！',
    dateEn: 'Saturday, 26 September 2026',
    dateZh: '2026年9月26日（星期六）',
    timeEn: '11:00 am – 2:00 pm',
    timeZh: '上午 11:00 – 下午 2:00',
    locationEnglish: 'Mona Vale Garden Park (Lawn area near Mona Vale Bath House)',
    locationChinese: 'Mona Vale Garden Park (Mona Vale Bath House 附近草坪)',
    specialGuestEnglish: 'Fr Justin will be joining us, travelling from Taiwan. He will spend time with us and share some of his experiences and reflections.',
    specialGuestChinese: '李神父（Fr Justin）将从台湾远道而来，与大家一起聚会，也会和大家分享。',
    activitiesSubtitleEnglish: 'Relaxed · Casual · Fun for all ages',
    activitiesSubtitleChinese: '轻松 · 自在 · 老少皆宜',
    activitiesEnglish: [
      '🌸 Enjoy the spring flowers and garden',
      '🥮 Share food and enjoy mooncakes',
      '📖 Mid-Autumn poetry',
      '👧 Games and activities for children',
      '🙏 Prayer and faith sharing',
      '👨‍👩‍👧‍👦 Family time and fellowship'
    ],
    activitiesChinese: [
      '🌸 赏花踏春',
      '🥮 分享美食、品尝月饼',
      '📖 中秋诗歌朗诵',
      '👧 儿童游戏',
      '🙏 祈祷与信仰分享',
      '👨‍👩‍👧‍👦 家庭交流、自由聚会'
    ],
    descriptionEnglish: `Everyone is welcome to bring some food from home to share and enjoy a relaxed picnic together. The community will also provide some mooncakes for everyone to enjoy.\n\nWe warmly welcome Chinese Catholic families, children, young people, seniors, catechumens, and friends who would like to join us!`,
    descriptionChinese: `大家可以各自准备一些家庭美食，带来一起野餐、分享。团体也会准备一些月饼，和大家一起品尝。\n\n欢迎华人教友家庭、儿童、青年、长者、慕道友和新朋友参加！`,
    callToActionEnglish: `Bring your family, bring a dish to share, and let’s celebrate together in the springtime of Christchurch!`,
    callToActionChinese: `带上家人，带上一份美食，在基督城的春天，一起团圆！`,
    contactName: 'Austin',
    contactPhone: '022 656 2705',
    posterImage: midAutumnImg,
    isUpcoming: true,
  }
];
