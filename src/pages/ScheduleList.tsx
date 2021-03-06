import { ScheduleOutlined } from '@ant-design/icons';
import { Button, Col, List, Popconfirm, Row, Spin } from 'antd';
import CenteredHeader from '../components/CenteredHeader';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Schedule, ScheduleService } from '../services/ScheduleService';

export default function ScheduleList() {
  let [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getScheduleList = async () => {
    const { data } = await ScheduleService.getListSchedules();

    setSchedules(
      data.schedules.sort(
        (a: Schedule, b: Schedule) =>
          new Date(b.firstEventDate).getTime() - new Date(a.firstEventDate).getTime()
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    getScheduleList().then((r) => r);
  }, []);

  const removeSchedule = async (scheduleId: number) => {
    const response = await ScheduleService.removeSchedule(scheduleId);
    if (response.ok) {
      await getScheduleList();
    }
    setSchedules((oldSchedules: any) =>
      oldSchedules.filter((schedule: any) => schedule.id !== scheduleId)
    ); //TODO Delete this line in production version. Only for mock API.
  };

  function confirmRemove(id: any) {
    removeSchedule(id);
  }

  return (
    <>
      <CenteredHeader title={'Harmonogramy'} />
      {loading ? (
        <Row justify={'center'}>
          <Spin size="large" />
        </Row>
      ) : (
        <Row justify={'center'}>
          <Col span={24} lg={18} xl={14}>
            <List
              itemLayout="horizontal"
              dataSource={schedules}
              rowKey="id"
              renderItem={(item: Schedule) => (
                <List.Item
                  actions={[
                    <Popconfirm
                      title={
                        <span>
                          Czy na pewno chcesz usunąć ten harmonogram? <br />
                          Ta operacja jest nieodwracalna!
                        </span>
                      }
                      onConfirm={() => confirmRemove(item.id)}
                      okText="Usuń"
                      cancelText="Anuluj"
                    >
                      <Button danger onClick={() => {}}>
                        Usuń
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<ScheduleOutlined />}
                    title={<Link to={`/schedule/${item.id}`}>{item.name}</Link>}
                    description={item.description}
                  />

                  <div>
                    Liczba wydarzeń: {item.eventCount} <br />
                    {new Date(item.firstEventDate).toLocaleDateString()} -{' '}
                    {new Date(item.lastEventDate).toLocaleDateString()}
                  </div>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      )}
    </>
  );
}
