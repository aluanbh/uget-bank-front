import { memo, useContext, useMemo } from "react";
import Select from "../../bootstrap/forms/Select";
import { DefaultContext } from "../../../contexts/default";
import FormGroup from "../../bootstrap/forms/FormGroup";


const SelectToten = (props) => {

  const { totens, totenSelected, settotenSelected } = useContext(DefaultContext);

  const options = useMemo(() => totens.map(item => ({ value: item.id, text: item.name })), [totens])

  return (
    <FormGroup id="toten" label="Totem" className={`${props.class ? props.class : 'col-md-4'} mb-3`}>
      <Select
        value={totenSelected}
        list={options}
        onChange={e => settotenSelected(e.target.value)}
      />
    </FormGroup>
  );
}

export default memo(SelectToten);