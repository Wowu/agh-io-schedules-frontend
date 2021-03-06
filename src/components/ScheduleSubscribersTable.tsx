import { Button, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { ScheduleService } from '../services/ScheduleService';
import { User } from '../services/UserService';
import CenteredHeader from './CenteredHeader';
import UserForm, { UserFormValues } from './UserForm';
import UsersTable from './UserTable';

export default function ScheduleSubscribersManagement(props: any) {
  const [subscribers, setSubscribers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    const { data } = await ScheduleService.getSubscribers(props.scheduleId);
    const { subscribers } = data;
    setSubscribers(subscribers);
    setLoading(false);
  }, [props.scheduleId]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  const onCreateFormSubmit = async (values: UserFormValues): Promise<boolean> => {
    setCreateModalVisible(false);

    await ScheduleService.addSubscriber(values.email, props.scheduleId);

    fetchSubscribers();

    return true;
  };

  const onRemove = async (User: User) => {
    await ScheduleService.removeSubscriber(User.id, props.scheduleId);
    fetchSubscribers();
  };

  console.log('subscribers', subscribers);

  return (
    <>
      <CenteredHeader title={'Uczestnicy'} />

      <UsersTable
        loading={loading}
        users={subscribers}
        onRemove={onRemove}
        fieldsToShow={['email']}
      />

      <br />

      <Row justify={'center'}>
        <Button type="primary" onClick={() => setCreateModalVisible(true)}>
          Dodaj uczestnika
        </Button>

        <UserForm
          visible={createModalVisible}
          onSubmit={onCreateFormSubmit}
          title="Dodaj uczestnika"
          onCancel={() => setCreateModalVisible(false)}
          fieldsToEdit={['email']}
        />
      </Row>
    </>
  );
}
