import { useState, useRef, useEffect } from 'react';
import { Input, Card, Descriptions, Typography, Tag, Button, Progress } from 'antd';
import { BarcodeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { mockWorkOrders } from '../../mocks/workOrders';
import type { WorkOrder, WorkOrderStatus } from '../../types';

const { Title, Text } = Typography;

const workOrderStatusConfig: Record<WorkOrderStatus, { label: string; color: string }> = {
  pending: { label: '待排程', color: '#9ca3af' },
  burning: { label: '燒錄中', color: '#3b82f6' },
  completed: { label: '燒錄完成', color: '#16a34a' },
  shipped: { label: '已出貨', color: '#f59e0b' },
};

export default function WorkOrderQuery() {
  const [searchValue, setSearchValue] = useState('');
  const [searchedWorkOrder, setSearchedWorkOrder] = useState<WorkOrder | null>(null);
  const [notFound, setNotFound] = useState(false);
  const inputRef = useRef<InputRef>(null);

  // 頁面載入時自動 focus 到輸入框
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return;
    }

    const found = mockWorkOrders.find(
      (workOrder) => workOrder.workOrderNumber.toLowerCase() === trimmedValue.toLowerCase()
    );

    if (found) {
      setSearchedWorkOrder(found);
      setNotFound(false);
    } else {
      setSearchedWorkOrder(null);
      setNotFound(true);
      // 查無資料時保持 focus，方便重新掃描
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);
    }
  };

  const handleReset = () => {
    setSearchValue('');
    setSearchedWorkOrder(null);
    setNotFound(false);
    // 重新 focus 到輸入框
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // 計算良率
  const calculateYieldRate = (workOrder: WorkOrder) => {
    if (workOrder.burnedQuantity === 0) return 0;
    return ((workOrder.goodQuantity / workOrder.burnedQuantity) * 100).toFixed(1);
  };

  // 計算燒錄進度
  const calculateProgress = (workOrder: WorkOrder) => {
    if (workOrder.orderQuantity === 0) return 0;
    return Math.round((workOrder.burnedQuantity / workOrder.orderQuantity) * 100);
  };

  // 掃描介面（初始狀態）
  const renderScanInterface = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      {/* 條碼圖示 */}
      <BarcodeOutlined
        style={{
          fontSize: 80,
          color: '#9ca3af',
          marginBottom: 32,
        }}
      />

      {/* 標題 */}
      <Title level={3} style={{ marginBottom: 24, color: '#374151' }}>
        工單查詢
      </Title>

      {/* 大型輸入框 */}
      <Input
        ref={inputRef}
        placeholder="請掃描工單條碼或輸入編號"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onPressEnter={() => handleSearch(searchValue)}
        style={{
          width: 400,
          height: 56,
          fontSize: 18,
          textAlign: 'center',
          borderRadius: 8,
        }}
        allowClear
      />

      {/* 錯誤提示 */}
      {notFound && (
        <Text
          type="danger"
          style={{
            marginTop: 16,
            fontSize: 16,
          }}
        >
          查無此工單，請確認編號是否正確
        </Text>
      )}

      {/* 引導文字 */}
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <Text type="secondary" style={{ fontSize: 14 }}>
          使用掃描槍掃描條碼
        </Text>
        <br />
        <Text type="secondary" style={{ fontSize: 14 }}>
          或手動輸入工單編號後按 Enter
        </Text>
      </div>
    </div>
  );

  // 工單詳情（掃描成功後）
  const renderWorkOrderDetail = () => {
    if (!searchedWorkOrder) return null;

    const progress = calculateProgress(searchedWorkOrder);
    const yieldRate = calculateYieldRate(searchedWorkOrder);

    return (
      <div>
        {/* 返回按鈕 */}
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleReset}
          style={{ marginBottom: 24 }}
        >
          重新掃描
        </Button>

        {/* 工單基本資訊 */}
        <Card title="工單資訊" style={{ marginBottom: 24 }}>
          <Descriptions column={{ xs: 1, sm: 2, md: 3 }} bordered>
            <Descriptions.Item label="工單編號">
              <strong>{searchedWorkOrder.workOrderNumber}</strong>
            </Descriptions.Item>
            <Descriptions.Item label="客戶名稱">
              {searchedWorkOrder.customerName}
            </Descriptions.Item>
            <Descriptions.Item label="工單狀態">
              <Tag color={workOrderStatusConfig[searchedWorkOrder.status].color}>
                {workOrderStatusConfig[searchedWorkOrder.status].label}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="IC 型號">
              <strong style={{ color: '#4073c2' }}>{searchedWorkOrder.icModel}</strong>
            </Descriptions.Item>
            <Descriptions.Item label="韌體版本">
              {searchedWorkOrder.firmwareVersion}
            </Descriptions.Item>
            <Descriptions.Item label="交期">
              {new Date(searchedWorkOrder.dueDate).toLocaleDateString('zh-TW')}
            </Descriptions.Item>
            {searchedWorkOrder.notes && (
              <Descriptions.Item label="備註" span={3}>
                {searchedWorkOrder.notes}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Card>

        {/* 燒錄進度 */}
        <Card title="燒錄進度">
          <div style={{ marginBottom: 24 }}>
            <Progress
              percent={progress}
              status={searchedWorkOrder.status === 'burning' ? 'active' : undefined}
              strokeColor={searchedWorkOrder.status === 'completed' || searchedWorkOrder.status === 'shipped' ? '#16a34a' : '#3b82f6'}
              size="default"
            />
          </div>

          <Descriptions column={{ xs: 1, sm: 2, md: 4 }} bordered>
            <Descriptions.Item label="訂購數量">
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                {searchedWorkOrder.orderQuantity.toLocaleString()} pcs
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="已燒錄">
              <span style={{ fontSize: 18, fontWeight: 600, color: '#3b82f6' }}>
                {searchedWorkOrder.burnedQuantity.toLocaleString()} pcs
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="良品數量">
              <span style={{ fontSize: 18, fontWeight: 600, color: '#16a34a' }}>
                {searchedWorkOrder.goodQuantity.toLocaleString()} pcs
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="不良品">
              <span style={{ fontSize: 18, fontWeight: 600, color: '#ef4444' }}>
                {searchedWorkOrder.defectQuantity.toLocaleString()} pcs
              </span>
            </Descriptions.Item>
          </Descriptions>

          {/* 良率顯示 */}
          {searchedWorkOrder.burnedQuantity > 0 && (
            <div
              style={{
                marginTop: 24,
                padding: 16,
                background: '#f0fdf4',
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <Text type="secondary">良率</Text>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: Number(yieldRate) >= 99 ? '#16a34a' : Number(yieldRate) >= 95 ? '#f59e0b' : '#ef4444',
                }}
              >
                {yieldRate}%
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  };

  return (
    <div>
      {searchedWorkOrder ? renderWorkOrderDetail() : renderScanInterface()}
    </div>
  );
}
