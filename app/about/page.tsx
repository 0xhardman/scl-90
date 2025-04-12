import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">关于SCL-90量表</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">量表简介</h2>
        <p className="text-gray-600 mb-4">
          SCL-90（症状自评量表）是由L.R.Derogatis等人于1973年编制的一种自评量表，用于评估个体的心理健康状况。
          它包含90个项目，涵盖了个体在各方面的心理症状，广泛应用于心理健康筛查、心理咨询和精神科临床。
        </p>
        <p className="text-gray-600">
          该量表已被翻译成多种语言，在全球范围内广泛使用，是目前使用最广泛的心理健康评估工具之一。
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">评分方法</h2>
        <p className="text-gray-600 mb-4">
          SCL-90采用5级评分（1-5分），分别代表“没有”、“很轻”、“中等”、“偏重”和“严重”。受试者根据自己最近一周（包括测试当天）的实际感受进行评分。
        </p>
        <p className="text-gray-600 mb-4">
          量表计分方法包括：
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li><strong>总分：</strong>所有项目得分的总和</li>
          <li><strong>总均分(GSI)：</strong>总分除以90，反映症状的广泛程度和严重程度</li>
          <li><strong>阳性项目数(PST)：</strong>得分大于1分的项目数，反映症状的广泛程度</li>
          <li><strong>阳性症状均分(PSDI)：</strong>总分除以阳性项目数，反映症状的严重程度</li>
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">维度说明</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">1. 躯体化</h3>
            <p className="text-gray-600">反映个体对身体不适的主观体验，包括心血管、胃肠道、呼吸系统和其他系统的不适感，以及头痛、肌肉酸痛等身体等价物的不适感。</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">2. 强迫症状</h3>
            <p className="text-gray-600">反映个体无法控制的思想、冲动和行为，包括注意力不集中、记忆力减退等认知障碍症状。</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">3. 人际关系敏感</h3>
            <p className="text-gray-600">反映个体在人际交往中的不自在感和自卑感，特别是与他人比较时的不舒适感。</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">4. 抑郁</h3>
            <p className="text-gray-600">反映个体在情绪、情感、兴趣、精力和动力等方面的症状表现，包括失望、悲观以及与抑郁相关的认知和身体方面的感受。</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">5. 焦虑</h3>
            <p className="text-gray-600">反映个体紧张、坐立不安、颤抖等身体表现，以及由此产生的恐惧、担忧等心理表现。</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">6. 敌对</h3>
            <p className="text-gray-600">反映个体易怒、易激动、脾气暴躁等敌对情绪状态的表现。</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">7. 恐怖</h3>
            <p className="text-gray-600">反映个体对特定的人、场所、物体或情境所产生的持续的、不合理的、不成比例的恐惧，以及由此产生的回避行为。</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">8. 偏执</h3>
            <p className="text-gray-600">反映个体的猜疑心、敌意、投射性思维、妄想、被害观念等偏执思维和行为。</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">9. 精神病性</h3>
            <p className="text-gray-600">反映个体从轻微的人际疏离到精神病性的症状表现，包括幻听、思维被控制等精神病性症状。</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">使用注意事项</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>本量表仅供心理健康自测使用，不构成医学诊断。</li>
          <li>如果您的测试结果显示有严重的心理问题，建议及时咨询专业心理医生或心理咨询师。</li>
          <li>测试结果可能受到当时情绪、身体状况、环境因素等影响，建议在心情平静时进行测试。</li>
          <li>请尽量诚实回答每一项问题，以确保测试结果的准确性。</li>
        </ul>
      </div>
      
      <div className="text-center">
        <a 
          href="https://en.wikipedia.org/wiki/Symptom_Checklist_90"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          了解更多关于SCL-90的信息
        </a>
      </div>
    </div>
  );
}
