import { useState } from 'react';
import {
  Input,
  Select,
  Button,
  Space,
  Typography,
  Tag,
  Row,
  Col,
  Card,
  Divider,
  Pagination,
  Modal,
  Descriptions,
  Form,
  message,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  BankOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { mockContacts } from '../../mocks/contacts';
import type { Contact, ContactType } from '../../types';

const { Title, Text } = Typography;
const { TextArea } = Input;

const typeConfig: Record<ContactType, { label: string; color: string }> = {
  customer: { label: '顧客', color: '#3b82f6' },
  supplier: { label: '供應商', color: '#10b981' },
};

const PAGE_SIZE = 8;

export default function Contacts() {
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState<ContactType | ''>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  const filteredData = mockContacts.filter((contact) => {
    const matchSearch =
      !searchText ||
      contact.contactNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.contactPerson.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchText.toLowerCase());

    const matchType = !typeFilter || contact.type === typeFilter;

    return matchSearch && matchType;
  });

  // 分頁資料
  const paginatedData = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // 當篩選條件改變時，重置頁碼
  const handleSearchChange = (value: string) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleTypeChange = (value: ContactType | '') => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  const handleViewDetail = (contact: Contact) => {
    setSelectedContact(contact);
    setDetailModalOpen(true);
  };

  const handleAddContact = () => {
    form.resetFields();
    setAddModalOpen(true);
  };

  const handleAddSubmit = async () => {
    try {
      await form.validateFields();
      message.success('用戶新增成功（模擬）');
      setAddModalOpen(false);
      form.resetFields();
    } catch {
      // validation failed
    }
  };

  return (
    <div>
      {/* 標題列 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          往來用戶管理
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddContact}>
          新增用戶
        </Button>
      </div>

      {/* 搜尋與篩選 */}
      <Space style={{ marginBottom: 24 }}>
        <Input
          placeholder="搜尋編號、名稱、聯絡人、Email"
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          allowClear
        />
        <Select
          placeholder="篩選類型"
          style={{ width: 120 }}
          value={typeFilter || undefined}
          onChange={(value) => handleTypeChange(value || '')}
          allowClear
          options={[
            { value: 'customer', label: '顧客' },
            { value: 'supplier', label: '供應商' },
          ]}
        />
      </Space>

      {/* 卡片網格 */}
      <Row gutter={[16, 16]}>
        {paginatedData.map((contact) => (
          <Col xs={24} sm={12} md={8} lg={6} key={contact.id}>
            <Card
              hoverable
              style={{ height: '100%' }}
              onClick={() => handleViewDetail(contact)}
            >
              {/* 公司名稱 */}
              <div style={{ marginBottom: 8 }}>
                <Text
                  strong
                  style={{
                    fontSize: 16,
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={contact.name}
                >
                  {contact.name}
                </Text>
              </div>

              {/* 類型標籤 */}
              <Tag color={typeConfig[contact.type].color}>
                {typeConfig[contact.type].label}
              </Tag>

              <Divider style={{ margin: '12px 0' }} />

              {/* 聯絡資訊 */}
              <Space direction="vertical" size={6} style={{ width: '100%' }}>
                <Text type="secondary">
                  <UserOutlined style={{ marginRight: 8 }} />
                  {contact.contactPerson}
                </Text>
                <Text type="secondary">
                  <PhoneOutlined style={{ marginRight: 8 }} />
                  {contact.phone}
                </Text>
                <Text
                  type="secondary"
                  style={{
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  title={contact.email}
                >
                  <MailOutlined style={{ marginRight: 8 }} />
                  {contact.email}
                </Text>
                {contact.taxId && (
                  <Text type="secondary">
                    <BankOutlined style={{ marginRight: 8 }} />
                    統編：{contact.taxId}
                  </Text>
                )}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 無資料提示 */}
      {filteredData.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: 48,
            color: '#9ca3af',
          }}
        >
          <Text type="secondary">查無符合條件的用戶</Text>
        </div>
      )}

      {/* 分頁 */}
      {filteredData.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 24,
          }}
        >
          <Pagination
            current={currentPage}
            total={filteredData.length}
            pageSize={PAGE_SIZE}
            onChange={setCurrentPage}
            showTotal={(total) => `共 ${total} 筆`}
            showSizeChanger={false}
          />
        </div>
      )}

      {/* 用戶詳情 Modal */}
      <Modal
        title="用戶詳情"
        open={detailModalOpen}
        onCancel={() => setDetailModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalOpen(false)}>
            關閉
          </Button>,
        ]}
        width={640}
      >
        {selectedContact && (
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="用戶編號">
              <strong>{selectedContact.contactNumber}</strong>
            </Descriptions.Item>
            <Descriptions.Item label="類型">
              <Tag color={typeConfig[selectedContact.type].color}>
                {typeConfig[selectedContact.type].label}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="公司名稱" span={2}>
              {selectedContact.name}
            </Descriptions.Item>
            <Descriptions.Item label="聯絡人">
              <UserOutlined style={{ marginRight: 8 }} />
              {selectedContact.contactPerson}
            </Descriptions.Item>
            <Descriptions.Item label="電話">
              <PhoneOutlined style={{ marginRight: 8 }} />
              {selectedContact.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Email" span={2}>
              <MailOutlined style={{ marginRight: 8 }} />
              {selectedContact.email}
            </Descriptions.Item>
            <Descriptions.Item label="地址" span={2}>
              <EnvironmentOutlined style={{ marginRight: 8 }} />
              {selectedContact.address}
            </Descriptions.Item>
            {selectedContact.taxId && (
              <Descriptions.Item label="統一編號">
                <BankOutlined style={{ marginRight: 8 }} />
                {selectedContact.taxId}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="建立時間">
              {new Date(selectedContact.createdAt).toLocaleString('zh-TW')}
            </Descriptions.Item>
            {selectedContact.notes && (
              <Descriptions.Item label="備註" span={2}>
                <Text style={{ whiteSpace: 'pre-wrap' }}>
                  {selectedContact.notes}
                </Text>
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>

      {/* 新增用戶 Modal */}
      <Modal
        title="新增用戶"
        open={addModalOpen}
        onCancel={() => setAddModalOpen(false)}
        onOk={handleAddSubmit}
        okText="確認新增"
        cancelText="取消"
        width={640}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 16 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="公司名稱"
                rules={[{ required: true, message: '請輸入公司名稱' }]}
              >
                <Input placeholder="請輸入公司名稱" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="類型"
                rules={[{ required: true, message: '請選擇類型' }]}
              >
                <Select
                  placeholder="請選擇類型"
                  options={[
                    { value: 'customer', label: '顧客' },
                    { value: 'supplier', label: '供應商' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="contactPerson"
                label="聯絡人"
                rules={[{ required: true, message: '請輸入聯絡人' }]}
              >
                <Input placeholder="請輸入聯絡人姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="電話"
                rules={[{ required: true, message: '請輸入電話' }]}
              >
                <Input placeholder="請輸入電話號碼" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: '請輸入 Email' },
              { type: 'email', message: '請輸入有效的 Email 格式' },
            ]}
          >
            <Input placeholder="請輸入 Email" />
          </Form.Item>

          <Form.Item
            name="address"
            label="地址"
            rules={[{ required: true, message: '請輸入地址' }]}
          >
            <Input placeholder="請輸入公司地址" />
          </Form.Item>

          <Form.Item
            name="taxId"
            label="統一編號"
          >
            <Input placeholder="請輸入統一編號（選填）" maxLength={8} />
          </Form.Item>

          <Form.Item
            name="notes"
            label="備註"
          >
            <TextArea
              placeholder="請輸入備註（選填）"
              rows={3}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
