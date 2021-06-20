import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { SectionList, View } from 'react-native';
import { observer } from 'mobx-react';
import { AppBars, AppointmentItem, Text } from '@/components';
import { useAppStore } from '@/hooks';
import { useStyleAppointmentList } from './styles';

export const AppointmentListScreen = observer(() => {
  const styles = useStyleAppointmentList();
  const { formatMessage } = useIntl();
  const { appointment, auth, appState } = useAppStore();
  const { listUpcomingAppointment, listPastAppointment } = appointment;
  const [listUpcoming, setListUpcoming]: any = useState([]);
  const [listPass, setListPass]: any = useState([]);
  const [isRefresh, setIsRefresh] = useState(true);

  useEffect(() => {
    if (isRefresh) {
      appointment.getAppointmentList(
        auth.data?.id,
        formatMessage({ id: 'upcoming' }),
      );
      appointment.getAppointmentList(
        auth.data?.id,
        formatMessage({ id: 'ended' }),
      );
      setIsRefresh(false);
    }
  }, [appointment, auth.data?.id, formatMessage, isRefresh]);

  useEffect(() => {
    setListUpcoming(listUpcomingAppointment || []);
    setListPass(listPastAppointment || []);
  }, [listPastAppointment, listUpcomingAppointment]);

  const appointments = useMemo(
    () => [
      {
        title: formatMessage({ id: 'appointment.upcoming' }),
        data: listUpcoming,
        type: formatMessage({ id: 'upcoming' }),
      },
      {
        title: formatMessage({ id: 'appointment.ended' }),
        data: listPass,
        type: formatMessage({ id: 'ended' }),
      },
    ],
    [formatMessage, listPass, listUpcoming],
  );

  const keyExtractor = useCallback((item: any, index: number) => {
    return index?.toString();
  }, []);

  const onAppointmentPress = useCallback(() => {}, []);

  function renderSection({ section }) {
    return (
      <Text fontType={'MEDIUM_SF'} style={styles.section}>
        {section.title}
      </Text>
    );
  }

  function renderAppointmentItem({ item, section }) {
    item.type = section.type;
    return <AppointmentItem onPress={onAppointmentPress} item={item} />;
  }

  const ListEmptyComponent = useCallback(
    (props) => {
      const { data } = props?.section;
      console.log('====================================');
      console.log('props', props);
      console.log('====================================');
      return (
        <View>
          {!data.length && (
            <View style={styles.emptyStyle}>
              <Text style={styles.emptyText}>
                {formatMessage(
                  { id: 'app.list_empty' },
                  { name: formatMessage({ id: 'appointment' }).toLowerCase() },
                )}
              </Text>
            </View>
          )}
        </View>
      );
    },
    [formatMessage, styles.emptyStyle, styles.emptyText],
  );

  console.log('====================================');
  console.log('listPass', listPass);
  console.log('listUpcoming', listUpcoming);
  console.log('====================================');

  return (
    <View style={styles.container}>
      <AppBars
        isShadowBottom={false}
        title={formatMessage({ id: 'your_appointments' })}
      />
      {!appState.isShowLoading && (
        <SectionList
          style={styles.list}
          keyExtractor={keyExtractor}
          sections={appointments}
          renderSectionHeader={renderSection}
          renderItem={renderAppointmentItem}
          renderSectionFooter={ListEmptyComponent}
          contentContainerStyle={styles.contentScroll}
        />
      )}
    </View>
  );
});
