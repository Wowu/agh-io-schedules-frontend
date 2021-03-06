import { Button, InputNumber, List, Select, Space, Table } from 'antd';
import { CSSProperties } from 'react';
import { useState } from 'react';
import { unitTranslation } from '../utils/l10n';
import { Notification } from '../services/NotificationService';

type AddProps = {
  onCreate: (notification: Notification) => void;
};

const Add = (props: AddProps) => {
  const [value, setValue] = useState<Notification['value']>(1);
  const [unit, setUnit] = useState<Notification['unit']>('day');

  return (
    <div style={{ textAlign: 'center' }}>
      <Space>
        <InputNumber min={1} max={60} value={value} onChange={setValue} />
        <Select value={unit} onChange={setUnit}>
          <Select.Option value="minute">minuty</Select.Option>
          <Select.Option value="hour">godziny</Select.Option>
          <Select.Option value="day">dni</Select.Option>
        </Select>
        <Button type="primary" onClick={() => props.onCreate({ value, unit })}>
          Dodaj
        </Button>
      </Space>
    </div>
  );
};

type NotificationsPickerProps = {
  disabled: boolean;
  notifications: Notification[];
  onCreate: (notification: Notification) => void;
  onDelete: (notification: Notification) => void;
};

export default function NotificationPicker(props: NotificationsPickerProps) {
  const columns = [
    {
      title: 'Wartość',
      dataIndex: 'value',
    },
    {
      title: 'Czas',
      dateIndex: 'unit',
      render: (notification: Notification) => unitTranslation[notification.unit],
    },
    {
      key: 'actions',
      render: (notification: Notification) => (
        <Button danger onClick={() => props.onDelete(notification)}>
          Usuń
        </Button>
      ),
    },
  ];

  const tableStyle = (): CSSProperties => {
    if (props.disabled) {
      return { opacity: 0.3, pointerEvents: 'none' };
    } else {
      return {};
    }
  };

  return (
    <div>
      <Table
        style={tableStyle()}
        pagination={false}
        rowKey={(notification) => notification.unit + notification.value}
        footer={() => <Add onCreate={props.onCreate} />}
        columns={columns}
        dataSource={props.notifications}
      />
    </div>
  );
}
