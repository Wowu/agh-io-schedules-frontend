import CenteredHeader from '../components/CenteredHeader';
import { useState, useEffect } from 'react';
import { Badge, Calendar, Col, List, Row, Spin, Button } from 'antd';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Schedule as ISchedule, Event, ScheduleService } from '../services/ScheduleService';
import UpdateScheduleModal from '../components/UpdateScheduleModal';
import EventListItem from '../components/EventListItem';
import CopyToClipboardButton from '../components/CopyToClipboardButton';
import { DownloadFileButton } from '../components/DownloadFileButton';

function getBadgeText(count: number): string {
  switch (count) {
    case 0:
      return '';
    case 1:
      return '1 event';
    default:
      return `${count} events`;
  }
}

function dateCellRender(date: moment.Moment, schedule: ISchedule) {
  const events = findEventsOnSameDay(schedule, date);
  return (
    events.length > 0 && (
      <Badge count={getBadgeText(events.length)} style={{ backgroundColor: '#52c41a' }} />
    )
  );
}

function getMonthData(date: moment.Moment) {
  return '';
}

function monthCellRender(value: moment.Moment) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
    </div>
  ) : null;
}

function findEventsOnSameDay(schedule: ISchedule, date: moment.Moment): Array<Event> {
  return schedule.events.filter((e: Event) => moment(e.beginTime).isSame(date, 'day'));
}

export default function Schedule() {
  const params = useParams<any>();

  const [schedule, setSchedule] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [dateValue, setDateValue] = useState<moment.Moment>(moment());
  const [currentEvents, setCurrentEvents] = useState<Array<Event>>([]);
  const [publicLink, setPublicLink] = useState<string>('');

  useEffect(() => {
    ScheduleService.getSchedule(parseInt(params.id))
      .then((data) => {
        console.log('data', data);
        setSchedule(data);
        setLoading(false);
        setPublicLink(ScheduleService.buildPublicLink(data));
      })
      .catch((reason: any) => {
        console.log(reason);
      });
  }, [params.id]);
  console.log(schedule);

  useEffect(() => {
    if (schedule) {
      setCurrentEvents(findEventsOnSameDay(schedule, dateValue));
    }
  }, [dateValue, schedule]);

  return (
    <>
      {loading ? (
        <Row justify={'center'}>
          <Spin size="large" />
        </Row>
      ) : (
        <>
          <Row justify={'end'}>
            <CopyToClipboardButton content={publicLink} />
          </Row>
          <CenteredHeader title={schedule.name} subtitle={schedule.description} />

          <Row gutter={[16, 16]} justify="space-between">
            <Col span={24} xl={12}>
              <Calendar
                dateCellRender={(date: moment.Moment) => dateCellRender(date, schedule)}
                monthCellRender={monthCellRender}
                value={dateValue}
                onChange={(date) => setDateValue(date)}
              />
            </Col>
            <Col span={24} xl={11}>
              <List
                itemLayout="horizontal"
                dataSource={currentEvents}
                renderItem={(item) => <EventListItem item={item} />}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col>
              <UpdateScheduleModal />
            </Col>
            <Col>
              <DownloadFileButton
                downloadHandler={() => ScheduleService.downloadSchedule(schedule.id)}
                filename={'schedule.xls'}
              >
                <Button type="primary">Pobierz harmonogram</Button>
              </DownloadFileButton>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
