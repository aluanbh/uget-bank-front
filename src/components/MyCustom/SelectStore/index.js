import { memo, useContext, useMemo } from "react";
import Select from "../../bootstrap/forms/Select";
import { DefaultContext } from "../../../contexts/default";
import FormGroup from "../../bootstrap/forms/FormGroup";

const SelectStore = (props) => {

  const { stores, storeSelected, setstoreSelected } = useContext(DefaultContext);

  const options = useMemo(() => stores.map(item => ({ value: item.id, text: item.name })), [stores])

  return (
    <FormGroup id="store" label="Lojas" className={`${props.class ? props.class : 'col-md-4'} mb-3`}>
      <Select
        value={storeSelected}
        list={options}
        onChange={e => setstoreSelected(e.target.value)}
      />
    </FormGroup>
  );
}

export default memo(SelectStore);