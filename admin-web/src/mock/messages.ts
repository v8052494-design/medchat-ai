import type { ChatMessage } from '@/types/chat';

export const mockMessagesMap: Record<string, ChatMessage[]> = {
  s1: [
    {
      id: 'm1-1',
      sessionId: 's1',
      role: 'user',
      type: 'text',
      content: '你好，我最近有点发烧，想咨询一下',
      timestamp: Date.now() - 1000 * 60 * 10,
    },
    {
      id: 'm1-2',
      sessionId: 's1',
      role: 'ai',
      type: 'text',
      content: '您好！请问您的体温是多少度？发烧持续了多长时间？是否有其他症状如咳嗽、头痛等？',
      timestamp: Date.now() - 1000 * 60 * 9,
    },
    {
      id: 'm1-3',
      sessionId: 's1',
      role: 'user',
      type: 'text',
      content: '体温38.5度，已经两天了，有点咳嗽',
      timestamp: Date.now() - 1000 * 60 * 8,
    },
    {
      id: 'm1-4',
      sessionId: 's1',
      role: 'ai',
      type: 'text',
      content: '建议先测量体温并多喝水，如持续高烧请及时就医。38.5度属于中度发热，可以适当服用退烧药（如布洛芬），并注意休息。如果明天仍有高烧，建议到医院做进一步检查。',
      timestamp: Date.now() - 1000 * 60 * 7,
    },
    {
      id: 'm1-5',
      sessionId: 's1',
      role: 'user',
      type: 'text',
      content: '发烧怎么办',
      timestamp: Date.now() - 1000 * 60 * 2,
    },
  ],
  s2: [
    {
      id: 'm2-1',
      sessionId: 's2',
      role: 'user',
      type: 'text',
      content: '请问医保怎么报销？',
      timestamp: Date.now() - 1000 * 60 * 20,
    },
    {
      id: 'm2-2',
      sessionId: 's2',
      role: 'ai',
      type: 'text',
      content: '医保报销流程如下：\n\n1. **门诊报销**：持医保卡到定点医疗机构就诊，结算时直接报销\n2. **住院报销**：办理住院时出示医保卡，出院时在医院结算窗口直接报销\n3. **异地就医**：需先在参保地备案，备案后可在异地定点医院直接结算\n\n如需了解更多细节，可以告诉我您的具体情况。',
      timestamp: Date.now() - 1000 * 60 * 19,
    },
  ],
  s3: [
    {
      id: 'm3-1',
      sessionId: 's3',
      role: 'user',
      type: 'text',
      content: '体检报告什么时候出？',
      timestamp: Date.now() - 1000 * 60 * 35,
    },
    {
      id: 'm3-2',
      sessionId: 's3',
      role: 'ai',
      type: 'text',
      content: '常规体检报告一般在 **3-5个工作日** 内出具。部分特殊检查项目可能需要7-10个工作日。报告出来后会通过短信通知您，您也可以在APP上在线查看。',
      timestamp: Date.now() - 1000 * 60 * 34,
    },
  ],
  s4: [
    {
      id: 'm4-1',
      sessionId: 's4',
      role: 'user',
      type: 'text',
      content: '预约挂号可以取消吗？',
      timestamp: Date.now() - 1000 * 60 * 65,
    },
    {
      id: 'm4-2',
      sessionId: 's4',
      role: 'ai',
      type: 'text',
      content: '可以的！预约挂号可以在就诊前 **2小时** 通过APP或电话取消。取消后费用会在1-3个工作日内原路退回。如需帮助取消，请提供您的预约编号。',
      timestamp: Date.now() - 1000 * 60 * 64,
    },
    {
      id: 'm4-3',
      sessionId: 's4',
      role: 'user',
      type: 'image',
      content: 'https://picsum.photos/300/200?random=1',
      timestamp: Date.now() - 1000 * 60 * 63,
    },
  ],
  s6: [
    {
      id: 'm6-1',
      sessionId: 's6',
      role: 'user',
      type: 'text',
      content: '孩子发烧39度怎么办？',
      timestamp: Date.now() - 1000 * 60 * 185,
    },
    {
      id: 'm6-2',
      sessionId: 's6',
      role: 'ai',
      type: 'text',
      content: '孩子39度属于高热，建议：\n\n1. 立即给孩子服用儿童退烧药（布洛芬混悬液或对乙酰氨基酚）\n2. 物理降温：温水擦浴，额头冷敷\n3. 多饮水，保持室内通风\n4. **如持续高热不退或出现抽搐，请立即就医**\n\n⚠️ 39度高热需密切观察，建议尽快到医院儿科就诊。',
      timestamp: Date.now() - 1000 * 60 * 184,
    },
  ],
  s8: [
    {
      id: 'm8-1',
      sessionId: 's8',
      role: 'user',
      type: 'text',
      content: '核酸检测结果查询',
      timestamp: Date.now() - 1000 * 60 * 365,
    },
    {
      id: 'm8-2',
      sessionId: 's8',
      role: 'ai',
      type: 'text',
      content: '核酸检测结果一般在采样后 **4-24小时** 内出具。您可以通过以下方式查询：\n\n1. 医院APP → 报告查询\n2. 健康码小程序\n3. 院内自助机打印\n\n请提供您的就诊卡号，我可以帮您查询。',
      timestamp: Date.now() - 1000 * 60 * 364,
    },
  ],
};

export function getMessagesBySessionId(sessionId: string): ChatMessage[] {
  return mockMessagesMap[sessionId] || [];
}
