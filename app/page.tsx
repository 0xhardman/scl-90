import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">SCL-90 心理健康自评量表</h1>
        <p className="text-xl text-gray-600 mb-8">全面评估您的心理健康状况</p>
        <Link 
          href="/test"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
        >
          开始测试
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">什么是SCL-90量表？</h2>
          <p className="text-gray-600 mb-4">
            SCL-90（症状自评量表）是一种广泛应用于心理健康评估的量表，包含90个问题，涵盖90个常见症状，分为9个维度进行评估。
          </p>
          <p className="text-gray-600">
            该量表广泛应用于心理健康筛查、心理咨询和心理治疗效果评估等领域。
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">测试包含哪些维度？</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>躯体化（身体不适的主观体验）</li>
            <li>强迫症状（无法控制的思想、冲动和行为）</li>
            <li>人际关系敏感（人际交往中的不自在感）</li>
            <li>抑郁（情绪、情感、兴趣和精力的下降）</li>
            <li>焦虑（紧张、坐立不安和相关身体表现）</li>
            <li>敌对（易怒、易激动等敌对情绪）</li>
            <li>恐怖（对特定事物或场所的持续恐惧）</li>
            <li>偏执（猜疑心、敌意和被害观念）</li>
            <li>精神病性（从人际疏离到精神病性症状）</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-semibold mb-4">测试说明</h2>
        <div className="space-y-4 text-gray-600">
          <p>本测试共有90个问题，大约需要花15-20分钟完成。</p>
          <p>请根据您最近一周（包括今天）的实际感受，选择最符合您情况的选项。</p>
          <p>每个问题有以下几个选项：</p>
          <ul className="list-disc pl-5">
            <li>没有：完全没有该症状</li>
            <li>很轻：有一点点该症状，但不明显</li>
            <li>中等：有该症状，稍微影响生活</li>
            <li>偏重：症状明显，影响生活</li>
            <li>严重：症状非常严重，严重影响生活</li>
          </ul>
          <p className="font-medium text-blue-600">注意：本测试结果仅供参考，不构成医学诊断。如果您有任何心理健康问题，请咨询专业的心理健康人员。</p>
        </div>
      </div>
      
      <div className="text-center">
        <Link 
          href="/test"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
        >
          开始测试
        </Link>
      </div>
    </div>
  );
}
