import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

const DateRangePicker = ({startDate, endDate, onDateChange}) => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatDate = date => {
    return date ? moment(date).format('DD MMMM YYYY') : 'Select Date';
  };

  const getDayName = date => {
    return date ? moment(date).format('dddd') : '';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="calendar" size={25} color="black" />
        <Text style={styles.headerText}>Itinerary</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.dateContainer}>
        <Pressable
          style={styles.dateButton}
          onPress={() => setShowStartPicker(true)}>
          <Text style={styles.dayText}>{getDayName(startDate) || 'Start'}</Text>
          <Text style={styles.dateText}>{formatDate(startDate)}</Text>
        </Pressable>

        <AntDesign name="arrowright" size={20} color="black" />

        <Pressable
          style={styles.dateButton}
          onPress={() => setShowEndPicker(true)}>
          <Text style={styles.dayText}>{getDayName(endDate) || 'End'}</Text>
          <Text style={styles.dateText}>{formatDate(endDate)}</Text>
        </Pressable>
      </View>

      <DatePicker
        modal
        open={showStartPicker}
        date={startDate || new Date()}
        mode="date"
        onConfirm={date => {
          setShowStartPicker(false);
          onDateChange({startDate: date, endDate});
        }}
        onCancel={() => setShowStartPicker(false)}
      />

      <DatePicker
        modal
        open={showEndPicker}
        date={endDate || startDate || new Date()}
        mode="date"
        minimumDate={startDate}
        onConfirm={date => {
          setShowEndPicker(false);
          onDateChange({startDate, endDate: date});
        }}
        onCancel={() => setShowEndPicker(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c1c9d6',
    marginVertical: 15,
    borderRadius: 20,
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  headerText: {
    fontSize: 16,
    color: '#505050',
  },
  divider: {
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  dateContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateButton: {
    flex: 1,
  },
  dayText: {
    color: '#505050',
  },
  dateText: {
    marginTop: 6,
    fontSize: 15,
  },
});

export default DateRangePicker;