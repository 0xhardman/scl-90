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
    severe: ">3.0"
  },
  "强迫症状": {
    description: "反映个体无法控制的思想、冲动和行为，包括注意力不集中、记忆力减退等认知障碍症状。",
    normal: "1.62±0.58",
    mild: "1.7-2.5",
    moderate: "2.5-3.5",
    severe: ">3.5"
  },
  "人际关系敏感": {
    description: "反映个体在人际交往中的不自在感和自卑感，特别是与他人比较时的不舒适感。",
    normal: "1.65±0.51",
    mild: "1.7-2.5",
    moderate: "2.5-3.5",
    severe: ">3.5"
  },
  "抑郁": {
    description: "反映个体在情绪、情感、兴趣、精力和动力等方面的症状表现，包括失望、悲观以及与抑郁相关的认知和躯体方面的感受。",
    normal: "1.50±0.59",
    mild: "1.6-2.5",
    moderate: "2.5-3.5",
    severe: ">3.5"
  },
  "焦虑": {
    description: "反映个体紧张、坐立不安、颤抖等躯体表现，以及由此产生的恐惧、担忧等心理表现。",
    normal: "1.39±0.43",
    mild: "1.5-2.5",
    moderate: "2.5-3.5",
    severe: ">3.5"
  },
  "敌对": {
    description: "反映个体易怒、易激动、脾气暴躁等敌对情绪状态的表现。",
    normal: "1.48±0.56",
    mild: "1.6-2.5",
    moderate: "2.5-3.5",
    severe: ">3.5"
  },
  "恐怖": {
    description: "反映个体对特定的人、场所、物体或情境所产生的持续的、不合理的、不成比例的恐惧，以及由此产生的回避行为。",
    normal: "1.23±0.41",
    mild: "1.3-2.0",
    moderate: "2.0-3.0",
    severe: ">3.0"
  },
  "偏执": {
    description: "反映个体的猜疑心、敌意、投射性思维、妄想、被害观念等偏执思维和行为。",
    normal: "1.43±0.57",
    mild: "1.5-2.5",
    moderate: "2.5-3.5",
    severe: ">3.5"
  },
  "精神病性": {
    description: "反映个体从轻微的人际疏离到精神病性的症状表现，包括幻听、思维被控制等精神病性症状。",
    normal: "1.29±0.42",
    mild: "1.4-2.0",
    moderate: "2.0-3.0",
    severe: ">3.0"
  }
};
