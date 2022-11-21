import { memo, useContext, useMemo, useState } from "react";
import Select from "../../bootstrap/forms/Select";
import { DefaultContext } from "../../../contexts/default";
import FormGroup from "../../bootstrap/forms/FormGroup";
import moment from 'moment';
import { DateRangePicker } from 'react-date-range';
import Popovers from '../../bootstrap/Popovers';
import Button from '../../bootstrap/Button';

const SelectDate = (props) => {

  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: moment().startOf('week').add('-1', 'week').toDate(),
      endDate: moment().endOf('week').toDate(),
      key: 'selection',
    },
  ]);
  const datePicker = (
    <DateRangePicker
      onChange={(item) => setSelectedDate([item.selection])}
      showSelectionPreview
      moveRangeOnFirstSelection={false}
      retainEndDateOnFirstSelection={false}
      months={2}
      ranges={selectedDate}
      direction='horizontal'
      rangeColors={[process.env.REACT_APP_PRIMARY_COLOR]}
    />
  );


  const { stores, storeSelected, setstoreSelected } = useContext(DefaultContext);

  const options = useMemo(() => stores.map(item => ({ value: item.id, text: item.name })), [stores])

  return (
    <FormGroup id="date" className={`${props.class ? props.class : 'row-md-4'} mb-3`}>
      <Popovers
        placement='bottom-end'
        className='mw-100 overflow-hidden'
        data-tour='date-range-menu'
        bodyClassName='p-0'
        trigger='click'
        desc={datePicker}>
        <Button color='dark' isLight data-tour='date-range'>
          {`${moment(selectedDate[0].startDate).format('MMM Do YY')} - ${moment(
            selectedDate[0].endDate,
          ).format('MMM Do YY')}`}
        </Button>

      </Popovers>
    </FormGroup>
  );
}

export default memo(SelectDate);