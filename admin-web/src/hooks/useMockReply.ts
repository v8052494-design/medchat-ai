import { useChatStore } from '@/stores/chat';

interface MockReply {
  keywords: string[];
  reply: string;
}

const mockReplyRules: MockReply[] = [
  {
    keywords: ['发烧', '发热', '体温'],
    reply: '建议先测量体温并多喝水，如持续高烧请及时就医。38.5度以上可以适当服用退烧药，并注意休息。如果症状持续超过3天，建议到医院做进一步检查。',
  },
  {
    keywords: ['头痛', '头疼', '头晕'],
    reply: '头痛可能由多种原因引起，如疲劳、压力、感冒等。建议适当休息，保持充足睡眠。如头痛剧烈或频繁发作，建议到医院神经内科就诊。',
  },
  {
    keywords: ['咳嗽', '嗓子疼', '喉咙'],
    reply: '咳嗽和嗓子疼可能是感冒或咽炎引起。建议多喝温水，避免辛辣刺激食物。如持续超过一周或有发热症状，建议到呼吸内科就诊。',
  },
  {
    keywords: ['医保', '报销', '费用'],
    reply: '医保报销流程：\n\n1. **门诊报销**：持医保卡到定点医疗机构就诊，结算时直接报销\n2. **住院报销**：办理住院时出示医保卡，出院时直接结算\n3. **异地就医**：需先在参保地备案\n\n如需了解具体报销比例，请咨询当地医保部门。',
  },
  {
    keywords: ['预约', '挂号', '预约挂号'],
    reply: '预约挂号可通过以下方式：\n\n1. **APP预约**：首页点击"预约挂号"选择科室和医生\n2. **电话预约**：拨打 400-xxx-xxxx\n3. **现场挂号**：到医院自助机操作\n\n预约成功后会收到短信通知，就诊当天请提前15分钟到达。',
  },
  {
    keywords: ['体检', '检查', '报告'],
    reply: '常规体检报告一般在 **3-5个工作日** 内出具。部分特殊检查项目可能需要7-10个工作日。报告出来后会通过短信通知，您也可以在APP上在线查看。',
  },
  {
    keywords: ['住院', '床位'],
    reply: '住院办理流程：\n\n1. 门诊医生开具住院证\n2. 到住院处办理入院手续\n3. 缴纳住院押金\n4. 前往病区护士站报到\n\n住院期间如有任何问题，可随时咨询病区护士。',
  },
  {
    keywords: ['药', '用药', '药品', '购药'],
    reply: '关于用药问题，建议您：\n\n1. **遵医嘱用药**，不要自行调整剂量\n2. 注意药品的 **保质期和储存条件**\n3. 如有不良反应，请立即停药并就医\n\n如需网上购药，可以在APP"在线药房"模块下单，支持医保支付。',
  },
  {
    keywords: ['孩子', '宝宝', '儿童', '小儿'],
    reply: '关于儿童健康问题，建议：\n\n1. 儿童用药需特别注意 **剂量和适用年龄**\n2. 发烧38.5度以下可物理降温，超过38.5度建议就医\n3. 疫苗接种请按时完成\n\n如需咨询，建议到 **儿科** 就诊。',
  },
  {
    keywords: ['你好', '您好', '在吗', 'hi', 'hello'],
    reply: '您好！我是 MedChat AI 智能客服，很高兴为您服务。请问有什么可以帮您的？您可以咨询挂号、医保、体检、用药等问题。',
  },
  {
    keywords: ['谢谢', '感谢', '好的'],
    reply: '不客气，很高兴能帮到您！如有其他问题，随时可以咨询。祝您健康！😊',
  },
];

const defaultReplys: string[] = [
  '收到您的咨询，让我为您查询相关信息。请稍等片刻，或提供更多细节以便我更好地帮助您。',
  '感谢您的提问！关于这个问题，建议您到医院相关科室进行详细咨询。如需预约挂号，我可以帮您操作。',
  '我理解您的关切。为了给您更准确的建议，能否提供更多详细信息？比如症状持续时间、是否用药等。',
  '这个问题我已经记录下来，会转给专业医生为您解答。请保持联系方式畅通，医生会在24小时内回复您。',
];

export function useMockReply() {
  const chatStore = useChatStore();

  function matchReply(userMessage: string): string {
    const lowerMsg = userMessage.toLowerCase();

    for (const rule of mockReplyRules) {
      if (rule.keywords.some((kw) => lowerMsg.includes(kw))) {
        return rule.reply;
      }
    }

    return defaultReplys[Math.floor(Math.random() * defaultReplys.length)];
  }

  function generateReply(userMessage: string, sessionId: string) {
    const reply = matchReply(userMessage);

    // Simulate AI thinking delay
    setTimeout(() => {
      chatStore.addAiReply(sessionId, reply);
    }, 800 + Math.random() * 1200);
  }

  return {
    generateReply,
  };
}
