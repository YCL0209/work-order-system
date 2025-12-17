import type { Contact, ContactType } from '../types';

export const mockContacts: Contact[] = [
  {
    id: '1',
    contactNumber: 'C-2025-0001',
    name: '穗鈅科技股份有限公司',
    type: 'customer',
    contactPerson: '王小明',
    phone: '02-1234-5678',
    email: 'contact@suiyu.com.tw',
    address: '台北市信義區信義路五段7號',
    taxId: '12345678',
    notes: 'VIP 客戶',
    createdAt: '2025-01-15T09:00:00Z',
    updatedAt: '2025-12-01T10:30:00Z',
  },
  {
    id: '2',
    contactNumber: 'S-2025-0001',
    name: '台灣零件供應商',
    type: 'supplier',
    contactPerson: '李大華',
    phone: '04-2345-6789',
    email: 'info@tw-parts.com.tw',
    address: '台中市西屯區台灣大道三段99號',
    taxId: '87654321',
    notes: '主要零件供應商',
    createdAt: '2025-02-20T14:00:00Z',
    updatedAt: '2025-11-15T09:20:00Z',
  },
  {
    id: '3',
    contactNumber: 'C-2025-0002',
    name: '金融服務有限公司',
    type: 'customer',
    contactPerson: '張美玲',
    phone: '02-8765-4321',
    email: 'service@financegroup.com.tw',
    address: '台北市中山區南京東路三段168號',
    taxId: '23456789',
    notes: '',
    createdAt: '2025-03-10T11:00:00Z',
    updatedAt: '2025-10-20T16:45:00Z',
  },
  {
    id: '4',
    contactNumber: 'S-2025-0002',
    name: '南方電子材料行',
    type: 'supplier',
    contactPerson: '陳志明',
    phone: '07-3456-7890',
    email: 'south.elec@gmail.com',
    address: '高雄市前鎮區中山二路200號',
    taxId: '34567890',
    notes: '電子零件供應',
    createdAt: '2025-04-05T08:30:00Z',
    updatedAt: '2025-09-18T14:00:00Z',
  },
  {
    id: '5',
    contactNumber: 'C-2025-0003',
    name: '台北數位公司',
    type: 'customer',
    contactPerson: '林佳穎',
    phone: '02-5566-7788',
    email: 'digital@taipei.com.tw',
    address: '台北市大安區敦化南路一段233號',
    taxId: '45678901',
    notes: '長期合作客戶',
    createdAt: '2025-05-12T10:15:00Z',
    updatedAt: '2025-08-25T11:30:00Z',
  },
  {
    id: '6',
    contactNumber: 'S-2025-0003',
    name: '北區物流配送中心',
    type: 'supplier',
    contactPerson: '吳建宏',
    phone: '03-4567-8901',
    email: 'logistics@north.com.tw',
    address: '桃園市中壢區中正路500號',
    taxId: '56789012',
    notes: '物流配送服務',
    createdAt: '2025-06-08T13:45:00Z',
    updatedAt: '2025-07-30T09:00:00Z',
  },
  {
    id: '7',
    contactNumber: 'C-2025-0004',
    name: '新創科技股份有限公司',
    type: 'customer',
    contactPerson: '周雅婷',
    phone: '02-9988-7766',
    email: 'info@startup-tech.com.tw',
    address: '新北市板橋區文化路二段100號',
    taxId: '67890123',
    notes: '新客戶',
    createdAt: '2025-07-20T15:00:00Z',
    updatedAt: '2025-12-10T10:00:00Z',
  },
  {
    id: '8',
    contactNumber: 'C-2025-0005',
    name: '中部製造廠',
    type: 'customer',
    contactPerson: '許文龍',
    phone: '04-5678-9012',
    email: 'factory@central.com.tw',
    address: '台中市南屯區工業區一路88號',
    taxId: '78901234',
    notes: '製造業客戶',
    createdAt: '2025-08-15T09:30:00Z',
    updatedAt: '2025-11-28T14:20:00Z',
  },
  {
    id: '9',
    contactNumber: 'S-2025-0004',
    name: '優質包裝材料行',
    type: 'supplier',
    contactPerson: '鄭淑芬',
    phone: '06-6789-0123',
    email: 'package@quality.com.tw',
    address: '台南市永康區中華路300號',
    taxId: '89012345',
    notes: '包裝材料供應',
    createdAt: '2025-09-01T11:00:00Z',
    updatedAt: '2025-12-05T16:00:00Z',
  },
  {
    id: '10',
    contactNumber: 'C-2025-0006',
    name: '東區貿易商行',
    type: 'customer',
    contactPerson: '黃志偉',
    phone: '03-7890-1234',
    email: 'trade@east.com.tw',
    address: '宜蘭縣宜蘭市中山路一段50號',
    taxId: '90123456',
    notes: '',
    createdAt: '2025-10-10T14:30:00Z',
    updatedAt: '2025-12-12T09:45:00Z',
  },
];

/** 依類型篩選往來用戶 */
export function filterContactsByType(type?: ContactType): Contact[] {
  if (!type) return mockContacts;
  return mockContacts.filter((contact) => contact.type === type);
}

/** 搜尋往來用戶 */
export function searchContacts(keyword: string): Contact[] {
  const lowerKeyword = keyword.toLowerCase();
  return mockContacts.filter(
    (contact) =>
      contact.contactNumber.toLowerCase().includes(lowerKeyword) ||
      contact.name.toLowerCase().includes(lowerKeyword) ||
      contact.contactPerson.toLowerCase().includes(lowerKeyword) ||
      contact.email.toLowerCase().includes(lowerKeyword)
  );
}
