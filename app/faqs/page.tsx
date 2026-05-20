'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

type FAQ = {
  q: string
  qCN: string
  answer: React.ReactNode
}

const faqs: FAQ[] = [
  {
    q: 'Can I bring my own drinks or food?',
    qCN: '自带酒水与食物规定',
    answer: (
      <div className="flex flex-col gap-4">
        <p>Our premises hold a full alcohol licence under the Licensing Act 2003.</p>
        <div
          className="px-4 py-3 text-sm"
          style={{ background: 'rgba(232,117,26,0.08)', border: '1px solid rgba(232,117,26,0.25)', borderRadius: '2px' }}
        >
          ⚠️ Guests are not permitted to bring alcoholic beverages onto the premises.
        </div>

        <div>
          <p className="text-xs uppercase mb-3" style={{ color: 'var(--gold)', letterSpacing: '0.15em' }}>Penalties</p>
          <ul className="flex flex-col gap-2.5">
            {[
              { en: 'Unauthorised BYO alcohol: Confiscated + £85 charge (Licensing Act 2003 s.140)', cn: '擅自带入酒精饮品：立即没收 + 罚款 £85' },
              { en: 'Unauthorised BYO soft drinks: Confiscated + £10 charge', cn: '擅自带入软饮/外购瓶装饮料：立即没收 + 罚款 £10' },
              { en: 'Refusal to comply with staff: Asked to leave, no refund (Licensing Act 2003 s.143)', cn: '拒绝配合工作人员：要求离场，不予退款' },
              { en: 'Outside food (takeaway/other): £15 charge per item or denied entry (Food Safety Act 1990)', cn: '自带食物（外卖/外购）：每样罚款 £15 / 拒绝入场' },
            ].map(item => (
              <li key={item.en} className="flex gap-3">
                <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
                <span>
                  {item.en}
                  <span className="block mt-0.5" style={{ color: 'var(--text-dim)', fontSize: '0.8125rem' }}>{item.cn}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase mb-3" style={{ color: 'var(--gold)', letterSpacing: '0.15em' }}>Soft Drinks</p>
          <ul className="flex flex-col gap-2.5">
            {[
              { en: 'All outside beverages including mineral water, energy drinks, milk tea and bubble tea are not permitted', cn: '所有外购饮料均不允许带入' },
              { en: 'Baby formula and infant drinks are exempt', cn: '婴儿配方奶粉及儿童专用饮品豁免' },
              { en: 'Guests who require specific drinks for medical reasons should contact us in advance', cn: '因医疗原因须携带特定饮品者，请提前联系餐厅' },
            ].map(item => (
              <li key={item.en} className="flex gap-3">
                <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
                <span>
                  {item.en}
                  <span className="block mt-0.5" style={{ color: 'var(--text-dim)', fontSize: '0.8125rem' }}>{item.cn}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="px-4 py-3 text-sm"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '2px' }}
        >
          <p>💧 Under the Licensing Act 2003, we provide free tap water to dining customers on request.</p>
          <p className="mt-1" style={{ color: 'var(--text-dim)', fontSize: '0.8125rem' }}>依据许可法，持牌餐厅须向点餐顾客免费提供自来水。</p>
        </div>
      </div>
    ),
  },
  {
    q: 'What is your age verification policy?',
    qCN: '年龄核查政策',
    answer: (
      <div className="flex flex-col gap-4">
        <p>We operate a strict Challenge 25 policy in line with the Licensing Act 2003. Any guest who appears to be under 25 will be asked to produce valid ID before alcohol is served.</p>

        <div>
          <p className="text-xs uppercase mb-3" style={{ color: 'var(--gold)', letterSpacing: '0.15em' }}>Accepted ID</p>
          <ul className="flex flex-col gap-2">
            {['UK or EU Driving Licence', 'Passport', 'PASS-accredited Proof of Age card'].map(item => (
              <li key={item} className="flex gap-3">
                <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p>Failure to produce valid ID will result in refusal of alcohol service. It is a criminal offence under s.146 of the Licensing Act 2003 to sell alcohol to a person under 18, carrying a fine of up to £5,000.</p>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>凡外貌看起来25岁以下的顾客，将被要求出示有效证件。无法出示有效证件者，将被拒绝提供酒精饮品。</p>
      </div>
    ),
  },
  {
    q: 'What is your responsible drinking policy?',
    qCN: '负责任饮酒政策',
    answer: (
      <div className="flex flex-col gap-4">
        <p>Under the Licensing Act 2003, we refuse alcohol service to any guest who appears drunk or disorderly.</p>
        <ul className="flex flex-col gap-2.5">
          {[
            { en: 'Staff may refuse alcohol to visibly intoxicated guests', cn: '工作人员有权拒绝向醉酒顾客提供酒水' },
            { en: 'Staff may ask disorderly guests to leave the premises', cn: '工作人员有权要求行为不当的顾客离场' },
            { en: 'Complimentary drinking water is available on request', cn: '我们提供免费的饮用水' },
          ].map(item => (
            <li key={item.en} className="flex gap-3">
              <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
              <span>
                {item.en}
                <span className="block mt-0.5" style={{ color: 'var(--text-dim)', fontSize: '0.8125rem' }}>{item.cn}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    q: 'Do you cater for food allergies?',
    qCN: '过敏原信息政策',
    answer: (
      <div className="flex flex-col gap-4">
        <p>In compliance with Food Information Regulations 2014, we provide full information on all 14 major allergens.</p>
        <div
          className="px-4 py-3 text-sm"
          style={{ background: 'rgba(232,117,26,0.08)', border: '1px solid rgba(232,117,26,0.25)', borderRadius: '2px' }}
        >
          ⚠️ Please inform your server of any food allergies or intolerances BEFORE ordering. Our kitchen handles nuts, gluten, shellfish and other allergens.
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>如有食物过敏或不耐受，请在点餐前主动告知服务员。本餐厅厨房无法保证完全隔离致敏物质，严重过敏症患者须自行评估风险。</p>
      </div>
    ),
  },
  {
    q: 'What is your smoking policy?',
    qCN: '禁止吸烟政策',
    answer: (
      <div className="flex flex-col gap-4">
        <p>Under the Health Act 2006, smoking and e-cigarettes/vaping are strictly prohibited in all enclosed areas.</p>
        <ul className="flex flex-col gap-2.5">
          {[
            { en: 'No smoking or vaping anywhere indoors', cn: '室内全面禁止吸烟及电子烟' },
            { en: 'Smoking permitted in the designated outdoor area only', cn: '吸烟请至指定室外区域' },
            { en: 'Violation may result in removal from the premises', cn: '违者将被要求离场' },
          ].map(item => (
            <li key={item.en} className="flex gap-3">
              <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
              <span>
                {item.en}
                <span className="block mt-0.5" style={{ color: 'var(--text-dim)', fontSize: '0.8125rem' }}>{item.cn}</span>
              </span>
            </li>
          ))}
        </ul>
        <p>Fixed penalty notices of up to £200 may be issued for non-compliance.</p>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>在餐厅室内吸烟者，罚款由地方当局执行，最高£200。</p>
      </div>
    ),
  },
  {
    q: 'What is your reservation & cancellation policy?',
    qCN: '预订与取消政策',
    answer: (
      <div className="flex flex-col gap-2.5">
        {[
          { en: 'Cancellation 48+ hrs in advance: Full refund', cn: '全额退款' },
          { en: 'Cancellation 24–48 hrs in advance: 50% deposit retained', cn: '收取50%定金' },
          { en: 'No-show or <24 hrs cancellation: Deposit forfeited in full', cn: '定金不退' },
        ].map(item => (
          <div key={item.en} className="flex gap-3">
            <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
            <span>
              {item.en}
              <span className="ml-2 px-2 py-0.5 text-xs" style={{ background: 'var(--surface-2)', borderRadius: '2px', color: 'var(--text-dim)' }}>{item.cn}</span>
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    q: 'What behaviour is expected of guests?',
    qCN: '行为准则与拒绝服务权',
    answer: (
      <div className="flex flex-col gap-4">
        <p>We are committed to providing a safe, inclusive environment under the Equality Act 2010.</p>
        <div>
          <p className="text-xs uppercase mb-3" style={{ color: 'var(--gold)', letterSpacing: '0.15em' }}>The following will result in immediate removal</p>
          <ul className="flex flex-col gap-2.5">
            {[
              { en: 'Harassment, abuse or threatening behaviour', cn: '骚扰、辱骂、威胁' },
              { en: 'Deliberate damage to property', cn: '故意破坏餐厅财物' },
              { en: 'Illegal activity on the premises', cn: '在店内进行非法活动' },
              { en: 'Intoxicated disorderly behaviour', cn: '醉酒行为' },
              { en: 'Refusal to comply with house rules', cn: '拒绝遵守本政策规定' },
            ].map(item => (
              <li key={item.en} className="flex gap-3">
                <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
                <span>
                  {item.en}
                  <span className="block mt-0.5" style={{ color: 'var(--text-dim)', fontSize: '0.8125rem' }}>{item.cn}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p>The manager&apos;s decision is final in all disputes.</p>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>处理争议时，经理决定具有最终效力。</p>
      </div>
    ),
  },
  {
    q: 'What is your food hygiene rating?',
    qCN: '卫生与食品安全',
    answer: (
      <div className="flex flex-col gap-4">
        <p>We comply fully with the Food Safety Act 1990 and Food Hygiene Regulations 2006.</p>
        <ul className="flex flex-col gap-2.5">
          {[
            { en: 'Food Hygiene Rating: ★★★★★ (5/5) – FSA', cn: '食品卫生评级：5分满分' },
            { en: 'All food handlers hold valid food hygiene certificates', cn: '所有食品处理人员持有合法卫生培训证书' },
            { en: 'Raw and cooked foods are stored and handled separately', cn: '生熟食品严格分开储存与处理' },
          ].map(item => (
            <li key={item.en} className="flex gap-3">
              <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
              <span>
                {item.en}
                <span className="block mt-0.5" style={{ color: 'var(--text-dim)', fontSize: '0.8125rem' }}>{item.cn}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    q: 'How do you handle my personal data?',
    qCN: '个人信息保护',
    answer: (
      <div className="flex flex-col gap-4">
        <p>We collect guest personal data (name, contact details, dietary preferences) solely for reservation and service purposes, in compliance with UK GDPR.</p>
        <ul className="flex flex-col gap-2">
          {[
            'Data is never sold or transferred to third parties',
            'Guests have the right to access, rectify or erase their personal data',
            'Please contact the manager for any data enquiries',
          ].map(item => (
            <li key={item} className="flex gap-3">
              <span style={{ color: 'var(--gold)' }} className="shrink-0 mt-0.5">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          For full details, see our{' '}
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors"
            style={{ color: 'var(--gold)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    q: 'Do you have parking? What about lost property?',
    qCN: '停车与遗失物品',
    answer: (
      <div className="flex flex-col gap-4">
        <p>No dedicated car parking is provided. Guests are responsible for complying with all local parking regulations.</p>
        <p>Found items are retained for 30 days. The restaurant accepts no legal liability for lost or stolen property.</p>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>遗失物品保留期限为30天，本餐厅对遗失物品不承担法律责任。</p>
      </div>
    ),
  },
]

export default function FAQsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggle = (i: number) => setActiveIndex(prev => prev === i ? null : i)

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="py-20 px-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase mb-4" style={{ color: 'var(--gold)', letterSpacing: '0.3em' }}>
            Guest Information
          </p>
          <h1
            className="font-display font-light text-foreground mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            FAQs — Guest Policy &amp; House Rules
          </h1>
          <p className="text-text-muted text-sm">
            Please read our house rules before visiting. These policies ensure a safe and enjoyable experience for all guests.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = activeIndex === i
            return (
              <div
                key={i}
                style={{
                  background: 'var(--surface)',
                  border: `1px solid ${isOpen ? 'var(--gold-dark)' : 'var(--border)'}`,
                  borderRadius: '2px',
                  transition: 'border-color 0.2s ease',
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <div>
                    <span className="text-xs uppercase mr-3" style={{ color: 'var(--text-dim)', letterSpacing: '0.1em' }}>
                      Q{i + 1}
                    </span>
                    <span className="text-foreground text-sm font-medium">{faq.q}</span>
                    <span className="block mt-1 text-xs" style={{ color: 'var(--text-dim)', paddingLeft: '2.25rem' }}>
                      {faq.qCN}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{
                      color: 'var(--text-muted)',
                      transition: 'transform 0.3s ease',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                {/* Answer — CSS grid trick for smooth animation */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.3s ease',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div
                      className="px-6 pb-6 text-text-muted text-sm"
                      style={{ lineHeight: '1.75', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Footer note */}
      <section className="pb-16 px-6">
        <div
          className="max-w-3xl mx-auto pt-8 text-center"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-text-dim text-xs" style={{ lineHeight: '1.8' }}>
            Effective Date: December 2024
            <span className="mx-3" style={{ color: 'var(--border)' }}>|</span>
            Governed by the laws of England &amp; Wales
          </p>
        </div>
      </section>
    </div>
  )
}
