import { useState } from 'react';
import {
  Input,
  Select,
  Button,
  Typography,
  Tag,
  Card,
  Descriptions,
  Progress,
  Empty,
  Modal,
  Form,
  InputNumber,
  DatePicker,
  Row,
  Col,
  message,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { mockWorkOrders } from '../../mocks/workOrders';
import { mockContacts } from '../../mocks/contacts';
import type { WorkOrder, WorkOrderStatus } from '../../types';

const { Title, Text } = Typography;
const { TextArea } = Input;

const workOrderStatusConfig: Record<WorkOrderStatus, { label: string; color: string }> = {
  pending: { label: '待排程', color: '#9ca3af' },
  burning: { label: '燒錄中', color: '#3b82f6' },
  completed: { label: '燒錄完成', color: '#16a34a' },
  shipped: { label: '已出貨', color: '#f59e0b' },
};

// 計算燒錄進度
const calculateProgress = (workOrder: WorkOrder) => {
  if (workOrder.orderQuantity === 0) return 0;
  return Math.round((workOrder.burnedQuantity / workOrder.orderQuantity) * 100);
};

// 計算良率
const calculateYieldRate = (workOrder: WorkOrder) => {
  if (workOrder.burnedQuantity === 0) return 0;
  return ((workOrder.goodQuantity / workOrder.burnedQuantity) * 100).toFixed(1);
};

export default function WorkOrderManagement() {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<WorkOrderStatus | ''>('');
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  // 篩選工單
  const filteredWorkOrders = mockWorkOrders.filter((workOrder) => {
    const matchSearch =
      !searchText ||
      workOrder.workOrderNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      workOrder.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
      workOrder.icModel.toLowerCase().includes(searchText.toLowerCase());

    const matchStatus = !statusFilter || workOrder.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // 取得客戶選項（只取 type='customer' 的用戶）
  const customerOptions = mockContacts
    .filter((c) => c.type === 'customer')
    .map((c) => ({
      value: c.id,
      label: c.name,
    }));

  const handleAddWorkOrder = () => {
    form.resetFields();
    setAddModalOpen(true);
  };

  const handleAddSubmit = async () => {
    try {
      await form.validateFields();
      message.success('工單新增成功（模擬）');
      setAddModalOpen(false);
      form.resetFields();
    } catch {
      // validation failed
    }
  };

  // 工單卡片
  const WorkOrderCard = ({ workOrder, isSelected }: { workOrder: WorkOrder; isSelected: boolean }) => {
    const progress = calculateProgress(workOrder);

    return (
      <div
        onClick={() => setSelectedWorkOrder(workOrder)}
        style={{
          padding: 16,
          marginBottom: 8,
          background: isSelected ? '#e6f4ff' : '#fff',
          border: isSelected ? '2px solid #1890ff' : '1px solid #e5e7eb',
          borderRadius: 8,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        {/* 工單編號 */}
        <div style={{ marginBottom: 8 }}>
          <Text strong style={{ fontSize: 14 }}>
            {workOrder.workOrderNumber}
          </Text>
        </div>

        {/* 客戶名稱 */}
        <div
          style={{
            marginBottom: 8,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={workOrder.customerName}
        >
          <Text type="secondary" style={{ fontSize: 13 }}>
            {workOrder.customerName}
          </Text>
        </div>

        {/* 狀態標籤與進度 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Tag color={workOrderStatusConfig[workOrder.status].color} style={{ margin: 0 }}>
            {workOrderStatusConfig[workOrder.status].label}
          </Tag>
          {workOrder.status === 'burning' && (
            <Text type="secondary" style={{ fontSize: 12 }}>
              {progress}%
            </Text>
          )}
        </div>

        {/* 進度條（僅燒錄中顯示） */}
        {workOrder.status === 'burning' && (
          <Progress
            percent={progress}
            size="small"
            showInfo={false}
            strokeColor="#3b82f6"
            style={{ marginTop: 8 }}
          />
        )}
      </div>
    );
  };

  // 工單詳情面板
  const WorkOrderDetailPanel = () => {
    if (!selectedWorkOrder) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            minHeight: 400,
          }}
        >
          <Empty description="請選擇工單查看詳情" />
        </div>
      );
    }

    const progress = calculateProgress(selectedWorkOrder);
    const yieldRate = calculateYieldRate(selectedWorkOrder);

    return (
      <div>
        {/* 工單標題 */}
        <div style={{ marginBottom: 24 }}>
          <Title level={4} style={{ margin: 0, marginBottom: 8 }}>
            {selectedWorkOrder.workOrderNumber}
          </Title>
          <Text type="secondary">{selectedWorkOrder.customerName}</Text>
        </div>

        {/* 基本資訊 */}
        <Card size="small" title="工單資訊" style={{ marginBottom: 16 }}>
          <Descriptions column={2} size="small">
            <Descriptions.Item label="IC 型號">
              <strong style={{ color: '#4073c2' }}>{selectedWorkOrder.icModel}</strong>
            </Descriptions.Item>
            <Descriptions.Item label="韌體版本">
              {selectedWorkOrder.firmwareVersion}
            </Descriptions.Item>
            <Descriptions.Item label="工單狀態">
              <Tag color={workOrderStatusConfig[selectedWorkOrder.status].color}>
                {workOrderStatusConfig[selectedWorkOrder.status].label}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="交期">
              {new Date(selectedWorkOrder.dueDate).toLocaleDateString('zh-TW')}
            </Descriptions.Item>
            {selectedWorkOrder.notes && (
              <Descriptions.Item label="備註" span={2}>
                {selectedWorkOrder.notes}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Card>

        {/* 燒錄進度 */}
        <Card size="small" title="燒錄進度" style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text>進度</Text>
              <Text strong>{progress}%</Text>
            </div>
            <Progress
              percent={progress}
              status={selectedWorkOrder.status === 'burning' ? 'active' : undefined}
              strokeColor={
                selectedWorkOrder.status === 'completed' || selectedWorkOrder.status === 'shipped'
                  ? '#16a34a'
                  : '#3b82f6'
              }
              showInfo={false}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 16,
            }}
          >
            <div
              style={{
                padding: 12,
                background: '#f9fafb',
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <Text type="secondary" style={{ fontSize: 12 }}>
                訂購數量
              </Text>
              <div style={{ fontSize: 20, fontWeight: 600 }}>
                {selectedWorkOrder.orderQuantity.toLocaleString()}
              </div>
            </div>
            <div
              style={{
                padding: 12,
                background: '#eff6ff',
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <Text type="secondary" style={{ fontSize: 12 }}>
                已燒錄
              </Text>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#3b82f6' }}>
                {selectedWorkOrder.burnedQuantity.toLocaleString()}
              </div>
            </div>
            <div
              style={{
                padding: 12,
                background: '#f0fdf4',
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <Text type="secondary" style={{ fontSize: 12 }}>
                良品數量
              </Text>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#16a34a' }}>
                {selectedWorkOrder.goodQuantity.toLocaleString()}
              </div>
            </div>
            <div
              style={{
                padding: 12,
                background: '#fef2f2',
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <Text type="secondary" style={{ fontSize: 12 }}>
                不良品
              </Text>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#ef4444' }}>
                {selectedWorkOrder.defectQuantity.toLocaleString()}
              </div>
            </div>
          </div>
        </Card>

        {/* 良率 */}
        {selectedWorkOrder.burnedQuantity > 0 && (
          <Card size="small" title="品質數據">
            <div style={{ textAlign: 'center', padding: 16 }}>
              <Text type="secondary">良率</Text>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color:
                    Number(yieldRate) >= 99
                      ? '#16a34a'
                      : Number(yieldRate) >= 95
                      ? '#f59e0b'
                      : '#ef4444',
                }}
              >
                {yieldRate}%
              </div>
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">
                  {Number(yieldRate) >= 99
                    ? '優良'
                    : Number(yieldRate) >= 95
                    ? '正常'
                    : '需關注'}
                </Text>
              </div>
            </div>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
          工單管理
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddWorkOrder}>
          新增工單
        </Button>
      </div>

      {/* 左右分欄 */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* 左側：工單列表 */}
        <div
          style={{
            width: '35%',
            minWidth: 280,
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 搜尋與篩選 */}
          <div style={{ marginBottom: 16 }}>
            <Input
              placeholder="搜尋編號、客戶、IC型號"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              style={{ marginBottom: 8 }}
            />
            <Select
              placeholder="篩選狀態"
              style={{ width: '100%' }}
              value={statusFilter || undefined}
              onChange={(value) => setStatusFilter(value || '')}
              allowClear
              options={[
                { value: 'pending', label: '待排程' },
                { value: 'burning', label: '燒錄中' },
                { value: 'completed', label: '燒錄完成' },
                { value: 'shipped', label: '已出貨' },
              ]}
            />
          </div>

          {/* 工單列表 */}
          <div
            style={{
              flex: 1,
              overflow: 'auto',
              paddingRight: 8,
            }}
          >
            {filteredWorkOrders.length === 0 ? (
              <Empty description="查無符合條件的工單" />
            ) : (
              filteredWorkOrders.map((workOrder) => (
                <WorkOrderCard
                  key={workOrder.id}
                  workOrder={workOrder}
                  isSelected={selectedWorkOrder?.id === workOrder.id}
                />
              ))
            )}
          </div>

          {/* 統計 */}
          <div
            style={{
              marginTop: 16,
              padding: 12,
              background: '#f9fafb',
              borderRadius: 8,
              textAlign: 'center',
            }}
          >
            <Text type="secondary">
              共 {filteredWorkOrders.length} 筆工單
            </Text>
          </div>
        </div>

        {/* 右側：工單詳情 */}
        <div
          style={{
            flex: 1,
            background: '#fff',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            padding: 24,
            overflow: 'auto',
          }}
        >
          <WorkOrderDetailPanel />
        </div>
      </div>

      {/* 新增工單 Modal */}
      <Modal
        title="新增工單"
        open={addModalOpen}
        onCancel={() => setAddModalOpen(false)}
        onOk={handleAddSubmit}
        okText="確認新增"
        cancelText="取消"
        width={560}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 16 }}
        >
          <Form.Item
            name="customerId"
            label="客戶"
            rules={[{ required: true, message: '請選擇客戶' }]}
          >
            <Select
              placeholder="請選擇客戶"
              options={customerOptions}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="icModel"
                label="IC 型號"
                rules={[{ required: true, message: '請輸入 IC 型號' }]}
              >
                <Input placeholder="例如：AT24C256" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="firmwareVersion"
                label="韌體版本"
                rules={[{ required: true, message: '請輸入韌體版本' }]}
              >
                <Input placeholder="例如：v2.1.0" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="orderQuantity"
                label="訂購數量"
                rules={[{ required: true, message: '請輸入訂購數量' }]}
              >
                <InputNumber
                  placeholder="請輸入數量"
                  min={1}
                  style={{ width: '100%' }}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dueDate"
                label="交期"
                rules={[{ required: true, message: '請選擇交期' }]}
              >
                <DatePicker
                  placeholder="請選擇交期"
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>

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
