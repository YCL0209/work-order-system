import type { Customer } from '@/types';

export const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: '台灣科技股份有限公司',
    labelTemplate: 'TEMPLATE_A',
    paymentTerm: 'NET30',
    creditLimit: 500000,
    currentCredit: 120000,
    contacts: [
      { name: '王小明', phone: '02-1234-5678', email: 'wang@twtech.com', title: '採購經理' },
      { name: '李小華', phone: '02-1234-5679', email: 'lee@twtech.com', title: '採購專員' },
    ],
    createdAt: '2024-01-15',
  },
  {
    id: 'CUST-002',
    name: '新竹電子有限公司',
    labelTemplate: 'TEMPLATE_B',
    paymentTerm: 'NET60',
    creditLimit: 800000,
    currentCredit: 350000,
    contacts: [
      { name: '陳大明', phone: '03-5678-1234', email: 'chen@hcelectronics.com', title: '總經理' },
    ],
    createdAt: '2024-02-20',
  },
  {
    id: 'CUST-003',
    name: '高雄半導體股份有限公司',
    labelTemplate: 'TEMPLATE_A',
    paymentTerm: 'NET90',
    creditLimit: 1200000,
    currentCredit: 600000,
    contacts: [
      { name: '林志偉', phone: '07-9876-5432', email: 'lin@kssemi.com', title: '採購部主管' },
      { name: '張美玲', phone: '07-9876-5433', email: 'chang@kssemi.com', title: '採購專員' },
    ],
    createdAt: '2024-03-10',
  },
  {
    id: 'CUST-004',
    name: '桃園智能科技有限公司',
    labelTemplate: 'TEMPLATE_B',
    paymentTerm: 'NET30',
    creditLimit: 300000,
    currentCredit: 50000,
    contacts: [
      { name: '黃志豪', phone: '03-3456-7890', email: 'huang@tysmart.com', title: '採購經理' },
    ],
    createdAt: '2024-04-05',
  },
];

// 根據 ID 取得客戶
export function getCustomerById(id: string): Customer | undefined {
  return mockCustomers.find(customer => customer.id === id);
}
