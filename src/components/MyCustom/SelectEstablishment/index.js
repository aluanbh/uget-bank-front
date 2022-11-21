import { memo, useContext, useMemo } from "react";
import Select from "../../bootstrap/forms/Select";
import { DefaultContext } from "../../../contexts/default";
import FormGroup from "../../bootstrap/forms/FormGroup";
import { ACCESS_LEVEL } from "../../../types/roles";


const SelectEstablishment = (props) => {

  const { accessLevel, establishments, estabSelected, setestabSelected } = useContext(DefaultContext);

  const options = useMemo(() => establishments.map(item => ({ value: item.id, text: item.name })), [establishments])

  if(accessLevel === ACCESS_LEVEL.ADMIN)
  return (
    <FormGroup id="estab-select-global" label="Estabelecimento" className={`${props.class ? props.class : 'col-md-4'} mb-3`}>
      <Select
        value={estabSelected}
        list={options}
        onChange={e => setestabSelected(e.target.value)}
      />
    </FormGroup>
  );
  else
  return null;
}

export default memo(SelectEstablishment);