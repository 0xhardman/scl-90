// SCL-90量表的90个问题及其所属维度
export type Question = {
  id: number;
  text: string;
  dimension: Dimension;
};

export type Dimension = 
  | "躯体化" 
  | "强迫症状" 
  | "人际关系敏感" 
  | "抑郁" 
  | "焦虑" 
  | "敌对" 
  | "恐怖" 
  | "偏执" 
  | "精神病性" 
  | "其他";

export const questions: Question[] = [
  { id: 1, text: "头痛", dimension: "躯体化" },
  { id: 2, text: "神经过敏，心中不踏实", dimension: "焦虑" },
  { id: 3, text: "头脑中有不必要的想法或字句盘旋", dimension: "强迫症状" },
  { id: 4, text: "头晕或昏倒", dimension: "躯体化" },
  { id: 5, text: "对异性的兴趣减退", dimension: "抑郁" },
  { id: 6, text: "对旁人责备求全", dimension: "偏执" },
  { id: 7, text: "感到别人能控制您的思想", dimension: "精神病性" },
  { id: 8, text: "责怪别人制造麻烦", dimension: "偏执" },
  { id: 9, text: "忘性大", dimension: "强迫症状" },
  { id: 10, text: "担心自己的衣饰整齐及仪态的端正", dimension: "强迫症状" },
  { id: 11, text: "容易烦恼和激动", dimension: "敌对" },
  { id: 12, text: "胸痛", dimension: "躯体化" },
  { id: 13, text: "害怕空旷的场所或街道", dimension: "恐怖" },
  { id: 14, text: "感到自己的精力下降，活动减慢", dimension: "抑郁" },
  { id: 15, text: "想结束自己的生命", dimension: "抑郁" },
  { id: 16, text: "听到旁人听不到的声音", dimension: "精神病性" },
  { id: 17, text: "发抖", dimension: "焦虑" },
  { id: 18, text: "感到大多数人都不可信任", dimension: "偏执" },
  { id: 19, text: "胃口不好", dimension: "躯体化" },
  { id: 20, text: "容易哭泣", dimension: "抑郁" },
  { id: 21, text: "同异性相处时感到害羞不自在", dimension: "人际关系敏感" },
  { id: 22, text: "感到受骗、中了圈套或有人想抓住您", dimension: "偏执" },
  { id: 23, text: "无缘无故地突然感到害怕", dimension: "焦虑" },
  { id: 24, text: "自己不能控制地大发脾气", dimension: "敌对" },
  { id: 25, text: "怕单独出门", dimension: "恐怖" },
  { id: 26, text: "经常责怪自己", dimension: "抑郁" },
  { id: 27, text: "腰痛", dimension: "躯体化" },
  { id: 28, text: "感到难以完成任务", dimension: "强迫症状" },
  { id: 29, text: "感到孤独", dimension: "抑郁" },
  { id: 30, text: "感到苦闷", dimension: "抑郁" },
  { id: 31, text: "过分担忧", dimension: "焦虑" },
  { id: 32, text: "对事物不感兴趣", dimension: "抑郁" },
  { id: 33, text: "感到害怕", dimension: "焦虑" },
  { id: 34, text: "您的感情容易受到伤害", dimension: "人际关系敏感" },
  { id: 35, text: "旁人能知道您的私下想法", dimension: "精神病性" },
  { id: 36, text: "感到别人不理解您、不同情您", dimension: "人际关系敏感" },
  { id: 37, text: "感到人们对您不友好，不喜欢您", dimension: "人际关系敏感" },
  { id: 38, text: "做事必须做得很慢以保证做得正确", dimension: "强迫症状" },
  { id: 39, text: "心跳得很厉害", dimension: "焦虑" },
  { id: 40, text: "恶心或胃部不舒服", dimension: "躯体化" },
  { id: 41, text: "感到比不上他人", dimension: "人际关系敏感" },
  { id: 42, text: "肌肉酸痛", dimension: "躯体化" },
  { id: 43, text: "感到有人在监视您、谈论您", dimension: "偏执" },
  { id: 44, text: "难以入睡", dimension: "其他" },
  { id: 45, text: "做事必须反复检查", dimension: "强迫症状" },
  { id: 46, text: "难以做出决定", dimension: "强迫症状" },
  { id: 47, text: "怕乘电车、公共汽车、地铁或火车", dimension: "恐怖" },
  { id: 48, text: "呼吸有困难", dimension: "躯体化" },
  { id: 49, text: "一阵阵发冷或发热", dimension: "躯体化" },
  { id: 50, text: "因为恐惧而避开某些东西、场合或活动", dimension: "恐怖" },
  { id: 51, text: "脑子变空了", dimension: "强迫症状" },
  { id: 52, text: "身体发麻或刺痛", dimension: "躯体化" },
  { id: 53, text: "喉咙有梗塞感", dimension: "躯体化" },
  { id: 54, text: "感到前途没有希望", dimension: "抑郁" },
  { id: 55, text: "不能集中注意力", dimension: "强迫症状" },
  { id: 56, text: "感到身体的某一部分软弱无力", dimension: "躯体化" },
  { id: 57, text: "感到紧张或容易紧张", dimension: "焦虑" },
  { id: 58, text: "感到手或脚发重", dimension: "躯体化" },
  { id: 59, text: "想到死亡的事", dimension: "抑郁" },
  { id: 60, text: "吃得太多", dimension: "其他" },
  { id: 61, text: "当别人看着您或谈论您时感到不自在", dimension: "人际关系敏感" },
  { id: 62, text: "有一些不属于您自己的想法", dimension: "精神病性" },
  { id: 63, text: "有想打人或伤害他人的冲动", dimension: "敌对" },
  { id: 64, text: "醒得太早", dimension: "其他" },
  { id: 65, text: "必须反复洗手、点数目或触摸某些东西", dimension: "强迫症状" },
  { id: 66, text: "睡得不稳不深", dimension: "其他" },
  { id: 67, text: "有想摔坏或破坏东西的冲动", dimension: "敌对" },
  { id: 68, text: "有一些别人没有的想法或信念", dimension: "精神病性" },
  { id: 69, text: "感到对别人很敏感", dimension: "人际关系敏感" },
  { id: 70, text: "在商店或电影院等人多的地方感到不自在", dimension: "恐怖" },
  { id: 71, text: "感到做任何事都很费劲", dimension: "抑郁" },
  { id: 72, text: "一阵阵恐惧或惊恐", dimension: "焦虑" },
  { id: 73, text: "感到在公共场合吃东西很不舒服", dimension: "人际关系敏感" },
  { id: 74, text: "经常与人争论", dimension: "敌对" },
  { id: 75, text: "单独一人时神经很紧张", dimension: "恐怖" },
  { id: 76, text: "别人对您的成绩没有做出恰当的评价", dimension: "偏执" },
  { id: 77, text: "即使和别人在一起也感到孤单", dimension: "抑郁" },
  { id: 78, text: "感到坐立不安心神不定", dimension: "焦虑" },
  { id: 79, text: "感到自己没有什么价值", dimension: "抑郁" },
  { id: 80, text: "感到熟悉的东西变成陌生或不像是真的", dimension: "精神病性" },
  { id: 81, text: "大叫或摔东西", dimension: "敌对" },
  { id: 82, text: "害怕会在公共场合昏倒", dimension: "恐怖" },
  { id: 83, text: "感到别人想占您的便宜", dimension: "偏执" },
  { id: 84, text: "为一些有关性的想法而很苦恼", dimension: "精神病性" },
  { id: 85, text: "您认为应该因为自己的过错而受到惩罚", dimension: "精神病性" },
  { id: 86, text: "感到要赶快把事情做完", dimension: "强迫症状" },
  { id: 87, text: "感到自己的身体有严重问题", dimension: "躯体化" },
  { id: 88, text: "从未感到和其他人很亲近", dimension: "人际关系敏感" },
  { id: 89, text: "感到内疚", dimension: "抑郁" },
  { id: 90, text: "感到自己的脑子有毛病", dimension: "精神病性" },
];

// 评分标准
export const scoreOptions = [
  { value: 1, label: "没有" },
  { value: 2, label: "很轻" },
  { value: 3, label: "中等" },
  { value: 4, label: "偏重" },
  { value: 5, label: "严重" },
];

// 各维度包含的题目数量
export const dimensionQuestionCounts = {
  "躯体化": 12,
  "强迫症状": 10,
  "人际关系敏感": 9,
  "抑郁": 13,
  "焦虑": 10,
  "敌对": 6,
  "恐怖": 7,
  "偏执": 6,
  "精神病性": 10,
  "其他": 7,
};

// 结果解释
export const resultInterpretation = {
  "躯体化": {
    description: "反映个体对身体不适的主观体验，包括心血管、胃肠道、呼吸系统和其他系统的不适感，以及头痛、肌肉酸痛等躯体等价物的不适感。",
    normal: "1.37±0.48",
    mild: "1.5-2.0",
    moderate: "2.0-3.0",
    severe: ">3.0",
    normalInterpretation: "您的身体感觉处于正常范围，很少或几乎没有出现不明原因的身体不适症状。",
    mildInterpretation: "您偶尔会感到一些身体不适，如头痛、肌肉酸痛等，但这些症状通常不会严重影响日常生活。",
    moderateInterpretation: "您经常感到身体不适，可能会出现心悸、胃部不适、呼吸困难等症状，这些症状可能会对日常生活造成一定影响。",
    severeInterpretation: "您频繁地感到严重的身体不适，这些症状可能会显著影响您的日常生活和工作能力，建议寻求专业医疗帮助。"
  },
  "强迫症状": {
    description: "反映个体无法控制的思想、冲动和行为，包括注意力不集中、记忆力减退等认知障碍症状。",
    normal: "1.62±0.58",
    mild: "1.7-2.5",
    moderate: "2.5-3.5",
    severe: ">3.5",
    normalInterpretation: "您的思维和行为模式处于正常范围，很少或几乎没有出现强迫性的想法或行为。",
    mildInterpretation: "您偶尔会有一些难以控制的想法或行为，但通常不会严重干扰日常生活。",
    moderateInterpretation: "您经常感到有些想法或行为难以控制，可能会出现注意力不集中、记忆力减退等问题，这些症状可能会对日常生活造成一定影响。",
    severeInterpretation: "您频繁地感到无法控制的想法和行为，这些症状可能会显著影响您的日常生活和工作能力，建议寻求专业心理帮助。"
  },
  "人际关系敏感": {
    description: "反映个体在人际交往中的不自在感和自卑感，特别是与他人比较时的不舒适感。",
    normal: "1.65±0.51",
    normalInterpretation: "您在人际交往中感到自在，很少或几乎没有出现自卑或不适感。",
    mildInterpretation: "您在某些社交场合可能会感到轻微的不自在或自卑，但通常不会严重影响您的社交活动。",
    moderateInterpretation: "您在社交场合中经常感到不自在或自卑，可能会回避某些社交活动，这些感受可能会对您的人际关系造成一定影响。",
    severeInterpretation: "您在社交场合中感到强烈的不适和自卑，可能会严重影响您的人际关系和社交活动，建议寻求专业心理帮助。",
    mild: "1.7-2.5",
    moderate: "2.5-3.5",
    severe: ">3.5"
  },
  "抑郁": {
    description: "反映个体在情绪、情感、兴趣、精力和动力等方面的症状表现，包括失望、悲观以及与抑郁相关的认知和躯体方面的感受。",
    normal: "1.50±0.59",
    mild: "1.6-2.5",
    moderate: "2.5-3.5",
    severe: ">3.5",
    normalInterpretation: "您的情绪状态处于正常范围，很少或几乎没有出现明显的抑郁症状。",
    mildInterpretation: "您偶尔会感到情绪低落或兴趣减退，但这些感受通常不会持续很长时间或严重影响日常生活。",
    moderateInterpretation: "您经常感到情绪低落、兴趣减退或精力不足，这些症状可能会对您的日常生活和工作造成一定影响。",
    severeInterpretation: "您频繁地感到强烈的抑郁情绪，可能伴有绝望感或自伤想法，这些症状可能会显著影响您的生活质量，强烈建议寻求专业心理或精神科帮助。"
  },
  "焦虑": {
    description: "反映焦虑症状，包括紧张、颤抖、恐惧、惊恐发作等，以及相应的躯体表现。",
    normal: "1.39±0.43",
    mild: "1.4-2.0",
    moderate: "2.0-3.0",
    severe: ">3.0",
    normalInterpretation: "您的焦虑水平处于正常范围，很少或几乎没有出现明显的焦虑症状。",
    mildInterpretation: "您偶尔会感到紧张或担忧，但这些感受通常不会持续很长时间或严重影响日常生活。",
    moderateInterpretation: "您经常感到紧张、担忧或恐惧，可能伴有一些躯体症状如心跳加速、出汗等，这些症状可能会对您的日常生活造成一定影响。",
    severeInterpretation: "您频繁地感到强烈的焦虑或恐惧，可能伴有明显的躯体症状或惊恐发作，这些症状可能会显著影响您的生活质量，建议寻求专业心理或精神科帮助。"
  },
  "恐怖": {
    description: "反映个体对特定的人、场所、物体或情境所产生的持续的、不合理的、不成比例的恐惧，以及由此产生的回避行为。",
    normal: "1.23±0.41",
    mild: "1.3-2.0",
    moderate: "2.0-3.0",
    severe: ">3.0",
    normalInterpretation: "您很少或几乎没有出现对特定情境或物体的不合理恐惧反应。",
    mildInterpretation: "您偶尔会对某些特定情境（如高处、封闭空间等）产生轻微的恐惧感，但通常不会严重影响日常活动。",
    moderateInterpretation: "您对某些特定情境或物体有明显的恐惧反应，可能会刻意回避这些情境，这些恐惧感可能会对您的日常生活造成一定限制。",
    severeInterpretation: "您对特定情境或物体有强烈的恐惧反应，会极力回避这些情境，这些恐惧感已经显著影响您的正常生活和社交活动，建议寻求专业心理帮助。"
  },
  "偏执": {
    description: "反映个体的猜疑心、敌意、投射性思维、妄想、被害观念等偏执思维和行为。",
    normal: "1.43±0.57",
    mild: "1.5-2.5",
    moderate: "2.5-3.5",
    severe: ">3.5",
    normalInterpretation: "您的思维模式较为客观理性，很少或几乎没有出现过度猜疑或被害观念。",
    mildInterpretation: "您偶尔会对他人的意图产生轻微的怀疑，但通常能够保持理性判断，不会严重影响人际关系。",
    moderateInterpretation: "您经常对他人的意图和行为持怀疑态度，可能会感到他人对您有敌意或不公正，这些想法可能会对您的人际关系造成一定困扰。",
    severeInterpretation: "您频繁地感到他人对您有恶意或阴谋，这些强烈的猜疑和被害观念可能会严重影响您的社交功能和生活质量，建议寻求专业心理或精神科帮助。"
  },
  "精神病性": {
    description: "反映个体从轻微的人际疏离到精神病性的症状表现，包括幻听、思维被控制等精神病性症状。",
    normal: "1.29±0.42",
    mild: "1.4-2.0",
    moderate: "2.0-3.0",
    severe: ">3.0",
    normalInterpretation: "您的思维和感知处于正常范围，很少或几乎没有出现现实感扭曲或异常感知体验。",
    mildInterpretation: "您偶尔可能会感到轻微的疏离感或孤独感，但能够保持现实感和正常的社会功能。",
    moderateInterpretation: "您可能经常感到与他人和环境的疏离，偶尔可能有一些不寻常的感知体验，这些体验可能会对您的社会功能和日常生活造成一定影响。",
    severeInterpretation: "您可能经历了明显的现实感扭曲，如幻觉或思维被控制的感觉，这些症状可能会严重影响您的判断力和社会功能，强烈建议立即寻求专业精神科帮助。"
  }
};
